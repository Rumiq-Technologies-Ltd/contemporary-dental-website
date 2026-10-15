'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, primaryOffice, routes, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { isNavCurrent } from './isNavCurrent';
import styles from './layout.module.css';

// Small screens and tablets. Large screens show SiteNav instead. The panel ends with the
// two actions a visitor is most likely to need: request an appointment, or call.
export function SiteMenu() {
  const details = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const close = () => { if (details.current) details.current.open = false; };
  return <details ref={details} className={styles.menu} onKeyDown={event => {
    if (event.key === 'Escape') { close(); details.current?.querySelector('summary')?.focus(); }
  }}>
    <summary className={`pill pill-outline ${styles.menuTrigger}`} aria-label="Menu — open navigation">
      <Icon name="menu" /><span>Menu</span>
    </summary>
    <div className={styles.menuPanel}>
      <nav aria-label="Main navigation">
        {navigation.map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={isNavCurrent(pathname, item.href) ? 'page' : undefined}><span>{item.number}</span>{item.label}<span aria-hidden="true"><Icon name="arrow" /></span></Link>)}
      </nav>
      <div className={styles.menuActions}>
        <Link href={routes.requestAppointment} onClick={close} className="pill pill-accent pill-large">Request an appointment</Link>
        <a href={primaryOffice.phoneHref} className="pill pill-outline pill-large"><Icon name="phone" />Call {primaryOffice.name}: {primaryOffice.phone}</a>
        <p className={styles.menuAfterHours}>After hours: <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></p>
      </div>
    </div>
  </details>;
}
