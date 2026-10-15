# Internationalization

The site is built in English, Spanish and Portuguese. English keeps the unprefixed URLs (`/services`); the other languages use a prefix (`/es/services`, `/pt/services`). The language selector sits in the top bar and keeps visitors on the same page where it exists in that language.

**Publishing.** Only the languages in `publicLocales` (`src/i18n/locales.ts`) are served. At launch that is English alone. Spanish and Portuguese are added to `publicLocales` on 29 October 2026, once the reviewers have approved them (see Review before launch). Until then their prefixed URLs return not found and they are left out of the switcher, sitemap and hreflang links.

French is not offered. The practice has no French-speaking capability and does not claim one (C17 §9). Haitian Creole is not offered until an interpretation route exists.

## How it fits together

| Piece | Where | Role |
| --- | --- | --- |
| Locales | `src/i18n/locales.ts` | The supported languages (`en`, `es`, `pt`), BCP 47 tags, `localePath()` for links. |
| Proxy | `src/proxy.ts` | Rewrites unprefixed URLs to `/en/...`. Root endpoints (sitemap, robots, manifest, OG images, llms.txt) are left alone. |
| Layout | `src/app/[lang]/layout.tsx` | Root layout. Sets `<html lang>` and builds one static copy of the site per language. |
| Current language | `getLocale()` in `src/i18n/server.ts` | Read in any server component with `next/root-params`, so the language is not passed down as a prop. |
| Messages | `src/i18n/messages/*.ts` | One file per area (`common`, `home`, `services`, `visit`, `money`, `about`, `locations`, `enquiry`). Each file holds English, Spanish and Portuguese, typed by the English source. |
| Lookup | `getMessages(lang)` in `src/i18n/dictionaries.ts` | Returns the messages for one language. Server code only. |
| Helpers | `src/i18n/fill.ts`, `src/lib/metadata.ts` | `fill()` fills `{name}`-style placeholders. `pageMetadata()` adds canonical and hreflang links for every language. |
| Content | `src/content/*.ts` | Structure stays in code (ids, hrefs, photos, phone numbers, addresses). Copy is read from the messages through `getServices(lang)`, `getFaqs(lang)`, `getTeam(lang)` and `getInsuranceLists(lang)`. |
| Not-found | `src/app/global-not-found.tsx`, `src/app/[lang]/not-found.tsx` | Unknown URLs get the English page from `global-not-found.tsx`. A page that calls `notFound()` inside a language (for example an unknown service slug) gets the localised page from `[lang]/not-found.tsx`. |

## Adding or changing text

1. Add the key to the English object in the right `src/i18n/messages/<area>.ts` file.
2. Add the same key to `es` and `pt` in that file. TypeScript fails the build if a key is missing.
3. Use `getMessages(lang).<area>` in server code. Client components receive strings as props.
4. Keep placeholders such as `{name}` and `{phone}` in every language.
5. Mark clinical, insurance, financial, consent and safety wording with a `// Review:` comment.

## Enquiry form and thank-you page

- The enquiry form (`src/features/inquiry/`) collects only what the Landing Page Brief allows: first name, mobile phone, best time to call, preferred language, new or existing patient (optional) and consent to contact. There is no free-text field.
- Submissions are validated on the server (`src/lib/validations/inquiry.ts`) and emailed to the front desk (info@) through Resend (`src/lib/resend.ts`, `src/services/inquiry.service.ts`). Nothing is stored, and the email body is never logged.
- The form is off while `appointmentFormEnabled` in `src/content/site.ts` is `false`. Turn it on only after Resend confirms a BAA in writing, and set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the Vercel environment (see `.env.example`). The from address must be on a domain verified in Resend.
- `/thank-you` is shown after a successful send, with no form data in its address. It is not indexed.

## Review before launch

- Every Spanish and Portuguese translation is a machine draft until reviewed. Franchesca and Jessica review Spanish, and Bruno reviews Portuguese, before the owners approve (answers file §2.17). The practice confirms the reviews on 29 October 2026. Only then add `es` and `pt` to `publicLocales`.
- Dr. Khan approves the emergency safety notice and the after-hours 911 answer in every language.
- The financial policy summary, cancellation fees and deposit wording are translated from a summary. Replace them with the approved Financial Policy & Appointment Agreement before launch.
- The enquiry consent wording needs agreement from P08 and counsel (marked `// Review:` in `src/i18n/messages/enquiry.ts`).
- Team bios use the pronouns of the English content, and the translations follow them. A native speaker should check gendered job titles and pronouns. Do not infer gender from a name.

## Known limitations

- **Prefetch on English pages.** Pages are served from the internal `/en` path, so Next.js prefetches of unprefixed links return 404 in the browser. Navigation still works (the browser loads the page), but the prefetch is lost. The homepage test ignores only these `?_rsc` requests.
- **Legal pages** are English only. The language selector sends them to the home page in the other languages.
- **Unknown URLs** show the English not-found page for every language, because the global not-found page cannot use the language layout.
- **Haitian Creole and French** are not offered. The FAQ answer about them must stay as written until an interpretation route exists.
- **Canonical duplicates.** `/en/services` serves the same page as `/services`. Every page declares the unprefixed URL as canonical. The sitemap lists each page in every language, and never lists `/en/` URLs.
