

Cypress.Commands.add('inputQuantity', (quantity: string, index = 0) => {
  cy.getCy('quantity-textfield')
    .filter(':visible')
    .eq(index)
    .find('input')
    .clear()
    .type(quantity)
})

Cypress.Commands.add('inputDate', (dateValue: string, index = 0) => {
    cy.getCy('date-picker-textfield')
      .filter(':visible')
      .eq(index)
      .find('input')
      .clear()
      .type(dateValue)
})

Cypress.Commands.add('inputDateInRange', (dateValue: string, dateValue2: string) => {
  cy.getCy('date-picker-textfield')
    .filter(':visible')
    .eq(0)
    .find('input')
    .clear()
    .type(dateValue)
  cy.getCy('date-picker-textfield')
    .filter(':visible')
    .find('input')
    .eq(1)
    .clear()
    .type(dateValue2)
})

Cypress.Commands.add('checkingTogglerPlusMinusElements', () => {
  cy.getCy('hightligh-places-switch').click()
    cy.get('[data-testid="RemoveCircleOutlineIcon"').click()
    cy.get('[data-testid="AddCircleOutlineIcon"').click()
})
