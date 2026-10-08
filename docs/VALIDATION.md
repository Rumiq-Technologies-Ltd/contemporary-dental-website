# Verification — 8 October 2026

The source passes `npm run lint`, `npm run typecheck`, `npm run build`, and all **12 Chromium browser tests**. The service-gallery update adds coverage for upward motion, seamless wrapping, hover and explicit pause/resume, and interactions with repeat copies. A full `npm audit` reports **0 vulnerabilities** across production and development dependencies; this update adds no dependencies. Homepage, clean hero and not-found pages are statically prerendered.

## Browser coverage

The Vercel CSP build fix adds four Node regression tests (`npm run test:build`) covering standard and adapter-scoped HTML, exact inline-script hashing, CDN and function-manifest header propagation, and rejection of builds without hashes. The production policy continues to block arbitrary inline JavaScript.

Validated at widths 360, 390, 768, 1024 and 1520px. The 1520px viewport produces the source design's 1440 × 900 panels inside 40px gutters. Screenshots were reviewed against the Figma renders for typography, white rounded panels, cyan badges, portrait stack, service card imagery and placement. Downloaded source assets are unchanged; their sizes and SHA-256 hashes are recorded in `asset-manifest.json`.

The passing suite checks menu navigation, section CTA destinations, service detail dialogs, modal focus wrapping, Escape dismissal/focus restoration, persisted heart preferences, malformed browser storage, image loading, missing resources/console errors, mobile overflow, reduced motion, the clean hero, and a usable 404. It also verifies production security headers and confirms that arbitrary injected inline JavaScript is blocked by CSP.

Automated axe checks pass on desktop, mobile and an open dialog for WCAG 2 A/AA and WCAG 2.1 A/AA tags. This is automated coverage, not a full manual assistive-technology certification. Firefox startup did not complete on this host, so cross-engine verification is not claimed; an optional Firefox project is retained in the test configuration.

## Performance

Lighthouse 13.5.0 tested the production server at http://127.0.0.1:3000 using its mobile lab preset before the service-gallery animation update. The latest recorded run (not remeasured for the animation-only update):

| Category / metric | Result |
| --- | --- |
| Performance | 89 / 100 |
| Accessibility | 100 / 100 |
| Best practices | 100 / 100 |
| SEO | 100 / 100 |
| First contentful paint | 1.5 s |
| Largest contentful paint | 3.6 s |
| Total blocking time | 140 ms |
| Cumulative layout shift | 0.001 |

The first run measured 91 performance. Local lab measurements vary; these are not field Core Web Vitals or a guarantee for deployment. The final run confirms the main mobile hero image is discoverable in HTML, eager-loaded and high priority. Remaining opportunities reported by Lighthouse include framework JavaScript and render-blocking CSS. There are no third-party script/font requests or runtime Figma requests.

The full report is `reports/lighthouse-mobile.report.html` (JSON alongside it). Desktop and mobile captures are `reports/desktop-home.png` and `reports/mobile-home.png`. The detailed browser test report is generated in `playwright-report/index.html` and can be opened with `npm run test:report`.

## Delivery boundaries

This is the requested website frontend. Patient accounts, app downloads, video and social destinations remain clearly marked coming soon, per the user's instruction. No patient data or contact details are collected. The service preference feature stores only known service IDs locally.

Desktop brand/assessment spelling was corrected and service pills use darker backgrounds for contrast. The mobile flow and interactive dialogs extend the supplied desktop source. Deployment requires an HTTPS Next.js host that retains the CSP build artifacts and forwards configured headers. Setup, maintenance and integration instructions are in the root README.
