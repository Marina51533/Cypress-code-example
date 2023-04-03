// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//

//import { eq } from "cypress/types/lodash"

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('chooseFromDropdown', (column) => {
  cy.get(`[data-cy="menu-item-${column}"]`).click()
})

  Cypress.Commands.add('chooseFromDropdownSystemConfiguration', (indexFiled: number,content: string) => {
    cy.getCy('autocomplete-textfield').eq(indexFiled).click()
    cy.contains(content).click()
  })

Cypress.Commands.add('getCy', (selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) => {
  cy.get(`[data-cy="${selector}"]`, options)
})

Cypress.Commands.add('clickOn', (text: string) => {
  cy.getCy(text).click()
})

Cypress.Commands.add('clickOnElementForce', (text: string) => {
  cy.getCy(text).click({ force: true })
})

Cypress.Commands.add('selectReasonAndSubmit', () => {
   cy.getCy('select-button').filter(':visible').click()
   cy.chooseFromDropdown(0)
   cy.getCy('submit-select-button').filter(':visible').click()
})

Cypress.Commands.add('deleteDropdownValues', (index: number) => {
  cy.getCy('autocomplete-textfield').eq(index).click()
  cy.get('[data-testid="CloseIcon"]').filter(':visible').click()
})

Cypress.Commands.add('selectReasonCancelOrderAndSubmit', () => {
  cy.getCy('select-textfield').filter(':visible').click()
  cy.chooseFromDropdown(0)
  cy.getCy('cancel-order-submit-button').filter(':visible').click()
})

Cypress.Commands.add('selectReasonReOpenOrderAndSubmit', () => {
  cy.getCy('select-textfield').filter(':visible').click()
  cy.chooseFromDropdown(0)
  cy.getCy('reopen-order-submit-button').filter(':visible').click()
})

Cypress.Commands.add('chooseDataFromPicker', () => {
  //click the date picker
  cy.get('[data-testid="CalendarIcon"]').click()
  cy.get('[data-testid="ArrowDropDownIcon"]').filter(':visible').eq(1).click()
  cy.contains('2024').click()
  cy.wait(1000)
  cy.contains('17').click()
}
)

Cypress.Commands.add('waitForRequest', () => {
  const random = Math.random().toString()
  cy.intercept(Cypress.env('backendUrl')).as(random)
  cy.wait(`@${random}`)
})

Cypress.Commands.add('openSupplyOrdersItem', () => {
  cy.getCy('go-to-detail-button')
    .eq(5)
    .click()
})

Cypress.Commands.add('clickOnItemMainPage', (index: number) => {
  cy.get('.ag-pinned-left-cols-container .ag-cell-value').eq(index).click()
})

Cypress.Commands.add('checkingAPIWithParentForLink', (selector: string) => {
  //Check the detail item's page
  cy.get(selector)
    .eq(1)
    .parent()
    .click()
    .should('have.attr', 'target', '_blank')
  //the API  request is 200
  cy.get(selector)
    .eq(1)
    .parent()
    .then((link) => {
      cy.request(link.prop('href')).its('status').should('eq', 200)
    })
})