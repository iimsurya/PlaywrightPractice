const {test, expect} = require("@playwright/test")

test('Advanced UI actions', async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept());

    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href='lifetime-access']:visible").click();
    const h2Text = await framePage.locator(".text h2").textContent();
    console.log(h2Text.split(" ").at(2));

})