import { test, expect, Locator } from '@playwright/test';

test('Verify Email or phone input field locator on Gmail sign-in page', async ({ page }) => {
    const gmailUrl = 'https://accounts.google.com/v3/signin/identifier?continue=https://mail.google.com/mail/?service%3Dmail%26flowName%3DGlifWebSignIn%26flowEntry%3DAccountChooser%26ec%3Dasw-gmail-globalnav-signin&uj=gafb-gmail_asw-globalnav-en&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-2061115610:1787211028088254';

    // Navigate to Gmail Sign-In Page
    await page.goto(gmailUrl);

    // =========================================================================
    // LOCATORS FOR "Email or phone" FIELD:
    // =========================================================================

    // 1. Using getByLabel (Recommended Playwright approach)
    const emailInputByLabel: Locator = page.getByLabel('Email or phone');

    // 2. Using getByRole (Accessibility role approach)
    const emailInputByRole: Locator = page.getByRole('textbox', { name: 'Email or phone' });

    // 3. Using ID locator
    const emailInputById: Locator = page.locator('#identifierId');

    // 4. Using Name attribute locator
    const emailInputByName: Locator = page.locator('input[name="identifier"]');

    // =========================================================================
    // VERIFICATION & INTERACTIONS:
    // =========================================================================

    // Assert that the Email or phone input field is visible
    await expect(emailInputByLabel).toBeVisible();

    // Fill sample text into the Email or phone field
    await emailInputByLabel.fill('user@gmail.com');

    // Verify the value in the input field
    await expect(emailInputByLabel).toHaveValue('user@gmail.com');
});
