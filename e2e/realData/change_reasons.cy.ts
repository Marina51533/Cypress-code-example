describe('Change reasons - real data', () => {
  let countRows = 0
    beforeEach(() => {
      cy.loginTest()
      cy.visit('/configuration/change-reasons')
    })

    it('C3192,C3193,C3194,C3195,C3196,C3199,C3197 Change reasons section: overview ', () => {
      //overview
      cy.getCy('add-reason-button').should('be.visible')
      cy.getCy('expand-Replenishment rejection').should('be.visible')
      cy.getCy('accordion-Replenishment rejection').should('be.visible')
      cy.getCy('accordion-New purchase order').should('be.visible')
      cy.getCy('accordion-Purchase order change').should('be.visible')
      cy.getCy('accordion-New distribution order').should('be.visible')
      cy.getCy('accordion-Distribution order change').should('be.visible')
      cy.getCy('accordion-New manufacturing order').should('be.visible')
      cy.getCy('accordion-Manufacturing order change').should('be.visible')
      //add change reason - Cancel btn
      cy.getCy('add-reason-button').click()
      cy.getCy('close-form').click()
      //add a new reason and check, if there is visible in the list
      cy.getCy('add-reason-button').click()
      cy.addTextintoTextfield('reason-code-textfield','Cypress test')
      cy.addTextintoTextfield('autocomplete-textfield','Replenishment rejection')
      cy.get('.MuiAutocomplete-option').click()
      cy.getCy('save-form').click()
      cy.getCy('expand-Replenishment rejection').click()
      cy.waitForRequest()
      cy.contains('Cypress test').should('be.visible')
      cy.get('div[class="ag-root ag-unselectable ag-layout-normal"]')
        .invoke('attr', 'aria-rowcount')
        .then((value) => {
          countRows = Number(value)
        })
      //resonn code is not shown in other sections
      cy.getCy('expand-Replenishment rejection').click()
      cy.getCy('accordion-New purchase order').click()
      cy.contains('Cypress test').should('not.exist')
      cy.getCy('accordion-New purchase order').click()
      cy.getCy('expand-Replenishment rejection').click()
      cy.wait(2000)
      //Edit icon pen - Cancel btn
      cy.get('[row-id="Cypress test"]').find('svg').eq(0).click()
      cy.getCy('close-form').click()
      cy.getCy('close-form').should('not.be.visible')
      //edit reason code
      cy.getCy('modify-button').eq(0).click()
      cy.addTextintoTextfield('reason-code-textfield', 'Cypress updated')
      cy.getCy('save-form').click()
      cy.waitForRequest()
      cy.getCy('save-form').should('not.be.visible')
      cy.contains('Cypress updated').should('be.visible')
      cy.contains(
        'The change reason Cypress updated has been successfully edited.'
      ).should('be.visible')
      //Delete updated reason code - Cancel btn
      cy.getCy('modify-button').eq(0).click()
      cy.getCy('open-delete-modal-button').click()
      cy.getCy('close-delete-reason-modal').click()
      //Delete updated reson code - Delete
      cy.get('[row-id="Cypress updated"]').find('svg').eq(0).click()
      cy.getCy('open-delete-modal-button').click()
      cy.getCy('confirm-delete-button').click()
      cy.waitForRequest()
      cy.contains(
        'The change reason Cypress updated has been successfully removed.'
      )
      cy.get('div[class="ag-root ag-unselectable ag-layout-normal"]')
        .invoke('attr', 'aria-rowcount')
        .then((value) => {
          expect(Number(value)).to.be.eql(countRows - 1)
          console.log(countRows)
        })
      //Elements are clickable
      cy.getCy('accordion-New purchase order').click()
      cy.getCy('accordion-Purchase order change').click()
      cy.getCy('accordion-New distribution order').click()
      cy.getCy('accordion-Distribution order change').click()
      cy.getCy('accordion-New manufacturing order').click()
      cy.getCy('accordion-Manufacturing order change').click()
    })    
})