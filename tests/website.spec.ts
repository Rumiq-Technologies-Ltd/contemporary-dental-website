import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function ready(page: Page, path = '/') {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

test('Figma screens, local images and desktop geometry render without runtime errors', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await ready(page);
  await expect(page.locator('main > section')).toHaveCount(3);
  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.getByLabel('Menu — open navigation')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Log In — coming soon' })).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Sign Up — coming soon' })).toHaveCount(1);
  const panel = await page.locator('#home').boundingBox();
  expect(panel?.width).toBe(1440);
  expect(panel?.height).toBe(900);
  await expect(page.getByRole('heading', { name: 'OUR ADVANTAGES' })).toBeAttached();
  await expect(page.locator('#services').getByRole('article')).toHaveCount(6);
  // Scroll each region so lazy-loaded photos really load before checking them.
  for (const id of ['home', 'advantages', 'services']) {
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

test('navigation and calls to action reach the intended sections', async ({ page }) => {
  await ready(page);
  const menu = page.locator('#home').getByLabel('Menu — open navigation');
  await menu.click();
  await expect(page.locator('#home nav')).toBeVisible();
  await page.locator('#home nav').getByRole('link', { name: /Our services/ }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.locator('#home details')).not.toHaveAttribute('open', '');
  await page.getByRole('link', { name: 'Meet The Team' }).click();
  await expect(page).toHaveURL(/#advantages$/);
  await page.goto('/');
  await page.getByRole('link', { name: 'GET STARTED' }).click();
  await expect(page).toHaveURL(/#services$/);
});

test('coming-soon dialog traps keyboard focus, closes with Escape and restores focus', async ({ page }) => {
  await ready(page);
  const trigger = page.locator('#home').getByRole('button', { name: 'Log In — coming soon' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Coming soon');
  for (let index = 0; index < 6; index++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByRole('button', { name: 'Get The App — coming soon' }).click();
  await expect(dialog.getByRole('heading')).toHaveText('The dental care app');
  await dialog.getByRole('button', { name: 'Back to exploring' }).click();
  await expect(dialog).not.toBeVisible();
});

test('service details open and saved preferences survive a reload', async ({ page }) => {
  await ready(page);
  await page.getByRole('region', { name: 'Dental services gallery' }).focus();
  await page.getByRole('button', { name: 'Explore Oral Health Assessment', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Oral Health Assessment');
  await expect(page.getByRole('dialog')).toContainText('Coming soon');
  await page.keyboard.press('Escape');
  const heart = page.getByRole('button', { name: 'Save Oral Health Assessment', exact: true });
  await heart.click();
  await expect(heart).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status').filter({ hasText: 'Oral Health Assessment saved' })).toHaveCount(1);
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
  const heart = page.getByRole('button', { name: 'Save Oral Health Assessment', exact: true });
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
    const card = page.getByRole('button', { name: 'Explore Medication Tracking', exact: true });
    await card.click();
    await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Medication Tracking');
    await page.keyboard.press('Escape');
    if (width === 390) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: testInfo.outputPath('mobile-home.png'), fullPage: true });
    }
  }
});

test('homepage and open dialogs pass WCAG accessibility checks', async ({ page }) => {
  await ready(page);
  const homepage = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(homepage.violations).toEqual([]);
  await page.locator('#home').getByRole('button', { name: 'Sign Up — coming soon' }).click();
  const dialog = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(dialog.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
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
  await expect(page.getByLabel('Discover our smile story — coming soon')).toHaveCount(0);
  await page.getByRole('link', { name: 'GET STARTED' }).click();
  await expect(page).toHaveURL(/\/#services$/);
  await expect(page.locator('#services')).toBeVisible();
  const missing = await request.get('/does-not-exist');
  expect(missing.status()).toBe(404);
  await page.goto('/does-not-exist');
  await page.getByRole('link', { name: 'Back to home' }).click();
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
  await page.locator('#advantages').getByRole('button', { name: 'Instagram — coming soon' }).click();
  await expect(frontCard).toHaveCSS('animation-play-state', 'paused');
  await page.keyboard.press('Escape');
  await page.locator('#home').scrollIntoViewIfNeeded();
  await expect(page.locator('#advantages')).toHaveAttribute('data-active', 'false');
  await expect(frontCard).toHaveCSS('animation-play-state', 'paused');
  await expect(page.locator('#advantages')).toHaveAttribute('data-entered', 'true');
});

test('continuous page keeps the complete services arrow visible and clickable at every breakpoint', async ({ page }) => {
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
    const arrow = page.getByRole('link', { name: 'Explore our services', exact: true });
    await arrow.scrollIntoViewIfNeeded();
    const geometry = await arrow.evaluate(element => {
      const rect = element.getBoundingClientRect();
      const section = element.closest('section')!.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.bottom - 3);
      return { contained: rect.top >= section.top && rect.bottom <= section.bottom, hit: hit?.closest('a') === element };
    });
    expect(geometry).toEqual({ contained: true, hit: true });
    await arrow.click();
    await expect(page).toHaveURL(/#services$/);
  }
});

test('reduced motion can be enabled during an entrance without leaving hidden content', async ({ page }) => {
  await ready(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#home')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.getByRole('link', { name: 'GET STARTED' })).toHaveCSS('opacity', '1');
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
  await expect(page.getByRole('link', { name: 'GET STARTED' })).toHaveCSS('opacity', '1');
  await page.locator('#advantages').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'OUR ADVANTAGES' })).toBeVisible();
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
  await copy.locator('button[aria-label="Explore Oral Health Assessment"]').click();
  await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Oral Health Assessment');
  await page.keyboard.press('Escape');
  await copy.locator('button[aria-label="Save Oral Health Assessment"]').click();
  await expect(copy.locator('button[aria-label="Save Oral Health Assessment"]')).toHaveAttribute('aria-pressed', 'true');
  await gallery.focus();
  await expect(page.getByRole('button', { name: 'Save Oral Health Assessment', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
