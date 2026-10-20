import Link from 'next/link';
import { formatAddress, legalLinks, offices, routes, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { localizedNavigation } from './navigation';
import styles from './layout.module.css';

// Closing footer shared by every page: the navigation and the main action, a giant wordmark,
// then the contact details and legal links. Facts come from content/site.ts.
export async function SiteFooter() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  const items = localizedNavigation(lang, t);
  return <footer className={styles.siteFooter}>
    <div className={styles.footerTop} data-reveal="">
      <nav aria-label={t.footerNavigation} className={styles.footerNav}>
        {items.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link href={localePath(lang, routes.requestAppointment)} className="pill pill-dark">{t.requestAppointment}</Link>
    </div>
    <p className={styles.footerWordmark} aria-hidden="true" data-wordmark="">Contemporary<br />Dental Care</p>
    <div className={styles.footerGrid} data-reveal="">
      {offices.map(office => <address key={office.id}>
        <strong>{office.name}</strong>
        {formatAddress(office)}<br />
        <a href={office.phoneHref}>{office.phone}</a>
      </address>)}
      <address>
        <strong>{t.footer.afterHours}</strong>
        <a href={site.afterHoursHref}>{site.afterHoursPhone}</a>
      </address>
      <address>
        <strong>{t.footer.email}</strong>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </address>
    </div>
    <div className={styles.footerBottom}>
      <p className={styles.siteTagline}>{t.footer.tagline}</p>
      {/* Brand names, the same in every language. */}
      <nav aria-label={t.footer.social} className={styles.socialLinks}>
        <a href={site.instagram}><Icon name="instagram" />Instagram</a>
        <a href={site.facebook}><Icon name="facebook" />Facebook</a>
      </nav>
      <nav aria-label={t.legalNavigation} className={styles.legalLinks}>
        {legalLinks.map(link => <Link key={link.href} href={link.href}>{t.legal[link.key]}</Link>)}
      </nav>
    </div>
    <p className={styles.copyright}>{fill(t.footer.copyright, { year: String(site.copyrightYear), name: site.name })}</p>
  </footer>;
}
