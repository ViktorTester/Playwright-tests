import {
    urls as url,
    ui_vision as ui
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling Frames', async ({page}) => {

    await page.goto(url.url8)

    // метод позволяет узнать сколько всего фреймов на странице
    // Он возвращает массив, который заносим в переменную
    const allFrames = page.frames()
    // Пишем в консоль длину массива (количество фреймов)
    console.log(allFrames.length)

// Первый метод - локатор фрейма

    // находим локатор фрейма и локатор инпут поля внутри фрейма
    // затем по очереди обращаемся к ним
    const frame2_input = await page.frameLocator(ui.SecondFrameLoc).locator(ui.secondFrameInput)
    // вписываем в поле значение
    await frame2_input.fill('Hello world')
    // проверяем, что значение верно
    await expect(frame2_input).toHaveValue('Hello world')

// Второй метод - имя фрейма или url

    // обращаемся к url фрейма используя специальный метод
    // заносим результат в переменную
    const frame1 = await page.frame({url: ui.firstFrameLink})
    // теперь работаем с фреймом - находим элемент инпут поля и вписываем значение
    await frame1.fill(ui.firstFrameInput, 'testing frame')
    // проверяем, что вписанное значение верно
    await expect(frame1.locator(ui.firstFrameInput)).toHaveValue('testing frame')

    await page.waitForTimeout(5000)

})
