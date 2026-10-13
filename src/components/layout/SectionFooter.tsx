import { primaryOffice, site } from '@/content/site';
import styles from './layout.module.css';

// Compact footer inside each homepage screen. The full footer closes the page.
export function SectionFooter({ narrow = false }: { narrow?: boolean }) {
  return <footer className={`${styles.footer} ${narrow ? styles.narrow : ''}`}>
    <p className={styles.tagline}><span aria-hidden="true" />{site.tagline}</p>
    <div className={styles.award}>
      <a href={primaryOffice.phoneHref} className={styles.footerLink}>Call {primaryOffice.name}: {primaryOffice.phone}</a>
      <p>After hours: {site.afterHoursPhone}</p>
    </div>
  </footer>;
}
