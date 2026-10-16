import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function ready(page: Page, path = '/') {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

// Entrance animations fade content in; contrast must be measured once they have finished.
// Loops and scroll-linked animations (which follow the scroll position, not the clock) never finish.
async function settle(page: Page) {
  await page.waitForFunction(() => document.getAnimations()
    .every(animation => animation.playState !== 'running' || animation.effect?.getComputedTiming().iterations === Infinity
      || !(animation.timeline instanceof DocumentTimeline)));
}

test('homepage shows one primary action and the page structure', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  // Next.js prefetches unprefixed links as ?_rsc requests. The English pages are served from the internal
  // /en path, so those prefetches can return 404 and Chrome logs them. Only those are ignored.
  page.on('console', message => {
    if (message.type() === 'error' && !message.location().url.includes('_rsc=')) errors.push(message.text());
  });
  await ready(page);
  // Hero, what to expect, common problems, what you can expect, and questions.
  await expect(page.locator('main > section')).toHaveCount(5);
  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.getByLabel('Menu — open navigation')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Honest, patient-focused dental care in Orlando/);
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();

  // The hero has no buttons: its headline and trust line are the first screen.
  await expect(page.locator('#home h1')).toBeVisible();

  expect(errors).toEqual([]);
});

test('the primary action is a solid, high-contrast cyan button', async ({ page }) => {
  await ready(page);
  const primary = page.getByRole('banner').getByRole('link', { name: 'Request an appointment' });
  await expect(primary).toHaveCSS('background-color', 'rgb(169, 234, 247)');
  await expect(primary).toHaveCSS('color', 'rgb(19, 28, 21)');
});

test('problem tabs switch panels with the mouse and the arrow keys', async ({ page }) => {
  await ready(page);
  const tabs = page.getByRole('tablist', { name: 'Common problems' });
  await expect(page.getByRole('tabpanel')).toHaveCount(1);
  await expect(page.getByRole('tabpanel').getByRole('heading')).toHaveText('Got tooth pain?');
  await tabs.getByRole('tab', { name: 'Crooked teeth' }).click();
  await expect(page.getByRole('tabpanel').getByRole('heading')).toHaveText('Want straighter teeth?');
  await page.keyboard.press('ArrowRight');
  await expect(tabs.getByRole('tab', { name: 'Check-up due' })).toBeFocused();
  await expect(tabs.getByRole('tab', { name: 'Check-up due' })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(tabs.getByRole('tab', { name: 'Tooth pain' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel').getByRole('link', { name: 'About emergency care' })).toHaveAttribute('href', '/emergency');
});

test('the highlights strip pauses on hover and on keyboard focus, and stays readable', async ({ page }) => {
  await ready(page);
  await expect(page.getByRole('list', { name: 'Practice highlights' }).getByRole('listitem')).toHaveCount(5);
  // There is no pause button: hovering or focusing the strip is what stops it.
  await expect(page.getByRole('button', { name: /highlights/i })).toHaveCount(0);
  const strip = page.getByRole('region', { name: 'Practice highlights' });
  const track = page.locator('[data-loop="highlights"]');

  // GSAP moves the track; while the pointer is over the strip, its transform must stop changing.
  await strip.hover();
  const hovered = await track.evaluate(element => getComputedStyle(element).transform);
  await page.waitForTimeout(400);
  expect(await track.evaluate(element => getComputedStyle(element).transform)).toBe(hovered);

  // Keyboard focus on the strip also stops it.
  await page.mouse.move(0, 0);
  await strip.focus();
  const focused = await track.evaluate(element => getComputedStyle(element).transform);
  await page.waitForTimeout(400);
  expect(await track.evaluate(element => getComputedStyle(element).transform)).toBe(focused);
});

test('the header stays on screen while the page scrolls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
  await expect.poll(() => page.locator('header').evaluate(element => element.getBoundingClientRect().top)).toBe(0);
  await expect(page.locator('header').getByRole('link', { name: 'Request an appointment' })).toBeVisible();
});

test('large screens show the navigation bar and link to the right pages', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(nav).toBeVisible();
  await expect(page.getByLabel('Menu — open navigation')).toBeHidden();
  await expect(nav.getByRole('link')).toHaveText([/^Services$/, /^Emergency$/, /^New patients$/, /^Insurance and payment$/, /^About$/, /^Contact us$/]);
  await nav.getByRole('link', { name: 'Emergency' }).click();
  await expect(page).toHaveURL(/\/emergency$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Emergency dental care');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Emergency' })).toHaveAttribute('aria-current', 'page');
  await page.goto('/');
  await page.getByRole('banner').getByRole('link', { name: 'Request an appointment' }).click();
  await expect(page).toHaveURL(/\/contact#request-appointment$/);
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Services' }).click();
  await expect(page).toHaveURL(/\/services$/);
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about$/);
});

