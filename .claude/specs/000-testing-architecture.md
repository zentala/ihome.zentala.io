# Spec 000: Testing Architecture - Playwright E2E & GUI Tests

**Status:** Template
**Created:** 2025-10-18
**Author:** Claude (Testing Architect)
**Purpose:** Universal testing architecture for all features in ihome.zentala.io

---

## Overview

This specification defines the **testing architecture and standards** for all GUI and E2E tests in the project. It serves as a template and reference for writing tests for any feature.

**Key principles:**
1. **Test every user-facing feature** - If user can interact with it, test it
2. **Write tests before or during implementation** - Not as an afterthought
3. **Tests are documentation** - Clear test names describe expected behavior
4. **Fast feedback** - Tests should run quickly in CI/CD
5. **Flake-free** - Tests must be deterministic and reliable

---

## Technology Stack

### Primary: Playwright

**Why Playwright?**
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Auto-wait for elements (reduces flaky tests)
- ✅ Built-in test runner with parallelization
- ✅ Network interception and mocking
- ✅ Screenshot/video recording on failure
- ✅ TypeScript support
- ✅ Excellent documentation

**Version:** `@playwright/test` ^1.40.0

**Browsers:**
- Chromium (primary - 90% of users)
- Firefox (optional - cross-browser validation)
- WebKit (optional - Safari users)

---

## Project Structure

```
ihome.zentala.io/
├── tests/
│   ├── e2e/                          # End-to-end tests (Playwright)
│   │   ├── fixtures/                 # Custom fixtures (auth, data)
│   │   ├── helpers/                  # Test utilities
│   │   ├── specs/                    # Test specifications
│   │   │   ├── glossary-tooltips.spec.js
│   │   │   ├── navigation.spec.js
│   │   │   └── search.spec.js
│   │   └── visual/                   # Visual regression tests
│   │       └── screenshots.spec.js
│   ├── unit/                         # Unit tests (Vitest)
│   │   └── scripts/
│   │       └── mark-glossary-terms.test.js
│   └── performance/                  # Performance tests (optional)
│       └── lighthouse.spec.js
├── playwright.config.js              # Playwright configuration
└── package.json
```

---

## Configuration

### Playwright Config

**File:** `playwright.config.js`

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './tests/e2e',

  // Parallel execution
  fullyParallel: true,

  // Fail fast in CI
  forbidOnly: !!process.env.CI,

  // Retries (CI only)
  retries: process.env.CI ? 2 : 0,

  // Workers (parallel tests)
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: [
    ['html'],                    // HTML report (default)
    ['junit', { outputFile: 'test-results/junit.xml' }],  // CI integration
    ['list'],                    // Console output
  ],

  // Global settings
  use: {
    // Base URL
    baseURL: process.env.BASE_URL || 'http://localhost:1313',

    // Trace on first retry
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Viewport (desktop)
    viewport: { width: 1280, height: 720 },

    // Ignore HTTPS errors (dev only)
    ignoreHTTPSErrors: true,
  },

  // Browser configurations
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Optional: Mobile testing
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },

    // Optional: Firefox
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],

  // Web server (auto-start Hugo dev server)
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:1313',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,  // 2 minutes
  },
});
```

---

## Test Structure Template

### Basic Test File

**File:** `tests/e2e/specs/feature-name.spec.js`

```javascript
import { test, expect } from '@playwright/test';

/**
 * Feature Name - E2E Tests
 *
 * Test coverage:
 * - User interaction flows
 * - Edge cases
 * - Error handling
 * - Responsive behavior
 */

test.describe('Feature Name', () => {
  // Setup before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Cleanup after each test (if needed)
  test.afterEach(async ({ page }) => {
    // Clean up resources
  });

  test('should do expected behavior', async ({ page }) => {
    // Arrange - Setup test conditions
    const element = page.locator('.selector');

    // Act - Perform action
    await element.click();

    // Assert - Verify result
    await expect(element).toBeVisible();
  });

  test('should handle edge case', async ({ page }) => {
    // Test edge case
  });

  test('should show error for invalid input', async ({ page }) => {
    // Test error handling
  });
});

