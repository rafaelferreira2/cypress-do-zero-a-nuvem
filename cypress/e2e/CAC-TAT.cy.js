describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const simpleText = Cypress._.repeat('abcdefgh rs ', 10)
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('mail@mail.com')
    cy.get('#open-text-area').type(simpleText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('span.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const simpleText = Cypress._.repeat('abcdefgh rs ', 10)
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('mail@mail,com')
    cy.get('#open-text-area').type(simpleText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('span.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const simpleText = Cypress._.repeat('abcdefgh rs ', 10)
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('mail@mail,com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(simpleText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('span.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Rafael')
      .should('have.value', 'Rafael')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Ferreira')
      .should('have.value', 'Ferreira')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('mail@mail.com')
      .should('have.value', 'mail@mail.com')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('span.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Rafael',
      lastName: 'Ferreira',
      email: 'mail@mail.com',
      text: 'Um simples agradecimento!'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('span.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][name="atendimento-tat"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', { encoding: null }).as('myFile')
    cy.get('#file-upload')
      .selectFile('@myFile')
      .then(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a[href="privacy.html"]')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')

    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()

    cy.url()
      .should('include', 'src/privacy.html')

    // cy.get('#title')
    //   .should('have.text', 'CAC TAT - Política de Privacidade')

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})