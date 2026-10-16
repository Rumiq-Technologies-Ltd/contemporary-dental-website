# Contemporary Dental Care

A modular Next.js App Router implementation of the supplied Contemporary Dental Design Figma file, with the practice's content from `contemporary-dental-website-content.md` (v1.0 draft, 13 October 2026). The homepage keeps the designed hero, services and about screens and adds the same-day, locations and new-patients sections. Inner pages (about, services, emergency, locations, new patients, insurance, payment, FAQ, contact, legal) reuse the same design language. `/hero-clean` preserves the alternate hero composition.

## Start locally

Use Node.js 22 or newer. Dependencies are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For the production version:

```sh
npm run build
npm run start
```

Always use `npm run build`; its final step creates script hashes for the production Content Security Policy. Plain `next build` skips that required step. The production preview is currently running on port 3000.

## Organization and editing

```text
src/app/                  Routes, local fonts, metadata, sitemap, robots, global CSS tokens
src/components/layout/    Shared screen, header, menu, section footer, full footer, mobile call bar
src/components/sections/  Hero, services, about teaser, homepage bands and their CSS Modules
src/components/page/      Inner-page shell, intro, sections, cards, FAQ list, action buttons, JSON-LD
src/components/ui/        Icons, reveal text and saved-service controls
src/content/              Practice facts and flags (site.ts), services, team, FAQ, insurance, images
src/lib/                  Page metadata helper and structured data
public/images/figma/      Exact downloaded Figma source assets
scripts/                  Asset download and production CSP generation
tests/                    Production browser and accessibility tests
docs/                     Plan, asset provenance, validation and reports
```

Colors, motion easing and reusable surface styles live in `src/app/globals.css`. Each section owns its CSS Module. The page uses one continuous white background, with one header at the top and no section card borders, rounded corners, shadows or gaps. Desktop composition follows the 1440 × 900 Figma proportions using container-relative units; below 900px content reflows. The services arrow stays fully inside its section so it cannot be clipped.

The reference-video choreography runs when each section enters view: masked headline reveals, hero lines sliding into their decorated positions, staggered badges and avatars, and a rotating advantage-card stack. `Screen` observes visibility once for entrances and pauses ongoing loops outside the viewport or in background tabs. `RevealText` shares the line masks. Content remains visible without JavaScript.

The advantage stack advances every 1.6 seconds through an 8-second cycle. Service columns move in opposite directions, with eased steps and holds in a seamless 4.8-second cycle. Their step distances follow the actual card heights. Hover, keyboard focus and open dialogs pause movement; both galleries have pause/resume controls. Keyboard focus keeps an original, manually scrollable service set stable when switching to the mouse. Reduced-motion preferences restore the static composition immediately and hide repeat copies. Timing lives in the respective section CSS Modules.

Add/edit services in `src/content/services.ts`; homepage cards, the homepage list, the services hub and `/services/[slug]` pages derive from the same data. Image imports in `src/content/assets.ts` supply dimensions and blur placeholders to `next/image`. The SVG exports keep their intrinsic dimensions and are served locally. Components contain comments explaining layout, accessibility, storage and security decisions rather than repeating obvious markup.

## Content and holds

`docs/content-holds.md` lists what the content file holds back, the flags that control it, and what is still needed before launch. Practice facts (name, phones, addresses, hours, navigation) live in `src/content/site.ts`; change a fact there once.

Two flags in `src/content/site.ts` apply the content file's holds:

- `ocoeeEnabled` (default `true`): both offices appear everywhere. `false` returns the Orlando-only wording and hides the Ocoee details on `/contact`.
- `appointmentFormEnabled` (default `false`): the website request form is not built until the C15 decision on form data handling. The contact page asks visitors to call.

Not built, on purpose: the membership page, any offer or price list, before-and-after images, testimonials, Spanish and Portuguese versions, and analytics or advertising tags. Booking happens by phone. No authentication, patient data, email delivery or medical data collection is implemented. Service hearts store only service IDs in localStorage, with a safe fallback if storage is unavailable.

