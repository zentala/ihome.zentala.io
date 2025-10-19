import { test, expect } from '@playwright/test';

test.describe('Navigation Menu', () => {
  test('main menu has all 4 required items', async ({ page }) => {
    await page.goto('/');

    const menu = page.locator('nav.navbar');

    // REGRESSION: Missing menu items (Tutorials, Services)
    // Must have exactly 4 items: Teoria, Blog, Poradniki, Usługi
    await expect(menu.locator('a:has-text("Teoria")')).toBeVisible();
    await expect(menu.locator('a:has-text("Blog")')).toBeVisible();
    await expect(menu.locator('a:has-text("Poradniki")')).toBeVisible();
    await expect(menu.locator('a:has-text("Usługi")')).toBeVisible();

    // Count menu items to ensure no extras/missing
    const menuItems = menu.locator('.nav-item');
    await expect(menuItems).toHaveCount(4);
  });

  test('Teoria link points to correct URL', async ({ page }) => {
    await page.goto('/');

    const teoriaLink = page.locator('a:has-text("Teoria")');
    await expect(teoriaLink).toHaveAttribute('href', /\/docs\/systems\/inteligentny-dom\//);

    // REGRESSION: Old broken URL was /docs/concepts/smart-home (404)
    const href = await teoriaLink.getAttribute('href');
    expect(href).not.toContain('/concepts/smart-home');
  });

  test('clicking menu items navigates', async ({ page }) => {
    await page.goto('/');

    await page.click('a:has-text("Blog")');
    await expect(page).toHaveURL(/\/blog\//);

    await page.goto('/');
    await page.click('a:has-text("Poradniki")');
    await expect(page).toHaveURL(/\/tutorials\//);

    await page.goto('/');
    await page.click('a:has-text("Teoria")');
    await expect(page).toHaveURL(/\/docs\/systems\/inteligentny-dom\//);

    await page.goto('/');
    await page.click('a:has-text("Usługi")');
    await expect(page).toHaveURL(/\/services\//);
  });
});
