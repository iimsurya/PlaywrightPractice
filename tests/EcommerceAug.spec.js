import { test, expect} from "@playwright/test"

test ('login' , async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash', {
        waitUntil : 'domcontentloaded'
    });

    await page.locator('#userEmail').fill('testable@gmail.com');
    await page.locator('#userPassword').fill('Testable@123');
    await page.locator('#login').click();

    await page.screenshot({path : 'testScreenshots/login.png'})
    
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    //Search product
    const productToSearch = 'iPhone17 Pro';
    const products = await page.locator('.card-body');
    const productCount = await products.count();

    for(let i=0; i<productCount; i++){
        const productName = await products.nth(i).locator('b').textContent();

        if(productName.trim() === productToSearch){
            await page.screenshot({path : 'testScreenshots/screenshotProduct.png'})
            await products.nth(i).locator('text= Add To Cart ').click();
            break;
        }
        console.log(productName);
    }
    
    //page.pause();
    const cartBtn = page.locator('[routerlink = "/dashboard/cart"]');
    await cartBtn.screenshot({path : 'testScreenshots/element.png'});

    await page.locator('[routerlink = "/dashboard/cart"]').click();
    await page.locator('.cart h3').waitFor();
    const bool = await page.locator("h3:has-text('iPhone17 Pro')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.screenshot({path : 'testScreenshots/checkoutPage.png'});

    //checkout page

    await page.locator('.payment__type--cc').waitFor();
    const cc = await page.locator('.payment__type--cc').isEnabled();
    expect(cc).toBeTruthy();

    await page.locator("[class^='input txt']").nth(1).fill('677');
    await page.locator("[class^='input txt']").nth(2).fill('Surya');
    await page.locator("[class^='input txt']").nth(3).fill('rahulshettyacademy');
    await page.locator("button:has-text('Apply Coupon')").click();
    const coupon = await page.locator('[name="coupon"] + p').isEnabled();
    expect(coupon).toBeTruthy();

    await page.locator('[placeholder="Select Country"]').pressSequentially("ind");
    const country = page.locator('.ta-results');
    await country.waitFor();
    const options = await country.locator('button');
    const optionsCount = await options.count();
    for(let i = 0; i<optionsCount; i++){
        const text = await options.nth(i).textContent();
        if(text === ' India'){
            await options.nth(i).click();
            break;
        }
    }

    await page.screenshot({path : 'testScreenshots/payment.png'});


});