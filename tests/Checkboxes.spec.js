import {
    urls as url,
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling checkboxes', async ({page}) => {

    await page.goto(url.url2);

    // переход на страницу с чекбоксами и радио-кнопками
    await page.getByText('Toggle').click()

    // Радиокнопка на этом сайте заранее выбрана
    // Находим ее элемент и отменяем выбор
    await page.getByText(' Remember me ').uncheck()

    // Проверяем, что радиокнопка не нажата
    await expect(page.getByText(' Remember me ')).not.toBeChecked()

    // создаем массив, в котором храним локаторы каждой радиокнопки
    // в данном случае я ищу локатор по тексту, поэтому храню текст в массиве
    const checkboxes = [
        ' Remember me ',
        ' I agree to the ',
    ]

    // в цикле перебираем каждый элемент массива, в данном случае
    // - это текст радиокнопки, и подставляем в команду
    for (const locator of checkboxes) {
        await page.getByText(locator).check()
        // сразу же проверяем каждую кнопку на нажатие
        await expect(page.getByText(locator)).toBeChecked()
    }

    // еще один цикл, который сперва проверяет нажата ли
    // радиокнопка, и если нет, то нажимает ее и проводит проверку
    for (const locator of checkboxes) {
        if (await page.getByText(locator).isChecked())
        {
            await page.getByText(locator).uncheck()
            await expect(page.getByText(locator)).not.toBeChecked()
        }
    }

})