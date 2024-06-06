import {urls as url} from '/Users/aggro/WebstormProjects/Playwright tests/Locators/Locators.js'

const {test, expect} = require('@playwright/test')
// Задаем переменную, которую будем использовать в нескольких тестах
let userid

test.describe('Api testing', async () => {

// Запрос возвращает список всех пользователей на странице
    test('Get users (GET)', async ({request}) => {

        // Заносим ответ с сервера в переменную для дальнейшей работы
        const response = await request.get(`${url.url15}users?page=2`)
        // с помощью лога можно вывести ответ себе в консоль
        console.log(await response.json())
        // Валидация на статус ответа
        expect(response.status()).toBe(200)

    })

// Запрос создает нового пользователя
    test('Create user (POST)', async ({request}) => {

        // Заносим ответ с сервера в переменную для дальнейшей работы
        const response = await request.post(`${url.url15}users`,
            {
                data: {
                    'name': 'Viktor',
                    'job': 'qa'
                },
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
        // Заносим ответ в json формате в переменную
        let res = await response.json()
        // с помощью лога можно вывести ответ себе в консоль
        console.log(res)
        // Валидация на статус ответа
        expect(response.status()).toBe(201)
        // Заносим в ID пользователя в переменную
        userid = res.id
        // Выводим ID пользователя в консоль для проверки
        console.log('New User ID is ' + userid)

    })

// Запрос обновляет данные уже существующего пользователя
    test('Update user (PUT)', async ({request}) => {

        // Заносим ответ с сервера в переменную для дальнейшей работы
        // ID только что созданного пользователя передается в URl-запроса
        const response = await request.put(`${url.url15}users/${userid}`,
            {
                data: {
                    'name': 'Mew',
                    'job': 'qa-engineer'
                },
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
        // Заносим ответ в json формате в переменную
        let res = await response.json()
        // с помощью лога можно вывести ответ себе в консоль
        console.log(res)
        // Валидация на статус ответа
        expect(response.status()).toBe(200)

    })

// Запрос удаляет созданного пользователя
    test('Delete user (DEL)', async ({request}) => {

        // Заносим ответ с сервера в переменную для дальнейшей работы
        // ID только что созданного пользователя передается в URl-запроса
        const response = await request.delete(`${url.url15}users/${userid}`,
            {
                data: {
                    'name': 'Mew',
                    'job': 'qa-engineer'
                },
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
        // Никакого ответа кроме кода мы в таком запросе не получаем
        // Поэтому валидируем только статус ответа
        expect(response.status()).toBe(204)

    })
})