import {
    urls as url,
    testautomationpractice as tap
} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')

test('Handling Pagination Tables', async ({page}) => {

    await page.goto(url.url4)

    // находим локатор таблица и заносим в переменную
    const table = await page.locator(tap.paginationTable)
    // обращаясь к локатору таблицы, находим общий локатор
    // всех колонок и заносим его в переменную
    const columns = await table.locator(tap.paginationTableColumns)

    // обращаясь к локатору таблицы, находим общий локатор
    // всех рядов и заносим его в переменную
    const rows = await table.locator(tap.paginationTableRows)

    // для самопроверки выводим в консоль количество колонок
    console.log('Number of columns = ', await columns.count())
    // для самопроверки выводим в консоль количество рядов
    console.log('Number of rows = ', await rows.count())

    // также создаем проверку на ожидаемое
    // количество рядов и колонок
    expect(await columns.count()).toBe(4)
    expect(await rows.count()).toBe(5)


// Как отметить чекбокс конкретного элемента в таблице
    // В конкретной таблице есть ячейки с чекбоксами
    // Задача - выбрать определенный продукт и отметить чекбокс этого продукта
    // продукт и его чекбокс находятся в разных столбцах, но в одном ряду.
    // И нужно указать системе, что отметить следует не любой чекбокс,
    // а именно тот, который относится в нужному продукту.
    // Как это сделать:

    // Применяется специальная функция .filter(), в которой нужно указать
    // критерии сортировки. Ранее мы уже нашли общий локатор для всех рядов,
    // а теперь, для каждого ряда, проводим сортировку. Как только находим
    // нужную ячейку - заносим ее в переменную
    const matchedRow = rows.filter({
        // сперва выбираем только элементы 'td', фактически перебираем ячейки
        has: page.locator('td'),
        // параллельно проверяем чтобы в ячейке был продукт с конкретным именем
        hasText: 'Product 4'
    })

    // ищем в найденном ряду элемент с локатором 'input' - это чекбокс и отмечаем его
    await matchedRow.locator(tap.tableCheckbox).check()

    // проверяем, что чекбокс отмечен
    await expect(matchedRow.locator(tap.tableCheckbox)).toBeChecked()


 // Как отметить несколько чекбоксов для нескольких элементов
    // Для этого потребуется вызывать написанный выше код для каждого
    // чекбокса заново. Поэтому мы засунем его в функцию,
    // во избежание дублирования кода.
    // Функция создается вне тела теста - selectProduct()

    // Так как мы хотим вызвать функцию трижды, а также трижды проверить
    // прожался ли чекбокс, но не хотим дублировать код,
    // есть возможность еще больше улучшить читаемость, путем создания
    // очередной функции - checkProductSelection()
    // функция создается внутри теста, так как внутри теста создаются и
    // переменные посредством функции selectProduct()
    async function checkProductSelection(productName) {
        // вызываем selectProduct()
        await selectProduct(rows, page, productName);
        // сразу же проверяем прожался ли чекбокс
        await expect(matchedRow.locator(tap.tableCheckbox)).toBeChecked();
    }

    await checkProductSelection('Product 1');
    await checkProductSelection('Product 3');
    await checkProductSelection('Product 5');

})

// создана функция отмечающая чекбокс дял конкретного
// продукта и вынесена за пределы теста
async function selectProduct(rows, page, name) {
    const matchedRow = rows.filter({
        // сперва выбираем только элементы 'td', фактически перебираем ячейки
        has: page.locator('td'),
        // параллельно проверяем чтобы в ячейке был продукт с конкретным именем
        hasText: name
    })
    // ищем в найденном ряду элемент с локатором 'input' - это чекбокс и отмечаем его
    await matchedRow.locator(tap.tableCheckbox).check()
}
