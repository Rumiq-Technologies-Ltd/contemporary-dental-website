import Link from 'next/link';
import { formatAddress, type Office } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './page.module.css';

/** Address, phone and hours for one office, linking to its page. */
export async function OfficeCard({ office }: { office: Office }) {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <article className={styles.office} data-reveal="" data-tilt="">
    <h3>{office.name}</h3>
    <address>{formatAddress(office)}</address>
    <p><a className={styles.link} href={office.phoneHref}>{office.phone}</a></p>
    <p>{t.hours[office.id]}</p>
    <div className={styles.actions}>
      <Link href={localePath(lang, office.path)} className="pill pill-accent">{fill(t.officeButton, { name: office.name })}</Link>
    </div>
  </article>;
}
