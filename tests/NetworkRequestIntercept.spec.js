import {expect, test} from '@playwright/test';

test('Request Intercept', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
        waitUntil: "domcontentloaded"
    });
    const email = "testable@gmail.com";
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Testable@123");
    await page.getByRole("button", {name:"login"}).click();

    await page.waitForEvent("load");
    expect(await page.title()).toMatch("Let's Shop");

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
            route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6abca4a82be7a4bc2b7bba56'})
        )

    await page.locator("button[routerlink*='/myorders']").click();
    await page.locator('button:has-text("View")').first().click();
    await page.pause();
})