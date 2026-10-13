import Link from 'next/link';
import { primaryOffice, routes, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { SiteMenu } from './SiteMenu';
import styles from './layout.module.css';

export function SiteHeader() {
  return <header className={styles.header}>
    <SiteMenu />
    <Link href={routes.home} className={styles.logo} aria-label={`${site.name} home`}>
      <span className={styles.logoMark}><Icon name="logo" /></span>
      <span>CONTEMPORARY DENTAL CARE</span>
    </Link>
    <div className={styles.auth}>
      <a href={primaryOffice.phoneHref} className={`pill pill-outline ${styles.phone}`}>{primaryOffice.name} {primaryOffice.phone}</a>
      <Link href={routes.requestAppointment} className="pill pill-accent">Request an appointment</Link>
    </div>
  </header>;
}
