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
  { path: '/about', title: 'About Us | Contemporary Dental Care', heading: 'About Us' },
  { path: '/about/dr-sheryar-khan', title: 'Dr. Sheryar Khan, DDS | Contemporary Dental Care', heading: 'Dr. Sheryar Khan, DDS' },
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
  { path: '/new-patients', title: 'New Patients | Contemporary Dental Care', heading: 'Welcome to Contemporary Dental Care' },
  { path: '/insurance', title: 'Insurance & Financing | Contemporary Dental Care', heading: 'Insurance & Financing' },
  { path: '/financial-policy', title: 'Financial Policy & Appointments | Contemporary Dental Care', heading: 'Our Financial & Appointment Policy' },
  { path: '/membership', title: 'Contemporary Smile Club | Contemporary Dental Care', heading: 'Contemporary Smile Club' },
  { path: '/pricing', title: 'Pricing and Offers | Contemporary Dental Care', heading: 'Pricing and offers' },
  { path: '/faq', title: 'Frequently Asked Questions | Contemporary Dental Care', heading: 'Frequently asked questions' },
  { path: '/contact', title: 'Contact Us | Contemporary Dental Care', heading: 'Locations' },
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
    expect(sitemap).toContain('/contact');
    expect(sitemap).not.toMatch(/membership|privacy|terms|hero-clean/i);
    // Each office has its own page; the old locations list is not a page of its own.
    expect(sitemap).toContain('/locations/orlando');
    expect(sitemap).not.toMatch(/\/locations<\/loc>/);
    expect(sitemap).not.toContain('/payment-financing');
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
    const notice = page.getByRole('complementary', { name: 'When to call 911' });
    await expect(notice).toContainText('Urgent medical notice');
    await expect(notice).toContainText('call 911 or go to the nearest emergency room immediately');
    await expect(page.locator('#same-day li')).toHaveCount(4);
    await expect(page.getByText('While we are not a 24-hour facility', { exact: false })).toBeVisible();
    await expect(page.locator('#after-hours strong', { hasText: 'Orlando office' })).toHaveCount(1);
    await expect(page.locator('#after-hours a[href="tel:+14076255440"]')).toHaveText('407-625-5440');
    await expect(page.getByRole('link', { name: 'Call Orlando: 321-522-8577' }).first()).toHaveAttribute('href', 'tel:+13215228577');
  });

  test('crowns are never described as same-day', async ({ page }) => {
    await page.goto('/services/crowns');
    await expect(page.locator('main')).toContainText('completed over two scheduled visits rather than on the same day');
    await expect(page.locator('main')).not.toContainText(/same-day crown|crown in one visit/i);
  });

  test('the insurance & financing and financial policy pages state the policies as written', async ({ page }) => {
    await page.goto('/insurance');
    await expect(page.getByText('We do not accept Medicaid.')).toBeVisible();
    await expect(page.getByText('An estimate is not a guarantee of payment.')).toBeVisible();
    await expect(page.getByText('Alphaeon, CareCredit, Sunbit, Afterpay and Klarna', { exact: false })).toBeVisible();
    await page.goto('/financial-policy');
    await expect(page.getByText('$50 for weekday appointments and $100 for weekend appointments', { exact: false })).toBeVisible();
    await expect(page.getByText('A $150 deposit is required', { exact: false })).toBeVisible();
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

  test('the about page lists the team with roles and never calls Bruno a dentist', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('#team').getByRole('listitem')).toHaveCount(8);
    const bruno = page.locator('#team').getByRole('listitem').filter({ hasText: 'Bruno Conte André' });
    await expect(bruno).toContainText('Dental Assistant');
    await expect(bruno).not.toContainText(/Dr\.|treating provider|facial/i);
    await expect(page.locator('#team').getByRole('listitem').filter({ hasText: 'Tyrese Brown' })).toContainText('Dental Assistant');
  });

  test('structured data is valid JSON and names the practice', async ({ page }) => {
    await page.goto('/');
    const data = JSON.parse(await page.locator('script[type="application/ld+json"]').first().innerText());
    const names = data['@graph'].map((node: { name: string }) => node.name);
    expect(names).toContain('Contemporary Dental Care');
    expect(JSON.stringify(data).includes('Ocoee')).toBe(ocoeeEnabled);
  });
});

test.describe('phone call link', () => {
  test('phones have no floating call button, and the top bar keeps the Orlando number in reach', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/about');
    const fixed = await page.locator('a[href^="tel:"]').evaluateAll(links => links.filter(link => getComputedStyle(link).position === 'fixed').length);
    expect(fixed).toBe(0);
    await expect(page.getByRole('link', { name: 'Call Orlando: 321-522-8577' }).first()).toBeInViewport();
  });
});

