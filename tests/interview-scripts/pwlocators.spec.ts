/*page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
await page.getByLabel('User Name').fill('John');

await page.getByLabel('Password').fill('secret-password');

await page.getByRole('button', { name: 'Sign in' }).click();

await expect(page.getByText('Welcome, John!')).toBeVisible();

*/


import {test,expect,Locator} from "@playwright/test"

test ("Verify image locator using getByAltText",async({page})=>{

await page.goto("https://playground.qatools.dev/");

//page.getByAltText() to locate an element, usually image, by its text alternative.

const logo:Locator=page.getByAltText("Shopping bags after a haul");
await expect(logo).toBeVisible();


//page.getByText() to locate by text content

/*const text:Locator = page.getByText("Welcome to our store");
await expect(text).toBeVisible();*/

//await expect(page.getByText("Welcome to our store")).toBeVisible();

const text:Locator = page.getByText ("Browse categories");
await expect (text).toBeVisible();

// Close tour modal overlay if it appears
const tourModalBtn = page.locator('button:has-text("Skip"), button:has-text("Close"), .modal-overlay button').first();
if (await tourModalBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
  await tourModalBtn.click();
}

await page.getByRole("link",{name:'Sign in'}).click();
await expect(page.getByRole("heading",{name:'Login'})).toBeVisible();

await page.getByRole("link",{name:'Create one'}).click();

//page.getByLabel() to locate a form control by associated label's text.

await page.getByLabel("Full name").fill ("John Doe");
await page.getByLabel("Email").fill ("test@test.com");
//OR
//page.getByPlaceholder() to locate an input by placeholder
await page.getByPlaceholder("you@example.com").fill("test@test.com");
await page.getByLabel("Password",{exact:true}).fill ("Test@123");
await page.getByLabel("Confirm password").fill ("Test@123");

//page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
await page.getByTestId("signup-country").selectOption("IN");



})