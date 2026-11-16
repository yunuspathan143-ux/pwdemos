import {test, expect} from "@playwright/test";

test ("Verify the title of the page",async ({page})=>{

    await page.goto ("https://www.google.com");

    let title:string = await page.title();
    console.log("Title is:", title);

    await expect(page).toHaveTitle("Google"); 


})