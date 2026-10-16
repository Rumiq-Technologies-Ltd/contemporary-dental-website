/** True when the current pathname belongs to the navigation entry for `href`. */
export function isNavCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
