import {test,expect} from "@playwright/test";
import { url } from "node:inspector";

//Below is the syntax of writing the test
/*

test("title or description of test",()=>{


})
*/

//Fixture = Global variable. Like page, browser etc.

test("Verify page URL",async ({page})=>{  
    
    //async is asynchronas nature that means every statement in the function is returning a promise 
    // and we need to wait promise to full fill we use await statement

    await page.goto("https://www.amazon.in/"); //This is used to open the URL

    let title:string=await page.url(); //This is used to get the URL of the page
     console.log("URL:",url);  //This is used to print the URL

await expect(page).toHaveURL("https://www.amazon.in/");

})

//npx playwright test - This command is used to run a all the tests that comes under the 'test'
//npx playwright test mytestspec.ts - This command is used to run a specific test from 'test'
//npx playwright test --project=chromium - This command is used to run a specific test in specified browser even there is multiple
//browsers are available in config file
//npx playwright test mytestspec.ts mytest2.spec.ts - This command is used to run multiple files
//npx playwright test -g "Verify" - This command is used to run a test where the test name/title contains given keywork from entire title
// -g means global from all the test files
//npx playwright test --ui - This command is used to open playwright UI
//npx playwright test mytest.spec.ts --debug - This command is used to run a test in debug mode