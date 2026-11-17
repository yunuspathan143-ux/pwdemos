import { test, expect } from '@playwright/test';

test('Verify example domain page title and heading', async ({ page }) => {
  await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });

  // Use Playwright recommended user-facing locator:
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible({ timeout: 10000 });
});
