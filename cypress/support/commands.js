Cypress.Commands.add('login', (email, password, tokenVip) => {
    cy.visit('index.html');
    cy.get('#input-email').type(email);
    cy.get('#input-password').type(password);
    if (tokenVip) {
      cy.get('#input-token-vip').type(tokenVip);
    }
    cy.get('#btn-login').click();
  });
  
  