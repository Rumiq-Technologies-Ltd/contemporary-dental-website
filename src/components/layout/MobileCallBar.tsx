import { primaryOffice } from '@/content/site';
import styles from './layout.module.css';

// Sticky call button, shown on phones only (see layout.module.css).
export function MobileCallBar() {
  return <a href={primaryOffice.phoneHref} className={`pill pill-accent pill-large ${styles.callBar}`} aria-label={`Call ${primaryOffice.name}: ${primaryOffice.phone}`}>Call {primaryOffice.phone}</a>;
}
