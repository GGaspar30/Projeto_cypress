///<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        //cy.visit('./cypress-basico-v2/src/index.html')// usando repositório interno
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')// usando link externo
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const textoLongo = 'teste teste teste teste teste teste teste teste teste '

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
            .type(textoLongo, {delay: 0}) //diminui o tempo de digitação de textos muito longos
            .should('have.value', textoLongo)

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')


    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não numérico',()=>{
        cy.get('#phone')
            .type('qweqeqwwe')
            .should('have.value', '')

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
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
    
    cy.get('#phone-checkbox')
        .check()

   
    cy.get('#open-text-area')
        .should('be.visible')
        .type('teste') 
        .should('have.value', 'teste')
    

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')



    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
        cy.get('#firstName')
        .should('be.visible')
        .type('Gustavo')
        .should('have.value', 'Gustavo')
        .clear()
        .should('have.value', '')

    cy.get('#lastName')
        .should('be.visible')
        .type('Gaspar')
        .should('have.value', 'Gaspar')
        .clear()
        .should('have.value', '')
  

    cy.get('#email')
        .should('be.visible')
        .type('gustavo.teste@teste.com')
        .should('have.value', 'gustavo.teste@teste.com')
        .clear()
        .should('have.value', '')

    cy.get('#phone')
        .should('be.visible')
        .type('51333333333')
        .should('have.value', '51333333333')
        .clear()
        .should('have.value', '')
  
    cy.get('#phone-checkbox')
        .check()

   
    cy.get('#open-text-area')
        .should('be.visible')
        .type('teste') 
        .should('have.value', 'teste')
        .clear()
        .should('have.value', '')
    

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')



    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', ()=>{
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')


    })
    it('eleciona um produto (YouTube) por seu texto', ()=>{

        cy.get('select')
            .select('YouTube')
            .should('have.value','youtube')

    })
    it('seleciona um produto (Mentoria) por seu valor (value)',()=>{

        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')


    })
    it('seleciona um produto (Blog) por seu índice',()=>{

        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"', ()=>{
        cy.get('input[type="radio"]')
                .check('feedback')
                .should('have.value', 'feedback')

    })
    it('marca cada tipo de atendimento', ()=>{
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(()=>($radio)=>{
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
        })
        
        
    })
    it('marca ambos checkboxes, depois desmarca o último',()=>{
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')            
    })
    it('seleciona um arquivo da pasta fixtures', ()=>{
        cy.get('input[type="file"]#file-upload')//passando id junto ao campo para ficar mais espesifico caso aja mais de um type file
            .selectFile('cypress/fixtures/example.json')
            .then(input=>{
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', ()=>{
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
            .then(input=>{
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('input[type="file"]')
            .selectFile('@arquivoExemplo')           
            .should(input=>{
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })
   /* it('sleciona multiplos arquivos pra upload', ()=>{
        cy.get('input[type="file"]')
        .selectFile([
            'cypress/fixtures/example.json',
            'cypress/fixtures/example.txt'
        ])
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
            expect(input[1].files[1].name).to.equal('example.txt')
        })

    })
    it('sleciona multiplos arquivos pra upload com drag-drop', ()=>{
        cy.get('input[type="file"]')
        .selectFile([
            'cypress/fixtures/example.json',
            'cypress/fixtures/example.txt'
        ],{action:"drag-drop"})
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
            expect(input[1].files[1].name).to.equal('example.txt')
        })

    })*/
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', ()=>{
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing')
    })
   

})


