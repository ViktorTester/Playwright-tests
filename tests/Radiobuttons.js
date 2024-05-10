import {
    urls as url,
    letcode as lc
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling radiobuttons', async ({page}) => {

    await page.goto(url.url2);

    // переход на страницу с чекбоксами и радио-кнопками
    await page.getByText('Toggle').click()

    // Выбираем значение в одном из чекбоксов
    await page.check(lc.CheckboxYes)

    // Проверяем, что первый чекбокс выбран
    await expect(page.locator(lc.CheckboxYes)).toBeChecked()
    // другой подход:
    // Если значение чекбокса выбрано, то будет возвращено значение true,
    // если возвращено значение true, то проверка пройдена
    await expect(page.locator(lc.CheckboxYes).isChecked()).toBeTruthy()

    // Проверяем, что второй чекбокс не выбран
    await expect(page.locator(lc.CheckboxNo)).not.toBeChecked()

})