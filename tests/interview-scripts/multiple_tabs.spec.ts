import { test, expect } from '@playwright/test';

/**
 * QUESTION 3: How to handle multiple tabs in Playwright?
 * VERY SIMPLE CODE FOR BEGINNERS
 */

test('1. Handle new tab opened by clicking a link', async ({ page, context }) => {
  // Step 1: Open website page
  await page.goto('https://the-internet.herokuapp.com/windows');

  // Step 2: Listen for new tab event BEFORE clicking link
  const newTabPromise = context.waitForEvent('page');

  // Step 3: Click link that opens new tab
  await page.getByRole('link', { name: 'Click Here' }).click();

  // Step 4: Wait and get new tab object
  const newTab = await newTabPromise;

  // Step 5: Check URL on new tab
  await expect(newTab).toHaveURL('https://the-internet.herokuapp.com/windows/new');

  // Step 6: Switch back to main tab
  await page.bringToFront();

  // Step 7: Close new tab
  await newTab.close();
});

test('2. Open and switch between multiple tabs manually', async ({ context }) => {
  // Step 1: Open Tab 1
  const tab1 = await context.newPage();
  await tab1.goto('https://testautomationpractice.blogspot.com/');

  // Step 2: Open Tab 2
  const tab2 = await context.newPage();
  await tab2.goto('https://the-internet.herokuapp.com/');

  // Step 3: Switch to Tab 1 and verify title
  await tab1.bringToFront();
  await expect(tab1).toHaveTitle(/Automation Testing Practice/);

  // Step 4: Switch to Tab 2 and verify title
  await tab2.bringToFront();
  await expect(tab2).toHaveTitle(/The Internet/);

  // Step 5: Close tabs
  await tab1.close();
  await tab2.close();
});