test('phones and tablets open the menu, which ends with the request and call actions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page);
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeHidden();
  await page.getByLabel('Menu — open navigation').click();
  const panel = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(panel.getByRole('link', { name: /Emergency/ })).toBeVisible();
  await expect(page.locator('details[open]').getByRole('link', { name: 'Request an appointment', exact: true })).toBeVisible();
  await panel.getByRole('link', { name: /Emergency/ }).click();
  await expect(page).toHaveURL(/\/emergency$/);
});

test('service cards link to their pages and saved preferences survive a reload', async ({ page }) => {
  await ready(page);
  await page.goto('/services');
  const services = page.locator('#services');
  await services.getByRole('link', { name: 'Cleanings and check-ups', exact: true }).click();
  await expect(page).toHaveURL(/\/services\/cleanings-checkups$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cleanings and check-ups');
  await page.goBack();
  const heart = page.getByRole('button', { name: 'Save Cleanings and check-ups', exact: true });
  await heart.click();
  await expect(heart).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status').filter({ hasText: 'Cleanings and check-ups saved' })).toHaveCount(1);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Save Cleanings and check-ups', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Save Cleanings and check-ups', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Save Cleanings and check-ups', exact: true })).toHaveAttribute('aria-pressed', 'false');
});

test('malformed stored preferences do not crash the website', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('cdc:saved-services:v1', '{invalid json'));
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await ready(page);
  await page.goto('/services');
  const heart = page.getByRole('button', { name: 'Save Cleanings and check-ups', exact: true });
  await expect(heart).toHaveAttribute('aria-pressed', 'false');
  // The card eases in with GSAP; wait for it to settle so the click lands on the button, not mid-turn.
  await heart.scrollIntoViewIfNeeded();
  await expect.poll(() => heart.evaluate(element => getComputedStyle(element.closest('li')!).opacity)).toBe('1');
  await heart.click();
  await expect(heart).toHaveAttribute('aria-pressed', 'true');
  expect(errors).toEqual([]);
});

test('mobile and tablet reflow with no horizontal overflow', async ({ page }, testInfo) => {
  for (const width of [360, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await ready(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const heading of await page.getByRole('heading').all()) {
      const box = await heading.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
    await page.goto('/services');
    const cosmetic = page.locator('#services').getByRole('link', { name: 'Cosmetic dentistry', exact: true });
    await cosmetic.scrollIntoViewIfNeeded();
    await expect(cosmetic.locator('xpath=ancestor::li[1]')).toHaveAttribute('data-in', '');
    await cosmetic.click();
    await expect(page).toHaveURL(/\/services\/cosmetic$/);
    if (width === 390) {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: testInfo.outputPath('mobile-home.png'), fullPage: true });
    }
  }
});

test('homepage passes WCAG accessibility checks on desktop and mobile', async ({ page }) => {
  await ready(page);
  await settle(page);
  const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
  const homepage = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(homepage.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel('Menu — open navigation').click();
  await settle(page);
  const withMenu = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(withMenu.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await settle(page);
  const mobile = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(mobile.violations).toEqual([]);
});

test('production headers restrict framing, external resources and untrusted inline scripts', async ({ page, request }) => {
  const response = await request.get('/');
  const headers = response.headers();
  expect(headers['x-powered-by']).toBeUndefined();
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  const scriptPolicy = headers['content-security-policy'].match(/script-src ([^;]+)/)?.[1];
  expect(scriptPolicy).toContain('sha256-');
  expect(scriptPolicy).not.toContain('unsafe-inline');
  expect(scriptPolicy).not.toContain('unsafe-eval');
  await ready(page);
  await page.evaluate(() => {
    const script = document.createElement('script');
    script.textContent = 'window.__untrustedInlineRan = true';
    document.body.append(script);
  });
  expect(await page.evaluate(() => '__untrustedInlineRan' in window)).toBe(false);
});

test('not-found routes are usable', async ({ page, request }) => {
  const missing = await request.get('/does-not-exist');
  expect(missing.status()).toBe(404);
  await page.goto('/does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  await expect(page).toHaveTitle('Page Not Found | Contemporary Dental Care');
  await page.getByRole('link', { name: 'Back to home page' }).click();
  await expect(page).toHaveURL('/');
});

test('reduced motion preference disables smooth scrolling and entrance animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await ready(page);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await expect(page.locator('#home')).toHaveAttribute('data-motion', 'reduced');
  expect(await page.locator('#home [data-load], #home .split-unit').evaluateAll(elements => elements.every(element => element.getAnimations().length === 0))).toBe(true);
  // Nothing waits for a scroll reveal: content further down is already fully visible.
  await expect(page.locator('#why-us [data-reveal]').first()).toHaveCSS('opacity', '1');
});

test('sections share edges and keep their content on the page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [360, 390, 768, 900, 1024, 1520]) {
    await page.setViewportSize({ width, height: 844 });
    await ready(page);
    const sections = await page.locator('main > section').evaluateAll(elements => elements.map(element => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return { top: rect.top, bottom: rect.bottom, radius: style.borderRadius, shadow: style.boxShadow };
    }));
    for (let index = 0; index < sections.length; index++) {
      expect(sections[index].radius).toBe('0px');
      expect(sections[index].shadow).toBe('none');
      if (index) expect(Math.abs(sections[index].top - sections[index - 1].bottom)).toBeLessThan(1);
    }
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  }
});

