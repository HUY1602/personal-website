import { test, expect } from '@playwright/test';

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
    await page.locator(`[data-portal="${id}"]`).click();
    await expect(page.locator('.explorer-walking')).toBeVisible();
    await expect(page.locator(`[data-portal="${id}"].is-opening`)).toBeVisible();
    await expect(page.locator('.portal-transition')).toBeVisible();
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
  await page.waitForTimeout(2900);
  await expect(page.locator('.universe-map')).toBeVisible();
  await expect(page.locator('.portal-transition')).toHaveCount(0);
  await page.locator('[data-portal="skills"]').click();
  await page.getByRole('button', { name: 'Vào ngay' }).click();
  await expect(page.locator('#skills')).toBeVisible();
  await page.waitForTimeout(2900);
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
