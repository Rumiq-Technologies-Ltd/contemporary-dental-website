import Link from 'next/link';
import type { CSSProperties } from 'react';
import { primaryOffice, routes, site } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './emergency.module.css';

// A black band so urgent care is easy to find. The phone numbers are the actions.
export async function Emergency() {
  const lang = await getLocale();
  const { common, home } = getMessages(lang);
  const t = home.emergency;

  return <Screen id="same-day" labelledBy="same-day-title" className={styles.emergency}>
    <div className={styles.copy} data-reveal="left">
      <p className={styles.eyebrow}>{t.eyebrow}</p>
      <h2 id="same-day-title">{t.heading}</h2>
      <p>{t.body}</p>
    </div>
    <div className={styles.actions} data-reveal="right" style={{ '--d': '150ms' } as CSSProperties}>
      <a href={primaryOffice.phoneHref} className={`pill pill-accent pill-large ${styles.call}`}>
        <Icon name="phone" />{fill(common.callOffice, { name: primaryOffice.name, phone: primaryOffice.phone })}
      </a>
      <p className={styles.afterHours}>{common.afterHours} <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></p>
      <Link href={localePath(lang, routes.emergency)} className={styles.guidance}>{t.guidance}<Icon name="arrow" /></Link>
    </div>
  </Screen>;
}
