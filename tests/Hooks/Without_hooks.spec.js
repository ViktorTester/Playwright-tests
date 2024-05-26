import {
    urls as url,
    demoblaze as db
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Home page test', async ({page}) => {

    await page.goto(url.url1)

  // Login
    // находим кнопку логина и кликаем
    await page.locator(db.loginBtn).click()
    // находим локатор поля для ввода имени и вводим его
    await page.fill(db.usernameInput, 'pavanol')
    // находим локатор поля для ввода пароля и вводим его
    await page.fill(db.passwordInput, 'test@123')
    // находим кнопку подтверждения и кликаем по ней
    await page.locator(db.loginSubmitBtn).click()

  // Test home page
    // после успешного логина получаем общий локатор для всех
    // продуктов на странице и заносим в переменную
    const allProducts = await page.$$(db.allProductLinkElement)
    // осуществляем проверку на количество карточек товара на странице
    await expect(allProducts).toHaveLength(9)

  // Logoff
    await page.locator(db.logoutSection).click()


})

test('Add product to cart test', async ({page}) => {

    await page.goto(url.url1)

  // Login
    // находим кнопку логина и кликаем
    await page.locator(db.loginBtn).click()
    // находим локатор поля для ввода имени и вводим его
    await page.fill(db.usernameInput, 'pavanol')
    // находим локатор поля для ввода пароля и вводим его
    await page.fill(db.passwordInput, 'test@123')
    // находим кнопку подтверждения и кликаем по ней
    await page.locator(db.loginSubmitBtn).click()

  // Add product to cart
    // находим продукт и кликаем по нему
    await page.getByText('Samsung galaxy s6', {exact: true}).click()
    // на странице продукта кликаем по кнопку добавления в корзину
    await page.getByText('Add to cart', {exact: true}).click()

    // вызываем helper для алерта который надо валидировать
    page.on('dialog', async  dialog => {
        // проверяем, что текст алерта соответствует ожидаемому
        expect(dialog.message()).toContain('Product added.')
        // закрываем алерт, нажатием кнопки "ОК"
        await dialog.accept()
    })

  // Logoff
    await page.locator(db.logoutSection).click()

})