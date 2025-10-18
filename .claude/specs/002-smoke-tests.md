# Spec 002: Site-Wide Smoke Tests

**Status:** Draft
**Created:** 2025-10-18
**Author:** Claude (Software Architect)
**Purpose:** Pre-deployment smoke tests to catch critical UI/navigation breaks
**Testing Architecture:** `.claude/specs/000-testing-architecture.md`

---

## Problem Statement

**Current state:**
- Manual testing before deployment (time-consuming, error-prone)
- Recent issues: elements disappearing from menu, pages not loading
- No automated safety net to catch regressions

**Desired state:**
- Automated smoke tests run before every deployment
- Fast (<2 min total runtime)
- Wide coverage (all major pages, menus, features)
- Catch 80% of critical breaks with 20% effort

---

## What Are Smoke Tests?

**Definition:** Smoke tests are **shallow but wide** tests that verify:
- ✅ Pages load without errors
- ✅ Critical elements are visible
- ✅ Navigation works
- ✅ No obvious UI breaks

**NOT smoke tests:**
- ❌ Detailed feature testing (that's E2E tests)
- ❌ Form validation edge cases
- ❌ Complex user workflows

**Analogy:** Like turning on a car - you check if engine starts, lights work, no smoke comes out. You don't test every feature in detail.

---

## Test Categories

### 1. Critical Pages Load ✅

**Purpose:** Verify all main pages render without 404/500 errors

**Pages to test:**
- `/` - Homepage
- `/blog/` - Blog index
- `/tutorials/` - Tutorials index
- `/docs/` - Docs index
- `/services/` - Services page
- `/privacy/` - Privacy policy
- `/contact/` - Contact page
- `/demo/` - Markdown demo (dev only)

**What to verify:**
- HTTP status 200
- Page title exists and correct
- Main heading (H1) visible
- No error messages on page

**🚨 Regression Prevention (2025-10-18 issue):**
- Homepage must show Polish content (6 feature boxes)
- Must NOT show default placeholder "Update content / Add new content"
- Must show correct language content based on `defaultContentLanguage`

**Example test:**
```javascript
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
```

---

### 2. Navigation Menu Works ✅

**Purpose:** Verify all menu links are present and clickable

**Menus to test:**
- **Main menu:** Teoria, Blog, Poradniki, Usługi
- **Footer menu:** Polityka Prywatności, Kontakt, (Markdown Demo - dev only)
- **Social menu:** LinkedIn, GitHub

**What to verify:**
- All expected menu items visible
- Links have correct `href` attributes
- Clicking navigates to correct page
- No broken links (404)

**🚨 Regression Prevention (2025-10-18 issue):**
- Menu items must be present and visible
- Docs link must point to correct URL (`/docs/systems/inteligentny-dom/` not `/docs/concepts/smart-home`)
- All 4 main menu items must be present (not just 2)

**Example test:**
```javascript
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

  await page.click('a:has-text("Poradniki")');
  await expect(page).toHaveURL(/\/tutorials\//);

  await page.click('a:has-text("Teoria")');
  await expect(page).toHaveURL(/\/docs\/systems\/inteligentny-dom\//);

  await page.click('a:has-text("Usługi")');
  await expect(page).toHaveURL(/\/services\//);
});
```

---

### 3. Content Lists Render ✅

**Purpose:** Verify list pages show content (not empty)

**Lists to test:**
- Blog posts list
- Tutorials list
- Docs categories

**What to verify:**
- At least 1 item visible
- Item has title/link
- Pagination works (if exists)

**Example test:**
```javascript
test('blog shows posts', async ({ page }) => {
  await page.goto('/blog/');

  const posts = page.locator('.blog-post, article');
  await expect(posts.first()).toBeVisible();

  const firstPost = posts.first();
  await expect(firstPost.locator('h2, h3')).toBeVisible(); // Title
  await expect(firstPost.locator('a')).toBeVisible();      // Link
});

test('tutorials show content', async ({ page }) => {
  await page.goto('/tutorials/');

  const tutorials = page.locator('.tutorial, article');
  await expect(tutorials).toHaveCount.greaterThan(0);
});
```

---

### 4. Search Works ✅

**Purpose:** Verify search functionality (if implemented)

**What to test:**
- Search input visible
- Typing shows suggestions/results
- Empty search doesn't error

**Example test:**
```javascript
test('search input is visible', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]');
  await expect(searchInput).toBeVisible();
});

test('search returns results', async ({ page }) => {
  await page.goto('/');

  await page.fill('input[type="search"]', 'IoT');
  await page.press('input[type="search"]', 'Enter');

  // Wait for results (adjust selector to match your search results)
  const results = page.locator('.search-result, .result');
  await expect(results.first()).toBeVisible({ timeout: 5000 });
});
```

---

### 5. Theme Switcher Works ✅

**Purpose:** Verify dark/light theme toggle

**What to test:**
- Theme switcher button visible
- Clicking toggles theme
- Theme persists (localStorage)

**Example test:**
```javascript
test('theme switcher is visible', async ({ page }) => {
  await page.goto('/');

  const themeBtn = page.locator('button[id*="theme"], button[aria-label*="theme"], .theme-toggle');
  await expect(themeBtn).toBeVisible();
});

test('theme switching works', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');

  // Get initial theme
  const initialTheme = await html.getAttribute('data-bs-theme');

  // Click theme switcher
  const themeBtn = page.locator('button[id*="theme"], .theme-toggle');
  await themeBtn.click();

  // Wait for theme change
  await page.waitForTimeout(300); // Animation time

  // Verify theme changed
  const newTheme = await html.getAttribute('data-bs-theme');
  expect(newTheme).not.toBe(initialTheme);
});
```

---

### 6. Multilingual Configuration ✅

**Purpose:** Verify site uses correct language and content

**What to test:**
- Site serves correct default language (Polish)
- Content matches language configuration
- No language fallback to wrong language
- Menu files match active language

**🚨 Regression Prevention (2025-10-18 issue):**
- Hugo must respect `defaultContentLanguage` setting
- Must NOT fallback to English when Polish is default
- `languages.toml` and `menus.*.toml` must be synchronized
- Homepage content must match configured language

**Example test:**
```javascript
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
```

---

### 7. Language Switcher (Future i18n) 🔮

**Purpose:** Verify language switching when implemented

**What to test:**
- Language switcher visible
- Available languages shown (PL, EN)
- Switching changes URL (/pl/ → /en/)
- Content language changes

**Example test (for future):**
```javascript
test.skip('language switcher works', async ({ page }) => {
  await page.goto('/');

  const langSwitcher = page.locator('.language-switcher');
  await expect(langSwitcher).toBeVisible();

  await langSwitcher.locator('a:has-text("EN")').click();

  await expect(page).toHaveURL(/\/en\//);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
```

---

### 8. Responsive Layout ✅

**Purpose:** Verify site works on mobile/tablet

**What to test:**
- Mobile menu (hamburger) works
- Content doesn't overflow
- Images resize correctly

**Example test:**
```javascript
test('mobile menu works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
  await page.goto('/');

  // Hamburger menu should be visible on mobile
  const hamburger = page.locator('button.navbar-toggler, .mobile-menu-btn');
  await expect(hamburger).toBeVisible();

  // Click to open menu
  await hamburger.click();

  // Menu items should be visible
  const mobileMenu = page.locator('.navbar-collapse, .mobile-menu');
  await expect(mobileMenu).toBeVisible();
  await expect(mobileMenu.locator('a:has-text("Blog")')).toBeVisible();
});
```

---

### 9. No Console Errors ✅

**Purpose:** Catch JavaScript errors

**What to test:**
- No console errors on page load
- No 404s for assets (JS, CSS, images)

**Example test:**
```javascript
test('homepage has no console errors', async ({ page }) => {
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/');

  expect(errors).toEqual([]);
});

test('no failed network requests', async ({ page }) => {
  const failedRequests = [];

  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push({
        url: response.url(),
        status: response.status()
      });
    }
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(failedRequests).toEqual([]);
});
```

---

### 10. Draft Toggle (Dev Only) ✅

**Purpose:** Verify draft toggle eye icon works in dev mode

**What to test:**
- Eye icon visible in development
- Clicking toggles draft visibility
- Hidden in production

**Example test:**
```javascript
test('draft toggle visible in dev mode', async ({ page }) => {
  // This test only runs in dev environment
  if (process.env.NODE_ENV === 'production') {
    test.skip();
  }

  await page.goto('/blog/');

  const draftToggle = page.locator('#draftToggle, button[aria-label*="draft"]');
  await expect(draftToggle).toBeVisible();
});

test('draft toggle hidden in production', async ({ page }) => {
  // Mock production environment
  await page.addInitScript(() => {
    window.HUGO_ENVIRONMENT = 'production';
  });

  await page.goto('/blog/');

  const draftToggle = page.locator('#draftToggle');
  await expect(draftToggle).not.toBeVisible();
});
```

---

## Complete Test Coverage Map

```
Homepage (/)
├── ✅ Page loads (200)
├── ✅ Title correct
├── ✅ Main menu visible
├── ✅ Search input visible
├── ✅ Theme switcher visible
├── ✅ No console errors
└── ✅ Footer links present

Blog (/blog/)
├── ✅ Page loads
├── ✅ At least 1 post visible
├── ✅ Post has title + link
├── ✅ Pagination visible (if >10 posts)
└── ✅ Draft toggle (dev only)

Tutorials (/tutorials/)
├── ✅ Page loads
├── ✅ At least 1 tutorial visible
└── ✅ Tutorial card has title + description

Docs (/docs/)
├── ✅ Page loads
├── ✅ Sidebar menu visible
├── ✅ At least 1 category visible
└── ✅ Category has items

Services (/services/)
├── ✅ Page loads
├── ✅ Content visible
└── ✅ CTA buttons work

Privacy (/privacy/)
├── ✅ Page loads
└── ✅ Policy text visible

Contact (/contact/)
├── ✅ Page loads
└── ✅ Contact info visible

Search
├── ✅ Input visible
├── ✅ Typing shows results
└── ✅ Empty search no error

Theme
├── ✅ Switcher visible
├── ✅ Toggle changes theme
└── ✅ LocalStorage persists

Navigation
├── ✅ All main menu items
├── ✅ All footer menu items
├── ✅ All social links
└── ✅ Mobile menu works

Responsive
├── ✅ Mobile (375px)
├── ✅ Tablet (768px)
└── ✅ Desktop (1920px)
```

---

## Implementation File Structure

```
tests/
└── e2e/
    └── smoke/
        ├── critical-pages.spec.js        # Pages load
        ├── navigation.spec.js            # Menus work
        ├── content-lists.spec.js         # Blog, tutorials, docs
        ├── search.spec.js                # Search functionality
        ├── theme-switcher.spec.js        # Dark/light mode
        ├── responsive.spec.js            # Mobile layouts
        ├── console-errors.spec.js        # No JS errors
        └── dev-only.spec.js              # Draft toggle, demo link
```

---

## Priority & Effort

### Phase 1: Must-Have (1-2 hours)
**Effort:** Low
**Coverage:** 60% of critical issues

```javascript
// Critical pages load
test('all main pages load', async ({ page }) => {
  const pages = ['/', '/blog/', '/tutorials/', '/docs/', '/services/'];

  for (const url of pages) {
    const response = await page.goto(url);
    expect(response.status()).toBe(200);
  }
});

// Main menu visible
test('navigation menu visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('a:has-text("Blog")')).toBeVisible();
});

// Content exists
test('blog has posts', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.locator('article').first()).toBeVisible();
});
```

---

### Phase 2: Should-Have (2-3 hours)
**Effort:** Medium
**Coverage:** 80% of critical issues

Above +
- Navigation links work (click test)
- Search returns results
- Theme switcher works
- No console errors

---

### Phase 3: Nice-to-Have (3-4 hours)
**Effort:** Medium
**Coverage:** 95% of critical issues

Above +
- Responsive mobile/tablet
- Draft toggle (dev mode)
- Network requests (no 404s)
- Pagination works

---

## Running Smoke Tests

### Local Development

```bash
# Run only smoke tests
pnpm exec playwright test tests/e2e/smoke/

# Run specific smoke test
pnpm exec playwright test critical-pages.spec.js

# Run in UI mode (watch changes)
pnpm exec playwright test tests/e2e/smoke/ --ui
```

---

### CI/CD (Pre-Deployment)

**GitHub Actions:** `.github/workflows/smoke-tests.yml`

```yaml
name: Smoke Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  smoke-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 5  # Fast or fail

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8.12.0

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps chromium

      - name: Run smoke tests
        run: pnpm exec playwright test tests/e2e/smoke/

      - name: Upload report on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: smoke-test-report
          path: playwright-report/
```

**Deployment blocked if smoke tests fail** ❌

---

## Expected Runtime

| Test Category | Tests | Runtime |
|---------------|-------|---------|
| Critical Pages | 8 pages | ~10s |
| Navigation | 4 menus | ~15s |
| Content Lists | 3 lists | ~10s |
| Search | 2 tests | ~5s |
| Theme Switcher | 2 tests | ~3s |
| Responsive | 3 viewports | ~20s |
| Console Errors | 2 tests | ~5s |
| Dev Only | 2 tests | ~3s |
| **TOTAL** | **~26 tests** | **~71s** |

**Target:** < 2 minutes ✅

---

## Success Metrics

### Test Quality
- **Pass rate:** 100% on main branch
- **Flakiness:** 0% (smoke tests should be rock-solid)
- **Speed:** < 2 minutes total
- **Coverage:** Catches 80% of critical breaks

### Deployment Safety
- **Blocked deployments:** 0 false positives (tests don't block good deploys)
- **Caught regressions:** > 5 per year (tests catch real issues)
- **Mean time to detect:** < 5 minutes (in CI)

---

## Maintenance

### When to Update Smoke Tests

**Add new test when:**
- ✅ New page added (e.g., `/pricing/`)
- ✅ New menu item added
- ✅ New critical feature (e.g., newsletter signup)
- ✅ Bug happened in production (prevent regression)

**Remove test when:**
- ❌ Feature permanently removed
- ❌ Test is flaky (fix or remove, no flaky tests allowed)

---

## Example: Full Smoke Test Suite

**File:** `tests/e2e/smoke/critical-pages.spec.js`

```javascript
import { test, expect } from '@playwright/test';

/**
 * Smoke Tests: Critical Pages
 *
 * Verify all main pages load without errors
 * Fast, shallow tests to catch obvious breaks
 */

const CRITICAL_PAGES = [
  { url: '/', title: 'Inteligentny Dom', h1: /Inteligentny Dom|Smart Home/i },
  { url: '/blog/', title: 'Blog', h1: /Blog|Artykuły/i },
  { url: '/tutorials/', title: 'Poradniki', h1: /Poradniki|Tutorials/i },
  { url: '/docs/', title: 'Dokumentacja', h1: /Dokumentacja|Docs/i },
  { url: '/services/', title: 'Usługi', h1: /Usługi|Services/i },
  { url: '/privacy/', title: 'Polityka Prywatności', h1: /Polityka|Privacy/i },
];

test.describe('Critical Pages Load', () => {
  for (const { url, title, h1 } of CRITICAL_PAGES) {
    test(`${url} loads correctly`, async ({ page }) => {
      const response = await page.goto(url);

      // HTTP 200
      expect(response.status()).toBe(200);

      // Title contains expected text
      await expect(page).toHaveTitle(new RegExp(title, 'i'));

      // Main heading visible
      await expect(page.locator('h1')).toContainText(h1);

      // No error messages
      const errorMsg = page.locator('.error, .alert-danger');
      await expect(errorMsg).not.toBeVisible();
    });
  }
});

test.describe('No Console Errors', () => {
  test('homepage has no errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
});
```

---

## Troubleshooting

### Test Fails in CI but Passes Locally

**Common causes:**
1. **Timing issue** - Page loads slower in CI
   - **Fix:** Increase timeout, use `waitForLoadState('networkidle')`

2. **Missing environment var** - BASE_URL different
   - **Fix:** Set `BASE_URL` in GitHub Actions

3. **Hugo build failed** - Static files not generated
   - **Fix:** Check Hugo build logs before tests

---

### Tests Are Flaky

**Rule:** **Zero tolerance for flaky smoke tests.**

If test is flaky:
1. **Investigate:** Why does it sometimes fail?
2. **Fix:** Add proper waits, better selectors
3. **If unfixable:** Remove test (better no test than flaky test)

**Example fix:**
```javascript
// BAD (flaky)
await page.click('button');
await page.click('.result');  // May not exist yet

// GOOD (stable)
await page.click('button');
await expect(page.locator('.result')).toBeVisible();
await page.click('.result');
```

---

## Real-World Example: 2025-10-18 Incident

### What Happened

**Symptoms:**
1. Homepage showing English placeholder content ("Update content", "Add new content") instead of Polish feature boxes
2. Menu missing 2 items (Tutorials, Services) - only showing Docs and Blog
3. Docs link pointing to old broken URL `/docs/concepts/smart-home` (404) instead of `/docs/systems/inteligentny-dom/`
4. Missing "Latest Posts" section on homepage
5. Related posts not showing on blog posts

### Root Cause Analysis

**Primary Issue:** Language configuration mismatch

```toml
# config/_default/languages.toml (PROBLEM)
[en]
  languageName = "English"
  contentDir = "content/en"  # This directory doesn't exist!

[pl]
  languageName = "Polish"
  contentDir = "content/pl"  # This directory doesn't exist!

# Actual content location: content/ (no subdirectory)
```

**What happened:**
1. Hugo couldn't find content in `content/pl/` (doesn't exist)
2. Fell back to English language
3. Used `menus.en.toml` which was outdated (only 2 menu items, old URLs)
4. Homepage template checked `$.Site.Language.LanguageName == "Polish"` but got "English"
5. Showed English placeholder content instead of Polish features

### How Smoke Tests Would Have Caught This

```javascript
// TEST 1: Homepage content language
test('homepage shows Polish content', async ({ page }) => {
  await page.goto('/');

  // Would FAIL: Found "Update content" instead of "Wymiana elektryki"
  await expect(page.locator('h2:has-text("Wymiana elektryki")')).toBeVisible();
});

// TEST 2: Menu completeness
test('main menu has all 4 items', async ({ page }) => {
  await page.goto('/');

  const menuItems = page.locator('.nav-item');
  // Would FAIL: Found only 2 items instead of 4
  await expect(menuItems).toHaveCount(4);
});

// TEST 3: Docs URL correct
test('Teoria link points to correct URL', async ({ page }) => {
  await page.goto('/');

  const teoriaLink = page.locator('a:has-text("Teoria")');
  // Would FAIL: href="/docs/concepts/smart-home" (old URL)
  await expect(teoriaLink).toHaveAttribute('href', /\/docs\/systems\/inteligentny-dom\//);
});
```

**Result:** All 3 tests would have failed immediately, catching the issue before deployment.

### The Fix

```toml
# config/_default/languages.toml (FIXED)
[pl]
  languageName = "Polish"
  contentDir = "content"  # Actual location of content
  weight = 10

# Removed [en] section entirely (not used)
```

```toml
# config/_default/hugo.toml (FIXED)
defaultContentLanguage = "pl"
defaultContentLanguageInSubdir = false
# Removed disableLanguages (no other languages defined)
```

```toml
# config/_default/menus/menus.en.toml
# Synchronized with menus.pl.toml (all 4 items, correct URLs)
```

### Lessons Learned

1. **Test actual content rendering** - not just page loads (HTTP 200)
2. **Test menu completeness** - count items, verify all expected links
3. **Test language configuration** - verify correct language is active
4. **Test against placeholders** - ensure real content loads, not defaults
5. **Synchronize menu files** - when using multilingual setup

### Prevention Strategy

**Smoke tests added:**
- `test('homepage shows Polish content (not placeholder)')`
- `test('main menu has all 4 required items')`
- `test('Teoria link points to correct URL')`
- `test('site uses Polish as default language')`
- `test('contentDir configuration is correct')`

**These 5 tests would have prevented today's incident.**

---

## Comparison: Smoke Tests vs E2E Tests

| Aspect | Smoke Tests | E2E Tests |
|--------|-------------|-----------|
| **Purpose** | Catch obvious breaks | Test features in detail |
| **Coverage** | Wide (many pages) | Deep (one feature) |
| **Depth** | Shallow (page loads?) | Deep (feature works?) |
| **Speed** | Fast (< 2 min) | Slower (10-30 min) |
| **When** | Every commit | Nightly / before release |
| **Example** | "Blog page loads" | "User can comment on post" |

**Both are needed!** Smoke tests = safety net, E2E tests = quality assurance.

---

## Next Steps

**Phase 1 (this spec):**
- [ ] Create smoke test files structure
- [ ] Implement critical pages tests
- [ ] Implement navigation tests
- [ ] Add to CI/CD pipeline

**Phase 2 (future):**
- [ ] Add glossary tooltips smoke test
- [ ] Add i18n language switching test
- [ ] Add performance budget test (page load < 3s)

---

## References

- **General Testing Architecture:** `.claude/specs/000-testing-architecture.md`
- **Playwright Best Practices:** https://playwright.dev/docs/best-practices
- **Smoke Testing Guide:** https://martinfowler.com/bliki/SmokeTest.html

---

**End of Smoke Tests Specification**
