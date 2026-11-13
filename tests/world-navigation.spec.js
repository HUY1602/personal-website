import { test, expect } from '@playwright/test';

async function freezeClock(page) {
  // Use an explicit future point relative to the installed clock, not host time.
  // Sending Date.now() across processes can otherwise arrive in the clock's past.
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-01-01T01:00:00Z'));
}

const worlds = [
  ['about', 'Đài quan sát'], ['skills', 'Lõi tri thức'], ['projects', 'Xưởng ý tưởng'],
  ['experience', 'Dòng thời gian'], ['contact', 'Trạm kết nối'],
];

for (const [id, name] of worlds) {
  test(`Nova opens ${id} and renders only that world's content`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('main section')).toHaveCount(0);
    await freezeClock(page);
    await page.locator(`[data-portal="${id}"]`).click();
    await page.clock.runFor(100);
    await expect(page.locator('.explorer-walking')).toBeVisible();
    await page.clock.runFor(1000);
    await expect(page.locator(`[data-portal="${id}"].is-opening`)).toBeVisible();
    await page.clock.runFor(800);
    await expect(page.locator('.portal-transition')).toBeVisible();
    await page.clock.runFor(1400);
    await expect(page.getByRole('heading', { name, exact: true })).toBeFocused();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator('main section')).toHaveCount(1);
    await expect(page.locator(`section#${id}`)).toBeVisible();
    await page.getByRole('button', { name: 'Trở về bản đồ', exact: true }).click();
    await expect(page.locator(`[data-portal="${id}"]`)).toBeFocused();
    await expect(page.locator('.visited-count')).toHaveText('01 / 05 thế giới đã khám phá');
    expect(errors).toEqual([]);
  });
}

test('navigation history, refresh, internal links and project filters work', async ({ page }) => {
  await page.goto('/#projects');
  await expect(page.locator('#projects')).toBeVisible();
  await page.getByRole('button', { name: 'Computer Vision / Edge AI', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Real-time Industrial Defect Detection' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Enterprise RAG Intelligence System' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Trở về bản đồ', exact: true }).click();
  await page.goBack();
  await expect(page.locator('#projects')).toBeVisible();
  await page.goForward();
  await expect(page.locator('.universe-map')).toBeVisible();
  await page.goto('/#about');
  await page.reload();
  await expect(page.locator('#about')).toBeVisible();
  await page.getByRole('link', { name: 'Thảo luận giải pháp' }).click();
  await expect(page.locator('#contact')).toBeVisible();
  await expect(page.locator('#about')).toHaveCount(0);
});

test('rapid selection is locked, Escape cancels, and skip finishes safely', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-portal="projects"]').click();
  await expect(page.locator('[data-portal="skills"]')).toBeDisabled();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(3400);
  await expect(page.locator('.universe-map')).toBeVisible();
  await expect(page.locator('.portal-transition')).toHaveCount(0);
  await page.locator('[data-portal="skills"]').click();
  await page.getByRole('button', { name: 'Vào ngay' }).click();
  await expect(page.locator('#skills')).toBeVisible();
  await page.waitForTimeout(3400);
  await expect(page.locator('#skills')).toBeVisible();
});

test('keyboard and reduced motion bypass the cinematic transition', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('[data-portal="experience"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#experience')).toBeVisible();
  await expect(page.locator('.portal-transition')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Dòng thời gian', exact: true })).toBeFocused();
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  await expect(page.locator('#experience')).toBeVisible();
});

test('motion toggle persists and mobile portals remain inside the viewport', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const [id] of worlds) {
    const box = await page.locator(`[data-portal="${id}"]`).boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(390);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.screenshot({ path: testInfo.outputPath('mobile-map.png'), fullPage: true });
  await page.locator('[data-portal="contact"]').click();
  await expect(page.locator('#contact')).toBeVisible();
  await page.getByRole('button', { name: 'Trở về bản đồ', exact: true }).click();
  await page.locator('.motion-toggle').click();
  await page.reload();
  await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-portal="about"]').click();
  await expect(page.locator('#about')).toBeVisible();
});