test.describe('Feature Name - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should work on mobile', async ({ page }) => {
    // Mobile-specific test
  });
});
```

---

## Test Categories

### 1. User Interaction Tests

**Purpose:** Test how users interact with features

**Examples:**
- Click buttons, links
- Fill forms
- Hover elements
- Keyboard navigation
- Drag and drop

**Pattern:**
```javascript
test('should open tooltip on hover', async ({ page }) => {
  await page.goto('/blog/article/');

  const term = page.locator('.glossary-term').first();
  await term.hover();

  const tooltip = page.locator('.glossary-tooltip.visible');
  await expect(tooltip).toBeVisible();
});
```

---

### 2. Navigation Tests

**Purpose:** Test page transitions, routing

**Examples:**
- Click link → navigates to correct page
- Back button works
- URL params preserved
- 404 page shows

**Pattern:**
```javascript
test('should navigate to docs page', async ({ page }) => {
  await page.goto('/');

  await page.locator('a[href="/docs/"]').click();

  await expect(page).toHaveURL(/\/docs\//);
  await expect(page.locator('h1')).toContainText('Documentation');
});
```

---

### 3. Content Rendering Tests

**Purpose:** Verify correct content displays

**Examples:**
- Page title correct
- All sections render
- No missing images
- Markdown renders correctly

**Pattern:**
```javascript
test('should render all glossary terms', async ({ page }) => {
  await page.goto('/docs/dict/');

  const cards = page.locator('.glossary-card');
  await expect(cards).toHaveCount.greaterThan(0);

  const firstCard = cards.first();
  await expect(firstCard.locator('h3')).toBeVisible();
  await expect(firstCard.locator('.badge')).toBeVisible();
  await expect(firstCard.locator('.glossary-card__summary')).toBeVisible();
});
```

---

### 4. Responsive Tests

**Purpose:** Test mobile, tablet, desktop layouts

**Pattern:**
```javascript
test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display correctly on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Test layout
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    });
  });
});
```

---

### 5. Form Validation Tests

**Purpose:** Test form inputs, validation, submission

**Pattern:**
```javascript
test('should show error for empty email', async ({ page }) => {
  await page.goto('/contact/');

  await page.fill('input[name="email"]', '');
  await page.click('button[type="submit"]');

  const error = page.locator('.error-message');
  await expect(error).toContainText('Email is required');
});
```

---

### 6. Accessibility Tests

**Purpose:** Test keyboard navigation, ARIA labels, screen reader compatibility

**Pattern:**
```javascript
test('should be keyboard navigable', async ({ page }) => {
  await page.goto('/');

  // Tab through focusable elements
  await page.keyboard.press('Tab');
  const firstLink = page.locator('a').first();
  await expect(firstLink).toBeFocused();

  // Enter activates link
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/.+/);
});
```

---

### 7. Performance Tests

**Purpose:** Test load times, asset sizes

**Pattern:**
```javascript
test('should load page in under 3 seconds', async ({ page }) => {
  const start = Date.now();
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const duration = Date.now() - start;

  expect(duration).toBeLessThan(3000);
});

test('should lazy-load images', async ({ page }) => {
  await page.goto('/blog/');

  const images = page.locator('img[loading="lazy"]');
  await expect(images.first()).toBeVisible();
});
```

---

### 8. Error Handling Tests

**Purpose:** Test error states, 404, 500, network failures

**Pattern:**
```javascript
test('should show 404 page for invalid URL', async ({ page }) => {
  await page.goto('/non-existent-page/');

  await expect(page.locator('h1')).toContainText('404');
});

test('should handle network failure gracefully', async ({ page }) => {
  // Mock network failure
  await page.route('**/api/*', route => route.abort());

  await page.goto('/');

  const error = page.locator('.error-message');
  await expect(error).toBeVisible();
});
```

---

## Playwright Best Practices

### 1. Use Auto-Waiting

**Good:**
```javascript
// Playwright waits automatically
await page.locator('button').click();
```

**Bad:**
```javascript
// Don't use manual waits
await page.waitForTimeout(1000);
await page.locator('button').click();
```

---

### 2. Use Specific Locators

**Good:**
```javascript
page.locator('button[aria-label="Submit"]')
page.getByRole('button', { name: 'Submit' })
page.getByText('Submit')
```

**Bad:**
```javascript
page.locator('button')  // Too generic
page.locator('.btn')    // Fragile (CSS class may change)
```

---

### 3. Use Page Object Model (for complex features)

**File:** `tests/e2e/pages/glossary-page.js`

```javascript
export class GlossaryPage {
  constructor(page) {
    this.page = page;
    this.alphabetNav = page.locator('.alphabet-nav');
    this.glossaryCards = page.locator('.glossary-card');
  }

  async goto() {
    await this.page.goto('/docs/dict/');
  }

