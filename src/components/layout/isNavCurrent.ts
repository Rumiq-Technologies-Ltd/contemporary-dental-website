import { routes } from '@/content/site';

// The insurance and payment pages share one navigation entry, so both mark it current.
const groupedPaths: Readonly<Record<string, readonly string[]>> = {
  [routes.insurance]: [routes.insurance, routes.payment],
};

/** True when the current pathname belongs to the navigation entry for `href`. */
export function isNavCurrent(pathname: string, href: string): boolean {
  return (groupedPaths[href] ?? [href]).some(path => pathname === path || pathname.startsWith(`${path}/`));
}
