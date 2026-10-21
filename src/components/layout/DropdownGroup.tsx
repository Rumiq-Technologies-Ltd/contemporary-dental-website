'use client';

import { useState, type MouseEvent, type ReactNode } from 'react';
import styles from './layout.module.css';

// A nav entry with a dropdown of sub-pages (header and footer). The dropdown opens on hover and on
// keyboard focus in CSS; picking a sub-page closes it, even though the pointer and focus are still on
// it, until the pointer leaves or focus comes back to the entry.
export function DropdownGroup({ className, children }: { className: string; children: ReactNode }) {
  const [closed, setClosed] = useState(false);

  function closeOnSelect(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof Element) || !event.target.closest('ul a')) return;
    setClosed(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }

  return <div className={closed ? `${className} ${styles.dropdownClosed}` : className}
    onClick={closeOnSelect} onMouseLeave={() => setClosed(false)} onFocus={() => setClosed(false)}>
    {children}
  </div>;
}
