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

  it("Deve redirecionar para a seção de séries ao clicar na opção 'Séries'", () => {
    cy.wait(2000);
    cy.visit("/mainPage.html");
    cy.get("nav a.nav-bar-element").contains("Séries").click({ force: true });
    cy.wait(2000); // Aguarda a rolagem
    cy.get("#series").should("be.visible");
  });

  it("Deve redirecionar para a seção de filmes ao clicar na opção 'Filmes'", () => {
    cy.wait(2000);
    cy.visit("/mainPage.html");
    cy.get("nav a.nav-bar-element").contains("Filmes").click({ force: true });
    cy.wait(3000); // Aguarda a rolagem
    cy.get("#filmes").should("be.visible");
  });
});