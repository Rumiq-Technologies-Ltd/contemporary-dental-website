import Link from 'next/link';
import { formatAddress, legalLinks, navigation, offices, routes, site } from '@/content/site';
import styles from './layout.module.css';

// Closing footer shared by every page: the navigation and the main action, a giant wordmark,
// then the contact details and legal links. Facts come from content/site.ts.
export function SiteFooter() {
  return <footer className={styles.siteFooter}>
    <div className={styles.footerTop} data-reveal="">
      <nav aria-label="Footer" className={styles.footerNav}>
        {navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link href={routes.requestAppointment} className="pill pill-dark">Request an appointment</Link>
    </div>
    <p className={styles.footerWordmark} aria-hidden="true" data-wordmark="">Contemporary<br />Dental Care</p>
    <div className={styles.footerGrid} data-reveal="">
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
    <div className={styles.footerBottom}>
      <p className={styles.siteTagline}>{site.tagline}</p>
      <nav aria-label="Legal" className={styles.legalLinks}>
        {legalLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
    </div>
    <p className={styles.legalName}>{site.legalName}</p>
  </footer>;
}
