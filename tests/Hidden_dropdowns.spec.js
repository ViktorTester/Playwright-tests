import {
    urls as url,
    opensource_demo as od
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test} = require('@playwright/test')

test('Handling hidden items in dropdown', async ({page}) => {

    // переход на сайт, затем в нужный раздел
    await page.goto(url.url7)
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'PIM' }).click();

    // клик по элементу стрелки, открывающей дропдаун
    await page.locator('form i').nth(2).click();

    const options = await page.$$(od.allOptSelector)

    for (let option of options) {

        // заносим каждую опцию в переменную по очереди
        const jobTitle = await option.textContent()
        // для проверки выводит каждую опцию в консоль
        console.log(jobTitle)

        // если находится искомая опция, кликаем по ней и прерываем цикл
        if (jobTitle.includes('QA Engineer')) {
            await option.click()
            break
        }
    }

})