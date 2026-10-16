'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { attachMagnetic } from './magnetic';
import { createReveal } from './reveal';
import { scrollEffects } from './scrollEffects';

const HIDDEN = '[data-reveal]:not([data-in])';
const MASK_HIDDEN = '[data-reveal="mask"]:not([data-in])';
const DEFAULT_TILT_DEGREES = 6;

// A mask heading is clipped to nothing until it reveals, and a clipped element has no visible area,
// so the observer never reports it. Its container is watched instead, and the heading reveals with it.
function observedTarget(element: HTMLElement): Element {
  return element.dataset.reveal === 'mask' && element.parentElement ? element.parentElement : element;
}

// What reveals when an observed target enters the viewport: the target itself when it is hidden,
// and any mask headings inside it.
function revealsFor(target: HTMLElement): HTMLElement[] {
  const masks = Array.from(target.querySelectorAll<HTMLElement>(MASK_HIDDEN));
  return target.matches(HIDDEN) ? [target, ...masks] : masks;
}

function revealEverything() {
  document.querySelectorAll(HIDDEN).forEach(element => element.setAttribute('data-in', ''));
}

// The client controller for the whole site; it renders nothing. Content below the fold is
// revealed and animated by GSAP (loaded on demand). With reduced motion, or if the library
// cannot load, nothing is hidden, so the page simply shows.
export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('ready');
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    let disposed = false;
    let cleanup = () => {};
    import('./gsap')
      .then(({ gsap, ScrollTrigger }) => {
        if (disposed) return;
        document.documentElement.classList.add('gsap');
        const reveal = createReveal(gsap);

        // One observer reveals content as it enters the viewport.
        const observer = new IntersectionObserver(entries => {
          const visible: HTMLElement[] = [];
          for (const entry of entries) {
            if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
              observer.unobserve(entry.target);
              visible.push(...revealsFor(entry.target as HTMLElement));
            }
          }
          if (visible.length) reveal(visible);
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        document.querySelectorAll<HTMLElement>(HIDDEN).forEach(element => observer.observe(observedTarget(element)));

        // An observer never reports content that a jump (anchor link, Home key) skipped over,
        // so anything already above the viewport is revealed on the next scroll frame.
        let queued = false;
        const sweep = () => {
          queued = false;
          document.querySelectorAll<HTMLElement>(HIDDEN).forEach(element => {
            if (element.getBoundingClientRect().bottom < 0) {
              observer.unobserve(element);
              reveal([element]);
            }
          });
        };
        const onScroll = () => {
          if (!queued) {
            queued = true;
            requestAnimationFrame(sweep);
          }
        };
        // Keyboard focus must never land on hidden content.
        const onFocus = (event: FocusEvent) => {
          const target = event.target instanceof Element ? event.target : null;
          const hidden = target?.closest<HTMLElement>(HIDDEN);
          if (hidden) {
            observer.unobserve(hidden);
            reveal([hidden]);
          }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('focusin', onFocus);

        // Scroll-linked effects are created in a context, so they are reverted when the page changes.
        const context = gsap.context(() => scrollEffects(gsap));
        const detachMagnetic = attachMagnetic(gsap);
        // Images and fonts change the page height after first paint; recalculate once they settle.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', refresh);
        void document.fonts?.ready.then(refresh);

        cleanup = () => {
          observer.disconnect();
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('load', refresh);
          document.removeEventListener('focusin', onFocus);
          detachMagnetic();
          context.revert();
        };
      })
      .catch(revealEverything);

    return () => {
      disposed = true;
      cleanup();
    };
  }, [pathname]);

  // 3D tilt for cards: the card turns toward the pointer and a soft light follows it.
  // Mouse only, so touch scrolling is never captured; reduced motion keeps the light but skips the turn.
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active: HTMLElement | null = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const release = (card: HTMLElement | null) => {
      card?.style.setProperty('--rx', '0deg');
      card?.style.setProperty('--ry', '0deg');
    };
    const apply = () => {
      frame = 0;
      if (!active) return;
      const box = active.getBoundingClientRect();
      const x = Math.min(Math.max((pointerX - box.left) / box.width, 0), 1);
      const y = Math.min(Math.max((pointerY - box.top) / box.height, 0), 1);
      active.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      active.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      if (reducedMotion.matches) return;
      const max = Number(active.dataset.tilt) || DEFAULT_TILT_DEGREES;
      active.style.setProperty('--ry', `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
      active.style.setProperty('--rx', `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !finePointer.matches) return;
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-tilt]') : null;
      if (card !== active) {
        release(active);
        active = card;
      }
      if (!active) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      release(active);
      active = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return null;
}
