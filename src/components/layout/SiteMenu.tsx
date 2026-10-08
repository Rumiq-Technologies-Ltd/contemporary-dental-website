'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { navigation } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import styles from './layout.module.css';

export function SiteMenu() {
  const details = useRef<HTMLDetailsElement>(null);
  const close = () => { if (details.current) details.current.open = false; };
  return <details ref={details} className={styles.menu} onKeyDown={event => {
    if (event.key === 'Escape') { close(); details.current?.querySelector('summary')?.focus(); }
  }}>
    <summary className={styles.menuTrigger} aria-label="Menu — open navigation">
      <span className="pill pill-outline">Menu</span><span className={styles.menuIcon}><Icon name="menu" /></span>
    </summary>
    <nav className={styles.menuPanel} aria-label="Main navigation">
      <p>YOUR SMILE STARTS HERE</p>
      {navigation.map(item => <Link key={item.href} href={item.href} onClick={close}><span>{item.number}</span>{item.label}<span aria-hidden="true">↗</span></Link>)}
      <Link href="/hero-clean" onClick={close} className={styles.previewLink}>View clean hero design <span aria-hidden="true">↗</span></Link>
    </nav>
  </details>;
}
