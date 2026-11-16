import {test,expect,Locator} from "@playwright/test"

//Textbox

test("Textbox input actions", async({page})=> {

await page.goto("https://testautomationpractice.blogspot.com/");

const name:Locator = page.getByPlaceholder('Enter Name');
await expect(name).toBeVisible();
await expect(name).toBeEnabled();


await name.fill("John Canedy");
const enteredvalue: string =await name.inputValue();
console.log("You have enterted the name as",enteredvalue); //Returns the input value of name.

});

//Radio button

test("Radio button actions", async({page})=> {

await page.goto("https://testautomationpractice.blogspot.com/");

const gendermale:Locator=page.getByLabel('Male', { exact: true });
await expect(gendermale).toBeVisible;
await expect(gendermale).toBeEnabled;

expect(await gendermale.isChecked()).toBe(false);

await gendermale.check(); //This will select the radio button
//expect(await gendermale.isChecked()).toBe(true);
await expect (gendermale).toBeChecked();


//npx playwright test mytest.spec.ts

});


//Checkbox

test("Checkbox actions", async({page})=> {

await page.goto("https://testautomationpractice.blogspot.com/");

//Select a specific singe checkbox of SUNDAY
const sundaycheckbox:Locator=page.getByLabel('Sunday', { exact: true })
await sundaycheckbox.check();
await expect(sundaycheckbox).toBeChecked();
await page.waitForTimeout(5000); //This wil wait on the page for 5 seconds

//Capture the checkboxes in an array and check is it 7
const days:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']; //days is an array with all days values
const checkboxes:Locator[]=days.map(index=>page.getByLabel(index));
expect (checkboxes.length).toBe(7); //This will verify the total number of checkboxes is 7


//To select all the checkboxes and validate/assert each is checked
for(const checkbox of checkboxes)
{
await checkbox.check(); //This will select all the checkboxes
await expect(checkbox).toBeChecked();
}
await page.waitForTimeout(5000); //This wil wait on the page for 5 seconds

//Uncheck/Unselect last 3 checkboxes and validate/assert
for(const checkbox of checkboxes.slice(-3)) 
{
await checkbox.uncheck(); //This will uncheck last 3 checkbox
await expect(checkbox).not.toBeChecked();
}
await page.waitForTimeout(5000); //This wil wait on the page for 5 seconds


//Toggle checkboxes - If checked -> uncheck, and if unchecked -> check. Assert state flipped.
for(const checkbox of checkboxes)
{
   if (await checkbox.isChecked())
   {
        //Below two statements applicable only if checkboxes checked
        await checkbox.uncheck(); //This will uncheck last 3 checkbox
        await expect(checkbox).not.toBeChecked(); //This will verify uncheked checkbox
   }

else
{
        //Below two statements applicable only if checkboxes not checked
        await checkbox.check(); //This will select all the checkboxes
        await expect(checkbox).toBeChecked();
}


}
await page.waitForTimeout(5000); //This wil wait on the page for 5 seconds


//Randomly select chceckoxes - Select checkboxes by index (1,3,6) and assert
const indexes:number[]=[1,3,6];

for (const i of indexes)
    {
    await checkboxes[i].check(); //checkboxes is declared above
    await expect(checkboxes[i]).toBeChecked(); 
    }


//npx playwright test mytest.spec.ts

});