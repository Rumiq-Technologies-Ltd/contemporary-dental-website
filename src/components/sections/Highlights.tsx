'use client';

import { useEffect, useRef } from 'react';
import type gsap from 'gsap';
import { Icon } from '@/components/ui/Icon';
import styles from './steps.module.css';

const SECONDS_PER_LOOP = 40;
const MAX_SCROLL_BOOST = 4;

// A strip of short practice facts that drifts sideways with GSAP. Scrolling speeds it up and it
// eases back to its normal pace. It pauses while the pointer is over it and while it has keyboard
// focus, so keyboard users can stop it by tabbing to it. It stays still when reduced motion is on.
// The second copy only closes the loop, so it is hidden from assistive technology.
// The label arrives as a prop from the server parent, already translated.
interface HighlightsProps {
  items: readonly string[];
  /** Accessible name of the strip. */
  label: string;
}

export function Highlights({ items, label }: HighlightsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);

  // The track runs only when neither the pointer nor keyboard focus is on the strip.
  const syncPlayback = () => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (hoveredRef.current || focusedRef.current) tween.pause();
    else tween.play();
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let disposed = false;
    let cleanup = () => {};
    void import('@/components/motion/gsap').then(({ gsap, ScrollTrigger }) => {
      if (disposed) return;
      const tween = gsap.to(track, { xPercent: -50, duration: SECONDS_PER_LOOP, ease: 'none', repeat: -1 });
      tween.paused(hoveredRef.current || focusedRef.current);
      tweenRef.current = tween;

      // Scroll speed sets a target pace; the displayed pace eases toward it every frame.
      let target = 1;
      let pace = 1;
      const trigger = ScrollTrigger.create({
        onUpdate: self => { target = 1 + Math.min(Math.abs(self.getVelocity()) / 700, MAX_SCROLL_BOOST); },
      });
      const tick = () => {
        target += (1 - target) * 0.05;
        pace += (target - pace) * 0.12;
        tween.timeScale(pace);
      };
      gsap.ticker.add(tick);
      cleanup = () => {
        gsap.ticker.remove(tick);
        trigger.kill();
        tween.kill();
        tweenRef.current = null;
      };
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div className={styles.strip} role="region" aria-label={label} tabIndex={0}
    onPointerEnter={() => { hoveredRef.current = true; syncPlayback(); }}
    onPointerLeave={() => { hoveredRef.current = false; syncPlayback(); }}
    onFocus={() => { focusedRef.current = true; syncPlayback(); }}
    onBlur={() => { focusedRef.current = false; syncPlayback(); }}>
    <div className={styles.track} ref={trackRef} data-loop="highlights">
      {[false, true].map(copy => <ul key={String(copy)} className={styles.group} aria-label={copy ? undefined : label} aria-hidden={copy || undefined}>
        {items.map(item => <li key={item}><Icon name="tooth" />{item}</li>)}
      </ul>)}
    </div>
  </div>;
}
