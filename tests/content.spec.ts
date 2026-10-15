import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ocoeeEnabled } from '../src/content/site';

// Routes and title tags from the content file's site map (Ocoee and Membership are held).
const pages: readonly { path: string; title: string; heading: string }[] = [
  {
    path: '/',
    title: ocoeeEnabled ? 'Dental Care in Orlando and Ocoee | Contemporary Dental Care' : 'Dental Care in Orlando | Contemporary Dental Care',
    heading: ocoeeEnabled ? 'Honest, patient-focused dental care in Orlando and Ocoee' : 'Honest, patient-focused dental care in Orlando',
  },
  { path: '/about', title: 'About Us | Contemporary Dental Care', heading: 'About Contemporary Dental Care' },
  { path: '/about/dr-sheryar-khan', title: 'Dr. Sheryar Khan, DDS | Contemporary Dental Care', heading: 'Dr. Sheryar Khan, DDS' },
  { path: '/about/team', title: 'Our Team | Contemporary Dental Care', heading: 'Meet the team' },
  { path: '/services', title: 'Dental Services | Contemporary Dental Care', heading: 'Our services' },
  { path: '/services/cleanings-checkups', title: 'Cleanings and Check-Ups | Contemporary Dental Care', heading: 'Cleanings and check-ups' },
  { path: '/emergency', title: 'Emergency Dental Care | Contemporary Dental Care', heading: 'Emergency dental care' },
  { path: '/services/extractions', title: 'Tooth Extractions | Contemporary Dental Care', heading: 'Tooth extractions' },
  { path: '/services/restorative', title: 'Fillings and Restorative Care | Contemporary Dental Care', heading: 'Fillings and restorative care' },
  { path: '/services/crowns', title: 'Dental Crowns | Contemporary Dental Care', heading: 'Dental crowns' },
  { path: '/services/root-canal', title: 'Root Canal Treatment | Contemporary Dental Care', heading: 'Root canal treatment' },
  { path: '/services/implants', title: 'Dental Implants | Contemporary Dental Care', heading: 'Dental implants' },
  { path: '/services/dentures', title: 'Dentures | Contemporary Dental Care', heading: 'Dentures' },
  { path: '/services/clear-aligners-braces', title: 'Clear Aligners and Braces | Contemporary Dental Care', heading: 'Clear aligners and braces' },
  { path: '/services/cosmetic', title: 'Cosmetic Dentistry | Contemporary Dental Care', heading: 'Cosmetic dentistry' },
  { path: '/technology', title: 'Technology | Contemporary Dental Care', heading: 'Technology at our practice' },
  { path: '/locations', title: 'Our Locations | Contemporary Dental Care', heading: 'Our locations' },
  { path: '/locations/orlando', title: 'Orlando Office | Contemporary Dental Care', heading: 'Orlando office' },
  { path: '/new-patients', title: 'New Patients | Contemporary Dental Care', heading: 'New patients' },
  { path: '/insurance', title: 'Insurance | Contemporary Dental Care', heading: 'Insurance' },
  { path: '/payment-financing', title: 'Payment and Financing | Contemporary Dental Care', heading: 'Payment and financing' },
  { path: '/pricing', title: 'Pricing and Offers | Contemporary Dental Care', heading: 'Pricing and offers' },
  { path: '/faq', title: 'Frequently Asked Questions | Contemporary Dental Care', heading: 'Frequently asked questions' },
  { path: '/contact', title: 'Contact Us | Contemporary Dental Care', heading: 'Contact us' },
  { path: '/privacy', title: 'Privacy Policy | Contemporary Dental Care', heading: 'Privacy policy' },
  { path: '/privacy/notice-of-privacy-practices', title: 'Notice of Privacy Practices | Contemporary Dental Care', heading: 'Notice of Privacy Practices' },
  { path: '/terms', title: 'Terms of Use | Contemporary Dental Care', heading: 'Terms of use' },
  { path: '/accessibility', title: 'Accessibility | Contemporary Dental Care', heading: 'Accessibility' },
];

// Text the content file says must never be published, plus every held item.
// (The FAQ may name same-day crowns only to say they are not offered.)
const forbidden: readonly RegExp[] = [
  /Altamonte/i, /LANAP/i, /CEREC/i, /Crunch/i, /All-on-4/i, /nitrous/i, /orthobrain/i, /simplyclear|simplybraces/i,
  /\$2,999/, /\$89\.99/, /\$49\.99/, /\$100 referral/i, /0% financing/i, /pain-free/i, /24\/7/,
  /Dr\. Muhammad/i, /facial aesthetics|dermal filler/i, /\b(best|top|leading|state-of-the-art)\b/i,
];

