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
