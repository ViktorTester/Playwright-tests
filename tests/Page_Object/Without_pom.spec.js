const {test} = require('@playwright/test')


// Тест без применения модели Page_Object
test( 'test', async ({ page }) => {

    // Переход на страницу и логин

    await page.goto('https://www.demoblaze.com/index.html');
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.locator('//button [normalize-space()="Log in"]').click();

})