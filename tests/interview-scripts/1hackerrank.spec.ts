import { test, expect } from '@playwright/test';

/**
 * ============================================================================
 *           HACKERRANK PLAYWRIGHT INTERVIEW CODING SCRIPT (TYPESCRIPT)
 * ============================================================================
 * 
 * Rules for this script:
 * 1. Uses Playwright IN-BUILT USER-FACING LOCATORS:
 *    - getByPlaceholder()
 *    - getByRole()
 *    - getByLabel()
 *    - getByText()
 * 2. Every element includes COMMENTED ALTERNATIVE IN-BUILT LOCATORS for interview prep.
 * 3. Written in very simple language with step-by-step beginner explanations.
 * 
 * ============================================================================
 */

test.describe('HackerRank Playwright Interview Practice Suite', () => {

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 1: Open Website, Check Page Title & Current URL
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Navigate to 'https://www.saucedemo.com/'.
     * 2. Verify that the URL contains 'saucedemo.com'.
     * 3. Verify that the Page Title is 'Swag Labs'.
     */
    test('Exercise 1: Page Navigation, Title & URL Verification', async ({ page }) => {
        // Step 1: Open the website
        await page.goto('https://www.saucedemo.com/');

        // Step 2: Get and print the Current URL and Page Title
        const currentUrl = page.url(); // Synchronous method
        const currentTitle = await page.title(); // Asynchronous method (requires await)

        console.log(`Current Page URL: ${currentUrl}`);
        console.log(`Current Page Title: ${currentTitle}`);

        // Step 3: Verify page URL (using regex or exact string)
        await expect(page).toHaveURL(/.*saucedemo.com/);

        // Step 4: Verify page Title
        await expect(page).toHaveTitle('Swag Labs');

        console.log('Exercise 1 Passed: Navigation, URL, and Title verified successfully.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 2: User Login & Verify Success Header
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Go to 'https://www.saucedemo.com/'.
     * 2. Enter username 'standard_user' into username input.
     * 3. Enter password 'secret_sauce' into password input.
     * 4. Click the 'Login' button.
     * 5. Verify that the URL redirects to '/inventory.html'.
     * 6. Verify that the header text 'Products' is visible.
     */
    test('Exercise 2: User Login & Header Verification', async ({ page }) => {
        // Step 1: Open login page
        await page.goto('https://www.saucedemo.com/');

        // --------------------------------------------------------------------
        // Step 2: Fill Username
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        await page.getByPlaceholder('Username').fill('standard_user');

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR USERNAME:
         * 1. By Role & Name:   page.getByRole('textbox', { name: 'Username' })
         * 2. By Label:         page.getByLabel('Username') (if associated <label> exists)
         */

        // --------------------------------------------------------------------
        // Step 3: Fill Password
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        await page.getByPlaceholder('Password').fill('secret_sauce');

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR PASSWORD:
         * 1. By Role & Name:   page.getByRole('textbox', { name: 'Password' })
         * 2. By Label:         page.getByLabel('Password') (if associated <label> exists)
         */

        // --------------------------------------------------------------------
        // Step 4: Click Login button
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        await page.getByRole('button', { name: 'Login' }).click();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR LOGIN BUTTON:
         * 1. By Text:          page.getByText('Login', { exact: true })
         */

        // --------------------------------------------------------------------
        // Step 5: Verify URL redirection
        // --------------------------------------------------------------------
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        // --------------------------------------------------------------------
        // Step 6: Verify the Success Header
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const headerTitle = page.getByText('Products', { exact: true });
        await expect(headerTitle).toBeVisible();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR HEADER TITLE:
         * 1. By Role (Heading): page.getByRole('heading', { name: 'Products' })
         */

        console.log('Exercise 2 Passed: User logged in and header title verified.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 3: Product Search / List Count & Price Verification
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Login to the application.
     * 2. Verify that the product 'Sauce Labs Backpack' is visible.
     * 3. Verify its price is '$29.99'.
     */
    test('Exercise 3: Product Item & Price Verification', async ({ page }) => {
        // Step 1: Login
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // --------------------------------------------------------------------
        // Step 2: Locate the product by its text title
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const productTitle = page.getByText('Sauce Labs Backpack');
        await expect(productTitle).toBeVisible();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR PRODUCT TITLE:
         * 1. By Role Link:  page.getByRole('link', { name: 'Sauce Labs Backpack' })
         */

        // --------------------------------------------------------------------
        // Step 3: Verify the price text
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const productPrice = page.getByText('$29.99');
        await expect(productPrice).toBeVisible();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR PRICE:
         * 1. Filtered container: page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByText('$29.99')
         */

        console.log('Exercise 3 Passed: Product items count & price verified.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 4: Add to Cart & Cart Badge Verification
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Login to Swag Labs.
     * 2. Click 'Add to cart' on 'Sauce Labs Backpack' and 'Sauce Labs Bike Light'.
     * 3. Verify shopping cart badge shows '2'.
     * 4. Open the shopping cart page.
     * 5. Verify both items are present in the cart.
     */
    test('Exercise 4: Add to Cart & Cart Badge Verification', async ({ page }) => {
        // Login
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        // --------------------------------------------------------------------
        // Step 1: Add two items to cart (Pure In-Built Locators: getByText)
        // --------------------------------------------------------------------
        // 1. Click product name 'Sauce Labs Backpack' -> Add to cart -> Back
        await page.getByText('Sauce Labs Backpack', { exact: true }).click();
        await expect(page).toHaveURL(/.*inventory-item/);
        await page.getByRole('button', { name: 'Add to cart' }).click();
        await page.getByRole('button', { name: 'Back to products' }).click();

        // 2. Click product name 'Sauce Labs Bike Light' -> Add to cart -> Back
        await page.getByText('Sauce Labs Bike Light', { exact: true }).click();
        await expect(page).toHaveURL(/.*inventory-item/);
        await page.getByRole('button', { name: 'Add to cart' }).click();
        await page.getByRole('button', { name: 'Back to products' }).click();

        /*
         * ALTERNATIVE WAYS TO CLICK SPECIFIC BUTTONS BY INDEX:
         * 
         * // 1st Button (Sauce Labs Backpack):
         * await page.getByRole('button', { name: 'Add to cart' }).first().click();
         * 
         * // 2nd Button (Sauce Labs Bike Light):
         * await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
         * 
         * // 3rd Button (Sauce Labs Bolt T-Shirt):
         * await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();
         */

        // --------------------------------------------------------------------
        // Step 2: Verify cart badge shows count = 2
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const cartBadge = page.getByText('2', { exact: true });
        await expect(cartBadge).toBeVisible();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR CART BADGE:
         * 1. By Role Link: page.getByRole('link', { name: '2' })
         */

        // --------------------------------------------------------------------
        // Step 3: Navigate to Cart page
        // --------------------------------------------------------------------
        // Primary In-Built Locator: Click the shopping cart badge '2'
        await page.getByText('2', { exact: true }).click();

        await expect(page).toHaveURL(/.*cart.html/);

        // --------------------------------------------------------------------
        // Step 4: Verify items inside cart
        // --------------------------------------------------------------------
        // Primary In-Built Locators:
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
        await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

        console.log('Exercise 4 Passed: Added products to cart and verified successfully.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 5: Static Dropdown Select & Price Sort Verification
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Login to Swag Labs.
     * 2. Select 'Price (low to high)' from the sort dropdown.
     * 3. Extract all product prices and verify they are sorted in ascending order.
     */
    test('Exercise 5: Dropdown Select & Price Sort Verification', async ({ page }) => {
        // Login
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // --------------------------------------------------------------------
        // Step 1: Select dropdown option using in-built getByRole('combobox')
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const sortDropdown = page.getByRole('combobox');
        await sortDropdown.selectOption('lohi'); // 'lohi' = Price (low to high)

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR DROPDOWN:
         * 1. By Option Label: page.getByRole('combobox').selectOption({ label: 'Price (low to high)' })
         */

        // --------------------------------------------------------------------
        // Step 2: Fetch all prices and verify sorting
        // --------------------------------------------------------------------
        // 1. Get raw string prices directly: ["$7.99", "$9.99", "$15.99", "$29.99"]
        const prices = await page.locator('.inventory_item_price').allInnerTexts();

        // 2. Sort using numeric string comparison
        const collator = new Intl.Collator(undefined, { numeric: true });
        const sortedPrices = [...prices].sort(collator.compare);

        // 3. Verify
        expect(prices).toEqual(sortedPrices);

        console.log('Exercise 5 Passed: Dropdown sorted and price order verified.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 6: Radio Button & Checkbox Handling
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Go to 'https://testautomationpractice.blogspot.com/'.
     * 2. Select the 'Male' radio button and verify it is checked.
     * 3. Select 'Sunday' and 'Monday' checkboxes and verify they are checked.
     */
    test('Exercise 6: Radio Button & Checkbox Handling', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');

        // --------------------------------------------------------------------
        // Step 1: Radio button selection
        // --------------------------------------------------------------------
        // Primary In-Built Locator (exact: true prevents matching 'Female'):
        const maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
        await maleRadio.check();
        await expect(maleRadio).toBeChecked();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR RADIO BUTTON:
         * 1. By Label: page.getByLabel('Male', { exact: true })
         */

        // --------------------------------------------------------------------
        // Step 2: Checkboxes selection
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const sundayCheckbox = page.getByRole('checkbox', { name: 'Sunday' });
        const mondayCheckbox = page.getByRole('checkbox', { name: 'Monday' });

        await sundayCheckbox.check();
        await mondayCheckbox.check();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR CHECKBOXES:
         * 1. By Label: page.getByLabel('Sunday')
         * 2. By Label: page.getByLabel('Monday')
         */

        // Step 3: Verify checkboxes are checked
        await expect(sundayCheckbox).toBeChecked();
        await expect(mondayCheckbox).toBeChecked();

        console.log('Exercise 6 Passed: Radio buttons and checkboxes verified.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 7: JavaScript Alert / Confirm Popup Handling
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Go to 'https://testautomationpractice.blogspot.com/'.
     * 2. Set up a dialog listener to accept the confirm dialog.
     * 3. Click the 'Confirmation Alert' button.
     * 4. Verify the confirmation text on page says 'You pressed OK!'.
     */
    test('Exercise 7: JavaScript Alert / Confirm Popup Handling', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');

        // Step 1: Attach dialog event listener BEFORE triggering action
        page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            expect(dialog.type()).toBe('confirm');
            await dialog.accept(); // Clicks "OK"
        });

        // --------------------------------------------------------------------
        // Step 2: Trigger popup using in-built locator getByRole
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        await page.getByRole('button', { name: 'Confirmation Alert' }).click();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR ALERT BUTTON:
         * 1. By Text: page.getByText('Confirmation Alert')
         */

        // --------------------------------------------------------------------
        // Step 3: Verify the result message on page
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const resultText = page.getByText('You pressed OK!');
        await expect(resultText).toBeVisible();

        console.log('Exercise 7 Passed: Dialog accepted and result verified.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 8: Web Table - Find Row by Name & Verify Cell Value
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Go to 'https://testautomationpractice.blogspot.com/'.
     * 2. Find the row for Book 'Master In Selenium'.
     * 3. Verify its Author is 'Mukesh' and its Price is '3000'.
     */
    test('Exercise 8: Web Table Row Search & Cell Verification', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');

        // --------------------------------------------------------------------
        // Step 1: Find row containing 'Master In Selenium' using in-built getByRole
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const targetRow = page.getByRole('row', { name: /Master In Selenium/ });
        await expect(targetRow).toBeVisible();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR TABLE ROW:
         * 1. Filtered row: page.getByRole('row').filter({ hasText: 'Master In Selenium' })
         */

        // --------------------------------------------------------------------
        // Step 2: Verify Author 'Mukesh' inside the row
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const authorCell = targetRow.getByRole('cell', { name: 'Mukesh' });
        await expect(authorCell).toBeVisible();

        // --------------------------------------------------------------------
        // Step 3: Verify Price '3000' inside the row
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const priceCell = targetRow.getByRole('cell', { name: '3000' });
        await expect(priceCell).toBeVisible();

        console.log('Exercise 8 Passed: Web table row and cell data verified.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 9: Negative Scenario - Invalid Login Error Verification
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Go to 'https://www.saucedemo.com/'.
     * 2. Enter locked out username 'locked_out_user' and password 'secret_sauce'.
     * 3. Click Login.
     * 4. Verify error message contains 'Sorry, this user has been locked out.'.
     */
    test('Exercise 9: Negative Login & Error Message Assertion', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        // --------------------------------------------------------------------
        // Step 1: Fill Credentials using in-built locators
        // --------------------------------------------------------------------
        await page.getByPlaceholder('Username').fill('locked_out_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // --------------------------------------------------------------------
        // Step 2: Verify error message using in-built getByText
        // --------------------------------------------------------------------
        // Primary In-Built Locator:
        const errorMessage = page.getByText(/Epic sadface: Sorry, this user has been locked out/);
        await expect(errorMessage).toBeVisible();

        /*
         * ALTERNATIVE IN-BUILT LOCATORS FOR ERROR MESSAGE:
         * 1. By Partial Text: page.getByText('Sorry, this user has been locked out.')
         * 2. By Role (alert): page.getByRole('heading', { name: /locked out/i })
         */

        console.log('Exercise 9 Passed: Negative login error message verified.');
    });

});
