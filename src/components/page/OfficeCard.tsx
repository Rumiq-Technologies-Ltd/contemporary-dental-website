import { formatAddress, type Office } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import styles from './page.module.css';

/** Address, phone and hours for one office. */
export async function OfficeCard({ office }: { office: Office }) {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <article className={styles.office} data-reveal="" data-tilt="">
    <h3>{office.name}</h3>
    <address>{formatAddress(office)}</address>
    <p><a className={styles.link} href={office.phoneHref}>{office.phone}</a></p>
    <p>{t.hours[office.id]}</p>
  </article>;
}