test.describe('page content', () => {
  for (const { path, title, heading } of pages) {
    test(`${path} has its title tag, one h1, canonical URL and no held content`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      // innerText applies the CSS uppercase and joins the headline's lines with whitespace.
      const h1 = (await page.getByRole('heading', { level: 1 }).innerText()).replace(/\s+/g, ' ').trim().toLowerCase();
      expect(h1).toBe(heading.toLowerCase());
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      const text = await page.locator('body').innerText();
      for (const pattern of forbidden) expect(text, `${path} must not match ${pattern}`).not.toMatch(pattern);
    });
  }

  test('every page passes WCAG 2.1 AA checks', async ({ page }) => {
    test.setTimeout(180_000); // one axe scan per page, 27 pages
    for (const { path } of pages) {
      await page.goto(path);
      // Entrance animations fade text in; measure contrast once they have finished.
      await page.waitForFunction(() => document.getAnimations()
        .every(animation => animation.playState !== 'running' || animation.effect?.getComputedTiming().iterations === Infinity
          || !(animation.timeline instanceof DocumentTimeline)));
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(results.violations, path).toEqual([]);
    }
  });

  test('no page overflows horizontally on phones, tablets or laptops', async ({ page }) => {
    test.setTimeout(180_000); // 27 pages at three widths
    for (const width of [360, 768, 1024]) {
      await page.setViewportSize({ width, height: 800 });
      for (const { path } of pages) {
        await page.goto(path);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${path} at ${width}px`).toBe(true);
      }
    }
  });
});

test.describe('held items', () => {
  test('the membership page and the unbuilt pages return 404', async ({ request }) => {
    for (const path of ['/membership', '/hero-clean-missing', '/services/lanap', '/services/cerec', '/services/nitrous-oxide']) {
      expect((await request.get(path)).status(), path).toBe(404);
    }
  });

  test('the sitemap lists public pages only', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('/services/implants');
    expect(sitemap).toContain('/locations/orlando');
    expect(sitemap).not.toMatch(/membership|privacy|terms|hero-clean/i);
    expect(sitemap.includes('/locations/ocoee')).toBe(ocoeeEnabled);
  });

  test('public pages are indexable and robots.txt welcomes crawlers', async ({ page, request }) => {
    for (const { path } of pages.filter(item => !/^\/privacy|^\/terms/.test(item.path))) {
      await page.goto(path);
      await expect(page.locator('meta[name="robots"]'), path).toHaveAttribute('content', 'index, follow');
    }
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toMatch(/User-Agent: \*\s+Allow: \//i);
    expect(robots).not.toMatch(/Disallow: \//i);
    expect(robots).toMatch(/Sitemap: https?:\/\/\S+\/sitemap\.xml/i);
    // Nothing is blocked by name: GPTBot, Google-Extended and Bingbot also drive AI search visibility.
    expect(robots).not.toMatch(/GPTBot|CCBot|Google-Extended|ClaudeBot|PerplexityBot/i);
    const headers = (await request.get('/')).headers();
    expect(headers['x-robots-tag']).toBeUndefined();
  });

  test('draft legal pages stay out of the index until counsel has reviewed them', async ({ page }) => {
    for (const path of ['/privacy', '/privacy/notice-of-privacy-practices', '/terms']) {
      await page.goto(path);
      await expect(page.locator('meta[name="robots"]'), path).toHaveAttribute('content', /noindex/);
    }
  });

  test('canonical, Open Graph, sitemap and structured data share one absolute origin', async ({ page, request }) => {
    await page.goto('/');
    const origin = new URL((await page.locator('link[rel="canonical"]').getAttribute('href'))!).origin;
    for (const { path } of pages) {
      await page.goto(path);
      const expected = `${origin}${path === '/' ? '' : path}`;
      await expect(page.locator('link[rel="canonical"]'), path).toHaveAttribute('href', expected);
      await expect(page.locator('meta[property="og:url"]'), path).toHaveAttribute('content', expected);
    }
    const sitemap = await (await request.get('/sitemap.xml')).text();
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
    expect(locations.length).toBeGreaterThan(20);
    for (const location of locations) expect(location.startsWith(`${origin}`), location).toBe(true);
    await page.goto('/');
    const data = await page.locator('script[type="application/ld+json"]').first().innerText();
    expect(data).toContain(`${origin}/#organization`);
    expect([...data.matchAll(/"(?:@id|url)":"(https?:[^"]+)"/g)].every(match => match[1].startsWith(origin))).toBe(true);
  });

  test('the homepage headline keeps its words apart for crawlers that strip tags', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('h1').evaluate(element => element.textContent);
    expect(text).toBe(ocoeeEnabled ? 'Honest, patient-focused dental care in Orlando and Ocoee' : 'Honest, patient-focused dental care in Orlando');
  });

  test('no analytics, advertising or tracking requests are made', async ({ page }) => {
    const external: string[] = [];
    const origin = new URL('/', test.info().project.use.baseURL).origin;
    page.on('request', request => { if (!request.url().startsWith(origin)) external.push(request.url()); });
    await page.goto('/');
    await page.goto('/contact');
    expect(external).toEqual([]);
  });
});

test.describe('facts', () => {
  test('phone numbers and contact links match the content file', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('a[href="tel:+13215228577"]').first()).toBeVisible();
    await expect(page.locator('a[href="tel:+14076255440"]').first()).toBeVisible();
    await expect(page.locator('a[href="mailto:info@contemporarydentalcare.com"]').first()).toBeVisible();
    await expect(page.getByText('5330 S John Young Pkwy, Orlando, FL 32839').first()).toBeVisible();
    await expect(page.getByText('Monday to Friday, 8:00am to 5:00pm').first()).toBeVisible();
  });

  test('the emergency page carries the 911 safety wording and the after-hours line', async ({ page }) => {
    await page.goto('/emergency');
    await expect(page.getByRole('complementary', { name: 'When to call 911' })).toContainText('call 911 or go to the nearest emergency room now');
    await expect(page.getByText('We are not open 24 hours')).toBeVisible();
    await expect(page.locator('#main-content').getByRole('link', { name: 'Call Orlando: 321-522-8577' })).toHaveAttribute('href', 'tel:+13215228577');
  });

  test('crowns are never described as same-day', async ({ page }) => {
    await page.goto('/services/crowns');
    await expect(page.locator('main')).toContainText('they are not completed on the same day');
    await expect(page.locator('main')).not.toContainText(/same-day crown|crown in one visit/i);
  });

  test('insurance and payment pages state the policies as written', async ({ page }) => {
    await page.goto('/insurance');
    await expect(page.getByText('We do not accept Medicaid.')).toBeVisible();
    await expect(page.getByText('An estimate is not a guarantee of payment.')).toBeVisible();
    await page.goto('/payment-financing');
    await expect(page.getByText('Alphaeon, CareCredit, Sunbit, Afterpay and Klarna')).toBeVisible();
    await expect(page.getByText('$50 on a weekday, $100 on a weekend.')).toBeVisible();
    await expect(page.getByText('A $150 deposit reserves a treatment appointment.')).toBeVisible();
  });

  test('the FAQ opens and closes with the keyboard', async ({ page }) => {
    await page.goto('/faq');
    const question = page.getByText('Do you accept Medicaid?', { exact: true });
    await question.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText('No.', { exact: true }).first()).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('details[open]')).toHaveCount(0);
  });

  test('the team page shows the roles and never calls Bruno a dentist', async ({ page }) => {
    await page.goto('/about/team');
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(8);
    const bruno = page.getByRole('listitem').filter({ hasText: 'Bruno Conte André' });
    await expect(bruno).toContainText('Dental Assistant');
    await expect(bruno).not.toContainText(/Dr\.|treating provider|facial/i);
    await expect(page.getByRole('listitem').filter({ hasText: 'Tyrese Brown' })).toContainText('Dental Assistant');
  });

  test('structured data is valid JSON and names the practice', async ({ page }) => {
    await page.goto('/');
    const data = JSON.parse(await page.locator('script[type="application/ld+json"]').first().innerText());
    const names = data['@graph'].map((node: { name: string }) => node.name);
    expect(names).toContain('Contemporary Dental Care');
    expect(JSON.stringify(data).includes('Ocoee')).toBe(ocoeeEnabled);
  });
});