Search engines and AI crawlers: production builds are indexable, with `robots.txt` allowing every crawler and listing the sitemap. Nothing is blocked by name. Vercel preview deployments are `noindex` and disallowed. The privacy policy, Notice of Privacy Practices and terms stay `noindex` until counsel has reviewed them.

`NEXT_PUBLIC_SITE_URL` must be set in the Vercel **Production** environment (for example `https://www.contemporarydentalcare.com`). Canonical links, Open Graph tags, the sitemap, `robots.txt` and structured data all read it through `src/lib/siteUrl.ts`. A Vercel production build fails without it, so a localhost address can never ship. The value is inlined at build time: redeploy after changing it. Local builds fall back to `http://127.0.0.1:3000`.

## Verification

```sh
npm run lint
npm run typecheck
npm run test:build
npm run build
npm audit
```

Install the test browser into the project (PowerShell):

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.playwright-browsers'
npx playwright install chromium
npm test
```

On macOS/Linux, use `PLAYWRIGHT_BROWSERS_PATH="$PWD/.playwright-browsers" npx playwright install chromium`.

Tests start a production server if one is not already running. They cover desktop panel geometry, images, console errors, responsive widths (360, 390, 768, 1024, 1520px), menu navigation, service links, saved preferences, malformed storage, loop directions and seams, card departure/wrap, visibility pause, reduced motion (including preference changes), rendering without JavaScript, the clean hero, 404s, WCAG checks via axe on every page, production security headers/CSP enforcement, and the content file's rules (title tags, one h1 per page, no held or forbidden wording, the Ocoee hold, noindex, no tracking requests, phone and policy facts). `npm run test:report` opens the detailed report.

Optional Firefox tests: install Firefox with Playwright and set `CDC_TEST_FIREFOX=1` before `npm test`. Firefox startup did not complete on this host; the completed browser suite uses Chromium. Automated accessibility checks are useful evidence, not a substitute for a complete human accessibility audit.

## Performance and deployment

Pages are prerendered. Images receive responsive AVIF/WebP optimization and lazy loading; visible hero images load eagerly, and the mobile LCP image receives high fetch priority. Inter and Unbounded are local variable fonts. No third-party scripts, animation libraries, runtime Figma requests or font-host requests are required.

Use a Node-compatible Next.js host with HTTPS. Forward the headers configured in `next.config.ts`, and retain the generated `.next/csp-hashes.json` and `.next/routes-manifest.json` build artifacts. Configure HSTS at the HTTPS host once the final domain is known. Run `npm run build` before each deployment.

Vercel: select the Next.js framework preset and use `npm run build` with the default output directory. The CSP step scans both ordinary Next.js HTML and the adapter's scoped `server/route-cache` artifacts. It also updates the generated `.next/output/config.json` CDN headers and copied function manifests after Vercel's `onBuildComplete` hook (and `.vercel/output` for CLI builds). Do not remove the CSP step or bypass its empty-output check. `npm run test:build` covers both output layouts, moved HTML, header propagation, and failure without hashes.

The script CSP permits same-origin bundles and the hashes of prerendered inline scripts, while blocking arbitrary inline JavaScript and evaluation. It also restricts outgoing resources, framing, forms, base URLs and object content. Inline styles remain permitted for Next Image and layout styles. If future work adds dynamically rendered routes or external integrations, update and test the CSP deliberately; current hashes are designed for these static routes.

Lighthouse reports and verification notes are in `docs/reports/` and `docs/VALIDATION.md`. Local Lighthouse timings are lab measurements and will vary with the deployment, device and network.

## Design source

[Contemporary Dental Design in Figma](https://www.figma.com/design/cyBH9qSRGAqrbZJUS4h9oM/Contemporary-Dental-Design?node-id=8-551)

The original spelling in the brand and assessment label was corrected. Service label backgrounds were darkened to keep the cyan type readable. Mobile flow and dialogs extend the supplied desktop designs. Original image files are retained unchanged; optimized delivery is handled by Next Image.

Framework references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [response headers](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers).
