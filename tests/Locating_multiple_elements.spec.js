import {
    urls as url,
    demoblaze as db
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test} = require('@playwright/test')


// в данном тесте происходит проверка всех карточек с продуктами на странице
test('locating multiple elements', async ({page}) => {

    await page.goto(url.url1)

    // Так как далее мы переносим множество селекторов в переменную,
    // иногда код может выполниться быстрее, и мы не получим результата.
    // Поэтому указываем, что системе нужно дождаться всех селекторов
    // с конкретным элементом.
    await page.waitForSelector((db.allProductLinkElement))

    // Мы знаем, что на странице у всех карточек с продуктами есть одинаковый
    // элемент которого нет у других продуктов. Поэтому
    // количество элементов равно количеству продуктов

    // Чтобы захватить сразу все элементы с конкретным селектором,
    // нужно перед селектором указать .$$
    const products = await page.$$(db.allProductLinkElement)

    // В цикле мы перебираем каждый элемент из переменной
    // (а наша переменная указывает на строку, где есть название продукта),
    // и выводим в консоль все эти названия.
    for (const product of products) {
        const productName = await product.textContent()
        console.log(productName)
    }
})