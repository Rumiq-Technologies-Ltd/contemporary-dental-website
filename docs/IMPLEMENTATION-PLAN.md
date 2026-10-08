# Contemporary Dental Care implementation plan

## Scope and source

Source: Figma file cyBH9qSRGAqrbZJUS4h9oM, page 8:551.
The empty project will become a Next.js App Router site with TypeScript and CSS Modules.
Build the decorated hero (8:605), advantages (8:704), and services (8:773) as consecutive sections. Keep the clean hero (8:553) at /hero-clean as an alternate preview.
Use actual Figma images and vector exports, local Inter and Unbounded fonts, white panels, cyan accents, and thin oversized display type. Correct the visible brand spelling to Contemporary.

## Structure

- src/app: routes, metadata, global design tokens, local fonts, error/not-found pages.
- src/components/layout: reusable screen, header, section footer, menu.
- src/components/sections: hero, advantages, services.
- src/components/ui: icons, dialogs, action triggers, favourite toggles.
- src/content: typed service copy, image mappings, external destinations.
- public/images/figma: downloaded, unmodified source assets.
- tests: production browser checks, accessibility, responsive bounds, assets and security.

## Behavior

Navigation scrolls between sections. Get Started leads to services. Meet The Team opens the advantages section. Service arrows open details; hearts save preferences locally (no personal information). Native modal dialogs provide keyboard focus containment, Escape dismissal and focus restoration. Portal, app, video and social destinations show honest coming-soon messaging until real links are supplied. No simulated authentication, booking submissions or patient records.

## Performance and security

Prerender pages, keep interactive client components small, use Next Image responsive optimization and lazy loading, preload only the display font and critical imagery, and avoid animation dependencies. Use strict TypeScript, local assets/fonts, no third-party scripts, no HTML injection, and restrictive headers with build-generated CSP hashes. The site collects no patient or contact data. Dependencies are locked and audited. Production host must provide HTTPS.

## Responsive and accessibility

At 1440px panel width, reproduce the desktop canvas geometry. Smaller desktops scale decorative composition with a container unit; below 900px, switch to flowing layouts. Service cards remain reachable beyond the screenshot's clipped fold. Use semantic headings, labelled actions, visible focus, skip navigation, keyboard-operable menu/dialogs and reduced-motion support. Improve service-label contrast with a darker translucent pill.

## Completion checks

Run lint, TypeScript, production build, dependency audit and Chromium browser tests, with an optional Firefox project when the host supports it. Check desktop/tablet/mobile for overflow, missing assets, console errors, functioning actions, saved preferences, accessibility violations, CSP enforcement and route handling. Capture desktop and mobile screenshots and compare the requested sections to Figma. Document commands, integration boundaries and any limitations.
