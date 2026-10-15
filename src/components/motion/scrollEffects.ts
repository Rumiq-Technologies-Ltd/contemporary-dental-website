import type { Gsap } from './gsap';

// Scroll-scrubbed effects. Each one is tied to the scroll position, so it runs in both directions
// and stops when the visitor stops scrolling. They are created inside a gsap.context by the caller,
// which reverts them all when the page changes.
export function scrollEffects(gsap: Gsap): void {
  // Images drift slower than the page, so a photo feels like a window onto the room.
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(element => {
    gsap.fromTo(element, { yPercent: -7, scale: 1.14 }, {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: element.closest('section') ?? element, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  });

  // Large numerals grow into place as their step scrolls up the screen.
  document.querySelectorAll<HTMLElement>('[data-scroll-rise]').forEach(element => {
    gsap.fromTo(element, { yPercent: 40, scale: 0.6, rotate: -10, opacity: 0.15 }, {
      yPercent: 0, scale: 1, rotate: 0, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: element, start: 'top 92%', end: 'top 45%', scrub: 0.8 },
    });
  });

  // The footer wordmark wipes in from the left as it comes into view.
  document.querySelectorAll<HTMLElement>('[data-wordmark]').forEach(element => {
    gsap.fromTo(element, { clipPath: 'inset(0% 100% 0% 0%)', yPercent: 12 }, {
      clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: element, start: 'top 95%', end: 'top 45%', scrub: 0.6 },
    });
  });
}