  async clickLetter(letter) {
    await this.alphabetNav.locator(`a[href="#${letter}"]`).click();
  }

  async getTermCard(index) {
    return this.glossaryCards.nth(index);
  }

  async getTermCount() {
    return await this.glossaryCards.count();
  }
}
```

**Usage:**
```javascript
import { GlossaryPage } from '../pages/glossary-page';

test('should navigate by alphabet', async ({ page }) => {
  const glossaryPage = new GlossaryPage(page);
  await glossaryPage.goto();

  await glossaryPage.clickLetter('I');

  const section = page.locator('#I');
  await expect(section).toBeVisible();
});
```

---

### 4. Group Related Tests

```javascript
test.describe('Feature Name', () => {
  test.describe('Happy Path', () => {
    test('scenario 1', async ({ page }) => {});
    test('scenario 2', async ({ page }) => {});
  });

  test.describe('Edge Cases', () => {
    test('edge case 1', async ({ page }) => {});
    test('edge case 2', async ({ page }) => {});
  });

  test.describe('Error Handling', () => {
    test('error 1', async ({ page }) => {});
    test('error 2', async ({ page }) => {});
  });
});
```

---

### 5. Use Fixtures for Common Setup

**File:** `tests/e2e/fixtures/glossary-fixture.js`

```javascript
import { test as base } from '@playwright/test';
import { GlossaryPage } from '../pages/glossary-page';

export const test = base.extend({
  glossaryPage: async ({ page }, use) => {
    const glossaryPage = new GlossaryPage(page);
    await glossaryPage.goto();
    await use(glossaryPage);
  },
});
```

**Usage:**
```javascript
import { test, expect } from '../fixtures/glossary-fixture';

