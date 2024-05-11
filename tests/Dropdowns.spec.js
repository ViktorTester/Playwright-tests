import {
    urls as url,
    testautomationpractice as tap
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling dropdowns', async ({page}) => {

// Дропдауны с тегом 'select'

    await page.goto(url.url4)

    // Находим элемент дропдауна, выбираем доступное текстовое значение
    await page.locator(tap.CountryDropdown).selectOption({label: 'India'})

    // Значение можно передать и напрямую
    await page.locator(tap.CountryDropdown).selectOption('India')

    // Можно передать значение 'value'
    await page.locator(tap.CountryDropdown).selectOption({value: 'uk'})

    // Можно передать индекс нужного вариант (подсчитать вручную)
    await page.locator(tap.CountryDropdown).selectOption({index: 1})

    // Точно такой же способ, но короче
    await page.selectOption(tap.CountryDropdown, 'India')

// Валидация
  // проверка общего количество опций в дропдауне (вариант 1)
    // подсчитываем количество элементов с тегом 'option'
    // заносим в переменную
    const opts = await page.locator(`${tap.CountryDropdown} option`)
    // проверка на количество опций
    await expect(opts).toHaveCount(10)


  // проверка общего количество опций в дропдауне (вариант 2)
    // подсчитываем количество элементов с тегом 'option'
    // заносим в массив
    const options = await page.$$(`${tap.CountryDropdown} option`)
    // проверка на длину массива
    expect(options.length).toBe(10)


  // проверка на наличие опции в дропдауне (вариант 1)
    // считываем весь текст из опций дропдауна и заносим в переменную
    const content = await page.locator(tap.CountryDropdown).textContent()
    // проверка на наличие нужной страны в переменной
    await expect(content.includes('India')).toBeTruthy()


  // проверка на наличие опции в дропдауне (вариант 2)
    // используя ранее созданную переменную 'options',
    // проходим весь массив циклом и проверяем есть ли
    // нужная страна в этом массиве

    // задаем значение переменной как false, если цикл найдет
    // нужное значение в массиве, то значение станет true
    let status = false

    for(const option of options) {

        // заносим текст опции в переменную
        let value = await option.textContent()
        // ищем страну, если находим - прерываем цикл
        if (value.includes('France')) {
            status = true
            break
        }
    }
    // Проверка на значение переменной, если страна найдена в массиве,
    // то значение должно быть true
    expect(status).toBeTruthy()

})