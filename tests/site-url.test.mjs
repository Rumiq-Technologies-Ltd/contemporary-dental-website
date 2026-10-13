import assert from 'node:assert/strict';
import { test } from 'node:test';

// The module reads process.env when imported, so start from a clean environment.
delete process.env.VERCEL_ENV;
delete process.env.VERCEL_URL;
delete process.env.NEXT_PUBLIC_SITE_URL;
const { resolveSiteUrl, isIndexable } = await import('../src/lib/siteUrl.ts');

test('uses the configured public URL and drops paths and trailing slashes', () => {
  assert.equal(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://www.contemporarydentalcare.com/' }), 'https://www.contemporarydentalcare.com');
  assert.equal(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: ' https://www.contemporarydentalcare.com/about ', VERCEL_ENV: 'production' }), 'https://www.contemporarydentalcare.com');
});

test('a Vercel production build fails without a public https URL', () => {
  assert.throws(() => resolveSiteUrl({ VERCEL_ENV: 'production' }), /NEXT_PUBLIC_SITE_URL is required/);
  assert.throws(() => resolveSiteUrl({ VERCEL_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'http://127.0.0.1:3000' }), /public https address/);
  assert.throws(() => resolveSiteUrl({ VERCEL_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'http://www.contemporarydentalcare.com' }), /public https address/);
  assert.throws(() => resolveSiteUrl({ VERCEL_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'https://localhost:3000' }), /public https address/);
  assert.throws(() => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'not a url' }), /not a valid URL/);
});

test('previews use their deployment URL and local builds fall back to the dev server', () => {
  assert.equal(resolveSiteUrl({ VERCEL_ENV: 'preview', VERCEL_URL: 'site-git-branch.vercel.app' }), 'https://site-git-branch.vercel.app');
  assert.equal(resolveSiteUrl({}), 'http://127.0.0.1:3000');
});

test('production and local builds are indexable, previews and development deployments are not', () => {
  assert.equal(isIndexable({ VERCEL_ENV: 'production' }), true);
  assert.equal(isIndexable({}), true);
  assert.equal(isIndexable({ VERCEL_ENV: 'preview' }), false);
  assert.equal(isIndexable({ VERCEL_ENV: 'development' }), false);
});
