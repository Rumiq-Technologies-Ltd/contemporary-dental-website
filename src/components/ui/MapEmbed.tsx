'use client';

import { useState } from 'react';
import styles from './MapEmbed.module.css';

interface MapEmbedProps {
  /** Embed address of the map. Nothing is requested from it until the visitor shows the map. */
  src: string;
  /** Accessible name of the frame. */
  title: string;
  showLabel: string;
  note: string;
}

// Click-to-load: the third-party frame is not rendered until the visitor asks for it, so no request
// goes to Google when the page loads. The placeholder and the frame share one size, so nothing shifts.
export function MapEmbed({ src, title, showLabel, note }: MapEmbedProps) {
  const [shown, setShown] = useState(false);

  if (shown) return <iframe src={src} title={title} className={styles.frame} />;

  return <div className={styles.placeholder}>
    <button type="button" className="pill pill-outline" onClick={() => setShown(true)}>{showLabel}</button>
    <p className={styles.note}>{note}</p>
  </div>;
}
