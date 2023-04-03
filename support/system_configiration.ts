Cypress.Commands.add('addTextintoTextfield', (nameOfLocator: string, typeText: string) => {
  cy.getCy(nameOfLocator)
    .find('input')
    .click()
    .clear()
    .type(typeText)
})

Cypress.Commands.add('chooseValueFromTextfield',(nameOfLocator: string, typeText: string) => {
    cy.getCy(nameOfLocator).click()
    cy.contains(typeText).click({force:true})//to click on the element
  }
)

Cypress.Commands.add('chooseValueFromTextfieldSelect',(nameOfLocator: string,num: number,  numLocator: number) => {
    cy.getCy(nameOfLocator).eq(num).click()
    cy.get(`[data-cy="menu-item-${numLocator}"]`).click({ force: true })
  }
)


