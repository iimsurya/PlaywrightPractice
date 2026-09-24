import {test, expect, request} from "@playwright/test";

const loginData = {userEmail: "testable@gmail.com", userPassword: "Testable@123"};
let token;
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

})