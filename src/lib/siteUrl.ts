// Absolute origin of the website. It feeds canonical links, Open Graph tags, the
// sitemap, robots.txt and structured data, so a wrong value points search and AI
// engines at an address nobody can reach.

/** Reads NEXT_PUBLIC_SITE_URL, VERCEL_ENV and VERCEL_URL from process.env-shaped input. */
export type SiteUrlEnv = Readonly<Record<string, string | undefined>>;

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);
const LOCAL_FALLBACK = 'http://127.0.0.1:3000';

/**
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL (inlined at build time, so redeploy after changing it).
 * 2. Vercel preview deployments use their own deployment URL.
 * 3. Local builds fall back to the dev server address.
 * A Vercel production build without a valid public https URL fails on purpose,
 * so a localhost address can never ship to production.
 */
export function resolveSiteUrl(env: SiteUrlEnv): string {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  const production = env.VERCEL_ENV === 'production';

  if (configured) {
    let origin: URL;
    try {
      origin = new URL(configured);
    } catch {
      throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: "${configured}".`);
    }
    if (production && (origin.protocol !== 'https:' || LOCAL_HOSTS.has(origin.hostname))) {
      throw new Error(`NEXT_PUBLIC_SITE_URL must be the public https address in production, not "${configured}".`);
    }
    return origin.origin;
  }
  if (production) {
    throw new Error('NEXT_PUBLIC_SITE_URL is required for production builds. Set it in the Vercel Production environment (for example https://www.contemporarydentalcare.com) and redeploy.');
  }
  return env.VERCEL_URL ? `https://${env.VERCEL_URL}` : LOCAL_FALLBACK;
}

export const siteUrl: string = resolveSiteUrl(process.env);

/** Production deployments and local builds may be indexed; Vercel previews may not. */
export function isIndexable(env: SiteUrlEnv): boolean {
  return env.VERCEL_ENV === undefined || env.VERCEL_ENV === 'production';
}
