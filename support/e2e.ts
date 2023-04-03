// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import { GridType } from '../../src/API'

// Import commands.js using ES2015 syntax:
import './commands'
import './cognitoLogin'
import './cognitoLoginTest'
import './gridCommands'
import '../../support/interceptGql'
import 'cypress-mochawesome-reporter/register'
import '../../support/replenishmentCommands'
import '../../support/system_configiration'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      login(): Chainable<Element>
      loginTest(): Chainable<Element>
      interceptGql(): Chainable<Element>
      getCy(
        selector: string,
        options?: Partial<
          Cypress.Loggable &
          Cypress.Timeoutable &
          Cypress.Withinable &
          Cypress.Shadow
        >
      ): Chainable<Element>
      goToFilterTab(): Chainable<Element>
      clickOnColumnMenu(value: string): Chainable<Element>
      clickOn(value: string): Chainable<Element>
      clickOnElementForce(value: string): Chainable<Element>
      chooseFromDropdown(value: number): Chainable<Element>
      openSupplyOrdersItem(): Chainable<Element>
      inputQuantity(value: string, value2?: number): Chainable<Element>
      inputDate(value: string, value2?: number): Chainable<Element>
      selectReasonAndSubmit(): Chainable<Element>
      selectReasonCancelOrderAndSubmit(): Chainable<Element>
      selectReasonReOpenOrderAndSubmit(): Chainable<Element>
      filterByInputText(value: string): Chainable<Element>
      filterByDate(value: string): Chainable<Element>
      checkingExistingItemInActionedSection(): Chainable<Element>
      deleteDropdownValues(value: number): Chainable<Element>
      chooseFromDropdownSystemConfiguration(
        value1: number,
        value2: string
      ): Chainable<Element>
      filterByCheckbox(value: number): Chainable<Element>
      filterBoolean(value: string): Chainable<Element>
      inputDateInRange(value: string, value2: string): Chainable<Element>
      visibleFirstRow(): Chainable<Element>
      visibleFirstColumnValue(value: string): Chainable<Element>
      filterByButton(value: number): Chainable<Element>
      filterByCheckboxSet(value: number): Chainable<Element>
      checkAmountRows(value: number): Chainable<Element>
      checkCounterBellow(value: number): Chainable<Element>
      chooseDataFromPicker(): Chainable<Element>
      chooseGridDataFromPicker(value: number): Chainable<Element>
      waitForRequest(): Chainable<Element>
      clickOnItemMainPage(value: number): Chainable<Element>
      openSpecificReplenishment(
        value: string,
        value2: number
      ): Chainable<Element>
      checkingAPIWithParentForLink(value: string): Chainable<Element>
      checkingTogglerPlusMinusElements(): Chainable<Element>
      filterByOption(value: GridType): Chainable<Element>
      addTextintoTextfield(value1: string, value2: string): Chainable<Element>
      chooseValueFromTextfield(
        value1: string,
        value2: string
      ): Chainable<Element>
      chooseValueFromTextfieldSelect(value1: string, value2: number, value3: number): Chainable<Element>
    }
  }
}