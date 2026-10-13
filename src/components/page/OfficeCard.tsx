import Link from 'next/link';
import { formatAddress, type Office } from '@/content/site';
import styles from './page.module.css';

/** Address, phone and hours for one office, linking to its page. */
export function OfficeCard({ office }: { office: Office }) {
  return <article className={styles.office}>
    <h3>{office.name}</h3>
    <address>{formatAddress(office)}</address>
    <p><a className={styles.link} href={office.phoneHref}>{office.phone}</a></p>
    <p>{office.hours}</p>
    <div className={styles.actions}>
      <Link href={office.path} className="pill pill-accent">{office.name} office</Link>
    </div>
  </article>;
}
