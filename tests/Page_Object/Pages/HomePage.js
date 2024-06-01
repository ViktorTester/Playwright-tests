// Объявление и экспорт класса
exports.HomePage =

    // Создаем класс
    class HomePage {

        // Фиксируем локаторы
        constructor(page) {
            this.page = page;
            // Общий локатор для всех продуктов на странице
            this.productList = '//*[@id="tbodyid"]/div/div/div/h4/a';
            this.addToCartbtn = '//a[normalize-space()="Add to cart"]';
            this.cart = "#cartur";
        }

        // Создаем первый метод
        async addProductToCart(productName) {
            // Получаем общий локатор для всех продуктов на странице и заносим в массив
            const productList = await this.page.$$(this.productList);
            // Цикл перебирает массив
            for (const product of productList) {
                // Затем извлекает из него текстовые значения (названия товаров),
                // и если находит нужное (которое мы передаем как аргумент функции),
                if (productName === await product.textContent()) {
                    // то кликает по этому продукту
                    await product.click()
                    // И прерывает цикл
                    break;
                }
            }
            // Далее осуществляется редирект на страницу продукта

            // Далее нужно нажать на кнопку добавления товара в корзину
            // При нажатии на нее, появится алерт с подтверждением

            // Как известно вызывать dialog helper нужно до того как появится алерт
            // Поэтому делаем это до клика на кнопку добавления продута в корзину
            await this.page.on('dialog', async dialog => {
                // Условие - если в алерте есть некий текст,
                it(dialog.message().includes('added'))
                {
                    // то закрываем алерт
                    await dialog.accept();
                }
            })

            // На странице продукта нажимаем на кнопку добавления его в корзину
            await this.page.locator(this.addToCartbtn).click();
        }

        // Создаем второй метод
        async goToCart() {
            // Кликаем на кнопку корзины и переходим в нее
            await this.page.locator(this.cart).click();
        }
    }