import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Exact source assets returned by Figma; never use a screenshot as page content.
const assets = JSON.parse(await readFile(new URL('./figma-assets.json', import.meta.url), 'utf8'));
await mkdir('public/images/figma', { recursive: true });
const manifest = [];
for (const { file, url } of assets) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Asset ${file}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length) throw new Error(`Empty asset: ${file}`);
  await writeFile(`public/images/figma/${file}`, bytes);
  manifest.push({ file, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
  console.log(`${file}: ${bytes.length} bytes`);
}
await writeFile('docs/asset-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
