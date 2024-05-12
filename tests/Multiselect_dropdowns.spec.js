import {
    urls as url,
    testautomationpractice as tap
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

    test('Handling multiselect dropdowns', async ({page}) => {

        await page.goto(url.url4)

        // находим селектор дропдауна и передаем в массиве
        // все опции, которые нужно выбрать
        await page.selectOption(tap.MultiSelectDropdown, ['Blue', 'Red', 'Yellow'])

// проверка общего количество опций в дропдауне (вариант 1)
        // подсчитываем количество элементов с тегом 'option' и заносим в переменную
        const options = await page.locator(`${tap.MultiSelectDropdown} option`)
        // проверка на количество опций
        await expect(options).toHaveCount(5)

// проверка общего количество опций в дропдауне (вариант 2)
        // подсчитываем количество элементов с тегом 'option' и заносим в массив
        const opts = await page.$$(`${tap.MultiSelectDropdown} option`)
        // проверка на длину массива
        expect(opts.length).toBe(5)


// проверка на наличие опции в дропдауне (вариант 1)
        // считываем весь текст из опций дропдауна и заносим в переменную
        const content = await page.locator(tap.MultiSelectDropdown).textContent()
        // проверка на наличие нужной страны в переменной
        await expect(content.includes('Red')).toBeTruthy()



    })