import Link from 'next/link';
import { routes, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { SiteMenu } from './SiteMenu';
import { SiteNav } from './SiteNav';
import styles from './layout.module.css';

// Sticky header for every page, rendered once by the root layout. The wordmark on the left,
// the navigation in the middle and one cyan request button on the right. The CSS decides which
// parts show at each breakpoint: the menu on small screens, the navigation bar on large ones.
export function SiteHeader() {
  return <header className={styles.header}>
    <Link href={routes.home} className={styles.logo} aria-label={`${site.name} home`}>
      <span className={styles.logoMark}><Icon name="tooth" /></span>
      <span className={styles.wordmark}>Contemporary{' '}<br />Dental Care</span>
    </Link>
    <Link href={routes.requestAppointment} className={`pill pill-accent ${styles.request}`}>Request an appointment</Link>
    <SiteMenu />
    <SiteNav />
  </header>;
}
