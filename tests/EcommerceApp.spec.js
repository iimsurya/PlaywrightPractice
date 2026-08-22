import { test, expect} from "@playwright/test"

test ('login' , async ({page}) => {

    const email = "testable@gmail.com";
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash', {
        waitUntil : 'domcontentloaded'
    });

    await page.locator('#userEmail').fill(email);
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
    await expect(await page.locator(".user__name label")).toHaveText(email);
    await page.screenshot({path : 'testScreenshots/payment.png'});

    await page.locator(".action__submit").click();

    //page.pause();

    await page.locator(".hero-primary").waitFor();
    const confirmationPageHeader = await page.locator(".hero-primary").textContent();
    expect(confirmationPageHeader).toMatch(" Thankyou for the order. ")
    await page.screenshot({path : 'testScreenshots/confirmation.png'});
    let newOrderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    newOrderID = newOrderID.replace(/\|/g, "").replace(" ", "").trim();
    console.log(newOrderID);

    await page.locator("button[routerlink*='/myorders']").click();


    const orderCount = await page.locator("[scope='row']").count();
    for(let i=0;i<orderCount; i++){
        const orderID = await page.locator("[scope='row']").nth(i).textContent();
        if(newOrderID.includes(orderID)){
            await page.locator("[scope='row'] ~ td > button:has-text('View')").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".col-title + div")).toContainText(newOrderID);

    await page.screenshot({path : "testScreenshots/viewOrder.png"});

    await page.locator("button[routerlink*='/myorders']").click();

    for(let i=0;i<orderCount; i++){
        const orderID = await page.locator("[scope='row']").nth(i).textContent();
        if(newOrderID.includes(orderID)){
            await page.locator("[scope='row'] ~ td > button:has-text('Delete')").nth(i).click();
            break;
        }
    }

});