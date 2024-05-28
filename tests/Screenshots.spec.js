import {
    urls as url,
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test} = require('@playwright/test');

// Скриншот видимого содержимого страницы
test('Screenshots', async ({page}) => {

    await page.goto(url.url2)

    await page.waitForTimeout(2000)

    // Скриншот видимого содержимого страницы
    await page
        .screenshot({path:`tests/Screenshots/Page${Date.now()}.png`})

    // Скриншот полного содержимого страницы
    await page
        .screenshot({path:`tests/Screenshots/FullPage${Date.now()}.png`, fullPage:true})

    // Скриншот полного содержимого страницы
    // Сперва нужно обратиться к локатору элемента
    await page.getByRole('img', { name: 'shadow' })
        .screenshot({path:`tests/Screenshots/Element${Date.now()}.png`})

});

