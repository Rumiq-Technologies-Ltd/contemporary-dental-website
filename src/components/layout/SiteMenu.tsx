'use client';

import { Fragment, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { primaryOffice, site } from '@/content/site';
import { fill } from '@/i18n/fill';
import type { CommonMessages } from '@/i18n/messages/common';
import { Icon } from '@/components/ui/Icon';
import { isNavCurrent } from './isNavCurrent';
import type { NavItem } from './navigation';
import styles from './layout.module.css';

interface SiteMenuProps {
  items: readonly NavItem[];
  requestHref: string;
  t: CommonMessages;
}

// Small screens and tablets. Large screens show SiteNav instead. The panel ends with the
// two actions a visitor is most likely to need: request an appointment, or call.
export function SiteMenu({ items, requestHref, t }: SiteMenuProps) {
  const details = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const close = () => { if (details.current) details.current.open = false; };
  return <details ref={details} className={styles.menu} onKeyDown={event => {
    if (event.key === 'Escape') { close(); details.current?.querySelector('summary')?.focus(); }
  }}>
    <summary className={`pill pill-outline ${styles.menuTrigger}`} aria-label={t.menuLabel}>
      <Icon name="menu" /><span>{t.menu}</span>
    </summary>
    <div className={styles.menuPanel}>
      <nav aria-label={t.mainNavigation}>
        {items.map(item => <Fragment key={item.href}>
          <Link href={item.href} onClick={close} aria-current={isNavCurrent(pathname, item.href) ? 'page' : undefined}><span>{item.number}</span>{item.label}<span aria-hidden="true"><Icon name="arrow" /></span></Link>
          {/* Sub-entries such as each office sit indented under their entry; the empty first span keeps the indent. */}
          {item.children?.map(child => <Link key={child.href} href={child.href} onClick={close} className={styles.menuSubLink}
            aria-current={isNavCurrent(pathname, child.href) ? 'page' : undefined}><span aria-hidden="true" />{child.label}<span aria-hidden="true"><Icon name="arrow" /></span></Link>)}
        </Fragment>)}
      </nav>
      <div className={styles.menuActions}>
        <Link href={requestHref} onClick={close} className="pill pill-accent pill-large">{t.requestAppointment}</Link>
        <a href={primaryOffice.phoneHref} className="pill pill-outline pill-large"><Icon name="phone" />{fill(t.callOffice, { name: primaryOffice.name, phone: primaryOffice.phone })}</a>
        <p className={styles.menuAfterHours}>{t.afterHours} <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></p>
      </div>
    </div>
  </details>;
}
