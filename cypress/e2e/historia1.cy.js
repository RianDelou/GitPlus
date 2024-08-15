let contador = 0;


describe("Ao selecionar um novo ícone de perfil, ele deve aparecer em todas as áreas do site", () => {
  beforeEach(() => {
    cy.wait(1000);
    if(contador == 0){
      cy.login("magronSaliente", "12345", "uf0fi2lURpgU4mIyx8oL");
    }else{
      cy.login("berton", "teste2");
    }
    contador++;
  });
  it("O ícone deve estar presente na aba de seleção VIP", () => {
    cy.wait(3000);
    cy.visit("/iconVips.html");
    cy.get("#image1, #image2, #image3").each(() => {
      cy.get("#image1, #image2, #image3")
        .should("have.attr", "src")
        .and((src) => {
          expect(src).to.match(/\.(png|jpe?g)$/);
        });
    });
    cy.get("#image1, #image2, #image3").should('be.visible');
  });
  it("O ícone deve estar presente na aba principal", () => {
    cy.wait(2000);
    cy.visit("/mainPage.html");
    cy.get("#icon").each(() => {
      cy.get("#icon")
        .should("have.attr", "src")
        .and((src) => {
          expect(src).to.match(/\.(png|jpe?g)$/);
        });
    });
    cy.get("#icon").should('be.visible')
  });
  it("O ícone deve estar presente na aba de seleção", () => {
    cy.wait(2000);
    cy.visit("/icon.html");
    cy.get("#image1").each(() => {
      cy.get("#image1")
        .should("have.attr", "src")
        .and((src) => {
          expect(src).to.match(/\.(png|jpe?g)$/);
      });
    });
    cy.get("#image1").should('be.visible');
  });
});