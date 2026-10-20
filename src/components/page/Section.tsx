import type { ReactNode } from 'react';
import styles from './page.module.css';

/** `hideTitle` keeps the heading for screen readers only, for a page whose h1 already names the section. */
export function Section({ id, title, children, wide = false, hideTitle = false }: { id: string; title: string; children: ReactNode; wide?: boolean; hideTitle?: boolean }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`${styles.section} ${wide ? styles.wide : ''}`} data-reveal="">
    {hideTitle ? <h2 id={`${id}-title`} className="sr-only">{title}</h2> : <h2 id={`${id}-title`} data-reveal="mask">{title}</h2>}
    {children}
  </section>;
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className={styles.prose}>{children}</div>;
}

export function BulletList({ children }: { children: ReactNode }) {
  return <ul className={styles.list}>{children}</ul>;
}

export function Notice({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  // wide drops the reading-width cap so the box lines up with full-width content beside it.
  return <p className={wide ? `${styles.notice} ${styles.noticeWide}` : styles.notice}>{children}</p>;
}

/** Emergency safety wording. Dr. Khan must approve it before publication. */
export function SafetyNotice({ children, label }: { children: ReactNode; label: string }) {
  return <aside className={styles.safety} aria-label={label}><p>{children}</p></aside>;
}
