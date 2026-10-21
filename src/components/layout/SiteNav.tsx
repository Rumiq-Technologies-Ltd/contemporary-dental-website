'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { DropdownGroup } from './DropdownGroup';
import { isNavCurrent } from './isNavCurrent';
import type { NavItem } from './navigation';
import styles from './layout.module.css';

interface SiteNavProps {
  items: readonly NavItem[];
  label: string;
}

// Large screens show every section in one bar. Smaller screens use SiteMenu instead;
// the CSS decides which one is visible, so both stay in the document for every breakpoint.
// An entry with children (Locations) opens a dropdown on hover and whenever keyboard focus is
// inside it, so tabbing from the entry moves straight into its links. Picking a link closes it.
export function SiteNav({ items, label }: SiteNavProps) {
  const pathname = usePathname();
  const current = (href: string) => (isNavCurrent(pathname, href) ? 'page' : undefined);
  return <nav className={styles.nav} aria-label={label}>
    {items.map(item => item.children
      ? <DropdownGroup key={item.href} className={styles.navGroup}>
        <Link href={item.href} className={styles.navLink} aria-current={current(item.href)}>
          {item.label}<Icon name="chevron" />
        </Link>
        <ul className={styles.subnav}>
          {item.children.map(child => <li key={child.href}>
            <Link href={child.href} className={styles.subnavLink} aria-current={current(child.href)}>{child.label}</Link>
          </li>)}
        </ul>
      </DropdownGroup>
      : <Link key={item.href} href={item.href} className={styles.navLink} aria-current={current(item.href)}>{item.label}</Link>)}
  </nav>;
}
