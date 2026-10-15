'use client';

import { useEffect, useRef, useState } from 'react';
import type gsap from 'gsap';
import { Icon } from '@/components/ui/Icon';
import styles from './steps.module.css';

const SECONDS_PER_LOOP = 40;
const MAX_SCROLL_BOOST = 4;

// A strip of short practice facts that drifts sideways with GSAP. Scrolling speeds it up and it
// eases back to its normal pace. It pauses on hover and on the button, and stays still when
// reduced motion is on. The second copy only closes the loop, so it is hidden from assistive technology.
export function Highlights({ items }: { items: readonly string[] }) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let disposed = false;
    let cleanup = () => {};
    void import('@/components/motion/gsap').then(({ gsap, ScrollTrigger }) => {
      if (disposed) return;
      const tween = gsap.to(track, { xPercent: -50, duration: SECONDS_PER_LOOP, ease: 'none', repeat: -1 });
      tween.paused(pausedRef.current);
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

  const setPausedState = (value: boolean) => {
    pausedRef.current = value;
    setPaused(value);
    tweenRef.current?.paused(value);
  };

  return <div className={styles.strip} data-paused={paused}
    onPointerEnter={() => { if (!pausedRef.current) tweenRef.current?.pause(); }}
    onPointerLeave={() => { if (!pausedRef.current) tweenRef.current?.play(); }}
    onFocus={() => tweenRef.current?.pause()}
    onBlur={() => { if (!pausedRef.current) tweenRef.current?.play(); }}>
    <div className={styles.track} ref={trackRef} data-loop="highlights">
      {[false, true].map(copy => <ul key={String(copy)} className={styles.group} aria-label={copy ? undefined : 'Practice highlights'} aria-hidden={copy || undefined}>
        {items.map(item => <li key={item}><Icon name="tooth" />{item}</li>)}
      </ul>)}
    </div>
    <button type="button" className={styles.pause} aria-pressed={paused} onClick={() => setPausedState(!paused)}>
      {paused ? 'Play highlights' : 'Pause highlights'}
    </button>
  </div>;
}
