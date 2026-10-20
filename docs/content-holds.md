# Content holds and launch checklist

Source: `contemporary-dental-website-content.md` v1.0 draft (13 October 2026, not approved for publication).
Re-check every fact against the current Drive masters before publishing. The owner (Mohammed Khan, Rumiq) approves before anything goes live.

## Flags (`src/content/site.ts`)

| Flag | Default | Effect |
|---|---|---|
| `ocoeeEnabled` | `true` | `true`: both offices on every page (hero, footer, contact, FAQ, sitemap, structured data). The Ocoee details are on `/contact`; the old `/locations/*` addresses redirect there. Enabled 14 October 2026 at the owner's request. `false` returns the Orlando-only wording and hides the Ocoee details. |
| `appointmentFormEnabled` | `false` | `false`: no request form. The contact page, FAQ, About and New patients pages point visitors to the phone. `true` switches the wording back to the form; the form itself still has to be built (fields: Name, Phone, Email, Office, Preferred language, Reason, Message, with the form note and confirmation message from content file section 5.26). |

## Search indexing

Production builds are indexable and `robots.txt` welcomes all crawlers (it is no longer disallow-all). Vercel previews stay `noindex`. The privacy policy, Notice of Privacy Practices and terms stay `noindex` until counsel has reviewed them. Because production is now indexable, check the items under "Still needed before launch" first: unverified credentials, the "and more" insurance list and the draft legal pages are visible to search engines.

## Built with a hold applied

- Contact form (C15 decision pending).
- Ocoee is enabled (14 October 2026). Its Monday hours still need checking against Curve before launch.
- Office map: each office card shows a Google Map (`components/ui/MapEmbed.tsx`, loaded when the page loads) and a "Get directions" link. The CSP allows frames only from `https://www.google.com`.
- Offer list on Pricing: new-patient exam, October 2026 special, $2,999 implant offer. None is shown.
- Implants: no offer, no full-arch or All-on-4 wording.
- Dentures: no partial dentures.
- Clear aligners and braces: no orthobrain wording and no vendor product names.
- Technology: no speed claims and no CEREC, LANAP or 3D-printed restorations.
- Notice of Privacy Practices: placeholder until the approved text is supplied. The privacy policy and terms follow the content file's outline only, are marked as drafts and are set to `noindex`.
- New patients: no sedation or nitrous oxide wording; no "what to bring" list.
- Payment and financing: no payment-methods line and no in-house plan terms.
- Dr. Khan: portrait on a plain brand-colour background (`public/images/practice/dr-sheryar-khan-brand.jpg`, made from the practice portrait by replacing the grey background; the original `dr-sheryar-khan.jpg` is no longer used). It shows on the home team section and his page. Dr. Khan must approve the portrait. Still no licence number and no advanced-training claims.
- Team: practice group photo placed. Jessica Salazar and Tyrese Brown show name and role only.
- Home: no Google reviews link (no URL supplied) and no testimonials.
- "How our treatments look" section, on the home page after Services: four AI-generated treatment illustrations (crown, veneers, root canal, clear aligners), each labelled "Illustration, not a patient result". They are not patient photos, and the section never uses the words "patient results" or "shared with permission". The illustrations live in `public/images/treatment-illustrations/`, cropped from the originals in `public/images/before-after/`, which are not committed. Whitening is left out (not in the service list). Real patient cases may be added to `src/content/beforeAfter.ts` only with `consentOnFile` and C14 §4.10 closed.

## Not built

Haitian Creole pages, analytics and advertising tags, a before-and-after gallery of real patients (see above), the Altamonte Springs location, LANAP, CEREC, same-day crowns, nitrous oxide, facial aesthetics, the referral promotion, Crunch Fitness content.

## Translations

Spanish (`/es`) and Portuguese (`/pt`) versions of the customer-facing pages are built, with the language selector in the top bar. French is not offered (C17 §9; decision 15 Oct 2026). The Spanish and Portuguese versions are machine drafts written from the English and are not yet approved; they launch with English on 29 October only after Franchesca and Jessica (Spanish) and Bruno (Portuguese) have reviewed them and the owners have approved them:

- A qualified native speaker must review every page, especially the clinical, insurance, financial and emergency wording. Each one is marked `// Review:` in `src/i18n/messages/`.
- Dr. Khan (and the owner, Mohammed Khan) must approve the translated emergency safety notice, the financial policy summary and the after-hours 911 answer before launch.
- The FAQ answer about Haitian Creole and French must stay as written until a qualified interpretation route exists. Its translations keep the same meaning and need owner sign-off.
- Legal pages (privacy, terms, notice of privacy practices, accessibility) are English only and return the not-found page in other languages.
- Haitian Creole is not built. See `docs/internationalization.md`.

## Added beyond the content file

- Orlando-only alternatives for sentences that mention "both offices" or Ocoee (derived from the content file's own build notes). Review them before launch.
- Short meta descriptions for each page (the content file gives title tags only).
- The six cards in the "Getting good care is simple" section on the homepage use the owner's pasted section copy. Their Orlando-only wording for the new-patients card is derived from the Ocoee text, and the Spanish and Portuguese versions are drafts for native review.
- A privacy-policy line that no analytics, advertising tags or session replay are used, and a line about the saved-service hearts (browser storage only).
- Generic stock photographs (see `image-credits.md`) with generic alt text. They do not show the practice.
- Removed from the old design because the content file has no equivalent: Log In and Sign Up buttons, "Get The App", social icons and the "Best Start Up of 2023" line (a superlative claim), the smile-story video dialog, and the "coming soon" dialogs.

## Still needed before launch

1. Ocoee's actual Monday operating days, checked against Curve (operating days fell from 74 a quarter to 11). Ocoee is enabled, so this must be confirmed before launch.
2. Dr. Khan's Florida licence number and status and the residency completion year. Written consent from everyone in the practice photographs, and Dr. Khan's approval of his portrait.
3. Jessica Salazar's bio and Tyrese Brown's credential if one is shown.
4. The complete Insurance List (26 PPO plans plus discount and Medicare lists), then remove "and more".
5. Parking, accessibility and holiday hours for both offices. Directions and the office map are built (see "Built with a hold applied"); confirm the map shows each office correctly before launch.
6. The what-to-bring list and accepted payment methods; in-house payment plan terms.
7. Dr. Khan's approval of the emergency safety wording and of any personal paragraph.
8. The verbatim Financial Policy, HIPAA Notice of Privacy Practices and consent wording from the intake pack.
9. The C15 decision on website forms and data handling, then build the request form.
10. A named privacy contact, and counsel for the privacy policy and terms.
11. Counsel review of the items in C14 section 4; the offer decision tree; written terms for each offer.
12. Confirmation of partial dentures at Orlando, and of card capture at booking or on arrival.
13. The Google reviews URL.
14. The legacy sitemap for URL mapping. Confirm the preferred host (`www` or the apex domain) and set `NEXT_PUBLIC_SITE_URL` in the Vercel Production environment.
15. The practice's own photographs, to replace the stock images.
16. Counsel review of the "How our treatments look" copy. Before any real before-and-after photographs are shown as patient results: signed authorization for each patient, a permitted-channels scope, a revocation process and a no-manipulation rule (C14 §4.10), then counsel review of that copy too.
