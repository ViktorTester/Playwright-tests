import {
    urls as url,
    nopcommerce as np
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Assertion test', async ({page}) => {

    await page.goto(url.url3)

// .toHaveURL()
    // Проверка текущего адреса страницы
    await expect(page).toHaveURL(url.url3)

// .toHaveTitle()
    //Проверка тайтла страницы (проверяется значения тега <title> в DOM)
    await expect(page).toHaveTitle(np.pageTitle)

// .toBeVisible()
    // Находим элемент и проверяем его на видимость
    await expect(page.getByAltText(np.pageNameLogoAlt)).toBeVisible()

// .toBeEnabled()
    // Находим элемент поля для поиска на сайте и проверяем активен ли он
    await expect(page.locator(np.searchBox)).toBeEnabled()

// .toBeChecked()
    // находим элемент чекбокса и проверяем, что он нажат
    await expect(page.locator(np.checkboxNewsletter)).toBeChecked()

    // находим элемент радио кнопки и нажимаем ееё
    await page.locator(np.radioGender).check()
    // проверяем, что радио кнопка нажата
    await expect(page.locator(np.radioGender)).toBeChecked()

// .toHaveAttribute()
    // находим элемент и проверяем, что в нем имеется атрибут с таким-то значением
    await expect(page.locator(np.registerBtn)).toHaveAttribute('type', 'submit')

// .toHaveText()
    // находим элемент и проверяем его на точное совпадение по тексту
    await expect(page.locator(np.pageH1Title)).toHaveText('Register')

// .toContainText()
    // находим элемент и проверяем его на частичное совпадение по тексту
    await expect(page.locator(np.pageH1Title)).toContainText('Reg')

// .toHaveValue()
    // находим элемент инпут-поля и вписываем туда значение
    await page.locator(np.firstNameInput).fill('tester1')
    // проверяем, что значение было верно записано в инпут-поле
    await expect(page.locator(np.firstNameInput)).toHaveValue('tester1')

// .toHaveCount()
    // Проверяем дропдаун с днями недели. Сперва находим общий для всех дней элемент
    // Дней выходит 32, так как такой элемент есть не только у цифр-дней, но и у
    // названия самого дропдауна - days. Но мы это знаем и учитываем.
    // Затем проводим проверку
    await expect(page.locator(np.dayDropdownValues)).toHaveCount(32)

})