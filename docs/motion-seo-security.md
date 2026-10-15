# Motion, SEO, GEO and security

How the scroll animation, search and AI-search metadata, and security headers work. The approach
follows `UI_DESIGN_SYSTEM_AND_ANIMATION_GUIDE.md` (sections 7, 9 and 10) without its GSAP, Lenis
and 3D-globe dependencies: CSS does the animating and one small client controller flips switches.

## Motion

GSAP (`gsap@3.15.0`, pinned exactly) animates the page. It is loaded with a dynamic import, so
the first page load does not pay for it. Visitors with reduced motion never load it, and if the
script fails to load, all content is revealed straight away.

| Piece | Where | What it does |
| --- | --- | --- |
| Pre-paint script | `src/app/layout.tsx` | Adds `html.js` before first paint, so content may start hidden without a flash. `build-csp.mjs` hashes it. |
| `PageEffects` | `src/components/motion/PageEffects.tsx` | Loads GSAP, then runs one IntersectionObserver that reveals `[data-reveal]` elements, a scroll sweep for anything jumped past, and focus reveal. Also the mouse-only 3D tilt glare on `[data-tilt]`. Renders nothing. |
| `reveal.ts` | `src/components/motion` | GSAP reveal engine. Six variants: default fade, `mask` (wipe), `zoom`, `left`, `right`, `flip` (3D turn). Elements inside `[data-stagger]` step in one after another. |
| `scrollEffects.ts` | `src/components/motion` | Scroll-scrubbed tweens: `[data-parallax]` drift, `[data-scroll-rise]` numerals, `[data-wordmark]` footer wipe. Created in a `gsap.context`, reverted on page change. |
| `magnetic.ts` | `src/components/motion` | Accent buttons (`.pill-accent`) lean toward the mouse and spring back. |
| `SplitWords` + CSS | `src/components/motion/SplitWords.tsx`, `globals.css` | Hero headline words rise at first paint with CSS, so the headline does not wait for JavaScript. |
| Problem tabs | `src/components/sections/ProblemTabs.tsx` | A circle wipe reveals the new photo, and its statement rises into place. |
| Highlights strip | `src/components/sections/Highlights.tsx` | GSAP marquee. It speeds up with scroll velocity, eases back, and pauses on hover, focus or the button. |

Markup hooks (no other code needed):

- `data-reveal="flip|zoom|left|right|mask"` (or `""` for the default fade) — reveal when scrolled into view. Use `--d` (milliseconds) to delay one element and `--i` to offset it.
- `data-stagger` on a container — its `[data-reveal]` children step in one after another.
- `data-tilt` (optional value: maximum degrees, default 6) — 3D tilt toward the pointer with a soft light.
- `data-load` — CSS fade at first paint (above-the-fold content); `--d` sets the delay.
- `data-parallax`, `data-scroll-rise`, `data-wordmark` — GSAP scroll tweens (see `scrollEffects.ts`).
- `data-scroll-zoom` — CSS scroll-timeline zoom on an image (browsers without support show it still).
- `data-media` / `data-fact` on problem-tab panels — targets for the tab transition.

The contract:

| Situation | Result |
| --- | --- |
| No JavaScript | Nothing is hidden: every hidden state is scoped to `html.js`. |
| GSAP fails to load | Everything is revealed immediately (`revealEverything`). |
| JavaScript loads but hydration fails | A failsafe shows everything after 4 seconds (no `html.ready`). |
| `prefers-reduced-motion: reduce` | No reveals, parallax, numeral or wordmark tweens, marquee or tab transitions; the tilt glare stays. |
| Touch devices | No tilt and no magnetic pull, so scrolling is never captured. |
| Keyboard | Focus reveals any hidden ancestor; the highlights strip pauses on focus. |

## Security

Response headers are set in `next.config.ts`:

- Content-Security-Policy: scripts only from this site plus build-time hashes (`scripts/build-csp.mjs`); no frames, objects or form posts elsewhere; `frame-ancestors 'none'`.
- Strict-Transport-Security `max-age=31536000`. No `includeSubDomains` or `preload`: those commit every subdomain to HTTPS and are hard to undo. Add them once every subdomain serves HTTPS.
- Cross-Origin-Opener-Policy `same-origin`, X-Frame-Options `DENY`, X-Content-Type-Options `nosniff`, Referrer-Policy, X-Permitted-Cross-Domain-Policies `none`, and a Permissions-Policy that turns off camera, microphone, location, payment, USB, serial, Bluetooth, HID and ad-topic APIs.
- `/.well-known/security.txt` (RFC 9116) gives a reporting contact. **CONFIRM:** it uses the practice's general inbox until a dedicated address is chosen. `Expires` is one year after each build.

## SEO

- Every page: unique title and description, canonical URL, Open Graph and a large Twitter card (`src/lib/metadata.ts`).
- Each page lists its English, Spanish, French and Portuguese versions as hreflang alternates, plus `x-default`. See `docs/internationalization.md`.
- Share image: `src/app/opengraph-image.tsx` (1200×630, brand colours, built at build time) and `twitter-image.tsx`.
- Structured data (`src/lib/structuredData.ts`): Organization (founder, languages, areas served, a catalogue of services without prices), WebSite, one Dentist per office with opening hours, FAQPage on `/faq`, and Service plus BreadcrumbList on each service page.
- `sitemap.xml`, `robots.txt` (crawlers welcome in production, previews `noindex`) and `manifest.webmanifest`.

## GEO (generative engine optimisation)

- `/llms.txt` (llmstxt.org) is English only, because the English pages are the reference version. It is a Markdown summary for AI assistants: practice summary, offices with addresses, phones and hours, every service with its description and link, key pages, and every FAQ verbatim. It is generated from `src/content/*`, so it follows the same holds as the pages (the Ocoee switch, no offers, no prices).
- `robots.txt` does not block AI crawlers by name; GPTBot, Google-Extended and Bingbot decide AI-search visibility.
- Structured data and the FAQ give answer engines short, citable facts that match the visible page.
