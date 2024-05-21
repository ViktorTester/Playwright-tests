import {
    urls as url,
    testautomationpractice as tap
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling Date Pickers', async ({page}) => {

    await page.goto(url.url4)

// Прописать дату руками если доступно поле ввода
    // находим локатор инпут-поля и вставляем дату в нужном формате
    await page.fill(tap.datePickerInput, '09/09/2024')
    // сразу же делаем проверку на то, что в поле содержится введенная дата
    await expect(page.locator(tap.datePickerInput)).toHaveValue('09/09/2024')


// Выбрать дату через дейтпикер

    // Сперва нужно прописать в переменные дату, которую хотим ввести
    // три отдельных переменных для года, месяца и дня
    const year = '2025'
    const month = 'June'
    const day = '28'

    // затем кликаем на инпут-поле, ведь так открывается дейтпикер
    await page.click(tap.datePickerInput)

    // затем получаем значение выставленное в дейтпикере по умолчанию
    // и сравниваем со значениями в переменных, созданных ранее

    // логика проста - если год и месяц (в шапке дейтпикера) подходят нам,
    // то далее нужно просто выбрать нужный день, если же нет, то нужно
    // кликнуть на стрелку, чтобы перелистнуть месяц вперед

    // создаем цикл
    while(true) {

        // в переменных хранятся текущие год и день дейтпикера
        const currentYear = await page.locator(tap.datePickerYear).textContent()
        const currentMonth = await page.locator(tap.datePickerMonth).textContent()

        // пока текущие день и год дейтпикера не совпадут с
        // необходимыми, цикл не прервется
        if (currentYear === year && currentMonth === month) {
            break;
        }
        // соответственно пока цикл не прервется, дейтпикер будет
        // перелистываться в поисках нужных значений

        // перелистывать вперед по годам
        await page.getByTitle('Next').click()

        // перелистывать назад по годам (если надо)
        // await page.getByTitle('Prev').click()

    }

    // итак месяц и год выбраны, далее нужно выбрать день,
    // выбрать день можно двумя способами:

// выбрать день через массив
    // берем общий локатор для всех дней в дейтпикере и
    // заносим в массив (об этом говорит символ $$)
    const dates = await page.$$(tap.allDatepickerDays)

    // перебираем массив пока не найдем нужный день
    for(const dt of dates) {
        // как только нужный день найден, цикл прерывается
        if (await dt.textContent() === day) {
            // осуществляем клик по нужному дню
            await dt.click()
            break;
        }
    }

// выбрать день через прямой Xpath локатор
    await page.click(`//a[@class='ui-state-default'][text()='15']`)



})