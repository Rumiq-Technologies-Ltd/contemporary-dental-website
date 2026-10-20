import { test, expect } from '@playwright/test';
import { testimonials } from '../src/content/testimonials';
import { publicLocales } from '../src/i18n/locales';

// Landing Page Brief, "What must never appear". Checked on every page that an ad can point to.
const bannedOnLandingPages = [
  /24\/7/i, /open 7 days/i, /open sundays/i, /walk-in/i, /no appointment required/i,
  /cerec/i, /lanap/i, /nitrous/i, /sedation/i, /specialist/i, /board certified/i,
  /periodontist/i, /oral surgeon/i, /advanced training/i, /\$49\.99/, /\$89\.99/, /\$2,999/,
  /0% financing/i, /accept most insurance/i, /\bbest(?! time)\b/i, /painless/i, /guaranteed/i,
  /cutting-edge/i, /before-and-after/i, /testimonial/i, /altamonte/i,
  // A claimed Haitian Creole or French service. The FAQ's "tell us about your language needs" is allowed.
  /(speak|offer|provide|available)[^.]{0,30}(haitian|french)/i,
  /get the app/i, /revolutioni[sz]ing/i, /best start up/i,
];

const landingPages = ['/', '/emergency', '/new-patients', '/locations/ocoee'];

test.describe('landing pages', () => {
  for (const path of landingPages) {
    test(`${path} shows the brief's must-have items and none of the banned wording`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveClass(/\bready\b/);

      // Tap-to-call for the Orlando office, visible without scrolling on a phone.
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(page.locator('a[href="tel:+13215228577"]').first()).toBeVisible();

      const text = await page.locator('body').textContent();
      for (const term of bannedOnLandingPages) expect(text ?? '', `banned wording ${term}`).not.toMatch(term);
    });
  }

  test('the emergency page shows the after-hours number', async ({ page }) => {
    await page.goto('/emergency');
    await expect(page.locator('a[href="tel:+14076255440"]').first()).toBeVisible();
  });

  test('the enquiry form stays off while the email provider BAA is unconfirmed', async ({ page }) => {
    for (const path of landingPages) {
      await page.goto(path);
      await expect(page.locator('input[type="tel"]')).toHaveCount(0);
    }
  });
});

test('the thank-you page is not indexed and shows the practice numbers', async ({ page }) => {
  const response = await page.goto('/thank-you');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Thank you.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('a[href="tel:+13215228577"]').first()).toBeVisible();
  await expect(page.locator('a[href="tel:+14076255440"]').first()).toBeVisible();
  // No form values in the address: the page opens with nothing after its path.
  expect(new URL(page.url()).search).toBe('');
});

test('the coming-soon page is not indexed and announces each language in that language', async ({ page }) => {
  const response = await page.goto('/coming-soon');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Coming\s*soon/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('article[lang^="es"]').getByRole('heading', { name: 'Se Habla Español' })).toBeVisible();
  await expect(page.locator('article[lang^="pt"]').getByRole('heading', { name: 'Falamos Português' })).toBeVisible();
});

test('the homepage language links open the coming-soon page until those languages are published', async ({ page }) => {
  test.skip(publicLocales.includes('es') && publicLocales.includes('pt'), 'Spanish and Portuguese are published');
  await page.goto('/');
  const card = page.locator('#how-it-works article').filter({ hasText: 'Se Habla Español' });
  for (const name of ['Se Habla Español', 'Falamos Português']) {
    await expect(card.getByRole('link', { name })).toHaveAttribute('href', /\/coming-soon$/);
  }
});

test('a patient review appears on the homepage only when it is authorized and has no hold of either kind', async ({ page }) => {
  await page.goto('/');
  for (const review of testimonials) {
    const shown = review.authorizationReceived && !review.hold && !review.homepageHold;
    await expect(page.locator('#reviews figcaption').filter({ hasText: review.name })).toHaveCount(shown ? 1 : 0);
  }
  await expect(page.locator('#reviews').getByRole('link', { name: 'Read all patient reviews' })).toHaveAttribute('href', '/reviews');
});

test('the reviews page shows every authorized review without a site-wide hold', async ({ page }) => {
  const response = await page.goto('/reviews');
  expect(response?.status()).toBe(200);
  for (const review of testimonials) {
    const shown = review.authorizationReceived && !review.hold;
    await expect(page.locator('figcaption').filter({ hasText: review.name })).toHaveCount(shown ? 1 : 0);
  }
});

test('the thank-you page is in Spanish and Portuguese once those languages are published', async ({ page }) => {
  test.skip(!publicLocales.includes('es') && !publicLocales.includes('pt'), 'Spanish and Portuguese are not published yet');
  if (publicLocales.includes('es')) {
    await page.goto('/es/thank-you');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gracias.');
  }
  if (publicLocales.includes('pt')) {
    await page.goto('/pt/thank-you');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Obrigado.');
  }
});
