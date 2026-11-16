import {test,expect,Locator} from "@playwright/test";

test ("Single select drpdown", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");


/*Below is the DOM for the static dropdown list.

<div class="form-group" xpath="1">
    <label for="animals">Sorted List:</label>

    <select class="form-control" id="animals" multiple
            name="animals">

        <option value="cat">Cat</option>
        <option value="cheetah">Cheetah</option>
        <option value="deer">Deer</option>
        <option value="dog">Dog</option>
        <option value="elephant">Elephant</option>
        <option value="fox">Fox</option>
        <option value="giraffe">Giraffe</option>
        <option value="lion">Lion</option>
        <option value="rabbit">Rabbit</option>
        <option value="zebra">Zebra</option>

    </select>
</div>
*/

const totaloptions:Locator=page.locator('#animals>option') //Store all the values in totaloptions
console.log(await totaloptions.allTextContents()); //Print all the values of totaloptions

const animalsDropdown = page.locator('#animals'); //Locate the animals locator

await animalsDropdown.selectOption('Cat'); //Select Cat from animals

await page.waitForTimeout(5000);

})