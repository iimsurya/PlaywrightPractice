import { test } from '@playwright/test';

test('Place Order', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash', {
    waitUntil: 'domcontentloaded',
  });

  await page.locator('#userEmail').fill('testable@gmail.com');
  await page.locator('#userPassword').fill('Testable@123');

  await page.locator('#login').click();

  await page.waitForLoadState('networkidle');

  const productToSearch = 'iPhone17 Pro';
  const products = page.locator('.card-body');
  const productCount = await products.count();

  for (let i = 0; i < productCount; i++) {
    const productName = await products.nth(i).locator('b').textContent();

    if (productName?.trim() === productToSearch) {
      await products.nth(i).locator('i').click();
      break;
    }
  }
});