import { test, expect } from '@playwright/test';

test('Verify SauceDemo login page title and button', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Verify page title
  await expect(page).toHaveTitle('Swag Labs');

  // Verify login button is visible
  await expect(page.locator('#login-button')).toBeVisible();
});
