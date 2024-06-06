/// <reference types="Cypress"/>

describe('Deve verificar um filme/série se ele está no gênero certo', () => {
    before(() => {
        // Logando como usuário comum
        cy.visit("https://git-plus-es.vercel.app/index.html")
        cy.get('#input-email').type("lalala@gmail.com")
        cy.get('#input-password').type("123456")
        cy.get('#btn-login').click()

        // Acessando a conta
        cy.get('#image1').click()
    });

    it('Deve verificar um filme/série se ele está no gênero certo', () => {
        cy.wait(3000); 
       
        cy.get('.trailer-item').should('be.visible').first().within(() => {
      
          cy.get('.input-my-list').check();    // adiciono
        
          cy.get('.input-my-list').should('be.checked');
        });
    
        cy.wait(3000);
    
        cy.get('ul.trailers-list#my-list').should('be.visible').within(() => { // verifico se ele realmente foi adicionado
      
          cy.get('.trailer-item').should('exist');
        });
      });
});