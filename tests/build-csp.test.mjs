import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { buildCsp } from '../scripts/build-csp.mjs';

const policy = "default-src 'self'; script-src 'self' 'sha256-stale'; object-src 'none'; frame-ancestors 'none'";
const manifest = () => ({ headers: [{ source: '/:path*', headers: [{ key: 'Content-Security-Policy', value: policy }] }] });
const hash = text => `sha256-${createHash('sha256').update(text).digest('base64')}`;
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'cdc-csp-'));
  assert.equal(dirname(resolve(root)), resolve(tmpdir()));
  t.after(() => rm(root, { recursive: true, force: true }));
  const distDirectory = join(root, '.next');
  const vercelOutputDirectory = join(root, '.vercel/output');
  const put = async (path, value) => {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, typeof value === 'string' ? value : JSON.stringify(value));
  };
  await put(join(distDirectory, 'routes-manifest.json'), manifest());
  return { distDirectory, vercelOutputDirectory, put };
}
const json = async path => JSON.parse(await readFile(path, 'utf8'));

test('hashes standard HTML, preserving exact script bytes and ignoring external scripts', async t => {
  const f = await fixture(t);
  const inline = 'self.__next_f.push([1,"hello"]);\n';
  await f.put(join(f.distDirectory, 'server/app/index.html'), `<script src="/app.js">ignored</script><script SRC="/other.js">ignored</script><script>${inline}</script><script>${inline}</script>`);
  assert.deepEqual(await buildCsp(f), [hash(inline)]);
  const output = await json(join(f.distDirectory, 'routes-manifest.json'));
  assert.equal(output.headers[0].headers[0].value, policy.replace("'sha256-stale'", `'${hash(inline)}'`));
});

test('finds adapter-scoped HTML and patches CDN routing and copied function manifests', async t => {
  const f = await fixture(t);
  const inline = 'self.__next_f.push([0])';
  await f.put(join(f.distDirectory, 'server/route-cache/APP_PAGE/owner/$/index.html'), `<script>${inline}</script>`);
  const configPath = join(f.distDirectory, 'output/config.json');
  await f.put(configPath, { version: 3, routes: [{ src: '/(.*)', headers: { 'content-security-policy': policy, 'X-Frame-Options': 'DENY' }, continue: true }, { handle: 'filesystem' }] });
  const copyPath = join(f.distDirectory, 'output/functions/index.func/.next/routes-manifest.json');
  await f.put(copyPath, manifest());
  const hashes = await buildCsp(f);
  assert.deepEqual(hashes, [hash(inline)]);
  const config = await json(configPath);
  assert.equal(config.routes[0].headers['content-security-policy'], policy.replace("'sha256-stale'", `'${hash(inline)}'`));
  assert.equal(config.routes[0].headers['X-Frame-Options'], 'DENY');
  assert.deepEqual(config.routes[1], { handle: 'filesystem' });
  assert.deepEqual(await json(copyPath), await json(join(f.distDirectory, 'routes-manifest.json')));
  assert.deepEqual(await buildCsp(f), hashes);
});

test('supports HTML moved into adapter output and installs a CSP route when needed', async t => {
  const f = await fixture(t);
  await f.put(join(f.vercelOutputDirectory, 'functions/index.prerender-fallback.html'), '<script>self.__next_f.push([0])</script>');
  const configPath = join(f.vercelOutputDirectory, 'config.json');
  await f.put(configPath, { version: 3, routes: [{ handle: 'filesystem' }] });
  await buildCsp(f);
  const config = await json(configPath);
  assert.equal(config.routes[0].continue, true);
  assert.match(config.routes[0].headers['Content-Security-Policy'], /sha256-/);
  assert.deepEqual(config.routes[1], { handle: 'filesystem' });
});

test('rejects empty HTML without replacing a previous manifest or weakening CSP', async t => {
  const f = await fixture(t);
  await f.put(join(f.distDirectory, 'server/app/index.html'), '<script src="/app.js"></script>');
  await assert.rejects(buildCsp(f), /No prerendered script hashes found/);
  assert.deepEqual(await json(join(f.distDirectory, 'routes-manifest.json')), manifest());
  await assert.rejects(readFile(join(f.distDirectory, 'csp-hashes.json')), { code: 'ENOENT' });
});
