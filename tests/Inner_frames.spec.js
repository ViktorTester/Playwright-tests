import {
    urls as url,
    ui_vision as ui
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test} = require('@playwright/test')

test('Handling Inner/Nested Frames', async ({page}) => {

    await page.goto(url.url8)

    // обращаемся к url фрейма используя метод .frame()
    // заносим результат в переменную
    const frame3 = await page.frame({url: ui.thirdFrameLink})

    // используя метод .childFrames(), находим все вложенные в основной
    // фрейм фреймы, затем заносим их в переменную
    const childFrames = frame3.childFrames()

    // а тут просто обращаемся по индексу нужного фрейма,
    // используя связку индекс + селектор вложенного фрейма
    // в данном случае это радиокнопка которую мы жмем
    await childFrames[0].locator(ui.radioOther).check()

})