test.describe('Ocoee office', () => {
  test('Ocoee is listed in the footer, the hero and the contact page', async ({ page }) => {
    test.skip(!ocoeeEnabled, 'Ocoee is paused in content/site.ts');
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Ocoee');
    await expect(page.locator('footer').last().getByText('2910 Maguire Rd, Suite 1005, Ocoee, FL 34761')).toBeVisible();
    await page.goto('/contact');
    await expect(page.locator('main').getByRole('link', { name: '689-407-3015' })).toHaveAttribute('href', 'tel:+16894073015');
    await expect(page.locator('main').getByText('2910 Maguire Rd, Suite 1005, Ocoee, FL 34761')).toBeVisible();
  });

  test('Ocoee has its own page with its address, phone, Monday hours and directions', async ({ page }) => {
    test.skip(!ocoeeEnabled, 'Ocoee is paused in content/site.ts');
    const response = await page.goto('/locations/ocoee');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/locations\/ocoee$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Our\s+Ocoee\s+office/);
    await expect(page).toHaveTitle('Dental Care in Ocoee | Contemporary Dental Care');
    await expect(page.locator('#ocoee').getByText('2910 Maguire Rd, Suite 1005, Ocoee, FL 34761')).toBeVisible();
    await expect(page.locator('#ocoee').getByRole('link', { name: /directions/i })).toBeVisible();
    await expect(page.locator('#ocoee')).toContainText('Open Mondays, 9:00am to 5:00pm');
    await expect(page.locator('#ocoee').getByRole('link', { name: '689-407-3015' })).toHaveAttribute('href', 'tel:+16894073015');
  });
});

