import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function ready(page: Page, path = '/') {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

// Entrance animations fade text in; contrast must be measured once they have finished.
async function settle(page: Page) {
  await page.waitForFunction(() => document.getAnimations()
    .every(animation => animation.playState !== 'running' || animation.effect?.getComputedTiming().iterations === Infinity));
}

test('Figma screens, local images and desktop geometry render without runtime errors', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await ready(page);
  // Hero, same-day, services, about teaser, locations and new patients.
  await expect(page.locator('main > section')).toHaveCount(6);
  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.getByLabel('Menu — open navigation')).toHaveCount(1);
  await expect(page.locator('#home').getByRole('link', { name: 'Orlando 321-522-8577' })).toHaveAttribute('href', 'tel:+13215228577');
  await expect(page.locator('#home').getByRole('link', { name: 'Request an appointment' })).toHaveAttribute('href', '/contact#request-appointment');
  const panel = await page.locator('#home').boundingBox();
  expect(panel?.width).toBe(1440);
  expect(panel?.height).toBe(900);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Honest, patient-focused dental care in Orlando/);
  await expect(page.getByRole('heading', { name: 'About us' })).toBeAttached();
  await expect(page.locator('#services').getByRole('article')).toHaveCount(10);
  // Scroll each region so lazy-loaded photos really load before checking them.
  for (const id of ['home', 'services', 'advantages', 'new-patients']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    if (id === 'services') {
      await page.getByRole('region', { name: 'Dental services gallery' }).focus();
      for (const article of await page.locator('#services').getByRole('article').all()) await article.scrollIntoViewIfNeeded();
    }
    // Offscreen repeat copies stay lazy; check every original source image.
    const images = page.locator(id === 'services' ? '#services [data-duplicate="false"] img' : `#${id} img`);
    await expect.poll(() => images.evaluateAll(nodes => nodes.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  }
  const allSources = await page.locator('main img').evaluateAll(images => images.map(image => (image as HTMLImageElement).src));
  expect(allSources.every(source => source.startsWith('http://127.0.0.1:3000/'))).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: testInfo.outputPath('desktop-home.png'), fullPage: true, animations: 'disabled' });
  expect(errors).toEqual([]);
});

test('large screens show the navigation bar and link to the right pages', async ({ page }) => {
  await ready(page);
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(nav).toBeVisible();
  await expect(page.getByLabel('Menu — open navigation')).toBeHidden();
  await expect(nav.getByRole('link')).toHaveText([/^Services$/, /^Emergency$/, /^Locations$/, /^New patients$/, /^Insurance and payment$/, /^About$/, /^Contact$/]);
  await nav.getByRole('link', { name: 'Emergency' }).click();
  await expect(page).toHaveURL(/\/emergency$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Emergency dental care');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Emergency' })).toHaveAttribute('aria-current', 'page');
  await page.goto('/');
  await page.getByRole('link', { name: 'REQUEST APPOINTMENT' }).click();
  await expect(page).toHaveURL(/\/contact#request-appointment$/);
  await page.goto('/');
  await page.locator('#services').getByRole('link', { name: 'All services' }).click();
  await expect(page).toHaveURL(/\/services$/);
  await page.goto('/');
  await page.locator('#advantages').getByRole('link', { name: 'Meet Dr. Khan and our team' }).click();
  await expect(page).toHaveURL(/\/about\/team$/);
});

test('phones and tablets open the menu, and the navigation bar stays hidden there', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page);
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeHidden();
  await page.getByLabel('Menu — open navigation').click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: /Emergency/ }).click();
  await expect(page).toHaveURL(/\/emergency$/);
});

test('service cards link to their pages and saved preferences survive a reload', async ({ page }) => {
  await ready(page);
  await page.getByRole('region', { name: 'Dental services gallery' }).focus();
  await page.getByRole('link', { name: 'Explore Cleanings and check-ups', exact: true }).click();
  await expect(page).toHaveURL(/\/services\/cleanings-checkups$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cleanings and check-ups');
  await page.goBack();
  await page.getByRole('region', { name: 'Dental services gallery' }).focus();
  const heart = page.getByRole('button', { name: 'Save Cleanings and check-ups', exact: true });
  await heart.click();
  await expect(heart).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status').filter({ hasText: 'Cleanings and check-ups saved' })).toHaveCount(1);
  await page.reload();
  await page.getByRole('region', { name: 'Dental services gallery' }).focus();
  await expect(heart).toHaveAttribute('aria-pressed', 'true');
  await heart.click();
  await expect(heart).toHaveAttribute('aria-pressed', 'false');
});

test('malformed stored preferences do not crash the website', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('cdc:saved-services:v1', '{invalid json'));
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await ready(page);
  await page.getByRole('region', { name: 'Dental services gallery' }).focus();
  const heart = page.getByRole('button', { name: 'Save Cleanings and check-ups', exact: true });
  await expect(heart).toHaveAttribute('aria-pressed', 'false');
  await heart.click();
  await expect(heart).toHaveAttribute('aria-pressed', 'true');
  expect(errors).toEqual([]);
});

