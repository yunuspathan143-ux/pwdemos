import { test, expect, chromium } from '@playwright/test';

test('Complete Beginner Guide: Open Chrome, Login, Assert & Close', async () => {

    // -------------------------------------------------------------
    // STEP 1: Open Google Chrome Browser (Headless: false to see UI)
    // -------------------------------------------------------------
    // 'channel: chrome' launches your actual installed Google Chrome browser
    const browser = await chromium.launch({ channel: 'chrome', headless: false, slowMo: 400 });
    const context = await browser.newContext();
    const page = await context.newPage();

    // -------------------------------------------------------------
    // STEP 2: Navigate to the website
    // -------------------------------------------------------------
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // -------------------------------------------------------------
    // STEP 3: Username Field
    // -------------------------------------------------------------
    // Primary In-built Locator:
    await page.getByLabel('Username').fill('student');

    /*
     * ALL POSSIBLE IN-BUILT LOCATOR WAYS FOR USERNAME:
     * 1. By Label:        page.getByLabel('Username')
     * 2. By Role & Name:  page.getByRole('textbox', { name: 'Username' })
     * 3. By Placeholder:  page.getByPlaceholder('Enter your username') (if page has placeholder)
     * 4. By Test ID:      page.getByTestId('username-input')           (if page has data-testid)
     */

    // -------------------------------------------------------------
    // STEP 4: Password Field
    // -------------------------------------------------------------
    // Primary In-built Locator:
    await page.getByLabel('Password').fill('Password123');

    /*
     * ALL POSSIBLE IN-BUILT LOCATOR WAYS FOR PASSWORD:
     * 1. By Label:        page.getByLabel('Password')
     * 2. By Role & Name:  page.getByRole('textbox', { name: 'Password' })
     * 3. By Placeholder:  page.getByPlaceholder('Enter your password') (if page has placeholder)
     * 4. By Test ID:      page.getByTestId('password-input')           (if page has data-testid)
     */

    // -------------------------------------------------------------
    // STEP 5: Submit / Login Button
    // -------------------------------------------------------------
    // Primary In-built Locator:
    await page.getByRole('button', { name: 'Submit' }).click();

    /*
     * ALL POSSIBLE IN-BUILT LOCATOR WAYS FOR SUBMIT BUTTON:
     * 1. By Role & Name:  page.getByRole('button', { name: 'Submit' })
     * 2. By Exact Text:   page.getByText('Submit', { exact: true })
     * 3. By Title:        page.getByTitle('Submit Form')               (if page has title attribute)
     * 4. By Test ID:      page.getByTestId('submit-btn')               (if page has data-testid)
     */

    // -------------------------------------------------------------
    // STEP 6: Assert Success Message, URL & Title
    // -------------------------------------------------------------
    // Primary In-built Locator Assertion:
    // 1. Check that the heading is visible on screen
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();

    // 2. Simple way to check that the heading has the exact text:
    await expect(page.getByRole('heading')).toHaveText('Logged In Successfully');

    // 3. Get the current URL and store it in a variable
    const currentURL = page.url();
    console.log('Current Page URL is:', currentURL);
    expect(currentURL).toBe('https://practicetestautomation.com/logged-in-successfully/');

    // 4. Get the current Title and store it in a variable
    const currentTitle = await page.title();
    console.log('Current Page Title is:', currentTitle);
    expect(currentTitle).toBe('Logged In Successfully | Practice Test Automation');

    /*
     * ALL POSSIBLE IN-BUILT LOCATOR WAYS FOR SUCCESS MESSAGE:
     * 1. By Role & Name:  page.getByRole('heading', { name: 'Logged In Successfully' })
     * 2. By Role & Level: page.getByRole('heading', { level: 1 })
     * 3. By Text:         page.getByText('Logged In Successfully')
     * 4. By Partial Text: page.getByText('Congratulations')
     */

    console.log('Login test executed successfully!');

    // -------------------------------------------------------------
    // STEP 7: Close Google Chrome Browser
    // -------------------------------------------------------------
    await context.close();
    await browser.close();

});