test('should have terms', async ({ glossaryPage }) => {
  const count = await glossaryPage.getTermCount();
  expect(count).toBeGreaterThan(0);
});
```

---

## Test Naming Conventions

### Structure

```
should [expected behavior] when [condition]
```

**Examples:**

**Good:**
```javascript
test('should show tooltip when hovering over glossary term')
test('should navigate to docs page when clicking "Read more" link')
test('should display error message when form is submitted empty')
test('should mark only first occurrence of term in article')
```

**Bad:**
```javascript
test('tooltip')  // Too vague
test('test navigation')  // Not descriptive
test('it works')  // Not informative
```

---

## Assertions - Common Patterns

### Visibility

```javascript
await expect(element).toBeVisible();
await expect(element).toBeHidden();
await expect(element).not.toBeVisible();
```

### Text Content

```javascript
await expect(element).toHaveText('exact text');
await expect(element).toContainText('partial text');
await expect(element).toHaveText(/regex pattern/);
```

### Attributes

```javascript
await expect(link).toHaveAttribute('href', '/docs/');
await expect(img).toHaveAttribute('alt', 'Description');
await expect(element).toHaveClass('active');
```

### Count

```javascript
await expect(elements).toHaveCount(5);
await expect(elements).toHaveCount.greaterThan(0);
```

### URL

```javascript
await expect(page).toHaveURL('http://localhost:1313/docs/');
await expect(page).toHaveURL(/\/docs\//);
```

### Focus

```javascript
await expect(input).toBeFocused();
```

---

## Running Tests

### Local Development

```bash
# Install browsers (first time only)
pnpm exec playwright install

# Run all tests (headless)
pnpm exec playwright test

# Run with UI (headed mode)
pnpm exec playwright test --headed

# Run specific test file
pnpm exec playwright test glossary-tooltips.spec.js

# Run specific test
pnpm exec playwright test -g "should show tooltip"

# Debug mode (step through)
pnpm exec playwright test --debug

# View HTML report
pnpm exec playwright show-report
```

---

### CI/CD (GitHub Actions)

**File:** `.github/workflows/test.yml`

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
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

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps chromium

      - name: Run Playwright tests
        run: pnpm exec playwright test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Visual Regression Testing (Optional)

### Using Percy.io

**Install:**
```bash
pnpm add -D @percy/playwright
```

**Usage:**
```javascript
import percySnapshot from '@percy/playwright';

test('should match visual snapshot', async ({ page }) => {
  await page.goto('/docs/dict/');
  await percySnapshot(page, 'Glossary Page');
});
```

**CI Integration:**
```yaml
- name: Run Percy tests
  run: pnpm exec percy exec -- playwright test
  env:
    PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

---

## Accessibility Testing

### Using axe-core

**Install:**
```bash
pnpm add -D @axe-core/playwright
```

**Usage:**
```javascript
import { injectAxe, checkA11y } from 'axe-playwright';

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});

test('should have accessible tooltip', async ({ page }) => {
  await page.goto('/blog/article/');
  await page.locator('.glossary-term').first().hover();

  await injectAxe(page);
  await checkA11y(page, '.glossary-tooltip');
});
```

---

## Test Coverage Goals

### Minimum Coverage (MVP)

- ✅ **Happy path:** Primary user flows work
- ✅ **Navigation:** All links work, no 404s
- ✅ **Content:** Pages render correctly
- ✅ **Responsive:** Mobile + desktop layouts work

### Recommended Coverage

Above +
- ✅ **Edge cases:** Boundary conditions tested
- ✅ **Error handling:** Errors display correctly
- ✅ **Forms:** Validation works
- ✅ **Accessibility:** Keyboard nav, ARIA labels

### Comprehensive Coverage

Above +
- ✅ **Performance:** Load times, asset sizes
- ✅ **Visual regression:** No UI breakage
- ✅ **Cross-browser:** Firefox, Safari tested
- ✅ **Mobile devices:** Real device testing

---

## Debugging Failed Tests

### 1. View Screenshots

```bash
# Screenshots saved in: test-results/
ls test-results/
```

### 2. View Trace

```bash
pnpm exec playwright show-trace test-results/trace.zip
```

### 3. Use Debug Mode

```bash
pnpm exec playwright test --debug
```

### 4. Console Logs

```javascript
test('debug test', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.goto('/');
});
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Don't use hard-coded waits

```javascript
// BAD
await page.waitForTimeout(1000);

// GOOD
await expect(element).toBeVisible();
```

### ❌ Don't rely on CSS classes

```javascript
// BAD (fragile)
page.locator('.btn-primary')

// GOOD (semantic)
page.getByRole('button', { name: 'Submit' })
```

### ❌ Don't test implementation details

```javascript
// BAD (tests how it works)
test('should call handleClick function', async ({ page }) => {
  // Testing internal function
});

// GOOD (tests what user sees)
test('should show tooltip when clicking term', async ({ page }) => {
  // Testing user behavior
});
```

### ❌ Don't write flaky tests

```javascript
// BAD (race condition)
await page.click('button');
await page.click('.result');  // May not exist yet

// GOOD (auto-wait)
await page.click('button');
await expect(page.locator('.result')).toBeVisible();
await page.click('.result');
```

---

## Success Metrics

### Test Suite Quality

- **Pass rate:** > 99% (on main branch)
- **Flakiness:** < 1% retries needed
- **Speed:** Full suite < 5 minutes
- **Coverage:** > 80% of user-facing features

### CI/CD Integration

- **PRs blocked:** If tests fail
- **Auto-retry:** Max 2 retries on failure
- **Reports:** HTML report uploaded as artifact
- **Notifications:** Slack/Email on failure

---

## Migration Path (For Existing Features)

### Phase 1: Setup (1 day)
1. Install Playwright: `pnpm add -D @playwright/test`
2. Create `playwright.config.js`
3. Create `tests/e2e/` structure
4. Write first "smoke test" (homepage loads)

### Phase 2: Critical Paths (2-3 days)
1. Test homepage navigation
2. Test blog post reading
3. Test docs page reading
4. Test search functionality

### Phase 3: Feature Coverage (ongoing)
1. Add tests as new features developed
2. Retroactively add tests for existing features
3. Target: 1 test per feature minimum

---

## Resources

**Official Documentation:**
- Playwright: https://playwright.dev/docs/intro
- Best Practices: https://playwright.dev/docs/best-practices

**Examples:**
- Example tests: `tests/e2e/specs/*.spec.js`
- This spec's test examples

**Community:**
- Playwright Discord: https://aka.ms/playwright/discord
- GitHub Discussions: https://github.com/microsoft/playwright/discussions

---

## Appendix: Example Test Suites

**Smoke Tests Example:**
See: `.claude/specs/002-smoke-tests.md` for complete smoke test implementation covering:
- Critical pages load
- Navigation menu completeness
- Homepage content verification
- Multilingual configuration
- Real-world incident prevention (2025-10-18)

**Feature Tests Example:**
Future feature specs (e.g., `003-feature-name.md`) will include complete test examples following this architecture.

This testing architecture spec is the foundation - feature specs build upon it.

---

**End of Testing Architecture Spec**
