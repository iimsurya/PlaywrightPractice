import {expect, test} from "@playwright/test";

test('Shopping Application - Delete from cart', async ({page}) => {

  test.setTimeout(15000);
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
  //const addBtn =
  await page.locator('.card-body', { hasText: productToSearch }).getByRole('button', { name: " Add To Cart" }).click();
  // await expect(addBtn).toBeVisible();
  // await addBtn.scrollIntoViewIfNeeded();
  // await addBtn.click();

  await page.locator(".btn-custom", {hasText: "  Cart "}).click()

  const productNames = await page.locator(".cartSection h3");
  for(let i=0; i < await productNames.count(); i++){
    if((await productNames.nth(i).textContent()).match(productToSearch)){
      await page.locator(".btn-danger").nth(i).click();
      break;
    }
  }

  const deleteProduct = await page.getByLabel("No Product in Your Cart").textContent();
      //await page.locator("div[aria-label='No Product in Your Cart']").textContent();
  console.log(deleteProduct);
  expect(deleteProduct).toMatch("No Product in Your Cart");

})