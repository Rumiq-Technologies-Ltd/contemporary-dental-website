'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './problems.module.css';

export interface Problem {
  id: string;
  tab: string;
  headline: string;
  big: string;
  bigText?: string;
  text: string;
  href: string;
  linkLabel: string;
  photo: StaticImageData;
}

interface ProblemTabsProps {
  problems: readonly Problem[];
  /** Accessible name of the tab list. */
  label: string;
  /** Text and (already localised) address of the appointment button in every panel. */
  requestLabel: string;
  requestHref: string;
}

// ARIA tabs: arrow keys, Home and End move between tabs; only the active tab is in the tab order.
// Every string and address arrives as a prop from the server parent, already translated.
export function ProblemTabs({ problems, label, requestLabel, requestHref }: ProblemTabsProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const changed = useRef(false);

  // When a new problem is chosen, its photo opens as a circle and its statement rises into place.
  // Skipped on first render and under reduced motion.
  useEffect(() => {
    if (!changed.current) return;
    const panel = panels.current[active];
    const media = panel?.querySelector<HTMLElement>('[data-media]');
    if (!panel || !media || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let disposed = false;
    void import('@/components/motion/gsap').then(({ gsap }) => {
      if (disposed) return;
      gsap.fromTo(media, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)', duration: 1.1, ease: 'expo.out', clearProps: 'clipPath' });
      gsap.fromTo(panel.querySelectorAll('[data-fact]'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity' });
    });
    return () => { disposed = true; };
  }, [active]);

  function select(index: number) {
    changed.current = true;
    setActive(index);
    tabs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = problems.length - 1;
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
  }

  return <div className={styles.tabsRoot} data-reveal="">
    <div role="tablist" aria-label={label} className={styles.tabs}>
      {problems.map((problem, index) => <button key={problem.id} type="button" role="tab"
        ref={element => { tabs.current[index] = element; }}
        id={`problem-tab-${problem.id}`} aria-controls={`problem-panel-${problem.id}`}
        aria-selected={index === active} tabIndex={index === active ? 0 : -1}
        className={styles.tab} onClick={() => { changed.current = true; setActive(index); }} onKeyDown={event => onKeyDown(event, index)}>
        {problem.tab}
      </button>)}
    </div>
    {problems.map((problem, index) => <div key={problem.id} role="tabpanel" id={`problem-panel-${problem.id}`}
      aria-labelledby={`problem-tab-${problem.id}`} hidden={index !== active} className={styles.panel} data-tilt="2" ref={element => { panels.current[index] = element; }}>
      <div className={styles.media} data-media="">
        <Image src={problem.photo} alt="" fill sizes="(max-width: 899px) 100vw, 50vw" placeholder="blur" data-scroll-zoom="" />
        <h3 className={styles.mediaTitle}>{problem.headline}</h3>
      </div>
      <div className={styles.fact}>
        <p className={styles.big} data-fact="">{problem.big}</p>
        {problem.bigText && <p className={styles.bigText} data-fact="">{problem.bigText}</p>}
        <p data-fact="">{problem.text}</p>
        <div className={styles.actions} data-fact="">
          <Link href={problem.href} className="pill pill-dark">{problem.linkLabel}</Link>
          <Link href={requestHref} className="pill pill-outline">{requestLabel}</Link>
        </div>
      </div>
    </div>)}
  </div>;
}
