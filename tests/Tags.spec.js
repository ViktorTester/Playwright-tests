
const {test} = require('@playwright/test')


test('test 1 - @sanity', async () => {
    console.log('this is test 1')
})


test('test 2 - @sanity', async () => {
    console.log('this is test 2')
})


test('test 3 - @regression', async () => {
    console.log('this is test 3')
})


test('test 4 - @regression', async () => {
    console.log('this is test 4')
})


test('test 5 - @sanity@regression', async () => {
    console.log('this is test 5')
})