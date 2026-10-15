import type { Gsap } from './gsap';

const PULL = 0.25;
const MAX_PULL_PX = 10;

interface Pull { x: (value: number) => void; y: (value: number) => void }

/**
 * Accent buttons lean toward the pointer and spring back when it leaves. Mouse only, so touch
 * never moves a button under a finger. Returns a function that removes the listeners.
 */
export function attachMagnetic(gsap: Gsap): () => void {
  const pulls = new WeakMap<HTMLElement, Pull>();
  let current: HTMLElement | null = null;

  const release = (element: HTMLElement) => {
    gsap.to(element, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)' });
  };
  const clamp = (value: number) => Math.max(-MAX_PULL_PX, Math.min(MAX_PULL_PX, value));

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>('.pill-accent') : null;
    if (current && current !== target) {
      release(current);
      current = null;
    }
    if (!target) return;
    current = target;
    const box = target.getBoundingClientRect();
    let pull = pulls.get(target);
    if (!pull) {
      pull = {
        x: gsap.quickTo(target, 'x', { duration: 0.5, ease: 'power3.out' }),
        y: gsap.quickTo(target, 'y', { duration: 0.5, ease: 'power3.out' }),
      };
      pulls.set(target, pull);
    }
    pull.x(clamp((event.clientX - (box.left + box.width / 2)) * PULL));
    pull.y(clamp((event.clientY - (box.top + box.height / 2)) * PULL));
  };
  const onLeave = () => {
    if (current) release(current);
    current = null;
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  return () => {
    document.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
  };
}
