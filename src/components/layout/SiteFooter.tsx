import Link from 'next/link';
import { formatAddress, legalLinks, offices, routes, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { Icon } from '@/components/ui/Icon';
import { localizedNavigation } from './navigation';
import { SocialLinks } from './SocialLinks';
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
        {/* Entries with sub-pages open the same dropdown as the header, on hover or keyboard focus. */}
        {items.map(item => item.children
          ? <div key={item.href} className={styles.footerGroup}>
            <Link href={item.href} className={styles.footerNavLink}>{item.label}<Icon name="chevron" /></Link>
            <ul className={styles.subnav}>
              {item.children.map(child => <li key={child.href}><Link href={child.href} className={styles.subnavLink}>{child.label}</Link></li>)}
            </ul>
          </div>
          : <Link key={item.href} href={item.href} className={styles.footerNavLink}>{item.label}</Link>)}
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
      <nav aria-label={t.footer.social} className={styles.socialLinks}>
        <SocialLinks followLabel={t.footer.follow} />
      </nav>
      <nav aria-label={t.legalNavigation} className={styles.legalLinks}>
        {legalLinks.map(link => <Link key={link.href} href={link.href}>{t.legal[link.key]}</Link>)}
      </nav>
    </div>
    <p className={styles.copyright}>{fill(t.footer.copyright, { year: String(site.copyrightYear), name: site.name })}</p>
  </footer>;
}
