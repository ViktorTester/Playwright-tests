import {
    urls as url,
    letcode as lc
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling input boxes', async ({page}) => {

    // заносим, найденный по-плейсхолдеру элемент инпут поля, в переменную
    const nameInput = page.getByPlaceholder(lc.inputName)

    await page.goto(url.url2);

    // Переход в раздел с инпут-полями
    await page.getByText('Edit').click()

    // проверяем есть ли такой элемент на странице
    await expect(nameInput).toBeVisible()
    // проверяем, что инпут-поле пустое, не имеет текста внутри
    await expect(nameInput).toBeEmpty()
    // проверяем, что в инпут-поле можно что-то вписывать
    await expect(nameInput).toBeEditable()
    // проверяем, что инпут-поле не задизейблено
    await expect(nameInput).toBeEnabled()

    // вносим текст в инпут-поле
    await nameInput.fill('tester')

    // Ждем 5 секунд в данном случае для того, чтобы проверить визуально
    // проделанную работу на страницу
    await page.waitForTimeout(5000)

})