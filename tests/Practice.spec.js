import {test, expect} from '@playwright/test'

test ('Section One', async ({ page }) =>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.locator("[value='radio1']").check();
    await page.locator(".ui-autocomplete-input").fill("Ind");

    const dropdownValues = await page.locator(".ui-menu-item-wrapper").allTextContents();
    console.log(dropdownValues);

}
);