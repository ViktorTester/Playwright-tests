import {
    urls as url,
    letcode as lc
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'
import {chromium} from "@playwright/test";

const {test, expect} = require('@playwright/test')

test.describe('Working with multiple tabs', async () => {


// На этот раз фикстуру page мы не вызываем в функции
    test('Handling multiple Pages/Windows', async () => {

        // создание новой фикстуры browser
        // можно использовать любой браузер, не только chromium
        const browser = await chromium.launch()

        // создание 'контекста' для фикстуры
        const context = await browser.newContext()

        // в рамках одного контекста можно создать сколько угодно страниц
        const page1 = await context.newPage()
        const page2 = await context.newPage()

        // проверка для себя. В консоли выводится количество
        // страниц в рамках конкретного контекста
        const allPages = context.pages()
        console.log('Number of pages created', allPages.length)


// Это две разные вкладки и они будут открыты одновременно!
// Происходит не редирект по ссылке, а создание полностью независимой вкладки
// Это значит, что можно тестировать несколько сайтов параллельно

        // Переход на страницу 1 (открывается в первой вкладке)
        await page1.goto(url.url1)
        // Проверка тайтла страницы на содержащийся в нем текст
        await expect(page1).toHaveTitle('STORE')


        // Переход на страницу 2 (открывается во второй вкладке)
        await page2.goto(url.url2)
        // Проводим проверку на видимость элемента
        const logo = await page2.getByAltText(lc.inputEditBtn)
        await expect(logo).toBeVisible()

    })

    test('Handling redirect in new window', async () => {

        // создание новой фикстуры browser
        // можно использовать любой браузер, не только chromium
        const browser = await chromium.launch()

        // создание 'контекста' для фикстуры
        const context = await browser.newContext()

        // в рамках одного контекста можно создать сколько угодно страниц
        const page1 = await context.newPage()

        // Переход на страницу
        await page1.goto(url.url7)
        // Валидация тайтла
        await expect(page1).toHaveTitle ("OrangeHRM")

        // Настройка ивента, который будет вызван при открытии новой вкладки
        const pagePromise = context.waitForEvent('page')

        // Кликаем по кнопке, открывающей новую вкладку
        await page1.getByText('OrangeHRM, Inc').click()

        // создаем переменную, которая представляет новую вкладку
        const newPage = await pagePromise

        // Проводим валидацию в новой вкладке
        await expect(newPage).toHaveTitle("Human Resources Management Software | OrangeHRM")

        // После успешной валидации новую вкладку можно закрыть и продолжить
        // работу в изначальной вкладке. Можно также не закрывать и работать в нескольких
        // вкладках, обращаясь либо в page1, либо к newPage
        await newPage.close()

    })
})