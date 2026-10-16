import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { localeNames, localeTags, locales, publicLocales } from '../src/i18n/locales';

// Languages the public site serves. Those that are built but not yet published must not be served.
const secondary = publicLocales.filter(locale => locale !== 'en');
const unpublished = locales.filter(locale => !publicLocales.includes(locale));
const samplePaths = ['', '/services', '/services/implants', '/faq', '/contact', '/insurance', '/about/team'];

// Held content from docs/content-holds.md. None of it may appear in any language.
const heldTerms = [
  /\$89\.99/, /\$49\.99/, /\$2,999/, /\$100 referral/i, /Altamonte/, /All-on-4/i, /CEREC/,
  /LANAP/, /partial denture/i, /sedation/i, /nitrous/i, /before-and-after/i, /membership/i, /0% financing/i,
];

test.describe('published languages', () => {
  for (const lang of secondary) {
    for (const path of samplePaths) {
      test(`/${lang}${path || ''} renders in its language and keeps held content out`, async ({ page }) => {
        const response = await page.goto(`/${lang}${path}`);
        expect(response?.status()).toBe(200);
        await expect(page.locator('html')).toHaveAttribute('lang', localeTags[lang]);
        const text = await page.locator('body').textContent();
        for (const term of heldTerms) expect(text ?? '').not.toMatch(term);
      });
    }

    test(`/${lang} has no accessibility violations`, async ({ page }) => {
      await page.goto(`/${lang}`);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('every published language is listed in the hreflang alternates of the home page', async ({ page }) => {
    await page.goto('/');
    const alternates = page.locator('link[rel="alternate"][hreflang]');
    await expect(alternates).toHaveCount(publicLocales.length + 1);
    for (const locale of publicLocales) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${localeTags[locale]}"]`)).toHaveCount(1);
    }
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });
});

test.describe('unpublished languages', () => {
  for (const lang of unpublished) {
    test(`/${lang}/services is not served until ${localeNames[lang]} is published`, async ({ request }) => {
      expect((await request.get(`/${lang}/services`)).status()).toBe(404);
      expect((await request.get(`/${lang}`)).status()).toBe(404);
    });
  }
});

test('English is served unprefixed, and /en copies declare the unprefixed canonical', async ({ page }) => {
  await page.goto('/services');
  await expect(page.locator('html')).toHaveAttribute('lang', localeTags.en);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/services$/);
  await page.goto('/en/services');
  await expect(page.locator('html')).toHaveAttribute('lang', localeTags.en);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/services$/);
});

test('the switcher lists only the published languages', async ({ page }) => {
  await page.goto('/services');
  await expect(page.getByRole('navigation', { name: 'Language' }).getByRole('link')).toHaveCount(publicLocales.length);
  await expect(page.getByRole('navigation', { name: 'Language' }).getByRole('link', { name: 'Français' })).toHaveCount(0);
});

test('the language switcher keeps the visitor on the same page', async ({ page }) => {
  test.skip(secondary.length === 0, 'no other language is published yet');
  const lang = secondary[0];
  await page.goto('/services/implants');
  await expect(page.locator('html')).toHaveClass(/\bready\b/);
  await page.getByRole('navigation', { name: 'Language' }).getByRole('link', { name: localeNames[lang] }).click();
  await expect(page).toHaveURL(new RegExp(`/${lang}/services/implants$`));
  await expect(page.locator('html')).toHaveAttribute('lang', localeTags[lang]);
});

test('the server-rendered language links point at the same page, without the internal /en prefix', async ({ request }) => {
  test.skip(secondary.length === 0, 'no other language is published yet');
  const html = await (await request.get('/services/implants')).text();
  for (const lang of secondary) expect(html).toContain(`href="/${lang}/services/implants"`);
  expect(html).not.toContain('/en/services/implants"');
});

test('the language switcher sends legal pages to the home page in other languages', async ({ page }) => {
  test.skip(secondary.length === 0, 'no other language is published yet');
  const lang = secondary[0];
  await page.goto('/privacy');
  await expect(page.locator('html')).toHaveClass(/\bready\b/);
  await page.getByRole('navigation', { name: 'Language' }).getByRole('link', { name: localeNames[lang] }).click();
  await expect(page).toHaveURL(new RegExp(`/${lang}$`));
});

test('the sitemap lists each published language version and nothing unpublished', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  const xml = await response.text();
  for (const lang of secondary) expect(xml).toContain(`/${lang}/services/implants`);
  for (const lang of unpublished) expect(xml).not.toContain(`/${lang}/`);
  expect(xml).not.toContain('/fr/');
});
