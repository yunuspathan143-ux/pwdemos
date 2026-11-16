import {test,expect,Locator} from "@playwright/test";
test ("Single select drpdown", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.getByLabel('Country:', { exact: true }).selectOption('India');

    await page.waitForTimeout(5000);


    

    //npx playwright test mytest.spec.ts

})