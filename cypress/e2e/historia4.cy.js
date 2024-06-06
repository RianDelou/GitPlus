describe("Como usuário, eu gostaria de verificar filmes/séries em alta", () => {
    beforeEach(() => {
        cy.wait(1000);
      
        cy.login("berton", "teste2");
    });

    it("Os filmes/séries em alta devem estar presentes na página principal", () => {
        cy.wait(2000); 
        cy.visit("/mainPage.html");    

        cy.get("#em-alta-list > .trailer-item").each(($el) => {
            cy.wrap($el)
                .find(".the-trailer")
                .should("have.attr", "src")
                .and((src) => {
                    expect(src).to.match(/^https?:\/\/[^\s$.?#].[^\s]*$/);
                });

            cy.wrap($el)
                .find("img.logo-GitPlus")
                .should("have.attr", "src")
                .and((src) => {
                    expect(src).to.match(/\.(png|jpe?g|webp)$/);
                });

            cy.wrap($el)
                .find("input.input-my-list")
                .should("have.attr", "type", "checkbox");
        }).then(() => {
            cy.log("Todos os elementos foram verificados com sucesso.");
        });
    });
});