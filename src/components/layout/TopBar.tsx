import { offices, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './layout.module.css';

// Thin strip above the header on every page: the language choice, each office phone and the after-hours line.
export async function TopBar() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <div className={styles.topBar}>
    <p className={styles.topBarText}>{t.topBar}</p>
    <p className={styles.topBarContacts}>
      {offices.map(office => <a key={office.id} href={office.phoneHref} className={styles.topBarPhone}>{fill(t.callOffice, { name: office.name, phone: office.phone })}</a>)}
      <span>{t.afterHours} <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></span>
    </p>
    <LanguageSwitcher current={lang} label={t.languageLabel} />
  </div>;
}
