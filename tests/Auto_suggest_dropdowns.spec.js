import {
    urls as url,
    redbus as bus
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling auto-suggest dropdowns', async ({page}) => {

    await page.goto(url.url6)

    // находим строку поиска и вписываем туда значение
    await page.fill(bus.searchField, 'Delhi')

    // ждем пока появятся все варианты опций с
    // нужным (общим для них всех) селектором
    await page.waitForSelector(bus.allOptions)

    // заносим все результаты в переменную-массив
    const options = await page.$$(bus.allOptions)

    // осуществляем небольшую проверку для себя - выводим все
    // опции из авто подсказки в терминал, а также считаем их
    let counter = 1
    for (let opt of options) {
        const value = await opt.textContent()
        console.log(value, counter)
        counter += 1

        // Если элемент в массиве равен искомой опции,
        // кликаем по ней, тем самым делая выбор
        if (value.includes('Morigate')) {
            await opt.click()
            // как только элемент найден, прерываем цикл
            break
        }
    }

    // находим селектор инпут-поля и проверяем, что наш выбор находится там
    await expect(page.locator(bus.searchInput)).toHaveText('Morigate Delhi')

})