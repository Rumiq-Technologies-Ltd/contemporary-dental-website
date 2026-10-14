'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { isNavCurrent } from './isNavCurrent';
import styles from './layout.module.css';

// Small screens and tablets. Large screens show SiteNav instead.
export function SiteMenu() {
  const details = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const close = () => { if (details.current) details.current.open = false; };
  return <details ref={details} className={styles.menu} onKeyDown={event => {
    if (event.key === 'Escape') { close(); details.current?.querySelector('summary')?.focus(); }
  }}>
    <summary className={styles.menuTrigger} aria-label="Menu — open navigation">
      <span className="pill pill-outline">Menu</span><span className={styles.menuIcon}><Icon name="menu" /></span>
    </summary>
    <nav className={styles.menuPanel} aria-label="Main navigation">
      <p>{site.tagline}</p>
      {navigation.map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={isNavCurrent(pathname, item.href) ? 'page' : undefined}><span>{item.number}</span>{item.label}<span aria-hidden="true">↗</span></Link>)}
    </nav>
  </details>;
}
