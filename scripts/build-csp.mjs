import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}
const hashes = new Set();
for (const file of await htmlFiles('.next/server/app')) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/.test(match[1]) && match[2]) {
      hashes.add(`sha256-${createHash('sha256').update(match[2]).digest('base64')}`);
    }
  }
}
if (!hashes.size) throw new Error('No prerendered script hashes found. Do not start without a CSP manifest.');
const list = [...hashes].sort();
await writeFile('.next/csp-hashes.json', JSON.stringify(list));
// Next persists headers during build. Patch the generated route manifest too,
// so both normal starts and deployment adapters see the finished hash policy.
const manifestPath = '.next/routes-manifest.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
for (const route of manifest.headers) {
  for (const header of route.headers) {
    if (header.key.toLowerCase() === 'content-security-policy') {
      header.value = header.value.replace(/script-src [^;]+/, `script-src 'self' ${list.map(hash => `'${hash}'`).join(' ')}`);
    }
  }
}
await writeFile(manifestPath, JSON.stringify(manifest));
console.log(`CSP: generated ${hashes.size} hashes for prerendered scripts.`);
