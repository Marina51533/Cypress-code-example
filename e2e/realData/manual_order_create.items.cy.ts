describe('Create Manual order - real data', () => {
  let countItems = 0
  beforeEach(() => {
    cy.loginTest()
    cy.visit('/items')
  })

  it('C3182,C3183,C3257 -  Create new manual order', () => {
    cy.visit('/orders/')
    cy.clickOnColumnMenu('itemNumber')
    cy.filterByInputText('220000089')
    cy.visibleFirstRow()
    cy.waitForRequest()
    cy.get('div[aria-rowcount]')
      .invoke('attr', 'aria-rowcount')
      .then((value) => {
        countItems = Number(value)
      })
    cy.getCy('clear-filters-button').click()
    //New order
    cy.visit(
      '/items/LOC~A001~ITEM~220000089~SUP~NL29AD')
    //Create manual order - Cancel btn
    cy.getCy('create-new-order-button').click()
    cy.getCy('close-manual-order-modal').click()
    //Create manual order - Create
    cy.getCy('create-new-order-button').click()
    cy.addTextintoTextfield('quantity-textfield', "1670")
    cy.inputDate('10022025')
    cy.selectReasonAndSubmit()
    cy.wait(2000)
    cy.contains('Manual order has been created.').should('be.visible')
    cy.getCy('create-new-order-button').should('be.visible')
    //Go to Orders section to check if the new original qty is visible
    cy.visit('/orders/')
    cy.clickOnColumnMenu('itemNumber')
    cy.filterByInputText('220000089')
    cy.waitForRequest()
    cy.wait(2000)
    cy.get('div[aria-rowcount]')
      .invoke('attr', 'aria-rowcount')
      .then((value) => {
        expect(Number(value)).to.be.eql(countItems + 1)
      })
    //Check, that another item has already order in a Planning board - go to Replenishemnt page
    cy.visit('/items/LOC~A001~ITEM~220000351~SUP~69032605')
    cy.getCy('create-new-order-button').click()
    cy.contains('This item is already in a Planning Board').should('be.visible')
    cy.contains('Go to replenishment').click()
    cy.contains('Replenishment').should('be.visible')
    cy.getCy('release-button').should('be.visible')
  })
})
