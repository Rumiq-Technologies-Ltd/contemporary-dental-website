import Link from 'next/link';
import { formatAddress, legalLinks, offices, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { SocialLinks } from './SocialLinks';
import styles from './layout.module.css';

// Closing footer shared by every page: a giant wordmark, then the contact details and legal links.
// It has no menu: the header's menu stays on screen. Facts come from content/site.ts.
export async function SiteFooter() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <footer className={styles.siteFooter}>
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
