import {
    urls as url,
    testautomationpractice as tap
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Mouse actions', async ({page}) => {

// Hover (Наведение)
    await page.goto(url.url9)

    // Заносим в переменную локатор дропдаун-меню (которое раскрывается при наведении)
    // exact: true - значит, что поиск идет по точному имени, а не тексту,
    // в котором это имя может содержаться
    const desktops = await page.getByRole('link', { name: 'Desktops', exact: true })
    // заносим в переменную локатор опции, которая появляется
    // при раскрытии дропдауна
    const mac = await page.getByText('Mac (1)')

    // наводим на дропдаун
    await desktops.hover()
    // наводим на опцию
    await mac.hover()


// Right Click (Правый клик/Контекстный Клик)
    await page.goto(url.url10)

    // Заносим в переменную локатор кнопки, у которой открывается контекстное
    // меню только при правом клике. В данном случае - exact: true значит,
    // что будет взят первый попавшийся элемент с искомым текстом
    const button = await page.getByText('right click me', {exact: true})
    // правый клик по кнопке
    await button.click({button: 'right'})


// Double Click (Двойной клик)
    await page.goto(url.url4)

    // При дублике по кнопке, в поле выше появится текст
    // осуществляем даблклик по кнопке
    await page.getByText('Copy Text').dblclick()
    // проверяем, что в поле выше появился текст
    await expect(page.locator(tap.input2)).toHaveValue('Hello World!')


// Drag and Drop (Перетаскивание)



})