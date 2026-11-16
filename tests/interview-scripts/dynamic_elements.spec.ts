import { test, expect } from '@playwright/test';

/**
 * QUESTION 1: How to handle dynamic elements created at runtime?
 * VERY SIMPLE CODE FOR BEGINNERS
 */

test('1. Automatic waiting for dynamic element to appear', async ({ page }) => {
  // Step 1: Open website page
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

  // Step 2: Click button to start loading the dynamic element
  await page.getByRole('button', { name: 'Start' }).click();

  // Step 3: Define locator for the text that will appear later
  const resultText = page.locator('#finish h4');

  // Step 4: Playwright automatically waits for the element to appear on page!
  await expect(resultText).toBeVisible({ timeout: 10000 });

  // Step 5: Verify the text content
  await expect(resultText).toHaveText('Hello World!');
});

test('2. Explicitly wait for dynamic loading spinner to disappear', async ({ page }) => {
  // Step 1: Open website page
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

  // Step 2: Click start button
  await page.getByRole('button', { name: 'Start' }).click();

  // Step 3: Define locator for loading spinner
  const loadingSpinner = page.locator('#loading');

  // Step 4: Wait until loading spinner disappears from screen
  await loadingSpinner.waitFor({ state: 'hidden' });

  // Step 5: Check that the final loaded element is now visible
  await expect(page.locator('#finish h4')).toBeVisible();
});
