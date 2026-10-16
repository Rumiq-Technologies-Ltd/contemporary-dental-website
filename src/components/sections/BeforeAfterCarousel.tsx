'use client';

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent as ReactFocusEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { fill } from '@/i18n/fill';
import { BeforeAfterCard, prefersReducedMotion, type CarouselCase, type CardLabels } from './BeforeAfterCard';
import styles from './beforeAfter.module.css';

const AUTOPLAY_MS = 6000;

export interface CarouselLabels extends CardLabels {
  carousel: string;
  previous: string;
  next: string;
  pause: string;
  play: string;
  /** Dot label with {n} and {total} placeholders. */
  page: string;
}

interface Layout {
  /** Distance between two neighbouring cards, in pixels. */
  step: number;
  /** The furthest the track can scroll, in pixels. */
  max: number;
}

// The track scrolls natively, so swiping, the arrow keys and screen readers all work without
// JavaScript. The arrows, dots and autoplay only move the same scroll position.
function goTo(track: HTMLElement, layout: Layout, position: number, count: number, behavior: ScrollBehavior) {
  const left = position >= count - 1 ? layout.max : position * layout.step;
  track.scrollTo({ left, behavior });
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  const path = direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6';
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={path} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

// Patient results: a row of before-and-after cards. It moves every six seconds until the visitor
// pauses it, hovers over it or focuses inside it. Reduced-motion visitors get no autoplay.
export function BeforeAfterCarousel({ cases, labels }: { cases: readonly CarouselCase[]; labels: CarouselLabels }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const layout = useRef<Layout>({ step: 0, max: 0 });
  const holding = useRef(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [count, setCount] = useState(1);

  // Controls appear only once this script runs, so no button is shown that cannot work.
  useEffect(() => {
    if (root.current) root.current.dataset.enhanced = '';
  }, []);

  // The scroll positions depend on the card width. Cards are watched as well as the track, because
  // the track keeps its size when the card sizes arrive with the stylesheet.
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const measure = () => {
      const cards = element.querySelectorAll<HTMLElement>('[data-card]');
      const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
      const max = Math.max(0, element.scrollWidth - element.clientWidth);
      layout.current = { step, max };
      setCount(step > 0 && max > 0 ? Math.round(max / step) + 1 : 1);
    };
    // Measure at once, then again on every resize. Resize observers can wait for a frame that a
    // hidden tab never paints, so the first measurement does not depend on them.
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.querySelectorAll('[data-card]').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!playing || count < 2 || !element) return;
    const id = window.setInterval(() => {
      if (document.hidden || holding.current || prefersReducedMotion()) return;
      const current = Math.round(element.scrollLeft / Math.max(layout.current.step, 1));
      const next = (current + 1) % count;
      setActive(next);
      goTo(element, layout.current, next, count, 'smooth');
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, count]);

  function onScroll() {
    const element = track.current;
    const { step } = layout.current;
    if (!element || step <= 0) return;
    setActive(Math.min(count - 1, Math.round(element.scrollLeft / step)));
  }

  function show(position: number) {
    const element = track.current;
    if (!element) return;
    setActive(position);
    goTo(element, layout.current, position, count, prefersReducedMotion() ? 'auto' : 'smooth');
  }

  // Mouse hover and focus pause autoplay. A touch holds it while the finger is down.
  function onPointerEnter(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse') holding.current = true;
  }
  function onPointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse') holding.current = false;
  }
  function onTouchDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') holding.current = true;
  }
  function onTouchUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') holding.current = false;
  }
  function onBlur(event: ReactFocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) holding.current = false;
  }

  const dots = Array.from({ length: count }, (_, index) => index);

  return <div ref={root} className={styles.root} style={{ '--cycle': `${AUTOPLAY_MS}ms` } as CSSProperties}
    onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}
    onPointerDown={onTouchDown} onPointerUp={onTouchUp} onPointerCancel={onTouchUp}
    onFocus={() => { holding.current = true; }} onBlur={onBlur}>
    <ul ref={track} className={styles.track} aria-label={labels.carousel} tabIndex={0} onScroll={onScroll}>
      {cases.map(item => <BeforeAfterCard key={item.id} item={item} labels={labels} />)}
    </ul>
    <div className={styles.controls} data-playing={playing ? 'true' : 'false'}>
      <div className={styles.nav}>
        <button type="button" className={styles.arrow} aria-label={labels.previous}
          onClick={() => show((active - 1 + count) % count)}><Chevron direction="left" /></button>
        <div className={styles.dots}>
          {dots.map(index => <button key={index} type="button" className={styles.dot}
            aria-label={fill(labels.page, { n: String(index + 1), total: String(count) })}
            aria-current={index === active ? 'true' : undefined} onClick={() => show(index)} />)}
        </div>
        <button type="button" className={styles.arrow} aria-label={labels.next}
          onClick={() => show((active + 1) % count)}><Chevron direction="right" /></button>
      </div>
      <button type="button" className={styles.toggle} onClick={() => setPlaying(value => !value)}>
        {playing ? labels.pause : labels.play}
      </button>
    </div>
  </div>;
}
