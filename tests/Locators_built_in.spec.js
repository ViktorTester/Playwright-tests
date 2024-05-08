import {
    urls as url,
    letcode as lc
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'
import {expect} from "@playwright/test";

const {test} = require('@playwright/test')

test('Built-in locators', async ({page}) => {

    await page.goto(url.url2)

// getByAltText()
    // Находим элемент по его альтернативному тексту и заносим в переменную
    const logo = await page.getByAltText(lc.inputEditBtn)
    // Проводим проверку на видимость элемента
    await expect(logo).toBeVisible()
    await page.click(lc.editSectionBtn)

// getByPlaceholder()
    // Находим инпут поле с плейсхолдером и вписываем в это поле некий текст
    await page.getByPlaceholder(lc.inputName).fill('test name')
    // нажатие кнопки 'back' в окне браузера
    await page.goBack();

    // находим элемент используя его класс и текст (название кнопки)
    await page.locator(`${lc.allSectionBtns}:has-text("Click")`).click()

// getByRole()
    // ищем элемент по его роли - button - и обязательно
    // указываем атрибут, затем кликаем по нему
    await page.getByRole('button', {name: 'Goto home'}).click()

    // заносим элемент в переменную
    const newCourseBtn = await page.locator(lc.newCourseBtn)

    // проверяем элемент, который может быть виден только после нажатия
    // на кнопку, на видимость
    await expect(newCourseBtn).toBeVisible()

    // переходим на главную страницу
    await page.goto(url.url2)

//getByText()
    // находим кнопку по тесту в ней и кликаем
    await page.getByText('Click').click()

    // находим элемент, который может быть виден только после
    // клика по кнопке, по тексту, проверяем, что он видим.
    await expect(page.getByText(' Insight ')).toBeVisible()

// getByLabel()
    // находим элемент с нужной меткой и заносим в переменную
    const goHomeText = await page.getByLabel('home')
    // проверяем элемент на видимость
    await expect(goHomeText).toBeVisible()

// getByTitle()
    await expect(page.getByTitle('Disabled button')).toHaveText('Disabled')

})


// getByTestId()
    //Вне рамок теста:
    // Находим элемент с определенным тестовым идентификатором и кликаем по нему
    await page.getByTestId('directions').click();
