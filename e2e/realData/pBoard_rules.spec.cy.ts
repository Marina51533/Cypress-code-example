describe('Planning board rules - reald datas', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/planning-board')
  })

  it('C3013 Open planning board rules', () => {
    cy.wait(1000)
    cy.get('[data-cy="planning-board-rule-drawer-button"]').click()
    cy.contains('Cancel').should('be.visible') // Assert that el is visible
    cy.get('[data-cy="select-textfield"').click()
    cy.get('[data-cy="menu-item-0"]').should('have.text', 'Buffer with order quantity gt 2000')
    cy.get('[data-cy="menu-item-1"]').should('have.text', 'D133 not multi-sourced')
    cy.get('[data-cy="menu-item-2"]').should('have.text', 'Manufactured 03 w/o issues')
    cy.get('[data-cy="menu-item-3"]').should('have.text', 'Short purchased low value')
    cy.get('[data-cy="menu-item-4"]').should('have.text', 'RTO with order quantity gt 2000')
  })
  it('C3015 Select first board rule', () => {
    cy.get('[data-cy="planning-board-rule-drawer-button"]').click()
    cy.get('[data-cy="select-textfield"]').click()
    cy.chooseFromDropdown(0)
    cy.wait(1000)
    cy.get('body')//an el exists or not 
      .then($body => {
        if ($body.find('button[data-cy="undo-rule-button"]').length) {
          cy.get('button[data-cy="undo-rule-button"]').click();
          //TO DO no test-cy on UNDO rule dialog
        }
        else {
          cy.get('[data-cy="select-rule-button"]').should('have.text', 'Select the rule')
          cy.get('[data-cy="select-rule-button"]').click()
          cy.get('[data-cy="apply-rule-button"]').should('have.text', 'Apply the rule')
          //i need locators for header h1 dialog
        }
      })
  })
  it('C3016 Select second board rule', () => {
    cy.get('[data-cy="planning-board-rule-drawer-button"]').click()
    cy.get('[data-cy="select-textfield"]').click()
    cy.chooseFromDropdown(1)
    cy.wait(1000)
    cy.get('body')
      .then($body => {
        if ($body.find('button[data-cy="undo-rule-button"]').length) {
          cy.get('button[data-cy="undo-rule-button"]').click();
        }
        else {
          cy.get('[data-cy="select-rule-button"]').should('have.text', 'Select the rule')
          cy.get('[data-cy="select-rule-button"]').click()
          cy.get('[data-cy="apply-rule-button"]').should('have.text', 'Apply the rule')
        }
      })
  })
  it('C3017 Select third board rule', () => {
    cy.get('[data-cy="planning-board-rule-drawer-button"]').click()	  
    cy.get('[data-cy="select-textfield"]').click()
    cy.chooseFromDropdown(2)
    cy.wait(1000)
    cy.get('body')
    .then($body => {
      if ($body.find('button[data-cy="undo-rule-button"]').length) {
        cy.get('button[data-cy="undo-rule-button"]').click();
      }
      else {
        cy.get('[data-cy="select-rule-button"]').should('have.text', 'Select the rule')
        cy.get('[data-cy="select-rule-button"]').click()
        cy.get('[data-cy="apply-rule-button"]').should('have.text', 'Apply the rule')
      }
    })
})
  it('C3018 Select fourth board rule', () => {
    cy.get('[data-cy="planning-board-rule-drawer-button"]').click()	  
    cy.get('[data-cy="select-textfield"]').click()
    cy.chooseFromDropdown(3)
    cy.wait(1000)
    cy.get('body')
    .then($body => {
      if ($body.find('button[data-cy="undo-rule-button"]').length) {
        cy.get('button[data-cy="undo-rule-button"]').click();
      }
      else {
        cy.get('[data-cy="select-rule-button"]').should('have.text', 'Select the rule')
        cy.get('[data-cy="select-rule-button"]').click()
        cy.get('[data-cy="apply-rule-button"]').should('have.text', 'Apply the rule')
      }
    })
  })
  it('Select fifth board rule', () => {
    cy.get('[data-cy="planning-board-rule-drawer-button"]').click()	  
    cy.get('[data-cy="select-textfield"]').click()
    cy.chooseFromDropdown(4)
    cy.wait(1000)
    cy.get('body')
    .then($body => {
      if ($body.find('button[data-cy="undo-rule-button"]').length) {
        cy.get('button[data-cy="undo-rule-button"]').click();
      }
      else {
        cy.get('[data-cy="select-rule-button"]').should('have.text', 'Select the rule')
        cy.get('[data-cy="select-rule-button"]').click()
        cy.get('[data-cy="apply-rule-button"]').should('have.text', 'Apply the rule')
      }
    })
  })
})
