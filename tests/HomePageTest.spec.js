import {urls as url} from 'Locators/Locators.js'

const {test, expect} = require('@playwright/test')

// команда async
test('Home page', async ({page}) => {
    // команда await ожидает пока загрузится страница и только потом
    // приступает к тем действиям, с которыми она связана.

    // переход на страницу
    await page.goto(url.url1)
    // проверка тайтла страницы
    await expect(page).toHaveTitle('PRODUCT STORE')
    // проверка адреса страницы
    await expect(page).toHaveURL(url.url1)
    // закрытие страницы
    await page.close()
})