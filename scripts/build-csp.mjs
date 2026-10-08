import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

async function filesUnder(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
function replaceScripts(policy, scriptPolicy) {
  if (!/(?:^|;)\s*script-src\s+[^;]+/.test(policy)) {
    throw new Error('Expected a script-src directive in the generated CSP.');
  }
  return policy.replace(/\bscript-src\s+[^;]+/, scriptPolicy);
}

function patchNextHeaders(manifest, scriptPolicy) {
  let policy;
  for (const route of manifest.headers ?? []) {
    for (const header of route.headers ?? []) {
      if (header.key.toLowerCase() === 'content-security-policy') {
        header.value = replaceScripts(header.value, scriptPolicy);
        policy = header.value;
      }
    }
  }
  if (!policy) throw new Error('Expected a CSP header in the Next.js routes manifest.');
  return policy;
}

export async function buildCsp({ distDirectory = '.next', vercelOutputDirectory = '.vercel/output' } = {}) {
  // Adapter builds use server/route-cache/<owner>/... rather than server/app.
  // Also inspect adapter output: onBuildComplete runs before this post-build step.
  const nextFiles = await filesUnder(join(distDirectory, 'server'));
  const outputFiles = await filesUnder(vercelOutputDirectory);
  const htmlFiles = [...nextFiles, ...outputFiles].filter(file => file.endsWith('.html'));
  const hashes = new Set();
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!/(?:^|\s)src\s*=/i.test(match[1]) && match[2]) {
        hashes.add(`sha256-${createHash('sha256').update(match[2]).digest('base64')}`);
      }
    }
  }
  // Fail closed: an unsupported build must never ship a permissive policy.
  if (!hashes.size) {
    throw new Error(`No prerendered script hashes found in ${join(distDirectory, 'server')} or ${vercelOutputDirectory}. Do not start without a CSP manifest.`);
  }
  const list = [...hashes].sort();
  const scriptPolicy = `script-src 'self' ${list.map(hash => `'${hash}'`).join(' ')}`;
  const manifestPath = join(distDirectory, 'routes-manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const policy = patchNextHeaders(manifest, scriptPolicy);

  // Vercel has already copied manifests into functions and emitted CDN routes.
  // Patching only .next would leave those copies blocking browser hydration.
  for (const file of outputFiles.filter(file => basename(file) === 'routes-manifest.json')) {
    const copy = JSON.parse(await readFile(file, 'utf8'));
    patchNextHeaders(copy, scriptPolicy);
    await writeFile(file, JSON.stringify(copy));
  }
  const outputConfigPath = join(vercelOutputDirectory, 'config.json');
  if (outputFiles.includes(outputConfigPath)) {
    const config = JSON.parse(await readFile(outputConfigPath, 'utf8'));
    let patched = false;
    for (const route of config.routes ?? []) {
      for (const key of Object.keys(route.headers ?? {})) {
        if (key.toLowerCase() === 'content-security-policy') {
          route.headers[key] = replaceScripts(route.headers[key], scriptPolicy);
          patched = true;
        }
      }
    }
    if (!patched) {
      config.routes ??= [];
      config.routes.unshift({ src: '/(.*)', headers: { 'Content-Security-Policy': policy }, continue: true });
    }
    await writeFile(outputConfigPath, JSON.stringify(config));
  }
  await writeFile(join(distDirectory, 'csp-hashes.json'), JSON.stringify(list));
  await writeFile(manifestPath, JSON.stringify(manifest));
  console.log(`CSP: generated ${hashes.size} hashes from ${htmlFiles.length} prerendered HTML files.`);
  return list;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await buildCsp();
}
