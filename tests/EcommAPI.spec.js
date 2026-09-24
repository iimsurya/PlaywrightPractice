import {test, expect, request} from "@playwright/test";

const loginData = {userEmail: "testable@gmail.com", userPassword: "Testable@123"};
const orderData = {orders: [{country: "Argentina", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let token;
let orderID;

test.beforeEach( 'Login using API', async () => {
//test(async () => {
    const loginAPIContext = await request.newContext();
    const loginResponse = await loginAPIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginData
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    token = loginResponseJSON.token;
    console.log(token);
});

test('Login',async ({page}) =>
{
    await page.addInitScript( value => {
            window.localStorage.setItem('token', value);
    }, token);
    await page.pause();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    const placeOrderContext = await request.newContext();
   const orderResponse = await placeOrderContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderData,
            headers: {
                'Authorization': token,
                'Content-Type': 'Application/json'
            },
        })
        const orderResponseJSON = await orderResponse.json();
        orderID = orderResponseJSON.orders;
        console.log(orderID);

})