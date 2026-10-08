'use client';

import { useState, type ReactNode } from 'react';
import styles from './services.module.css';

// Motion stays in CSS; React remembers pause and stable keyboard navigation.
export function ServiceGallery({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  return <div className={styles.galleryFrame} data-paused={paused} data-manual={manual}>
    <div className={styles.gallery} role="region" aria-label="Dental services gallery" tabIndex={0}
      onFocusCapture={event => {
        // Keep the original set stable after keyboard focus, even if the user
        // switches to clicking. Otherwise the reverse track jumps on mouse-down.
        if (!event.target.closest('[data-duplicate="true"]') &&
          (event.target === event.currentTarget || event.target.matches(':focus-visible'))) setManual(true);
      }}>
      {children}
    </div>
    <button type="button" className={styles.motionControl} aria-pressed={paused}
      onClick={() => { setManual(false); setPaused(value => !value); }}>
      {paused ? 'Resume scrolling' : 'Pause scrolling'}
    </button>
  </div>;
}
