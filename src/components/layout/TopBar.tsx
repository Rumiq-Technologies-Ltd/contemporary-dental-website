import Link from 'next/link';
import { offices, routes, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './layout.module.css';

// Thin strip above the header on every page: each office phone, the after-hours line and the language choice.
export async function TopBar() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <div className={styles.topBar}>
    <p className={styles.topBarContacts}>
      {offices.map(office => <a key={office.id} href={office.phoneHref} className={styles.topBarPhone}>{fill(t.callOffice, { name: office.name, phone: office.phone })}</a>)}
      <span>{t.afterHours} <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></span>
      <span>{t.footer.email} <a href={`mailto:${site.email}`}>{site.email}</a></span>
    </p>
    <LanguageSwitcher current={lang} label={t.languageLabel} comingSoon={t.languageComingSoon} />
    <Link href={localePath(lang, routes.requestAppointment)} className="pill pill-dark">{t.requestAppointment}</Link>
  </div>;
}
