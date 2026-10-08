'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './layout.module.css';

export function Screen({ id, labelledBy, children, className = '' }: { id: string; labelledBy: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const syncPreference = () => {
      // Server-rendered content stays visible without JavaScript. Only enhanced
      // sections opt into reveals; changing the preference restores it instantly.
      section.dataset.motion = preference.matches ? 'reduced' : 'ready';
    };
    const syncActivity = () => { section.dataset.active = String(inView && !document.hidden); };
    syncPreference();
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncActivity();
      if (inView) section.dataset.entered = 'true';
    }, { rootMargin: '0px 0px -8% 0px' });
    observer.observe(section);
    // Keyboard navigation must never land on unrevealed content.
    const revealOnFocus = () => { section.dataset.entered = 'true'; };
    section.addEventListener('focusin', revealOnFocus);
    preference.addEventListener('change', syncPreference);
    document.addEventListener('visibilitychange', syncActivity);
    return () => {
      observer.disconnect();
      section.removeEventListener('focusin', revealOnFocus);
      preference.removeEventListener('change', syncPreference);
      document.removeEventListener('visibilitychange', syncActivity);
    };
  }, []);
  return <section ref={ref} id={id} aria-labelledby={labelledBy} data-entered="false" data-active="false" className={`${styles.screen} ${className}`}>{children}</section>;
}
