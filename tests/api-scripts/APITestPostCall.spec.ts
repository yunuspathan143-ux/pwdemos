import {test, expect, Locator} from "@playwright/test"

test ("API testing Post call",async({request})=>{
const res1 = await request.post("https://restful-booker.herokuapp.com/booking",{
    data:{
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}

})

console.log(await res1.json() )

expect (res1.status()).toBe(200)
expect (res1.statusText()).toBe("OK")

const jsonres1 = await res1.json()

expect (jsonres1.booking).toMatchObject({
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    })
})
