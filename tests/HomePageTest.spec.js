import {urls as url} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

// команда async
test('Home page', async ({page}) => {
    // команда await ожидает пока загрузится страница и только потом
    // приступает к тем действиям, с которыми она связана.

    // переход на страницу
    await page.goto(url.url1)
    // проверка тайтла страницы (проверяется значения тега <title> в DOM)
    await expect(page).toHaveTitle('STORE')
    // лог выводится в терминале среды разработки
    console.log(page.url())
    // проверка адреса страницы
    await expect(page).toHaveURL(url.url1)
    // закрытие страницы
    await page.close()
})