import type { ReactNode } from 'react';
import styles from './page.module.css';

export function Section({ id, title, children, wide = false }: { id: string; title: string; children: ReactNode; wide?: boolean }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`${styles.section} ${wide ? styles.wide : ''}`}>
    <h2 id={`${id}-title`}>{title}</h2>
    {children}
  </section>;
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className={styles.prose}>{children}</div>;
}

export function BulletList({ children }: { children: ReactNode }) {
  return <ul className={styles.list}>{children}</ul>;
}

export function Notice({ children }: { children: ReactNode }) {
  return <p className={styles.notice}>{children}</p>;
}

/** Emergency safety wording. Dr. Khan must approve it before publication. */
export function SafetyNotice({ children }: { children: ReactNode }) {
  return <aside className={styles.safety} aria-label="When to call 911"><p>{children}</p></aside>;
}
