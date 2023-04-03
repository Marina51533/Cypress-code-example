import { GridType } from '../../src/API'




Cypress.Commands.add('clickOnColumnMenu', (column) => {
  cy.getCy(`menu-button-${column}`).click({force:true})
})

Cypress.Commands.add('goToFilterTab', () => {
  cy.get('.ag-tab')
   // .then((tabs) => tabs[1])
    .eq(1)
    .click()
})

Cypress.Commands.add('openSpecificReplenishment', (inputText: string, index: number) => {
  cy.clickOnColumnMenu('itemNumber')
  cy.filterByInputText(inputText)
  cy.wait(2000)
  cy.getCy('go-to-detail-button')
    .eq(index)
    .click()
})

Cypress.Commands.add('filterByInputText', (inputText: string) => {
  cy.get('input').filter(':visible').type(inputText)
})

Cypress.Commands.add('filterByDate', (inputText: string) => {
  cy.get('input[placeholder="dd/mm/yyyy"]').filter(':visible').type(inputText)
})

Cypress.Commands.add('filterByOption', (option: GridType) => {
  cy.getCy('select-textfield').filter(':visible').click()
  cy.get(`[data-option-value=${option}`).click()
})

Cypress.Commands.add('filterByCheckbox', (index: number) => {
  cy.wait(1000)
  cy.get('.ag-set-filter-item input[type="checkbox"]')
    .then((items) => items[index])
    .click()
})

Cypress.Commands.add('filterBoolean', (filterValue: string) => {
  cy.wait(1000)
  if(filterValue==='Yes')
    {cy.getCy('menu-item-true').find('input[type="checkbox"]').click()}
  else {cy.getCy('menu-item-false').find('input[type="checkbox"]').click()}

})

Cypress.Commands.add('filterByButton', (index: number) => {
  cy.wait(1000)
  cy.get('.ag-filter button[type="button"]')
    .then((items) => items[index])
    .click()
})

Cypress.Commands.add('visibleFirstColumnValue', (column: string) => {
  cy.get(`.ag-cell.ag-cell-not-inline-editing.ag-cell-normal-height.ag-cell-value[col-id=${column}]`, {
    timeout: 10000,
  }).should('be.visible')
})

Cypress.Commands.add('visibleFirstRow', () => {
  cy.get('.ag-pinned-left-cols-container .ag-cell-value', {
    timeout: 10000,
  }).should('be.visible')
})

Cypress.Commands.add('chooseGridDataFromPicker', (date:number) => {
  //click the date picker
  cy.get('[data-testid="CalendarIcon"]').click()
  //choose a date
  const dateValue = new Date().getMonth()+1;
  for (let i = 1; i < dateValue - 9; i++){
    cy.get('[data-testid="ArrowLeftIcon"').click()
  }
  cy.get('[data-testid="ArrowLeftIcon"').click()
  cy.get('[role="dialog"]').filter(":visible").contains(date).click({force: true})
})

