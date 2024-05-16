import {
    urls as url,
    testautomationpractice as tap
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Alerts with only one button - Close/Ok etc...', async ({page}) => {

    await page.goto(url.url4)

    // Инициализируем dialog helper. Как только на странице появится алерт,
    // он тут же будет подхвачен и все, что происходит внутри этого метода,
    // происходит напрямую с алертом.
    page.on('dialog', async dialog => {

        // проверка типа алерта, сверяем, что это фактически тип - alert
        expect(dialog.type()).toContain('alert');
        // проверяем, что алерт содержит некий текст
        expect(dialog.message()).toContain('I am an alert box!');

        // закрывает алерт, фактически имитируя нажатие на единственную
        // кнопку 'close' в алерте
        await dialog.accept()
    })

    // Клик по кнопке которая триггерит алерт
    await page.getByRole('button', {name: 'Alert'}).click()

})

test('Confirmation alerts (with 2 options - ok/cancel)', async ({page}) => {

    await page.goto(url.url4)

    // Инициализируем dialog helper. Как только на странице появится алерт,
    // он тут же будет подхвачен и все, что происходит внутри этого метода,
    // происходит напрямую с алертом.
    page.on('dialog', async dialog => {

        // проверка типа алерта, сверяем, что это фактически тип - confirm
        expect(dialog.type()).toContain('confirm');
        // проверяем, что алерт содержит некий текст
        expect(dialog.message()).toContain('Press a button!');

        // закрывает алерт, имитируя нажатие на кнопку 'ok' в алерте
        await dialog.accept()

        // После нажатия кнопки на странице появляется текст, подтверждающий это
        // Заносим его селектор в переменную и делаем проверку на текст
        const okAlert = await page.locator(tap.alertTextAnswer)
        await expect(okAlert).toHaveText('You pressed OK!');

        // либо нажимаем на кнопку 'cancel'.
        // await dialog.dismiss()
    })

    // Клик по кнопке которая триггерит алерт
    await page.getByRole('button', {name: 'Confirm Box'}).click()

})

test('Prompt alerts (with input and OK button)', async ({page}) => {

    await page.goto(url.url4)

    // Инициализируем dialog helper. Как только на странице появится алерт,
    // он тут же будет подхвачен и все, что происходит внутри этого метода,
    // происходит напрямую с алертом.
    page.on('dialog', async dialog => {

        // проверка типа алерта, сверяем, что это фактически тип - prompt
        expect(dialog.type()).toContain('prompt');
        // проверяем, что алерт содержит некий текст
        expect(dialog.message()).toContain('Please enter your name:');
        // в поле алерта есть дефолтный текст, проверяем его
        expect(dialog.defaultValue()).toContain('Harry Potter');


        // закрываем алерт, имитируя нажатие на кнопку 'ok' в алерте
        // и этой же командой вписываем в поле нужный текст
        await dialog.accept('Hermione')

        // После нажатия кнопки на странице появляется текст, подтверждающий это
        // Заносим его селектор в переменную и делаем проверку на текст
        const okAlert = await page.locator(tap.alertTextAnswer)
        await expect(okAlert).toHaveText('Hello Hermione! How are you today?');

        // либо нажимаем на кнопку 'cancel'.
        // await dialog.dismiss()
    })

    // Клик по кнопке которая триггерит алерт
    await page.getByRole('button', {name: 'Prompt'}).click()

})