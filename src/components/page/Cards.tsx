import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return <article className={styles.card}><h3>{title}</h3>{children}</article>;
}

export function LinkCard({ title, href, children }: { title: string; href: string; children?: ReactNode }) {
  return <Link href={href} className={`${styles.card} ${styles.cardLink}`}>
    <h3>{title}</h3>
    {children && <p>{children}</p>}
    <span aria-hidden="true">Learn more ↗</span>
  </Link>;
}
