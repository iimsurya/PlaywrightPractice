import {test, expect, request} from "@playwright/test";
const {APIUtils} = require("./APIUtils");

const loginData = {userEmail: "testable@gmail.com", userPassword: "Testable@123"};
const orderData = {orders: [{country: "Argentina", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

let response;

test.beforeAll( 'Login using API', async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginData);
    response = await apiUtils.placeOrder(orderData);

});


test.only('Login',async ({page}) =>
{

    await page.addInitScript( value => {
            window.localStorage.setItem('token', value);
    }, response.token);
    await page.pause();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    const newOrderID = response.orderID;
    await page.locator("button[routerlink*='/myorders']").click();


    const orderCount = await page.locator("[scope='row']").count();
    for(let i=0;i<orderCount; i++){
        const orderID = await page.locator("[scope='row']").nth(i).textContent();
        if(newOrderID.includes(orderID)){
            await page.locator("[scope='row'] ~ td > button:has-text('View')").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".col-title + div")).toContainText(newOrderID);

    await page.screenshot({path : "testScreenshots/viewOrder.png"});

    await page.locator("button[routerlink*='/myorders']").click();

    for(let i=0;i<orderCount; i++){
        const orderID = await page.locator("[scope='row']").nth(i).textContent();
        if(newOrderID.includes(orderID)){
            await page.locator("[scope='row'] ~ td > button:has-text('Delete')").nth(i).click();
            break;
        }
    }

})