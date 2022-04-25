it('testa a página da política de privavidade de forma independente', ()=>{
        cy.visit('./cypress-basico-v2/src/privacy.html')
        cy.contains('Talking About Testing')
})