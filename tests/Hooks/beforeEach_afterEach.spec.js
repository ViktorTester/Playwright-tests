import {
    urls as url,
    demoblaze as db
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

// cоздаем переменную
let page

// В блоках before и after мы уже не можем обращаться к фикстуре page как в простых текстах
// для этого нужно создать фикстуру browser и через нее обращаться к page.
// browser в отличие от page не будет обновляться в каждом тесте и пронесет нужные
// пред/пост-условия через оба блока beforeEach и afterEach.

// этот код выполнится перед каждым test-блоком (сколько блоков, столько раз и выполнится)
test.beforeEach(async ({browser}) => {

    // связываем переменную с фикстурой browser
    page = await browser.newPage();

    // переход на страницу
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

})


// В блоке afterEach фикстуру browser задавать не надо
// она берется из блока beforeEach

// Этот код выполнится по завершению каждого test-блока (сколько блоков, столько раз и выполнится)
test.afterEach(async() => {

  // Logout
    await page.locator(db.logoutSection).click()

})

// ТЕСТЫ

// Перед тестом выполняется блок beforeEach
test('Home page test', async () => {

    // после успешного логина получаем общий локатор для всех
    // продуктов на странице и заносим в переменную
    const allProducts = await page.$$(db.allProductLinkElement)
    // осуществляем проверку на количество карточек товара на странице
    await expect(allProducts).toHaveLength(9)

})
// После теста выполняется блок afterEach


// Перед тестом выполняется блок beforeEach
test('Add product to cart test', async () => {

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
})
// После теста выполняется блок afterEach