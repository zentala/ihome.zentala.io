import { test, expect } from '@playwright/test';

test.describe('Multilingual Configuration', () => {
  test('site uses Polish as default language', async ({ page }) => {
    await page.goto('/');

    // HTML lang attribute
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', /pl/i);

    // REGRESSION: Hugo was using English even though PL was defaultContentLanguage
    // Must show Polish content
    await expect(page.locator('body')).toContainText(/Inteligentny|Polski/i);

    // Must NOT show English placeholder content
    await expect(page.locator('body')).not.toContainText(/Update content/);
  });

  test('Polish menu items match language', async ({ page }) => {
    await page.goto('/');

    // Menu should have Polish labels
    const menu = page.locator('nav.navbar');
    await expect(menu).toContainText(/Teoria|Poradniki|Usługi/);

    // Should NOT have English labels (when PL is active)
    await expect(menu).not.toContainText(/Theory|Tutorials|Services/);
  });

  test('contentDir configuration is correct', async ({ page }) => {
    // This tests that Hugo correctly loads from configured contentDir
    await page.goto('/blog/');

    // Should load blog posts from correct directory
    const posts = page.locator('article');
    await expect(posts.first()).toBeVisible();

    // REGRESSION: Incorrect contentDir (content/pl vs content) caused Hugo to not find content
    // If this fails, check languages.toml contentDir setting
  });
});
