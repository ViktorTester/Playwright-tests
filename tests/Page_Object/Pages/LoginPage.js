// Объявление и экспорт класса
exports.LoginPage =

    // Создаем класс
    class LoginPage {

        // Фиксируем локаторы
        constructor(page) {
            this.page = page;
            this.loginLink = '#login2'
            this.usernameInput = '#loginusername'
            this.passwordInput = '#loginpassword'
            this.loginButton = '//button [normalize-space()="Log in"]'
        }

        // Записываем первый метод - переход на сайт
        async gotoLoginPage() {
            await this.page.goto('https://www.demoblaze.com/index.html');
        }

        // Записываем второй метод - заполнение логин формы
        async login(username, password) {
            await this.page.locator(this.loginLink).click();
            await this.page.locator(this.usernameInput).fill(username);
            await this.page.locator(this.passwordInput).fill(password);
            await this.page.locator(this.loginButton).click();
        }

    }