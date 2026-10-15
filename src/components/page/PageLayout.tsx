import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import styles from './page.module.css';

// Shared shell for every inner page: the main landmark and the closing footer.
// The sticky header comes from the root layout.
export function PageLayout({ children }: { children: ReactNode }) {
  return <div className="page-shell">
    <main id="main-content" className={styles.main}>{children}</main>
    <SiteFooter />
  </div>;
}