test('reduced motion can be enabled during an entrance without leaving hidden content', async ({ page }) => {
  await ready(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#home')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Request an appointment' })).toHaveCSS('opacity', '1');
  await expect(page.locator('#home h1')).toBeVisible();
  await page.locator('#why-us').scrollIntoViewIfNeeded();
  await expect(page.locator('#why-us')).toBeVisible();
});

test('frequently asked questions open and close with the keyboard', async ({ page }) => {
  await ready(page);
  const faq = page.locator('#faq');
  const first = faq.locator('details').first();
  await expect(faq.locator('details')).toHaveCount(6);
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('open', '');
  await page.keyboard.press('Enter');
  await expect(first).not.toHaveAttribute('open', '');
});

test('server-rendered content stays readable without JavaScript', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: testInfo.project.use.baseURL });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('banner').getByRole('link', { name: 'Request an appointment' })).toHaveCSS('opacity', '1');
  await page.locator('#why-us').scrollIntoViewIfNeeded();
  await expect(page.locator('#why-us')).toBeVisible();
  await page.goto('/services');
  await expect(page.locator('#services').getByRole('link', { name: 'Cleanings and check-ups', exact: true })).toBeVisible();
  await context.close();
});

test('content below the fold reveals as it scrolls into view, and cards tilt in 3D', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  await page.goto('/services');
  await expect(page.locator('html')).toHaveClass(/(^|\s)js(\s|$)/);
  await expect(page.locator('html')).toHaveClass(/(^|\s)ready(\s|$)/);
  const card = page.locator('#services li[data-reveal]').first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute('data-in', '');
  await expect.poll(() => card.evaluate(element => getComputedStyle(element).opacity)).toBe('1');
  // Hovering a card with the mouse tilts it toward the pointer.
  const tilt = card.locator('[data-tilt]');
  const box = (await tilt.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.2);
  await expect.poll(() => tilt.evaluate(element => element.style.getPropertyValue('--ry'))).not.toBe('');
  await expect.poll(() => tilt.evaluate(element => parseFloat(element.style.getPropertyValue('--ry')))).toBeGreaterThan(0);
  await page.mouse.move(0, 0);
});

test('jumping past content with an anchor link never leaves it hidden', async ({ page }) => {
  await ready(page);
  // Wait for hydration and GSAP first: an anchor jump before the page is interactive is not a real visit.
  await page.waitForFunction(() => document.documentElement.classList.contains('gsap'));
  await page.goto('/#faq');
  await expect(page.locator('#faq details').first()).toHaveAttribute('data-in', '');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.mouse.wheel(0, 200);
  await expect.poll(() => page.locator('#why-us tr[data-reveal]').first().getAttribute('data-in')).toBe('');
});

test('security headers, security.txt and the share image are served', async ({ request }) => {
  const home = await request.get('/');
  const headers = home.headers();
  expect(headers['strict-transport-security']).toContain('max-age=31536000');
  expect(headers['cross-origin-opener-policy']).toBe('same-origin');
  expect(headers['permissions-policy']).toContain('payment=()');
  expect(headers['content-security-policy']).toContain('frame-src https://www.google.com');
  const security = await request.get('/.well-known/security.txt');
  expect(security.status()).toBe(200);
  const text = await security.text();
  expect(text).toMatch(/^Contact: mailto:info@contemporarydentalcare\.com$/m);
  expect(new Date(text.match(/^Expires: (.+)$/m)![1]).getTime()).toBeGreaterThan(Date.now());
  const image = await request.get('/opengraph-image');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/png');
  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest.name).toBe('Contemporary Dental Care');
});

test('every page shares a large social image and service pages carry service schema', async ({ page }) => {
  await page.goto('/services/implants');
  await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /\/opengraph-image/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  const schemas = await page.locator('script[type="application/ld+json"]').allInnerTexts();
  const graph = schemas.flatMap(text => (JSON.parse(text)['@graph'] ?? []) as { '@type': string }[]);
  expect(graph.map(node => node['@type'])).toEqual(expect.arrayContaining(['Service', 'BreadcrumbList']));
});

test('llms.txt summarises the practice for AI answer engines from the content file', async ({ request }) => {
  const response = await request.get('/llms.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/markdown');
  const text = await response.text();
  expect(text).toMatch(/^# Contemporary Dental Care$/m);
  expect(text).toContain('5330 S John Young Pkwy, Orlando, FL 32839');
  expect(text).toContain('321-522-8577');
  expect(text).toContain('### Do you accept my insurance?');
  // The content holds apply here too: none of the held offers appear. (The FAQ's cancellation
  // fee is policy, quoted verbatim from the public FAQ, not an offer.)
  expect(text).not.toMatch(/2,999|special|% off|free exam|All-on-4/i);
});
