// Объявление и экспорт класса
exports.CartPage =

    // Создаем класс
    class CartPage {

        // Фиксируем локаторы
        constructor(page) {
            this.page = page;
            // Общий локатор для всех продуктов на странице
            this.no0fProducts = '//tbody[@id="tbodyid"]/tr/td[2]'
        }

        // Находясь в корзине, нужно проверить находится ли в ней добавленный продукт.
        // Однако продуктов может быть несколько, поэтому нужно внедрить логику.
        // Создаем метод
        async checkProductInCart(productName) {
            // Получаем общий локатор для всех продуктов на странице и заносим в массив
            const productsInCart = await this.page.$$(this.no0fProducts);
            // Цикл перебирает массив
            for (const product of productsInCart) {
                console.log(await product.textContent())
                // Затем извлекает из него текстовые значения (названия товаров),
                // и если находит нужное (которое мы передаем как аргумент функции),
                if (productName === await product.textContent()) {
                    return true;
                }
            }
            return false
        }
        // В теории цикл учитывает ситуацию когда в корзине несколько
        // идентичных товаров. Так как он начинает итерировать по списку,
        // в первый в списке будет находиться последний добавленный продукт.
    }