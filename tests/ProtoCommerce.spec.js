import {test, expect} from "@playwright/test";

test('HomePage form', async ({page}) => {

    //test level wait
    const alteredSixSecondExpect = expect.configure({timeout: 6000})
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");

    await page.locator(".form-group input[name='name']").fill("Surya");
    await page.locator("input[name=email]").fill("test@test.com")
    await page.getByPlaceholder("Password").fill("abc@1234")
    await page.getByRole("button", {name : "Submit"}).click();
    const successText = await page.getByText("Success! The Form has been submitted successfully!.").textContent();
    expect(successText).toMatch("Success! The Form has been submitted successfully!.");

    await page.getByRole("link", {name : "Shop"}).click();

    // Element level wait
    //await alteredSixSecondExpect (page.locator("h1.my-41")).toBeVisible(); //{timeout : 7000}

    await page.locator("app-card").filter({hasText : "Nokia Edge"}).getByRole("button").click();

    }

)