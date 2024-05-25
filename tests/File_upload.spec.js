import {
    urls as url,
    herokuapp as ha,
    davidwalsh as dw
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Single file upload', async ({page}) => {

    await page.goto(url.url13)

    // Выбираем локатор кнопки загрузки и загружаем файл
    await page.locator(ha.selectFileBtn).setInputFiles('tests/UploadFiles/CV-LV.pdf')

})

test('Multiple file upload', async ({page}) => {

    await page.goto(url.url14)

    // Выбираем локатор кнопки загрузки и загружаем несколько файлов
    await page.locator(dw.filesUploadBtn)
        .setInputFiles([
            'tests/UploadFiles/CV-LV.pdf',
            'tests/UploadFiles/WoT_cover_letter.pdf'
        ])

    // находим общий локатор для списка всех загруженных файлов
    // и с помощью метода .nth() обращаемся к ним по очереди и заносим в переменные
    const firstFile = await page.locator(dw.uploadedFiles).nth(0)
    const secondFile = await page.locator(dw.uploadedFiles).nth(1)

    // проверяем, что названия загруженных файлов соответствуют
    // названием загружаемых файлов
    await expect(firstFile).toHaveText('CV-LV.pdf')
    await expect(secondFile).toHaveText('WoT_cover_letter.pdf')

    // Выбираем локатор кнопки загрузки и отправляем пустой массив,
    // тем самым имитируя удаление загруженных файлов
    await page.locator(dw.filesUploadBtn).setInputFiles([])

    // находим общий локатор для списка всех загруженных файлов и с помощью метода .nth()
    // обращается к единственном там элементу. Осуществляем проверку на то, что
    // никаких загруженных файлов нет
    await expect(page.locator(dw.uploadedFiles).nth(0)).toHaveText('No Files Selected')

})
