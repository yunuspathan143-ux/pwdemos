import {test, expect, Locator} from "@playwright/test"

test ("Test auto suggest dynamic dropdown",async({page})=>{
    
await page.goto("https://www.flipkart.com/")
await page.getByRole('textbox', { name: 'Search for Products, Brands and More' }).fill("smart");


//npx playwright test mytest.spec.ts

})