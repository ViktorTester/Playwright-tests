import {
    urls as url,
    gotranscript as go
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test} = require('@playwright/test')

test('Keyboard actions', async ({page}) => {

// Написать текст в одном поле и скопировать в другое поле
    await page.goto(url.url12)

    // Находим локатор инпут-поля и пишем туда текст
    await page.getByPlaceholder(go.textSample).fill('Hello Testing!');

    // Нажатие клавиатуры Ctrl + A (выделяем весь текст в поле)
    await page.keyboard.press('Meta+A')
    // Нажатие клавиатуры Ctrl + C (копируем весь текст в поле)
    await page.keyboard.press('Meta+C')
    // Нажатие клавиатуры Tab (два поля рядом, поэтому переключаемся на второе поле)
    await page.keyboard.press('Tab')
    // Нажатие клавиатуры Ctrl + V (вставляем весь текст в поле)
    await page.keyboard.press('Meta+V')


// либо такой вариант того же самого теста:
    await page.goto(url.url12)

    // Находим локатор инпут-поля и пишем туда текст
    await page.getByPlaceholder(go.textSample).fill('Hello, testing world!');

    // Нажатие клавиатуры Ctrl + A (выделяем весь текст в поле)
    await page.keyboard.press('Meta+A')
    // Нажатие клавиатуры Ctrl + C (копируем весь текст в поле)
    await page.keyboard.press('Meta+C')

   // имитация физического нажатия кнопки
    // Нажимаем Tab
    await page.keyboard.down('Tab')
    // Отпускаем Tab
    await page.keyboard.up('Tab')

    // Нажатие клавиатуры Ctrl + V (вставляем весь текст в поле)
    await page.keyboard.press('Meta+V')

});
