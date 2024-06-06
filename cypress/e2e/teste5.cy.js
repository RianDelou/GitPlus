/// <reference types="Cypress"/>

describe('Teste funcional de login', () => {
    it('Deve realizar um login corretamente', () => {
        // Logando como usuário comum
        cy.visit("https://git-plus-es.vercel.app/index.html")
        cy.get('#input-email').type("3.victorsouza@gmail.com")
        cy.get('#input-password').type("123456")
        cy.get('#btn-login').click()

        // Acessando a conta
        cy.get('#image1').click()
    });

    it('Navegando para as séries & filmes', () => {
        // Acessando o conteúdo
        cy.visit("https://git-plus-es.vercel.app/mainPage.html")

        // Esperar que o elemento de séries esteja disponível antes de clicar
        cy.get('ul > :nth-child(3)').first().should('be.visible').click()

        // Esperar que o elemento de filmes esteja disponível antes de clicar
        cy.get('ul > :nth-child(4)').first().should('be.visible').click()
    });
});