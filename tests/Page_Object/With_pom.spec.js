// Обязательный импорт класса
import {LoginPage} from './Pages/LoginPage';
import {HomePage} from "./Pages/HomePage";
import {CartPage} from "./Pages/CartPage";

const productName = 'Samsung galaxy s6'

const {test, expect} = require('@playwright/test')

test( 'Smoke test', async ({ page }) => {

// Login Page
    // Заносим вызов класса в переменную
    const login = new LoginPage(page);
    // Обращение в первому методу класса
    await login.gotoLoginPage();
    // Обращение ко второму методу класса (передаем логин и пароль)
    await login.login('pavanol', 'test@123');
    await page.waitForTimeout(2000)


// Home Page
    // Заносим вызов класса в переменную
    const home = new HomePage(page);
    // Обращение к первому методу класса (передаем в него название товара)
    await home.addProductToCart(productName);
    // Обращение ко второму методу класса
    await home.goToCart();


// Cart
    // Заносим вызов класса в переменную
    const cart = new CartPage(page);
    await page.waitForTimeout(1000)
    // Обращение к методу класса (передаем в него название товара)
    // Так как метод возвращает некое значение, заносим его в переменную
    const status = await cart.checkProductInCart(productName);
    // Проверяем, что метод возвратил true - продукт находится в корзине.
    expect(status).toBe(true);

})