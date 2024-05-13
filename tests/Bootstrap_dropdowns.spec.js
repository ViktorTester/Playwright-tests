import {
    urls as url,
    jquery_az as jaz
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling bootstrap dropdowns', async ({page}) => {

    await page.goto(url.url5)

    // закрываем окно с куками
    await page.getByRole('button', {name: 'AGREE'}).click()

    // находим элемент дропдауна и нажимаем на него
    await page.getByRole('button', {name: 'HTML, CSS'}).click()

// assertion 1
    // находим элемент общий для нужных опций дропдауна и заносим в переменную
    const options = await page.locator(jaz.dropdownOptions)
    // проверка на количество опций
    await expect(options).toHaveCount(11)

// assertion 2
    // тоже проверка на количество опций, но другим методом
    // тут мы заносим опции в массив
    const opts = await page.$$(jaz.dropdownOptions)
    // и проверяем его длину
    await expect(opts.length).toBe(11)

// выбор нескольких опций в дропдауне
    // создаем новую переменную для всех опций дропдауна

    // Для проверки можно использовать цикл и вывести в консоль все
    // опции в дропдауне. Тут нет никаких ассертов, только проверка
    // для самого себя
    const options2 = await page.$$(jaz.allDropdownOptions)
    for (let opt of options2) {
        const value = await opt.textContent()
        console.log(value)
    }

    // а в этом цикле мы уже осуществляем действие.
    for (let opt of options2) {
        const value = await opt.textContent()

        // если в дропдауне присутствует опция с таким-то
        // названием - мы осуществляем клик по ней.
        if (value.includes('Angular') || value.includes('Java')) {
            await opt.click()
        }

        // в данном дропдауне изначально есть предвыбранные опции,
        // мы их находим и осуществляем клик, то есть убираем с них выбор
        if (value.includes('HTML') || value.includes('CSS')) {
            await opt.click()
        }
    }

})