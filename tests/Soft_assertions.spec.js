import {
    urls as url,
    demoblaze as db
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Soft assertions', async ({page}) => {

//Hard assertions
    // невыполнение хоть одной из этих проверок, остановит выполнение всех дальнейших
    // тестов, соответственно дальнейшие проверки выполнены не будут

    await page.goto(url.url1)

    // проверка тайтла страницы
    await expect(page).toHaveTitle('STORE')
    // проверка адреса страницы
    await expect(page).toHaveURL(url.url1)
    // проверка баннера страницы
    await expect(page.locator(db.pageBanner)).toBeVisible()

//Soft assertions
    // невыполнение хоть одной из этих проверок, не остановит выполнение всех дальнейших
    // тестов, соответственно все дальнейшие проверки будут выполнены

    // проверка тайтла страницы
    await expect.soft(page).toHaveTitle('STORE12')
    // проверка адреса страницы
    await expect.soft(page).toHaveURL(url.url2)

    // проверка, которая проверит сколько на данный момент провалено мягких проверок
    // если их больше, чем ожидается, то сработает жесткая проверка
    // и тест остановится
    expect(test.info().errors).toHaveLength(0);

    // проверка баннера страницы, до нее очередь не доходит, так как
    // уже сработала предыдущая жесткая проверка
    await expect.soft(page.locator(db.pageBanner)).toBeVisible()

})