import {test,request} from "@playwright/test";
const {APIUtils} = require("./APIUtils");

const loginData = {userEmail: "testable@gmail.com", userPassword: "Testable@123"};
const orderData = {orders: [{country: "Argentina", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const mockGetOrder = {data:[],message:"No Orders"};
let response;

test.beforeAll( async({}) => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginData);
    response = await apiUtils.placeOrder(orderData);

});

test('Network Intercept and Override', async ({page}) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    //Network Intercept and override response
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {

        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(mockGetOrder);
        await route.fulfill({
            response,
            body,
        });
        }
    );

    await page.locator("button[routerlink*='/myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    const noOrderDisplayMessage = await page.locator('.mt-4').textContent();
    console.log(noOrderDisplayMessage);
});