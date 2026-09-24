import {test, expect, request} from "@playwright/test";

const loginData = {userEmail: "testable@gmail.com", userPassword: "Testable@123"};

test( 'Login using API', async () => {
//test(async () => {
    const loginAPIContext = await request.newContext();
    const loginResponse = await loginAPIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginData
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    const token = loginResponseJSON.token;
    console.log(token);
});

