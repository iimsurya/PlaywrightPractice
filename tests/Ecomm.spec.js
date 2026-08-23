import {expect, test} from "@playwright/test";

test('Shopping Application', async ({page}) => {

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
    waitUntil: "domcontentloaded"
  });
  const email = "testable@gmail.com";
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Testable@123");
  await page.getByRole("button", {name:"login"}).click();

  await page.waitForEvent("load");
  expect(await page.title()).toMatch("Let's Shop");

  const productToSearch = "ADIDAS ORIGINAL";
  const addBtn = page.locator('.card-body', { hasText: productToSearch }).getByRole('button', { name: /add to cart/i });
  await expect(addBtn).toBeVisible();
  await addBtn.scrollIntoViewIfNeeded();
  await addBtn.click();

})