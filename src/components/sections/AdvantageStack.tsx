'use client';

import { useState, type ReactNode } from 'react';
import styles from './advantages.module.css';

// CSS owns the card choreography; this island only remembers the pause choice.
export function AdvantageStack({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return <div className={styles.stackFrame} data-paused={paused}>
    <div className={styles.stack}>{children}</div>
    <button type="button" className={styles.motionControl} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      {paused ? 'Resume cards' : 'Pause cards'}
    </button>
  </div>;
}
