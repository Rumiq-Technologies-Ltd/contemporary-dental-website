'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/content/site';
import { isNavCurrent } from './isNavCurrent';
import styles from './layout.module.css';

// Large screens show every section in one bar. Smaller screens use SiteMenu instead;
// the CSS decides which one is visible, so both stay in the document for every breakpoint.
export function SiteNav() {
  const pathname = usePathname();
  return <nav className={styles.nav} aria-label="Primary navigation">
    {navigation.map(item => <Link key={item.href} href={item.href} className={styles.navLink}
      aria-current={isNavCurrent(pathname, item.href) ? 'page' : undefined}>{item.label}</Link>)}
  </nav>;
}
