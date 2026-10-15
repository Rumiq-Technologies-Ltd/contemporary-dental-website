import { primaryOffice, site } from '@/content/site';
import styles from './layout.module.css';

// Thin strip above the header on every page: languages, the office phone and the after-hours line.
export function TopBar() {
  return <div className={styles.topBar}>
    <p className={styles.topBarText}>New patients welcome. Same-day emergency appointments are often available.</p>
    <p className={styles.topBarContacts}>
      <a href={primaryOffice.phoneHref} className={styles.topBarPhone}>Call {primaryOffice.name}: {primaryOffice.phone}</a>
      <span>After hours: <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></span>
    </p>
  </div>;
}
