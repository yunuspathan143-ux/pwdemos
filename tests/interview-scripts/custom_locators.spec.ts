import { test, expect } from '@playwright/test';

/**
 * Playwright Concept for Beginners:
 * Locators in Playwright are "lazy" — they don't search the page immediately.
 * You can store a locator in a variable at any time (even before the element appears),
 * and Playwright will find the element when you click, type, or verify it!
 */

test('Example 1: Store locator in a variable before element appears on screen', async ({ page }) => {
  // 1. Go to the website
  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

  // 2. Store the locator in a variable (the message is not on the page yet)
  const message = page.getByText("It's gone!");

  // 3. Click the "Remove" button (this triggers the message to appear)
  await page.getByRole('button', { name: 'Remove' }).click();

  // 4. Verify that the message is now visible and has correct text
  await expect(message).toBeVisible();
  await expect(message).toHaveText("It's gone!");
});


test('Example 2: Store locator in a variable and perform actions', async ({ page }) => {
  // 1. Go to the website
  await page.goto('https://testautomationpractice.blogspot.com/');

  // 2. Store the "Home" link locator in a variable
  const homeLink = page.getByRole('link', { name: 'Home' }).first();

  // 3. Check if the link is visible
  await expect(homeLink).toBeVisible();

  // 4. Click the link using the stored variable
  await homeLink.click();
});
