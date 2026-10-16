'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isNavCurrent } from './isNavCurrent';
import type { NavItem } from './navigation';
import styles from './layout.module.css';

interface SiteNavProps {
  items: readonly NavItem[];
  label: string;
}

// Large screens show every section in one bar. Smaller screens use SiteMenu instead;
// the CSS decides which one is visible, so both stay in the document for every breakpoint.
export function SiteNav({ items, label }: SiteNavProps) {
  const pathname = usePathname();
  return <nav className={styles.nav} aria-label={label}>
    {items.map(item => <Link key={item.href} href={item.href} className={styles.navLink}
      aria-current={isNavCurrent(pathname, item.href) ? 'page' : undefined}>{item.label}</Link>)}
  </nav>;
}
