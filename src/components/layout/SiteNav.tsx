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

// Every section of the site in one bar. On narrow screens the links wrap onto more rows.
export function SiteNav({ items, label }: SiteNavProps) {
  const pathname = usePathname();
  return <nav className={styles.nav} aria-label={label}>
    {items.map(item => <Link key={item.href} href={item.href} className={styles.navLink}
      aria-current={isNavCurrent(pathname, item.href) ? 'page' : undefined}>{item.label}</Link>)}
  </nav>;
}
