import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import type gsap from 'gsap';
import styles from './beforeAfter.module.css';

export interface CarouselImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CarouselCase {
  id: string;
  /** Initials, or "Illustration" for a design example. */
  patient: string;
  /** Treatment and office, for example "Root canal · Orlando". */
  detail: string;
  before: CarouselImage;
  after: CarouselImage;
  illustration: boolean;
}

export interface CardLabels {
  before: string;
  after: string;
  compare: string;
  illustration: string;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** The divider position, in percent: 0 shows only the after photo, 100 only the before photo. */
function writeSplit(compare: HTMLElement | null, range: HTMLInputElement | null, value: number) {
  compare?.style.setProperty('--split', String(value));
  if (range) range.value = String(value);
}

// One result: the before photo sits over the after photo and a divider decides how much of each
// shows. When the card is at least 60% in view, the divider wipes from all-before to all-after and
// settles in the middle. Dragging, the slider and the arrow keys all move the same divider.
export function BeforeAfterCard({ item, labels }: { item: CarouselCase; labels: CardLabels }) {
  const card = useRef<HTMLLIElement>(null);
  const compare = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const wipe = useRef<gsap.core.Timeline | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const element = card.current;
    if (!element || !('IntersectionObserver' in window)) return;
    let disposed = false;

    const stop = () => {
      wipe.current?.kill();
      wipe.current = null;
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.6 || prefersReducedMotion()) return;
      if (wipe.current?.isActive()) return;
      void import('@/components/motion/gsap').then(({ gsap }) => {
        if (disposed) return;
        const state = { split: 100 };
        const apply = () => writeSplit(compare.current, range.current, state.split);
        stop();
        apply();
        wipe.current = gsap.timeline({ onComplete: () => { wipe.current = null; } })
          .to(state, { split: 0, duration: 1.3, ease: 'expo.inOut', onUpdate: apply })
          .to(state, { split: 50, duration: 0.9, ease: 'expo.out', onUpdate: apply });
        if (caption.current) {
          gsap.fromTo(caption.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.6, clearProps: 'opacity,transform' });
        }
      });
    }, { threshold: [0, 0.6] });
    observer.observe(element);

    return () => {
      disposed = true;
      observer.disconnect();
      stop();
    };
  }, []);

  function dragTo(event: ReactPointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const value = ((event.clientX - box.left) / box.width) * 100;
    writeSplit(compare.current, range.current, Math.round(Math.min(100, Math.max(0, value))));
  }

  function stopWipeForUser() {
    wipe.current?.kill();
    wipe.current = null;
  }

  return <li ref={card} className={styles.card} data-card="">
    <div ref={compare} className={styles.compare}
      onPointerDown={event => {
        event.currentTarget.setPointerCapture(event.pointerId);
        dragging.current = true;
        stopWipeForUser();
        dragTo(event);
      }}
      onPointerMove={event => { if (dragging.current) dragTo(event); }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}>
      <Image src={item.after.src} alt={item.after.alt} width={item.after.width} height={item.after.height}
        sizes="(min-width: 900px) 30vw, 84vw" className={styles.after} draggable={false} />
      <Image src={item.before.src} alt={item.before.alt} width={item.before.width} height={item.before.height}
        sizes="(min-width: 900px) 30vw, 84vw" className={styles.before} draggable={false} />
      <span className={styles.divider} aria-hidden="true" />
      <span className={styles.handle} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span className={`${styles.tag} ${styles.tagBefore}`} aria-hidden="true">{labels.before}</span>
      <span className={`${styles.tag} ${styles.tagAfter}`} aria-hidden="true">{labels.after}</span>
      {item.illustration && <span className={styles.badge}>{labels.illustration}</span>}
    </div>
    <div ref={caption} className={styles.caption}>
      <h3 className={styles.name}>{item.patient}</h3>
      <p className={styles.detail}>{item.detail}</p>
      <input ref={range} type="range" min={0} max={100} step={1} defaultValue={50}
        aria-label={labels.compare} className={styles.range}
        onInput={event => {
          stopWipeForUser();
          writeSplit(compare.current, range.current, Number(event.currentTarget.value));
        }} />
    </div>
  </li>;
}
