describe('O site deve gerar o token após realizar o login do cliente VIP.', () => {
    const user1 = 'marcio'
    const user2 = 'marcos'
    const user3 = 'luciano'
    const email = 'marcio@hotmail.con'
    const senha = '12345'
    it('criar conta vip', () => {
        cy.visit('/index.html');
        cy.wait(1000);
        cy.get("#btn-assinante").click();
        cy.get("#input-username1").type(user1);
        cy.get("#input-username2").type(user2);
        cy.get("#input-username3").type(user3);
        cy.get("#input-email").type(email);
        cy.get("#input-password").type(senha);

        cy.wait(1000);
        cy.get("#btn-criar-conta").click();
        cy.get('#h3-token').should('be.visible').and('contain', 'Token vip (salve ele em algum lugar)');
        cy.get('#token').should('be.visible').invoke('text').then((token) => {
            cy.log('token Gerado: ', token)
            expect(token).to.have.length(20);
            Cypress.env('tokenGerado', token);

        cy.wait(1000)
        cy.visit('/index.html')
        cy.login(user1, senha, token)
        });
    });
});