test('desktop map and destination render without overflow', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.screenshot({ path: testInfo.outputPath('desktop-map.png'), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
  await page.goto('/#projects');
  await page.screenshot({ path: testInfo.outputPath('projects-world.png'), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
});

test('Nova greets, holds its head after repeated taps, and recovers', async ({ page }, testInfo) => {
  await page.goto('/');
  await freezeClock(page);
  const nova = page.getByRole('button', { name: /^Nova —/ });
  await nova.click();
  await expect(nova).toHaveClass(/mood-greeting/);
  await expect(nova.locator('.explorer-bubble')).toHaveText('Xin chào! Mình là Nova 👋');
  await nova.click({ clickCount: 2 });
  await expect(nova).toHaveClass(/mood-hurt/);
  await expect(nova.locator('.nova-hurt-hands')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('nova-hurt.png') });
  await page.clock.runFor(2700);
  await expect(nova).toHaveClass(/mood-idle/);
  await nova.focus();
  await page.keyboard.press('Enter');
  await expect(nova).toHaveClass(/mood-greeting/);
});

test('holding and dragging Nova changes its position without a greeting or a reset before walking', async ({ page }) => {
  await page.goto('/');
  const nova = page.getByRole('button', { name: /^Nova —/ });
  const start = await nova.boundingBox();
  await page.mouse.move(start.x + start.width / 2, start.y + start.height / 2);
  await page.mouse.down();
  await expect(nova).toHaveClass(/mood-dragging/);
  await page.mouse.move(start.x + start.width / 2 + 120, start.y + start.height / 2 - 50, { steps: 8 });
  await page.mouse.up();
  await expect(nova).toHaveClass(/mood-idle/);
  const dropped = await nova.boundingBox();
  expect(dropped.x - start.x).toBeCloseTo(120, 0);
  expect(dropped.y - start.y).toBeCloseTo(-50, 0);
  await freezeClock(page);
  await page.locator('[data-portal="projects"]').click();
  const preparing = await nova.boundingBox();
  expect(preparing.x).toBeCloseTo(dropped.x, 0);
  expect(preparing.y).toBeCloseTo(dropped.y, 0);
  await page.clock.runFor(3400);
  await expect(page.locator('#projects')).toBeVisible();
});

test('Nova supports touch dragging, pointer cancellation, and keyboard repositioning on mobile', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  const nova = page.getByRole('button', { name: /^Nova —/ });
  await nova.scrollIntoViewIfNeeded();
  const start = await nova.boundingBox();
  const touch = await context.newCDPSession(page);
  const x = start.x + start.width / 2;
  const y = start.y + start.height / 2;
  await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await expect(nova).toHaveClass(/mood-dragging/);
  await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - 100, y: y - 80 }] });
  await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(nova).toHaveClass(/mood-idle/);
  const moved = await nova.boundingBox();
  expect(moved.x - start.x).toBeCloseTo(-100, 0);
  expect(moved.y - start.y).toBeCloseTo(-80, 0);
  await nova.focus();
  await page.keyboard.press('ArrowLeft');
  expect((await nova.boundingBox()).x).toBeCloseTo(moved.x - 20, 0);
  const current = await nova.boundingBox();
  await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: current.x + 20, y: current.y + 20 }] });
  await expect(nova).toHaveClass(/mood-dragging/);
  await touch.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
  await expect(nova).toHaveClass(/mood-idle/);
  await page.locator('[data-portal="skills"]').click();
  await expect(page.locator('#skills')).toBeVisible();
  await context.close();
});

test('Nova is interactive inside a world and remains within its bounds', async ({ page }) => {
  await page.goto('/#about');
  const nova = page.getByRole('button', { name: /^Nova —/ });
  await nova.click();
  await expect(nova).toHaveClass(/mood-greeting/);
  const start = await nova.boundingBox();
  await page.mouse.move(start.x + 20, start.y + 20);
  await page.mouse.down();
  await page.mouse.move(-200, -200, { steps: 8 });
  await page.mouse.up();
  const final = await nova.boundingBox();
  const scene = await page.locator('.world-content').boundingBox();
  expect(final.x).toBeGreaterThanOrEqual(scene.x);
  expect(final.y).toBeGreaterThanOrEqual(scene.y);
  await expect(nova).toHaveClass(/mood-idle/);
});

