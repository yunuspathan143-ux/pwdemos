/*

Exercise 3: Product Item & Price Verification
Website: https://www.saucedemo.com/
Tasks:
Login with valid credentials.
Locate the product 'Sauce Labs Backpack' and verify it is visible.
Verify that its price is displayed as '$29.99'.
Exercise 4: Add to Cart & Cart Badge Count Verification
Website: https://www.saucedemo.com/
Tasks:
Login to Swag Labs.
Click 'Add to cart' on 'Sauce Labs Backpack' and 'Sauce Labs Bike Light'.
Verify that the shopping cart badge count shows '2'.
Click the shopping cart link to navigate to the cart page (/cart.html).
Verify both 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' are displayed inside the cart.
Exercise 5: Static Dropdown Select & Price Sorting Verification
Website: https://www.saucedemo.com/
Tasks:
Login to Swag Labs.
Select the sort option 'Price (low to high)' from the dropdown (combobox).
Extract all product prices, convert them into numbers, and print them.
Verify using an assertion that the prices are sorted in ascending order.
Exercise 6: Radio Button & Checkbox Handling
Website: https://testautomationpractice.blogspot.com/
Tasks:
Navigate to the practice page.
Select the 'Male' radio button and verify that it is checked.
Check both the 'Sunday' and 'Monday' checkboxes.
Verify that both checkboxes are checked.
Exercise 7: JavaScript Alert / Confirm Popup Handling
Website: https://testautomationpractice.blogspot.com/
Tasks:
Navigate to the practice page.
Set up a dialog listener (page.once('dialog', ...)) to assert the dialog type is 'confirm' and accept it (OK).
Click the 'Confirmation Alert' button.
Verify the result message on the page displays 'You pressed OK!'.
Exercise 8: Web Table Row Search & Cell Verification
Website: https://testautomationpractice.blogspot.com/
Tasks:
Navigate to the practice page.
Locate the row in the table that contains the book name 'Master In Selenium'.
Verify that the row is visible.
Verify that the Author cell contains 'Mukesh'.
Verify that the Price cell contains '3000'.
Exercise 9: Negative Scenario - Invalid / Locked User Login
Website: https://www.saucedemo.com/
Tasks:
Navigate to the login page.
Enter username 'locked_out_user' and password 'secret_sauce'.
Click the 'Login' button.
Verify that the error message is displayed and contains 'Sorry, this user has been locked out.'.
1:21 PM
*/

import { test, expect } from '@playwright/test';


/*
Exercise 1: Page Navigation, Title & URL Verification
Website: https://www.saucedemo.com/
Tasks:
Open the website.
Get and print the current URL and page Title in the console.
Verify that the URL contains saucedemo.com.
Verify that the Page Title is 'Swag Labs'.
*/

/*
test ('Verify page Navigation, URL and Title', async ({page})=>{

    await page.goto('https://www.saucedemo.com/');
    const currentURL = page.url();
    console.log ('The URL is:', currentURL);
    await expect (page).toHaveURL(/.*saucedemo.com/);

    const currentTitle = page.title();
    console.log ('The Title is:', currentTitle);
    await expect(page).toHaveTitle('Swag Labs');

});

*/

/*
Exercise 2: User Login & Header Verification
Website: https://www.saucedemo.com/
Tasks:
Open the login page.
Enter username 'standard_user'.
Enter password 'secret_sauce'.
Click the 'Login' button.
Verify that the URL redirects to https://www.saucedemo.com/inventory.html.
Verify that the success header text 'Products' is visible.
*/

/*
test ('Login and Header Verificatio', async ({page})=>{

    await page.goto ('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.waitForTimeout(3000);
    await page.getByText('Login').click();
    //await page.getByRole('button', { name: 'Login' }).click();

   

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const headerTitle = page.getByText('Products');
    await expect (headerTitle).toBeVisible();

    await page.waitForTimeout(3000);

});
*/

/**
     * ------------------------------------------------------------------------
     * EXERCISE 3: Product Search / List Count & Price Verification
     * ------------------------------------------------------------------------
     * QUESTION:
     * 1. Login to the application.
     * 2. Verify that the product 'Sauce Labs Backpack' is visible.
     * 3. Verify its price is '$29.99'.
     */


/*
test ('Product search, List count and price verification', async ({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', {name:'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name: 'Password'}).fill('secret_sauce');
    await page.waitForTimeout(3000);
    await page.getByRole('button', {name: 'Login'}).click();

    const product = page.getByText('Sauce Labs Backpack');
    await expect (product).toBeVisible();

    await page.waitForTimeout(3000);
    
    const price = page.getByText('$29.99');
    await expect (price).toBeVisible();

    
});

*/

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



test('Add to Cart & Cart Badge Verification', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByText('Login').click();

    await page.getByText('Add to cart').first().click();
    //await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByText('Add to cart').nth(0).click();

    await page.waitForTimeout(4000);

    //const cartbadge = page.getByRole('link', {name: '2'});
    const cartbadge = page.getByText('2', { exact: true });
    await expect(cartbadge).toBeVisible();
    await page.getByText('2', { exact: true }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    const item1 = page.getByText('Sauce Labs Backpack', { exact: true });
    const item2 = page.getByText('Sauce Labs Bike Light', { exact: true });
    expect(item1).toBeVisible;
    expect(item2).toBeVisible;

    await page.waitForTimeout(3000);

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
/* test('Exercise 5: Dropdown Select & Price Sort Verification', async ({ page }) => {
     // Login
     await page.goto('https://www.saucedemo.com/');
     await page.getByPlaceholder('Username').fill('standard_user');
     await page.getByPlaceholder('Password').fill('secret_sauce');
     await page.getByRole('button', { name: 'Login' }).click();

     

           
     await page.getByRole('combobox',{name:'Sort products'}).selectOption('lohi');
    //const sortDropdown = page.getByRole('combobox');
    //await sortDropdown.selectOption('lohi'); // 'lohi' = Price (low to high)

     await page.waitForTimeout (3000);



 });*/