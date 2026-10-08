import type { ReactNode } from 'react';
import styles from './motion.module.css';

// The outer mask holds the final text geometry while the inner line rises.
export function RevealText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <span className={styles.mask}><span className={styles.line} style={{ animationDelay: `${delay}ms` }}>{children}</span></span>;
}