test('About text stays on one desktop line and statistic values align', async ({ page }, testInfo) => {
  await page.goto('/#about');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => document.fonts.ready);
  for (const selector of ['.profile-world-bio', '.about-world-heading h2']) {
    const lines = await page.locator(selector).evaluate(element => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return range.getClientRects().length;
    });
    expect(lines).toBe(1);
  }
  const values = await page.locator('.profile-world-stats strong').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().top));
  expect(new Set(values).size).toBe(1);
  const aligned = await page.locator('.profile-world-stats > div').evaluateAll(elements => elements.every(element => element.children[0].getBoundingClientRect().left === element.children[1].getBoundingClientRect().left));
  expect(aligned).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('about-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.screenshot({ path: testInfo.outputPath('about-mobile.png'), fullPage: true });
});

test('new portal icons and a soft forward light replace the tunnel', async ({ page }, testInfo) => {
  await page.goto('/');
  for (const [id, icon] of [['about', 'eye'], ['skills', 'brain'], ['projects', 'lightbulb'], ['contact', 'earth']]) {
    await expect(page.locator(`[data-portal="${id}"] .door-symbol svg[class*="lucide-${icon}"]`)).toBeVisible();
  }
  await expect(page.getByText('Chọn một cánh cổng để bắt đầu')).toHaveCount(0);
  await freezeClock(page);
  await page.locator('[data-portal="about"]').click();
  await page.clock.runFor(2000);
  await expect(page.locator('.forward-light')).toBeVisible();
  await expect(page.locator('.warp-tunnel')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('soft-transition.png'), animations: 'disabled' });
  await page.clock.runFor(1400);
  await expect(page.locator('#about')).toBeVisible();
});

for (const device of [
  { name: 'desktop', width: 1440, height: 1000, portal: 'about' },
  { name: 'mobile', width: 390, height: 844, portal: 'contact' },
]) {
  test(`door light starts at the selected door and envelops Nova on ${device.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: device.width, height: device.height });
    await page.goto('/');
    await freezeClock(page);
    await page.locator(`[data-portal="${device.portal}"]`).click();
    await page.clock.runFor(1200);
    await expect(page.locator('.light-opening')).toBeVisible();
    const door = await page.locator(`[data-portal="${device.portal}"] .portal-frame`).boundingBox();
    const origin = await page.locator('.forward-light').evaluate(element => ({ x: parseFloat(getComputedStyle(element).left), y: parseFloat(getComputedStyle(element).top) }));
    expect(origin.x).toBeCloseTo(door.x + door.width / 2, 0);
    expect(origin.y).toBeCloseTo(door.y + door.height / 2, 0);
    expect(await page.locator('.portal-transition').evaluate(element => getComputedStyle(element).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
    await expect(page.locator('main section')).toHaveCount(0);
    // Sample the CSS animations explicitly as well as JS time, so screenshots
    // show the actual choreography instead of skipping straight to its last frame.
    await page.locator('.forward-light').evaluate(element => element.getAnimations().forEach(animation => { animation.pause(); animation.currentTime = 790; }));
    await page.screenshot({ path: testInfo.outputPath(`${device.name}-door-opening.png`) });
    await page.clock.runFor(800);
    await expect(page.locator('.light-entering')).toBeVisible();
    await page.evaluate(() => {
      for (const selector of ['.forward-light', '.portal-light-veil', '.explorer-entering .nova']) {
        document.querySelector(selector).getAnimations().forEach(animation => { animation.pause(); animation.currentTime = 450; });
      }
    });
    const light = await page.locator('.forward-light').boundingBox();
    const nova = await page.locator('.explorer-entering').boundingBox();
    expect(light.x).toBeLessThan(nova.x);
    expect(light.y).toBeLessThan(nova.y);
    expect(light.x + light.width).toBeGreaterThan(nova.x + nova.width);
    expect(light.y + light.height).toBeGreaterThan(nova.y + nova.height);
    expect(Number(await page.locator('.portal-light-veil').evaluate(element => getComputedStyle(element).opacity))).toBe(0);
    expect(Number(await page.locator('.explorer-entering .nova').evaluate(element => getComputedStyle(element).opacity))).toBeGreaterThan(.75);
    await page.screenshot({ path: testInfo.outputPath(`${device.name}-light-embraces-nova.png`) });
    await page.clock.runFor(1400);
    await expect(page.locator(`#${device.portal}`)).toBeVisible();
    await expect(page.locator('.portal-transition')).toHaveCount(0);
  });
}
