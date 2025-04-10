Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
  firstName: 'Simple',
  lastName: 'Name',
  email: 'user@mail.com',
  text: 'Esta é uma simples mensagem!'
}) => {
  cy.get('#firstName').type(data.firstName)
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#open-text-area').type(data.text)
  cy.contains('button', 'Enviar').click()
})