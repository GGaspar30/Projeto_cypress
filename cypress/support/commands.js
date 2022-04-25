Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=>{

    cy.get('#firstName')
        .should('be.visible')
        .type('Gustavo')
        .should('have.value', 'Gustavo')

    cy.get('#lastName')
        .should('be.visible')
        .type('Gaspar')
        .should('have.value', 'Gaspar')
  

    cy.get('#email')
        .should('be.visible')
        .type('gustavo.teste@teste.com')
        .should('have.value', 'gustavo.teste@teste.com')
    
   
    cy.get('#open-text-area')
        .should('be.visible')
        .type('teste') 
        .should('have.value', 'teste')
    

    cy.contains('button', 'Enviar').click()
    
})