test.describe('phone call bar', () => {
  test('is sticky on phones and hidden on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/about');
    const bar = page.getByRole('link', { name: 'Call Orlando: 321-522-8577' }).last();
    await expect(bar).toBeVisible();
    await expect(bar).toHaveCSS('position', 'fixed');
    await expect(bar).toHaveAttribute('href', 'tel:+13215228577');
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('a[href="tel:+13215228577"]').last()).toBeHidden();
  });
});

test.describe('Ocoee office', () => {
  test('Ocoee is listed in the footer, the hero, the contact page and the locations page', async ({ page }) => {
    test.skip(!ocoeeEnabled, 'Ocoee is paused in content/site.ts');
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Ocoee');
    await expect(page.locator('footer').last().getByText('2910 Maguire Rd, Suite 1005, Ocoee, FL 34761')).toBeVisible();
    await page.goto('/contact');
    await expect(page.locator('main').getByRole('link', { name: '689-407-3015' })).toHaveAttribute('href', 'tel:+16894073015');
    await expect(page.locator('main').getByText('2910 Maguire Rd, Suite 1005, Ocoee, FL 34761')).toBeVisible();
    await page.goto('/locations');
    await expect(page.locator('main').getByRole('link', { name: '689-407-3015' })).toBeVisible();
  });

  test('the Ocoee office page is live with its own address, hours and phone', async ({ page }) => {
    test.skip(!ocoeeEnabled, 'Ocoee is paused in content/site.ts');
    const response = await page.goto('/locations/ocoee');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ocoee office');
    await expect(page.locator('main')).toContainText('Monday, 9:00am to 5:00pm');
    await expect(page.getByRole('link', { name: 'Call 689-407-3015' })).toHaveAttribute('href', 'tel:+16894073015');
  });
});
