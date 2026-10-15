// GSAP entry point. Loaded with a dynamic import from the client controllers, so the first
// page load does not pay for the animation library. Reduced-motion visitors never load it.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Mobile browsers resize the viewport when the address bar hides; that must not re-run every trigger.
ScrollTrigger.config({ ignoreMobileResize: true });

export type Gsap = typeof gsap;
export { gsap, ScrollTrigger };
