import type gsap from 'gsap';
import type { Gsap } from './gsap';

type TweenVars = gsap.TweenVars;

type Variant = '' | 'mask' | 'zoom' | 'left' | 'right' | 'flip';

interface RevealState {
  /** Where the element starts. CSS draws the same start state before this script runs. */
  from: TweenVars;
  to: TweenVars;
  duration: number;
  ease: string;
}

// One definition per variant. A [data-reveal] attribute picks the variant; "" is the default fade.
const STATES: Record<Variant, RevealState> = {
  '': {
    from: { opacity: 0, y: 40, filter: 'blur(6px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)' },
    duration: 1.1,
    ease: 'power3.out',
  },
  mask: {
    from: { y: 16, clipPath: 'inset(0% 0% 100% 0%)' },
    to: { y: 0, clipPath: 'inset(-10% -5% -25% -5%)' },
    duration: 1.2,
    ease: 'power4.inOut',
  },
  zoom: {
    from: { opacity: 0, y: 40, scale: 0.92 },
    to: { opacity: 1, y: 0, scale: 1 },
    duration: 1.2,
    ease: 'power3.out',
  },
  left: {
    from: { opacity: 0, x: -56 },
    to: { opacity: 1, x: 0 },
    duration: 1,
    ease: 'power3.out',
  },
  right: {
    from: { opacity: 0, x: 56 },
    to: { opacity: 1, x: 0 },
    duration: 1,
    ease: 'power3.out',
  },
  flip: {
    from: { opacity: 0, y: 72, rotationX: -32, transformPerspective: 900, transformOrigin: '50% 0%' },
    to: { opacity: 1, y: 0, rotationX: 0 },
    duration: 1.2,
    ease: 'expo.out',
  },
};

const STAGGER_SECONDS = 0.09;

function variantOf(element: HTMLElement): Variant {
  const value = element.dataset.reveal ?? '';
  return value in STATES ? (value as Variant) : '';
}

/**
 * Returns a function that animates revealed elements. Each element starts where CSS left it,
 * so the hand-off has no visible jump. Elements inside a [data-stagger] container step in one
 * after another; other elements use their --d (milliseconds) and --i (steps) custom properties.
 */
export function createReveal(gsap: Gsap): (elements: HTMLElement[]) => void {
  return elements => {
    const staggerIndex = new Map<Element, number>();
    for (const element of elements) {
      const state = STATES[variantOf(element)];
      const group = element.closest('[data-stagger]');
      let delay = (parseFloat(element.style.getPropertyValue('--d')) || 0) / 1000;
      if (group) {
        const index = staggerIndex.get(group) ?? 0;
        staggerIndex.set(group, index + 1);
        delay += index * STAGGER_SECONDS;
      } else {
        delay += (parseFloat(element.style.getPropertyValue('--i')) || 0) * 0.1;
      }
      gsap.set(element, state.from);
      element.setAttribute('data-in', '');
      gsap.to(element, {
        ...state.to,
        duration: state.duration,
        ease: state.ease,
        delay,
        clearProps: 'opacity,transform,filter,clipPath',
      });
    }
  };
}
