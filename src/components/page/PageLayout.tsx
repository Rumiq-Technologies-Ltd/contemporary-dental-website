import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import layout from '@/components/layout/layout.module.css';
import styles from './page.module.css';

// Shared shell for every inner page: header, main landmark, closing footer.
export function PageLayout({ children }: { children: ReactNode }) {
  return <div className="page-shell">
    <div className={layout.top}><SiteHeader /></div>
    <main id="main-content" className={styles.main}>{children}</main>
    <SiteFooter />
  </div>;
}