test('mobile and tablet reflow, keep every card reachable and have no horizontal overflow', async ({ page }, testInfo) => {
  for (const width of [360, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await ready(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const heading of await page.getByRole('heading').all()) {
      const box = await heading.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
    await page.getByRole('region', { name: 'Dental services gallery' }).focus();
    const card = page.getByRole('link', { name: 'Explore Cosmetic dentistry', exact: true });
    await card.click();
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

test('clean hero variant and not-found routes are usable', async ({ page, request }) => {
  await ready(page, '/hero-clean');
  await expect(page.locator('#home')).toBeVisible();
  await page.getByRole('link', { name: 'REQUEST APPOINTMENT' }).click();
  await expect(page).toHaveURL(/\/contact#request-appointment$/);
  const missing = await request.get('/does-not-exist');
  expect(missing.status()).toBe(404);
  await page.goto('/does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  await expect(page).toHaveTitle('Page Not Found | Contemporary Dental Care');
  await page.getByRole('link', { name: 'Back to home page' }).click();
  await expect(page).toHaveURL('http://127.0.0.1:3000/');
});

test('reduced motion preference disables smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await ready(page);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(await page.locator('#services [data-duplicate="false"]').first().evaluate(element => element.parentElement!.getAnimations().length)).toBe(0);
  await expect(page.locator('#services [data-duplicate="true"]').first()).not.toBeVisible();
});

test('service columns move in opposite directions and join seamlessly across the loop boundary', async ({ page }) => {
  await ready(page);
  await page.locator('#services').scrollIntoViewIfNeeded();
  const groups = page.locator('#services [data-duplicate="false"]');
  for (const group of await groups.all()) {
    const result = await group.evaluate(element => {
      const track = element.parentElement!;
      const animation = track.getAnimations()[0];
      const duration = Number(animation.effect!.getTiming().duration);
      const reverse = animation.effect!.getTiming().direction === 'reverse';
      animation.pause();
      animation.currentTime = 0;
      const start = element.getBoundingClientRect().top;
      animation.currentTime = 1600;
      const moved = element.getBoundingClientRect().top;
      animation.currentTime = duration - 1;
      const beforeWrap = (reverse ? element : track.children[1]).getBoundingClientRect().top;
      animation.currentTime = duration + 1;
      const afterWrap = (reverse ? track.children[1] : element).getBoundingClientRect().top;
      return { start, moved, reverse, difference: Math.abs(beforeWrap - afterWrap) };
    });
    if (result.reverse) expect(result.moved).toBeGreaterThan(result.start + 10);
    else expect(result.moved).toBeLessThan(result.start - 10);
    expect(result.difference).toBeLessThan(1);
  }
});

test('section entrances run once and card loops pause outside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1520, height: 800 });
  await ready(page);
  await expect(page.locator('#home')).toHaveAttribute('data-entered', 'true');
  await expect(page.locator('#advantages')).toHaveAttribute('data-entered', 'false');
  const frontCard = page.locator('[data-loop="advantages"]').last();
  await expect(frontCard).toHaveCSS('animation-play-state', 'paused');
  await page.locator('#advantages').scrollIntoViewIfNeeded();
  await expect(page.locator('#advantages')).toHaveAttribute('data-entered', 'true');
  await expect(frontCard).toHaveCSS('animation-play-state', 'running');
  // Inspect the lift-away beat and its wrap without waiting for an entire cycle.
  const cycle = await frontCard.evaluate(element => {
    const animation = element.getAnimations()[0];
    animation.pause();
    animation.currentTime = 0;
    const start = element.getBoundingClientRect().top;
    animation.currentTime = 1520;
    const departing = element.getBoundingClientRect().top;
    const opacity = getComputedStyle(element).opacity;
    animation.currentTime = 8000;
    const returned = element.getBoundingClientRect().top;
    return { start, departing, returned, opacity };
  });
  expect(cycle.departing).toBeLessThan(cycle.start - 200);
  expect(Number(cycle.opacity)).toBeLessThan(.1);
  expect(Math.abs(cycle.returned - cycle.start)).toBeLessThan(1);
  await page.getByRole('button', { name: 'Pause cards', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Resume cards', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Resume cards', exact: true }).click();
  await page.mouse.move(0, 0);
  // Keyboard focus inside the stack pauses it, and blurring lets it run again.
  await page.getByRole('button', { name: 'Pause cards', exact: true }).focus();
  await expect(frontCard).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Pause cards', exact: true }).blur();
  await page.locator('#home').scrollIntoViewIfNeeded();
  await expect(page.locator('#advantages')).toHaveAttribute('data-active', 'false');
  await expect(frontCard).toHaveCSS('animation-play-state', 'paused');
  await expect(page.locator('#advantages')).toHaveAttribute('data-entered', 'true');
});

test('continuous page keeps the locations arrow visible and clickable at every breakpoint', async ({ page }) => {
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
    const arrow = page.getByRole('link', { name: 'Our locations', exact: true });
    await arrow.scrollIntoViewIfNeeded();
    const geometry = await arrow.evaluate(element => {
      const rect = element.getBoundingClientRect();
      const section = element.closest('section')!.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.bottom - 3);
      return { contained: rect.top >= section.top && rect.bottom <= section.bottom, hit: hit?.closest('a') === element };
    });
    expect(geometry).toEqual({ contained: true, hit: true });
    await arrow.click();
    await expect(page).toHaveURL(/#offices$/);
  }
});

test('reduced motion can be enabled during an entrance without leaving hidden content', async ({ page }) => {
  await ready(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#home')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.getByRole('link', { name: 'REQUEST APPOINTMENT' })).toHaveCSS('opacity', '1');
  await expect(page.locator('#home h1')).toBeVisible();
  await page.locator('#advantages').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: 'Pause cards', exact: true })).not.toBeVisible();
  expect(await page.locator('[data-loop="advantages"]').evaluateAll(cards => cards.every(card => card.getAnimations().length === 0))).toBe(true);
});

test('server-rendered content stays readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'REQUEST APPOINTMENT' })).toHaveCSS('opacity', '1');
  await page.locator('#advantages').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'About us' })).toBeVisible();
  await page.locator('#services').scrollIntoViewIfNeeded();
  await expect(page.getByRole('region', { name: 'Dental services gallery' })).toHaveCSS('overflow-y', 'auto');
  await expect(page.locator('#services [data-duplicate="true"]').first()).not.toBeVisible();
  await context.close();
});

