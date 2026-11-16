import { test, expect, chromium } from '@playwright/test';

test('Beginner Friendly: How to Automate All Website Elements', async () => {

    // 1. OPEN CHROME BROWSER
    const browser = await chromium.launch({ channel: 'chrome', headless: false, slowMo: 400 });
    const context = await browser.newContext();
    const page = await context.newPage();

    // 2. OPEN WEBSITE
    await page.goto('https://testautomationpractice.blogspot.com/');


    // -------------------------------------------------------------------------
    // 1. TEXTBOX -> Use page.getByPlaceholder()
    // -------------------------------------------------------------------------
    await page.getByPlaceholder('Enter Name').fill('John Doe');
    await page.getByPlaceholder('Enter EMail').fill('john@example.com');


    // -------------------------------------------------------------------------
    // 2. TEXTAREA -> Use page.getByRole()
    // -------------------------------------------------------------------------
    await page.getByRole('textbox', { name: 'Address:' }).fill('123 Main Street, New York');


    // -------------------------------------------------------------------------
    // 3. RADIO BUTTON -> Use page.getByLabel()
    // -------------------------------------------------------------------------
    await page.getByLabel('Female').check();
    await expect(page.getByLabel('Female')).toBeChecked();


    // -------------------------------------------------------------------------
    // 4. CHECKBOX -> Use page.getByLabel()
    // -------------------------------------------------------------------------
    // Check Sunday
    await page.getByLabel('Sunday').check();
    await expect(page.getByLabel('Sunday')).toBeChecked();

    // Uncheck Sunday
    await page.getByLabel('Sunday').uncheck();
    await expect(page.getByLabel('Sunday')).not.toBeChecked();


    // -------------------------------------------------------------------------
    // 5. DROPDOWN (Single Select) -> Use page.getByLabel()
    // -------------------------------------------------------------------------
    await page.getByLabel('Country:').selectOption('India');
    await expect(page.getByLabel('Country:')).toHaveValue('india');


    // -------------------------------------------------------------------------
    // 6. MULTI-SELECT DROPDOWN -> Use page.getByLabel()
    // -------------------------------------------------------------------------
    await page.getByLabel('Colors:').selectOption(['Red', 'Blue', 'Green']);


    // -------------------------------------------------------------------------
    // 7. DATE PICKER -> Use page.getByPlaceholder()
    // -------------------------------------------------------------------------
    await page.getByPlaceholder('Start Date').fill('2026-05-15');


    // -------------------------------------------------------------------------
    // 8. FILE UPLOAD -> Use page.getByRole()
    // -------------------------------------------------------------------------
    await page.getByRole('button', { name: 'Choose File' }).first().setInputFiles('sample.txt');


    // -------------------------------------------------------------------------
    // 9. BUTTON -> Use page.getByRole()
    // -------------------------------------------------------------------------
    await page.getByRole('button', { name: 'START' }).click();


    // -------------------------------------------------------------------------
    // 10. LINK -> Use page.getByRole()
    // -------------------------------------------------------------------------
    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();


    // -------------------------------------------------------------------------
    // 11. DRAG AND DROP -> Use page.getByText()
    // -------------------------------------------------------------------------
    const dragItem = page.getByText('Drag me to my target');
    const dropTarget = page.getByText('Drop here');
    await dragItem.dragTo(dropTarget);


    // 12. CLOSE BROWSER
    await context.close();
    await browser.close();

});
