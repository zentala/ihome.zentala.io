import { test, expect } from '@playwright/test';

test.describe('Homepage Content', () => {
  test('homepage loads correctly', async ({ page }) => {
    const response = await page.goto('/');

    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(/Inteligentny Dom/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('homepage shows Polish content (not placeholder)', async ({ page }) => {
    await page.goto('/');

    // REGRESSION: Homepage was showing English placeholder instead of Polish content
    // Must have Polish feature boxes
    await expect(page.locator('h2:has-text("Wymiana elektryki")')).toBeVisible();
    await expect(page.locator('h2:has-text("Instalacja sieciowa")')).toBeVisible();
    await expect(page.locator('h2:has-text("System alarmowy")')).toBeVisible();
    await expect(page.locator('h2:has-text("Oświetlenie")')).toBeVisible();
    await expect(page.locator('h2:has-text("System audio")')).toBeVisible();
    await expect(page.locator('h2:has-text("Automatyka budynkowa")')).toBeVisible();

    // Must NOT show default English placeholder
    await expect(page.locator('h2:has-text("Update content")')).not.toBeVisible();
    await expect(page.locator('h2:has-text("Add new content")')).not.toBeVisible();
    await expect(page.locator('text=Edit content/_index.md')).not.toBeVisible();
  });

  test('homepage has latest posts section', async ({ page }) => {
    await page.goto('/');

    // REGRESSION: "Latest posts" / related content section was missing
    const latestPosts = page.locator('.latest-posts, .recent-posts');
    await expect(latestPosts).toBeVisible();

    // Should have at least 1 post
    const posts = latestPosts.locator('article, .post');
    await expect(posts.first()).toBeVisible();
  });
});
