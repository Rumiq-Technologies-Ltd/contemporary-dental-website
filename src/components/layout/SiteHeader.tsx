import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/content/assets';
import { routes, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { SiteMenu } from './SiteMenu';
import { SiteNav } from './SiteNav';
import { localizedNavigation } from './navigation';
import styles from './layout.module.css';

// Sticky header for every page, rendered once by the root layout. The logo on the left,
// the navigation in the middle and one cyan request button on the right. The CSS decides which
// parts show at each breakpoint: the menu on small screens, the navigation bar on large ones.
export async function SiteHeader() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  const items = localizedNavigation(lang, t.nav);
  const requestHref = localePath(lang, routes.requestAppointment);
  return <header className={styles.header}>
    <Link href={localePath(lang, routes.home)} className={styles.logo} aria-label={fill(t.homeLabel, { name: site.name })}>
      <Image src={brand.logoIcon} alt="" className={styles.logoIcon} priority />
      <Image src={brand.logoWordmark} alt="" className={styles.logoWordmark} priority />
    </Link>
    <Link href={requestHref} className={`pill pill-accent ${styles.request}`}>{t.requestAppointment}</Link>
    <SiteMenu items={items} requestHref={requestHref} t={t} />
    <SiteNav items={items} label={t.primaryNavigation} />
  </header>;
}
