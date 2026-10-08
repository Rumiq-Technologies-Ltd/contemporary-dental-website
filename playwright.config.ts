import { defineConfig, devices } from '@playwright/test';
import { join } from 'node:path';

// Keep browser installs inside the project when the host has a restricted home.
process.env.PLAYWRIGHT_BROWSERS_PATH ??= join(process.cwd(), '.playwright-browsers');

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1520, height: 1000 } } },
    // Optional cross-engine check; Firefox startup is restricted on some hosts.
    ...(process.env.CDC_TEST_FIREFOX ? [{ name: 'firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1520, height: 1000 } } }] : []),
  ],
  webServer: { command: 'npm run start', url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI, timeout: 60_000 },
});
