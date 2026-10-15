import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale } from '@/i18n/locales';

// Root-level endpoints live outside the [lang] segment and must never be rewritten.
const rootEndpoints = new Set(['opengraph-image', 'twitter-image', 'manifest.webmanifest', 'sitemap.xml', 'robots.txt', 'llms.txt', '.well-known']);

/**
 * English pages are served at the unprefixed URLs (/services) and the other languages at prefixed
 * ones (/es/services). /en/services also serves the English page, and every page declares the
 * unprefixed URL as its canonical, so search engines index one address. A redirect from /en/ would
 * break Next.js prefetching, so there is none.
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const [, first = ''] = pathname.split('/');
  if (isLocale(first) || rootEndpoints.has(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next.js internals and anything with a file extension (images, fonts, robots.txt, and so on).
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
};
