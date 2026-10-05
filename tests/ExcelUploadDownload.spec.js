import {test, expect} from "@playwright/test";
import exceljs from "exceljs";

test('Download Edit Upload Excel', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    await page.getByRole('button', {name:'Download'}).click();
    await page.waitForEvent('download');

})

