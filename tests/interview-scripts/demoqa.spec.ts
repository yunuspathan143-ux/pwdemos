import { test, expect } from "@playwright/test";

test.describe("DemoQA Page Verification", () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the demoqa website before each test
        await page.goto("https://demoqa.com");
    });

    test("Verify page title", async ({ page }) => {
        // Retrieve and print the page title
        const title: string = await page.title();
        console.log("Page Title is:", title);

        // Verify page title
        await expect(page).toHaveTitle("demosite");
    });

    test("Verify page URL", async ({ page }) => {
        // Retrieve and print the page URL
        const url: string = page.url();
        console.log("Page URL is:", url);

        // Verify page URL
        await expect(page).toHaveURL("https://demoqa.com/");
    });
});
