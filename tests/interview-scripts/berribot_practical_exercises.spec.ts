import { test, expect } from '@playwright/test';

/**
 * ============================================================================
 *         TCS BERRIBOT AI INTERVIEW - PLAYWRIGHT PRACTICAL EXERCISES
 * ============================================================================
 * 
 * Target Role: QA Automation Engineer / SDET
 * Level: Ultra Beginner-Friendly (Simple Step-by-Step Code)
 * 
 * KEY PRINCIPLES IN THIS SCRIPT:
 * 1. Simple, direct code (easy to read and explain in interviews).
 * 2. Uses Playwright user-facing locators (getByRole, getByText, getByPlaceholder).
 * 3. No complex Promise.all or tricky JavaScript syntax.
 * 
 * ============================================================================
 */

test.describe('TCS BerriBot QA Automation - Practical Exercises Suite', () => {

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 1: Handling Multiple Tabs / Pop-up Windows
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Open 'https://the-internet.herokuapp.com/windows'.
     * 2. Click 'Click Here' to open a new tab.
     * 3. Switch to the new tab and verify heading 'New Window'.
     * 4. Close the new tab and return to the main page.
     */
    test('Exercise 1: Multiple Tabs and Child Window Handling', async ({ context, page }) => {
        // Step 1: Open main page
        await page.goto('https://the-internet.herokuapp.com/windows');

        // Step 2: Start waiting for the new tab, then click the link
        const newTabPromise = context.waitForEvent('page');
        await page.getByRole('link', { name: 'Click Here' }).click();
        const newTab = await newTabPromise;

        // Step 3: Verify heading inside the new tab
        await expect(newTab.getByRole('heading', { name: 'New Window' })).toBeVisible();

        // Step 4: Close the new tab
        await newTab.close();

        // Step 5: Verify we are back on the main page
        await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible();

        console.log('Exercise 1 Passed: Multiple tabs handled successfully.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 2: Dynamic Web Table Traversal & In-Row Actions
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Open 'https://the-internet.herokuapp.com/tables'.
     * 2. Find the row that contains 'jsmith@gmail.com'.
     * 3. Click the 'edit' link inside THAT specific row.
     * 4. Verify URL has '#edit'.
     */
    test('Exercise 2: Dynamic Web Table Row Traversal & Action', async ({ page }) => {
        // Step 1: Open table page
        await page.goto('https://the-internet.herokuapp.com/tables');

        // Step 2: Find the row containing the user's email
        const userRow = page.getByRole('row').filter({ hasText: 'jsmith@gmail.com' }).first();

        // Step 3: Click 'edit' link inside that specific row
        await userRow.getByRole('link', { name: 'edit' }).click();

        // Step 4: Verify URL changed to '#edit'
        await expect(page).toHaveURL(/#edit/);

        console.log('Exercise 2 Passed: Dynamic table row located and edit clicked.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 3: Network Interception & API Mocking (`page.route`)
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Intercept fruits API call: '* / ** /api/v1/fruits'.
     * 2. Return our own mock data: 'TCS Strawberry' and 'Playwright Mango'.
     * 3. Open 'https://demo.playwright.dev/api-mocking'.
     * 4. Verify mock data is visible on screen.
     */
    test('Exercise 3: Network Interception & API Mocking', async ({ page }) => {
        // Step 1: Intercept the fruits API and return our custom data
        await page.route('*/**/api/v1/fruits', async (route) => {
            await route.fulfill({
                json: [
                    { name: 'TCS Strawberry', id: 1 },
                    { name: 'Playwright Mango', id: 2 }
                ]
            });
        });

        // Step 2: Open the demo page
        await page.goto('https://demo.playwright.dev/api-mocking');

        // Step 3: Verify our mocked fruit names appear on the screen
        await expect(page.getByText('TCS Strawberry')).toBeVisible();
        await expect(page.getByText('Playwright Mango')).toBeVisible();

        console.log('Exercise 3 Passed: API mocked and verified on UI.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 4: Dynamic Auto-Suggest / Search Dropdowns
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Open 'https://www.wikipedia.org/'.
     * 2. Type 'Playwright' in the search box.
     * 3. Click suggestion 'Playwright (software)'.
     * 4. Verify page heading is 'Playwright (software)'.
     */
    test('Exercise 4: Dynamic Auto-Suggest Dropdown Selection', async ({ page }) => {
        // Step 1: Open Wikipedia
        await page.goto('https://www.wikipedia.org/');

        // Step 2: Type in the search box
        await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Playwright');

        // Step 3: Click the suggestion directly from the dropdown
        await page.getByText('Playwright (software)').first().click();

        // Step 4: Verify the page heading
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Playwright (software)');

        console.log('Exercise 4 Passed: Auto-suggest option selected and verified.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 5: Handling iFrames with `frameLocator`
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Open 'https://the-internet.herokuapp.com/iframe'.
     * 2. Access the editor inside the iframe using in-built getByLabel.
     * 3. Type 'Hello from Playwright!'.
     * 4. Verify typed text is visible.
     */
    test('Exercise 5: Handling iFrames with frameLocator', async ({ page }) => {
        // Step 1: Open page
        await page.goto('https://the-internet.herokuapp.com/iframe');

        // Step 2: Target the editor inside the iframe
        const editor = page.frameLocator('iframe').getByLabel('Rich Text Area');

        // Step 3: Type text inside the editor
        await editor.fill('Hello from Playwright!');

        // Step 4: Verify text inside the editor
        await expect(editor).toHaveText('Hello from Playwright!');

        console.log('Exercise 5 Passed: Typed inside iframe and verified.');
    });

    /**
     * ------------------------------------------------------------------------
     * EXERCISE 6: File Upload & Download Scenarios
     * ------------------------------------------------------------------------
     * QUESTION:
     * Part A (Upload):
     * 1. Open 'https://the-internet.herokuapp.com/upload'.
     * 2. Upload 'sample.txt'.
     * 3. Click 'Upload' button and verify 'sample.txt' is visible.
     * 
     * Part B (Download):
     * 1. Open 'https://the-internet.herokuapp.com/download'.
     * 2. Click file download link.
     * 3. Verify download completed.
     */
    test('Exercise 6: File Upload and Download Handling', async ({ page }) => {
        // --- Part A: File Upload ---
        // Step 1: Open upload page
        await page.goto('https://the-internet.herokuapp.com/upload');

        // Step 2: Choose the file and click Upload button
        await page.getByRole('button', { name: 'Choose File' }).setInputFiles('sample.txt');
        await page.getByRole('button', { name: 'Upload' }).click();

        // Step 3: Verify success message and uploaded file name
        await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
        await expect(page.getByText('sample.txt')).toBeVisible();

        console.log('Part A Passed: File uploaded successfully.');

        // --- Part B: File Download ---
        // Step 1: Open download page
        await page.goto('https://the-internet.herokuapp.com/download');

        // Step 2: Start waiting for download, then click the link
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('link').nth(1).click();
        const download = await downloadPromise;

        // Step 3: Verify the file has a name
        const fileName = download.suggestedFilename();
        console.log(`Downloaded file name: ${fileName}`);
        expect(fileName).toBeTruthy();

        console.log('Exercise 6 Passed: File upload and download verified successfully.');
    });

});


/*
 * ============================================================================
 *   CATEGORY B: CORE LANGUAGE (JAVASCRIPT / TYPESCRIPT) CODING PROBLEMS
 * ============================================================================
 * 
 * Simple, beginner-friendly solutions for interview coding questions:
 * 
 * ----------------------------------------------------------------------------
 * 1. FIND DUPLICATES IN AN ARRAY
 * ----------------------------------------------------------------------------
 * function findDuplicates(arr: number[]): number[] {
 *     // Return elements that appear more than once
 *     return arr.filter((item, index) => arr.indexOf(item) !== index);
 * }
 * // Example: findDuplicates([1, 2, 3, 2, 4, 1]) -> [2, 1]
 * 
 * 
 * ----------------------------------------------------------------------------
 * 2. REVERSE A STRING WITHOUT BUILT-IN .reverse()
 * ----------------------------------------------------------------------------
 * function reverseString(str: string): string {
 *     let reversed = '';
 *     for (let i = str.length - 1; i >= 0; i--) {
 *         reversed += str[i];
 *     }
 *     return reversed;
 * }
 * // Example: reverseString('Playwright') -> 'thgirwyalP'
 * 
 * 
 * ----------------------------------------------------------------------------
 * 3. CHECK IF A STRING IS A PALINDROME
 * ----------------------------------------------------------------------------
 * function isPalindrome(str: string): boolean {
 *     const reversed = str.split('').reverse().join('');
 *     return str.toLowerCase() === reversed.toLowerCase();
 * }
 * // Example: isPalindrome('madam') -> true
 * 
 * 
 * ----------------------------------------------------------------------------
 * 4. FIND THE SECOND LARGEST NUMBER IN AN ARRAY
 * ----------------------------------------------------------------------------
 * function findSecondLargest(arr: number[]): number {
 *     // Remove duplicates, sort highest to lowest, pick second item
 *     const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
 *     return uniqueSorted[1];
 * }
 * // Example: findSecondLargest([10, 45, 23, 90, 89]) -> 89
 * 
 * 
 * ----------------------------------------------------------------------------
 * 5. GET VALUE FROM NESTED OBJECT (API VALIDATION)
 * ----------------------------------------------------------------------------
 * function getNestedValue(obj: any, path: string): any {
 *     let current = obj;
 *     for (const key of path.split('.')) {
 *         current = current?.[key];
 *     }
 *     return current;
 * }
 * // Example: getNestedValue({ data: { user: { name: 'John' } } }, 'data.user.name') -> 'John'
 * 
 * 
 * ----------------------------------------------------------------------------
 * 6. ASYNC SLEEP / DELAY HELPER
 * ----------------------------------------------------------------------------
 * const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
 * // Example: await sleep(2000); // pauses execution for 2 seconds
 * ============================================================================
 */
