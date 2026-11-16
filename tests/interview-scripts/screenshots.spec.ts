import { test, expect } from '@playwright/test';

/**
 * QUESTION 4: How to take a screenshot in Playwright?
 * VERY SIMPLE CODE FOR BEGINNERS
 */

test('1. Take a basic page screenshot', async ({ page }) => {
  // Step 1: Open website page
  await page.goto('https://example.com');

  // Step 2: Take screenshot of visible area
  await page.screenshot({ path: 'test-results/screenshots/page.png' });
});

test('2. Take a full page screenshot', async ({ page }) => {
  // Step 1: Open website page
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Step 2: Take full page scrollable screenshot
  await page.screenshot({ 
    path: 'test-results/screenshots/full_page.png', 
    fullPage: true 
  });
});

test('3. Take screenshot of a specific element only', async ({ page }) => {
  // Step 1: Open website page
  await page.goto('https://example.com');

  // Step 2: Locate element (e.g. h1 heading)
  const heading = page.locator('h1');

  // Step 3: Take screenshot of ONLY that single element
  await heading.screenshot({ path: 'test-results/screenshots/header.png' });
});
