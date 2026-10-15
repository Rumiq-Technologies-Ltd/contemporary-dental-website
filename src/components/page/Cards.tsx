import type { ReactNode } from 'react';
import Link from 'next/link';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import styles from './page.module.css';

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid} data-stagger="">{children}</div>;
}

export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return <article className={styles.card} data-reveal="" data-tilt=""><h3>{title}</h3>{children}</article>;
}

/** `href` must already be localised (use localePath). */
export async function LinkCard({ title, href, children }: { title: string; href: string; children?: ReactNode }) {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <Link href={href} className={`${styles.card} ${styles.cardLink}`} data-reveal="" data-tilt="">
    <h3>{title}</h3>
    {children && <p>{children}</p>}
    <span aria-hidden="true">{t.learnMore}</span>
  </Link>;
}
