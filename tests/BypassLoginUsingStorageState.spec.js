import {test, expect} from "@playwright/test";

let contextWithLoginStorage;

test.beforeAll('Login and Capture Storage state', async ({browser}) =>{

   const contextWithStorageState = await browser.newContext();
   const page = await contextWithStorageState.newPage();
   await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash', {
      waitUntil: "domcontentloaded"
   });
   await page.getByPlaceholder('email@example.com').fill('testable@gmail.com');
   await page.locator('#userPassword').pressSequentially('Testable@123');
   await page.getByRole('button', {name: 'login'}).click();
   //await page.waitForLoadState('networkidle');
   await page.locator('.card-body b').first().waitFor();

   await contextWithStorageState.storageState({path:'state.json'});
   contextWithLoginStorage = await browser.newContext({storageState: 'state.json'});
});

test('TestCase 1', async ({page}) =>{
   await contextWithLoginStorage.newPage();
})