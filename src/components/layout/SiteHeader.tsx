import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/content/assets';
import { routes, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { SiteNav } from './SiteNav';
import { localizedNavigation } from './navigation';
import styles from './layout.module.css';

// Sticky header for every page, rendered once by the root layout. The logo on the left and every
// section of the site in one navigation bar. The request button lives in the top bar above it.
export async function SiteHeader() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  const items = localizedNavigation(lang, t.nav);
  return <header className={styles.header}>
    <Link href={localePath(lang, routes.home)} className={styles.logo} aria-label={fill(t.homeLabel, { name: site.name })}>
      <Image src={brand.logo} alt="" className={styles.logoImage} priority />
    </Link>
    <SiteNav items={items} label={t.primaryNavigation} />
  </header>;
}
