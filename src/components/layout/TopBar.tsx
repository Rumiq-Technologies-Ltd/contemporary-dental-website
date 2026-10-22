import { offices, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinks } from './SocialLinks';
import styles from './layout.module.css';

// Thin strip above the header on every page: each office phone, the after-hours line, email, the social
// links and the language choice.
export async function TopBar() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <div className={styles.topBar}>
    <p className={styles.topBarContacts}>
      {/* Like the after-hours line, only the number is a link; office names are the same in every language. */}
      {offices.map(office => <span key={office.id}>{office.name}: <a href={office.phoneHref}>{office.phone}</a></span>)}
      <span>{t.afterHours} <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></span>
      <span>{t.footer.email}: <a href={`mailto:${site.email}`}>{site.email}</a></span>
      <span className={styles.topBarSocial}><SocialLinks /></span>
    </p>
    <LanguageSwitcher current={lang} label={t.languageLabel} />
  </div>;
}
