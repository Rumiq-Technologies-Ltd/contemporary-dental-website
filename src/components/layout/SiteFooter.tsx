import Link from 'next/link';
import { formatAddress, legalLinks, offices, site } from '@/content/site';
import styles from './layout.module.css';

// Closing footer shared by every page. Facts come from content/site.ts. The tagline
// leads, and the legal name sits last in small type.
export function SiteFooter() {
  return <footer className={styles.siteFooter}>
    <div className={styles.footerGrid}>
      {offices.map(office => <address key={office.id}>
        <strong>{office.name}</strong>
        {formatAddress(office)}<br />
        <a href={office.phoneHref}>{office.phone}</a>
      </address>)}
      <address>
        <strong>After hours</strong>
        <a href={site.afterHoursHref}>{site.afterHoursPhone}</a>
      </address>
      <address>
        <strong>Email</strong>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </address>
    </div>
    <nav aria-label="Legal" className={styles.legalLinks}>
      {legalLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
    </nav>
    <p className={styles.siteTagline}><span aria-hidden="true" />{site.tagline}</p>
    <p className={styles.legalName}>{site.legalName}</p>
  </footer>;
}
