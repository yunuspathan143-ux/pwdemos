import {test, expect, Locator} from "@playwright/test"

test ("API testing GET method",async({request})=>{

    const response1 = await request.get("https://restful-booker.herokuapp.com/booking")
    console.log(await response1.json())

})
