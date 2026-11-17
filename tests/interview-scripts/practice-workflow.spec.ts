import { test, expect } from '@playwright/test';

test('Verify example domain page title and heading', async ({ page }) => {
  await page.goto('https://example.com');

  // Intentional failure for practice:
  // The actual heading on example.com is "Example Domain", but we expect "Welcome to Google"
  await expect(page.locator('h1')).toHaveText('Welcome to Google');
});