test.describe('website fixes', () => {
  test('homepage-only questions appear on the homepage and are left off the FAQ page', async ({ page }) => {
    await page.goto('/');
    const home = page.locator('#faq');
    await expect(home.getByText('Do you offer financing?', { exact: true })).toBeVisible();
    await expect(home.getByText("I'm nervous about dental visits. What can I do?", { exact: true })).toBeVisible();
    await expect(home.getByText('Do you speak Spanish or Portuguese?', { exact: true })).toHaveCount(0);
    await expect(home.getByText('Can I book an appointment online?', { exact: true })).toHaveCount(0);
    // Answers sit in closed disclosures; open the cancellation question to reach its link.
    await home.getByText('What is your cancellation policy?', { exact: true }).click();
    await expect(home.getByRole('link', { name: 'See our Financial and Appointments policy' })).toHaveAttribute('href', '/financial-policy');
    await page.goto('/faq');
    const main = page.locator('main');
    for (const question of ['What if I have a dental emergency after hours?', 'Are emergency visits open to new patients?', 'Do you accept my insurance?', 'Do you offer financing?', 'What is your cancellation policy?', "I'm nervous about dental visits. What can I do?", 'Do you speak Spanish or Portuguese?']) {
      await expect(main.getByText(question, { exact: true })).toHaveCount(0);
    }
    await expect(main.getByText('Do you speak Haitian Creole?', { exact: true })).toHaveCount(1);
    await expect(main.getByText('Can I book an appointment online?', { exact: true })).toHaveCount(1);
  });

  test('the missing teeth tab gives both answers and links to implants and dentures', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Missing teeth' }).click();
    const panel = page.locator('#problem-panel-implants');
    await expect(panel.getByText('Dentures replace missing teeth with a removable replacement.')).toBeVisible();
    await expect(panel.getByRole('link', { name: 'About dental implants' })).toHaveAttribute('href', '/services/implants');
    await expect(panel.getByRole('link', { name: 'About dentures' })).toHaveAttribute('href', '/services/dentures');
  });

  test('the footer links to the practice on Instagram and Facebook', async ({ page }) => {
    await page.goto('/');
    const social = page.getByRole('navigation', { name: 'Social media' });
    await expect(social).toContainText('Follow Us:');
    await expect(social.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/contemporarydentalcare/');
    await expect(social.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', /facebook\.com/);
  });

  test('the new patients page walks through five numbered steps', async ({ page }) => {
    await page.goto('/new-patients');
    await expect(page.getByText('Simple, Patient-Centered Steps for Your First Visit')).toHaveCount(0);
    const steps = page.locator('#first-visit ol > li');
    await expect(steps).toHaveCount(5);
    await expect(steps.first()).toContainText('Step 1');
    await expect(steps.nth(3).getByRole('link', { name: 'Financial Policy & Appointments page' })).toHaveAttribute('href', '/financial-policy');
  });

  test('the financial policy has its own page, and the insurance page links to it', async ({ page }) => {
    await page.goto('/insurance');
    await expect(page.locator('#financial-policy')).toHaveCount(0);
    await expect(page.locator('#financing')).toHaveCount(1);
    await page.locator('main').getByRole('link', { name: 'Financial Policy & Appointments' }).click();
    await expect(page).toHaveURL(/\/financial-policy$/);
    await expect(page.locator('main li')).toHaveCount(6);
    await expect(page.locator('main')).toContainText('A $150 deposit is required');
    // The practice's copy bolds each item's name and the notice period and fees.
    for (const phrase of ['Treatment Deposits:', '48 hours’ notice', '$50 for weekday appointments', '$100 for weekend appointments']) {
      await expect(page.locator('main li strong', { hasText: phrase })).toHaveCount(1);
    }
  });

  test('the hero gives the review count and each review card shows five stars and the Google mark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home')).toContainText('385 Five-Star Reviews and Counting');
    await expect(page.locator('#home')).not.toContainText('New patients welcome');
    await expect(page.locator('#home [aria-label="Google"]')).toHaveCount(1);
    const cards = page.locator('#reviews figure');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    await expect(page.locator('#reviews [aria-label="5 out of 5 stars"]')).toHaveCount(count);
    await expect(page.locator('#reviews [aria-label="Google review"]')).toHaveCount(count);
  });

  test('the cleanings page shows its sub-header and copy without the photo or call buttons', async ({ page }) => {
    await page.goto('/services/cleanings-checkups');
    const main = page.locator('main');
    await expect(main.getByText('Gentle preventive care to keep your smile healthy, bright, and strong.')).toBeVisible();
    await expect(main.getByText('We take digital X-rays only when clinically necessary', { exact: false })).toBeVisible();
    await expect(main.locator('a[href^="tel:"]')).toHaveCount(0);
  });

  test('the extractions page shows its sub-header, same-day wording and the referral note in italics', async ({ page }) => {
    await page.goto('/services/extractions');
    const main = page.locator('main');
    await expect(main.getByText('Gentle, thoughtful care focused on your long-term health and comfort.')).toBeVisible();
    await expect(main.getByText('whenever clinically appropriate and schedule permitting', { exact: false })).toBeVisible();
    await expect(main.locator('em', { hasText: 'trusted local oral surgery partners' })).toHaveCount(1);
    await expect(main.locator('a[href^="tel:"]')).toHaveCount(0);
  });

  test('service pages have no call buttons, and labelled paragraphs show their labels in bold', async ({ page }) => {
    for (const slug of ['restorative', 'crowns', 'root-canal', 'implants', 'dentures', 'clear-aligners-braces', 'cosmetic']) {
      await page.goto(`/services/${slug}`);
      await expect(page.locator('main a[href^="tel:"]')).toHaveCount(0);
    }
    await page.goto('/services/root-canal');
    await expect(page.locator('main strong', { hasText: 'Location note:' })).toHaveCount(1);
    await page.goto('/services/dentures');
    await expect(page.locator('main')).toContainText('Whether you need full or partial dentures');
  });

  test('the footer menu opens the same dropdowns as the header', async ({ page }) => {
    await page.goto('/');
    const footerNav = page.locator('footer').getByRole('navigation').first();
    await footerNav.getByRole('link', { name: 'Insurance & Payments' }).focus();
    await expect(footerNav.getByRole('link', { name: 'Financial Policy & Appointments' })).toBeVisible();
    await footerNav.getByRole('link', { name: 'Locations' }).focus();
    await expect(footerNav.getByRole('link', { name: 'Ocoee' })).toBeVisible();
  });

  test('the top bar links to Instagram and Facebook, and the in-house plans line links to the Smile Club', async ({ page }) => {
    await page.goto('/insurance');
    await expect(page.locator('[class*="topBarSocial"]')).toContainText('Follow Us:');
    await expect(page.locator('main').getByRole('link', { name: 'Contemporary Smile Club page' })).toHaveAttribute('href', '/membership');
    await page.goto('/about');
    await expect(page.getByText('Honest treatment planning')).toHaveCount(0);
  });

  test('every page ends with the copyright line', async ({ page }) => {
    for (const path of ['/', '/faq', '/locations/orlando']) {
      await page.goto(path);
      await expect(page.getByText('Copyright © 2026 Contemporary Dental Care. All rights reserved.')).toBeVisible();
    }
  });
});
