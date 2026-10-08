import type { ReactNode } from 'react';
import styles from './layout.module.css';

export function Screen({ id, labelledBy, children, className = '' }: { id: string; labelledBy: string; children: ReactNode; className?: string }) {
  return <section id={id} aria-labelledby={labelledBy} className={`${styles.screen} ${className}`}>{children}</section>;
}