test('gallery pauses on hover, supports pause/resume and repeated cards stay interactive', async ({ page }) => {
  await ready(page);
  const gallery = page.getByRole('region', { name: 'Dental services gallery' });
  const group = page.locator('#services [data-duplicate="false"]').first();
  await gallery.hover();
  await expect.poll(() => group.evaluate(element => getComputedStyle(element.parentElement!).animationPlayState)).toBe('paused');
  await page.getByRole('button', { name: 'Pause scrolling' }).click();
  await page.mouse.move(0, 0);
  await expect(page.getByRole('button', { name: 'Resume scrolling' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Resume scrolling' }).click();
  await page.mouse.move(0, 0);
  await expect.poll(() => group.evaluate(element => getComputedStyle(element.parentElement!).animationPlayState)).toBe('running');
  // Show the second copy without waiting for a full animation cycle.
  await group.evaluate(element => {
    const animation = element.parentElement!.getAnimations()[0];
    animation.pause();
    animation.currentTime = Number(animation.effect!.getTiming().duration) - 1;
  });
  const copy = page.locator('#services [data-duplicate="true"]').first();
  await copy.locator('button[aria-label="Save Cleanings and check-ups"]').click();
  await expect(copy.locator('button[aria-label="Save Cleanings and check-ups"]')).toHaveAttribute('aria-pressed', 'true');
  await copy.locator('a[aria-label="Explore Cleanings and check-ups"]').click();
  await expect(page).toHaveURL(/\/services\/cleanings-checkups$/);
  // The repeated card saved the same service as the original one.
  await page.goBack();
  await gallery.focus();
  await expect(page.getByRole('button', { name: 'Save Cleanings and check-ups', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
