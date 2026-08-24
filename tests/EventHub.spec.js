import {test, expect} from "@playwright/test";

test('Register User', async ({page}) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login", {
        waitUntil: 'networkidle'
    })

    const userName = "testuser@temail.com";
    const password = "Password@123";
    //Register First time
    await page.getByText("Register").click();
    await page.waitForLoadState("networkidle");
    const title = await page.getByRole("heading", {name: 'Create your account'}).isVisible();
    expect(title).toBeTruthy();
    await page.getByPlaceholder("you@email.com").fill(userName);
    await page.getByTestId("register-password").fill(password);
    await page.getByPlaceholder("Repeat your password").fill(password);
    await page.getByText("Create Account").click();

})

test('Create event', async ({page}) => {

        await page.goto("https://eventhub.rahulshettyacademy.com/login", {
            waitUntil: 'networkidle'
        })

        const userName = "testuser@temail.com";
        const password = "Password@123";

        await page.getByPlaceholder("you@email.com").fill(userName);
        await page.getByRole("textbox", {name: "password"}).fill(password);
        await page.locator("#login-btn").click();

        await page.getByRole("button", {name: "Admin"}).click();
        await page.locator(".relative [href='/admin/events']").click();

        await page.getByLabel("Title").fill("Playwright Hackathon");
        await page.getByPlaceholder("Describe the event…").fill("This event is to conduct playwright hackathon");
        await page.locator("#category").selectOption("Workshop");
        await page.locator("#city").fill("Chennai");
        await page.locator("#venue").fill("Marina");
        await page.getByRole('textbox', {name: 'Event Date & Time*'}).fill('2026-09-24T10:10');
        await page.getByPlaceholder("0.00").fill("100");

        await page.getByRole('spinbutton', {name: 'Total Seats*'}).fill('2');
        await page.getByRole('spinbutton', {name: 'Total Seats*'}).click();
        await page.locator("input[type='url']").fill("https://img.magnific.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg?semt=ais_hybrid&w=740&q=80");
        await page.getByRole("button", {name: "+ Add Event"}).click();
    }
)

test.only('Register for Event', async ({page}) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login", {
        waitUntil: 'networkidle'
    })

    const userName = "testuser@temail.com";
    const password = "Password@123";
    const course = "Playwright Hackathon";
    await page.getByPlaceholder("you@email.com").fill(userName);
    await page.getByRole("textbox", {name: "password"}).fill(password);
    await page.locator("#login-btn").click();

    await page.locator("#event-card").filter({hasText: course}).getByTestId("book-now-btn").click();
    await page.getByText("Confirm Booking").waitFor({state: "visible"});
    const courseTitle = await page.locator("h1").textContent();
    expect(courseTitle).toStrictEqual("Playwright Hackathon");

    await page.getByRole("button", {name: "+"}).click();
    await page.getByLabel("Full Name").fill("Mars Roynce");
    await page.getByPlaceholder("you@email.com").fill("roynce.mars@user.com");
    await page.locator("#phone").fill("8987868512");
    const totalAmount = await page.locator("span.text-indigo-700").last().textContent();
    expect(totalAmount).toEqual("$200");
    await page.getByText("Confirm Booking").click();

    await page.getByRole("button", {name: "View My Bookings"}).click();
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(bookingRef);
    await page.getByText("Cancel Booking").click();
    await page.getByTestId("confirm-dialog-yes").click();
    await page.getByText("Booking cancelled successfully").screenshot({path: "testScreenshots/Booking Cancel.png"});

})