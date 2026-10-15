import Link from 'next/link';
import type { CSSProperties } from 'react';
import { primaryOffice, routes, site } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import styles from './emergency.module.css';

// A black band so urgent care is easy to find. The phone numbers are the actions.
export function Emergency() {
  return <Screen id="same-day" labelledBy="same-day-title" className={styles.emergency}>
    <div className={styles.copy} data-reveal="left">
      <p className={styles.eyebrow}>Dental emergency?</p>
      <h2 id="same-day-title">Same-day care when you need it</h2>
      <p>Tooth extractions and implant placement can be done the same day, subject to clinical suitability and availability. Emergency visits are open to new patients, and same-day emergency appointments are often available. Same-day emergency care also includes assessment and first-stage treatment for abscesses and swelling, and for broken or fractured teeth.</p>
    </div>
    <div className={styles.actions} data-reveal="right" style={{ '--d': '150ms' } as CSSProperties}>
      <a href={primaryOffice.phoneHref} className={`pill pill-accent pill-large ${styles.call}`}>
        <Icon name="phone" />Call {primaryOffice.name}: {primaryOffice.phone}
      </a>
      <p className={styles.afterHours}>After hours: <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></p>
      <Link href={routes.emergency} className={styles.guidance}>Dental emergency guidance<Icon name="arrow" /></Link>
    </div>
  </Screen>;
}
