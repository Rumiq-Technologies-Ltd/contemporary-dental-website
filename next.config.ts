import type { NextConfig } from 'next';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Static pages use build-generated script hashes instead of permitting arbitrary
// inline scripts. This keeps prerendering and CDN caching available without nonces.
const production = process.env.NODE_ENV === 'production';
let hashes: string[] = [];
try {
  hashes = JSON.parse(readFileSync(join(process.cwd(), '.next/csp-hashes.json'), 'utf8'));
} catch {
  // The first build has no manifest yet. build-csp.mjs produces it before start.
}
const csp = [
  "default-src 'self'",
  `script-src 'self' ${production ? hashes.map(hash => `'${hash}'`).join(' ') : "'unsafe-inline' 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${production ? '' : ' ws: wss:'}`,
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // The root layout is the dynamic [lang] segment, which cannot compose a not-found page on its
  // own, so unmatched URLs and notFound() use app/global-not-found.tsx (documented in Next.js 16).
  experimental: { globalNotFound: true },
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 85] },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'Content-Security-Policy', value: csp },
      // Browsers only honour HSTS over HTTPS, so it is inert on local http. No includeSubDomains
      // or preload: those commit every subdomain to HTTPS and are hard to undo.
      { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), hid=(), browsing-topics=(), interest-cohort=()' },
    ] }];
  },
};
export default nextConfig;
