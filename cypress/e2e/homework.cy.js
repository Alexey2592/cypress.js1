describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/'); // зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль

         cy.get('#mail').type('german@dolnikov.ru'); // ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
         cy.get('#loginButton').click(); // нажал войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // текст видет пользователь
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крест и он виден пользователю

    })

    it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки забыли пароль

        cy.get('#forgotEmailButton').click(); // нажал забыли пароль
        cy.get('#mailForgot').type('ivan@ivanov.ru'); // ввел любую почту
        cy.get('#restoreEmailButton').click(); // нажал отправить код
        
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // текст видет пользователь
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крест и он виден пользователю

   })

   it('Неверный пароль и верный логин', function () {
    cy.visit('https://login.qa.studio/'); // зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль

         cy.get('#mail').type('german@dolnikov.ru'); // ввели верный логин
         cy.get('#pass').type('iLoveqastud'); // ввели неверный пароль
         cy.get('#loginButton').click(); // нажал войти

         cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // текст видет пользователь
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крест и он виден пользователю

})

it('Верный пароль и неверный логин', function () {
    cy.visit('https://login.qa.studio/'); // зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль

         cy.get('#mail').type('german@dolnik.ru'); // ввели неверный логин
         cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
         cy.get('#loginButton').click(); // нажал войти

         cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // текст видет пользователь
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крест и он виден пользователю

})

it('Верный пароль и неверный логин (Валидация)', function () {
    cy.visit('https://login.qa.studio/'); // зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль

         cy.get('#mail').type('germandolnikov.ru'); // ввели неверный логин без @
         cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
         cy.get('#loginButton').click(); // нажал войти

         cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // текст видет пользователь
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крест и он виден пользователю

})

it('Строчные буквы логина', function () {
    cy.visit('https://login.qa.studio/'); // зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль

         cy.get('#mail').type(' GerMan@Dolnikov.ru'); // ввели  логин строчными буквами
         cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
         cy.get('#loginButton').click(); // нажал войти

         cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // текст видет пользователь
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крест и он виден пользователю

})

it('покупка аватара', function () {
    cy.visit('https://pokemonbattle.ru/login/'); // зашли на сайт
         
         cy.get(':nth-child(1) > .auth__input').type('mishenkoaleksy@ya.ru'); // ввели верный логин
         cy.get('#password').type('Vch4949449494'); // ввели верный пароль
         cy.get('.auth__button').click(); // нажал войти

         cy.get('.header__container > .header__id').click(); // нажал айди тренера
         cy.get('[href="/shop"]').click(); // нажал смена аватара
         cy.get('.available > button').first().click({ force: true }); // нажал купить аватар

         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996'); // ввел номер карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('1225'); // ввел срок действия карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // ввел CVV карты
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Alexey Mishshcenko'); // ввел имя держателя карты
         cy.get('.pay-btn').click(); // нажал оплатить
         cy.get('#cardnumber').type('56456'); // ввел полученный код
         cy.get('.payment__submit-button').click(); // нажал отправить код

         cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // проверяю, что после авторизации вижу текст
         cy.get('.payment__font-for-success').should('be.visible'); // текст видет пользователь
         cy.get('.payment__adv').should('be.visible'); // есть вернутся в магазин и его видет пользователь

})
  })
