import {
    urls as url,
    demoblaze as db
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'


//import {test, expect} from '@playwright/test'
// строки 3 и 5 аналогичны
const {test, expect} = require('@playwright/test')

test('Locators', async ({page}) => {

    await page.goto(url.url1)

    // клик по кнопке логина используя его свойство
    await page.click(db.loginBtn) // строки 13 и 14 аналогичны
    //await page.locator(db.loginBtn).click()

    // находим локатор (CSS - тег) инпут поля и передаем туда значение
    await page.fill(db.usernameInput, 'pavanol') // строки 17 и 18 аналогичны
    //await page.locator(db.usernameInput).fill('pavanol')

    // находим локатор (CSS - тег)инпут поля и передаем туда значение
    await page.fill(db.passwordInput, 'test@123')

    // находим элемент и кликаем по нему, используя Xpath
    // отдельно уточнять, что используем Xpath не надо
    await page.click(db.loginSubmitBtn)

    // Находим элемент, который хотим увидеть после успешного логина,
    // и заносим в переменную
    const logoutLink = await page.locator(db.logoutSection)

    // Проводим проверку на то, что элемент видим
    await expect(logoutLink).toBeVisible()

    // явное закрытие страницы
    await page.close()
})

