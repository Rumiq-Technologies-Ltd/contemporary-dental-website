import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid} data-stagger="">{children}</div>;
}

export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return <article className={styles.card} data-reveal="" data-tilt=""><h3>{title}</h3>{children}</article>;
}

export function LinkCard({ title, href, children }: { title: string; href: string; children?: ReactNode }) {
  return <Link href={href} className={`${styles.card} ${styles.cardLink}`} data-reveal="" data-tilt="">
    <h3>{title}</h3>
    {children && <p>{children}</p>}
    <span aria-hidden="true">Learn more ↗</span>
  </Link>;
}
