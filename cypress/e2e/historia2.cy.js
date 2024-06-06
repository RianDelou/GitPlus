describe('Adicionar Filmes/Séries à Minha Lista', () => {
    before(() => {
 
      cy.login('berton', 'teste2');
    });
  
    it('Deve adicionar um filme/série à lista e verificar se foi adicionado', () => {
      cy.wait(3000); 
  
  
      cy.visit('/mainPage.html');
     
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
  