import { unprefixedPath } from '@/i18n/locales';

/**
 * True when the current pathname belongs to the navigation entry for `href`. Both sides drop the
 * language prefix, because the server renders English pages at the internal /en/... path while the
 * browser shows the unprefixed one; comparing the raw pathname made the two disagree.
 */
export function isNavCurrent(pathname: string, href: string): boolean {
  const path = unprefixedPath(pathname);
  const target = unprefixedPath(href);
  return path === target || path.startsWith(`${target}/`);
}
