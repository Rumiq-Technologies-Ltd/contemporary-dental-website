'use client';

import { useState, type ReactNode } from 'react';
import styles from './services.module.css';

// Motion stays in CSS; React only manages the user's persistent pause choice.
export function ServiceGallery({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return <div className={styles.galleryFrame} data-paused={paused}>
    <div className={styles.gallery} role="region" aria-label="Dental services gallery" tabIndex={0}>
      {children}
    </div>
    <button type="button" className={styles.motionControl} aria-pressed={paused}
      onClick={() => setPaused(value => !value)}>
      {paused ? 'Resume scrolling' : 'Pause scrolling'}
    </button>
  </div>;
}
