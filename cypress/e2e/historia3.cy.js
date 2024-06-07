let contador = 0;

describe("Como usuário, eu gostaria de escolher separadamente por filmes/séries", () => {
  beforeEach(() => {
    cy.wait(1000);
    if (contador === 0) {
      cy.login("magronSaliente", "12345", "uf0fi2lURpgU4mIyx8oL");
    } else {
      cy.login("berton", "teste2");
    }
    contador++;
  });
  it('Deve verificar se um filme/série está no gênero certo', () => {
    cy.wait(3000);
    cy.visit("/mainPage.html");
    cy.get('.trailer-item').should('be.visible').first().within(() => {
        cy.get('.input-my-list').check(); // adiciono
        cy.get('.input-my-list').should('be.checked');
    });

    cy.wait(3000);

    cy.get('ul.trailers-list#my-list').should('be.visible').within(() => {
        cy.get('.trailer-item').should('exist');
    });

    // Verifica se os filmes/séries do gênero selecionado são exibidos dinamicamente
    cy.get('.h3-sections').each(($genreSection) => {
        cy.wrap($genreSection).click();
        cy.wait(1000); // Espera para garantir que o conteúdo foi carregado
        cy.wrap($genreSection).next().within(() => {
            cy.get('.trailer-item').should('be.visible');
        });
    });
});
});