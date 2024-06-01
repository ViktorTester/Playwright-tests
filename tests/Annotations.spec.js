import {
    urls as url,
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

// Разумеется, все аннотации в данном тестовом примере будут конфликтовать друг
// с другом, поэтому для проверки конкретной, остальные нужно закомментить
// в большинстве случаев.

const {test, expect} = require('@playwright/test')

// Запуск конкретного теста
test.only('test 1', async () => {
    console.log('this is test 1')
})

// Пропуск конкретного теста
test.skip('test 2', async () => {
    console.log('this is test 2')
})

// Пропуск теста только в том случае, если он запускается через конкретный браузер
test.skip('test 3', async ({page, browserName}) => {
    console.log('this is test 3')

    if(browserName === 'chromium') {
        test.skip()
    }
})

// Указать в тесте, что он нуждается в починке, доработке
test('test 4', async () => {
    test.fixme()
    console.log('this is test 4')
})

// Этот тест упадет, но есть нюанс - он упадает, не потому-что не пройдет проверку
// или не найдет элемент, а потому-что мы ожидаем от него падения, а наша проверка
// возвращает true (1 = 1).
test('test 5', async () => {
    test.fail()
    console.log('this is test 5')
    expect(1).toBe(1)
})

// Этот тест не упадет. Мы ожидаем он него результата false (1 != 2),
// и именно такой результат и получаем
test('test 6', async () => {
    test.fail()
    console.log('this is test 6')
    expect(1).toBe(2)
})

// Время на выполнение данного теста увеличено втрое
test('test 7', async ({page}) => {
    test.slow()
    console.log('this is test 8')
    await page.goto(url.url1)
})

// Для данного теста выставлено индивидуальное время на выполнение
test('test 8', async ({page}) => {
    test.setTimeout(5000)
    console.log('this is test 8')
    await page.goto(url.url1)
})
