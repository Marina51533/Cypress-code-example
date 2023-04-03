describe('Order management section - real data', () => {
  beforeEach(() => {
    cy.loginTest()
    cy.visit('/order-management')
  })

  it('C3153,C3156,C3161,C3160,C3159 The main Order management page - overview', () => {
    //overview - the toggle is active by default
    cy.contains('To Be Actioned').should('be.visible')
    cy.contains('Pending').should('be.visible')
    //when the toggle is active, arrows are visible
    cy.get('.ag-group-contracted').eq(1).should('be.visible').click()
    //order detail page
    cy.getCy('go-to-detail-button').eq(1).click()
    cy.getCy('cancel-order').should('be.visible')
    cy.getCy('split-order').should('be.visible')
    cy.getCy('expedite-button').should('be.visible')
    //Cancel order - Dont cancel, Cancel
    cy.getCy('cancel-order').click()
    cy.getCy('dont-cancel-button').click()
    cy.getCy('expedite-button').should('be.visible')
    cy.getCy('cancel-order').click()
    cy.selectReasonCancelOrderAndSubmit()
    cy.waitForRequest()
    cy.contains('The order has been cancelled.').should('be.visible')
    cy.contains('CANCELLED').should('be.visible')
    //Re-open order - cancel btn, Re-open order
    cy.getCy('re-open-order').click()
    cy.getCy('cancel-reopen-order').click()
    cy.getCy('re-open-order').click()
    cy.selectReasonReOpenOrderAndSubmit()
    cy.waitForRequest()
    cy.contains('The order has been re-opened.').should('be.visible')
  })

  it('C3154,C3155,C3157,C3158 Vendor request functionality, toggle is inactive', () => {
    cy.get('.ag-group-contracted').eq(0).click()
    cy.get('.css-1iegyem').should('be.visible')
    cy.getCy('switch-group').click()
    cy.clickOnItemMainPage(3)
    cy.getCy('vendor-request-button').click()
    //Cancel btn
    cy.getCy('send-request-button').should('be.visible')
    cy.getCy('close-vendor-request-modal').click() 
    //Send request btn
    cy.getCy('vendor-request-button').click()
    cy.get('[data-testid="ArrowDropDownCircleIcon"]').click()
    //Check the Detail order's page
    cy.contains('Order detail').click().should('have.attr', 'target', '_blank')
    //the API  request is 200
    cy.contains('Order detail')
      .eq(0)
      .then((link) => {
        cy.request(link.prop('href')).its('status').should('eq', 200)
      })
    //Send request - Send
    cy.getCy('send-request-button').click()
    cy.waitForRequest()
    cy.contains('A vendor request for 1 order has been sent.').should(
      'be.visible'
    )
  })
  
  it('C3162, C3165, C3163,C3164,C3166, C3184 Pending section - Satisfied, Rejected', () => {
    //Send an order to Pending to check it later - Satisfy
    cy.visit(
      'orders/LOC~A001~ITEM~220000357~SUP~NL29BP~REF~DEMO91219400161~ORDER~0'
    )
    cy.getCy('expedite-button').click()
    cy.inputDate('12/12/2025')
    cy.getCy('send-request-button').click()
    cy.waitForRequest()
    cy.visit('order-management/pending')
    //Pending section overview
    cy.contains('Pending').click()
    cy.get('.ag-group-contracted').should('be.visible')
    cy.getCy('switch-group').click()
    cy.get('.ag-group-contracted').should('not.exist')
    cy.clickOnColumnMenu('itemNumber')
    cy.filterByInputText('220000357')
    cy.wait(2000)
    cy.get('.ag-selection-checkbox').click()
    //Satisfied - Cancel
    cy.getCy('satisfy-button').click()
    cy.getCy('close-satisfy-drawer').click()
    //Satisfied - Update order
    cy.getCy('satisfy-button').click()
    cy.getCy('update-order-button').click()
    cy.getCy('clear-filters-button').click()
    //Send an order to Pending to check it later - Reject
    cy.visit(
      'orders/LOC~A001~ITEM~220000357~SUP~NL29BP~REF~DEMO91219400161~ORDER~0'
    )
    cy.getCy('expedite-button').click()
    cy.inputDate('12/12/2027')
    cy.getCy('send-request-button').click()
    cy.waitForRequest()
    cy.visit('order-management/pending')
    cy.clickOnColumnMenu('itemNumber')
    cy.filterByInputText('220000357')
    cy.wait(2000)
    cy.get('.ag-selection-checkbox').click()
    //Rejected - Cancel
    cy.getCy('rejected-button').click()
    cy.getCy('close-reject-drawer').click()
    //Rejected - remove request
    cy.getCy('rejected-button').click()
    cy.getCy('remove-request-button').click()
    cy.contains('1 order update request has been rejected & removed.').should(
      'be.visible'
    )
    //Checking the rejected order
    cy.visit(
      'orders/LOC~A001~ITEM~220000268~SUP~NL29BA~REF~DEMO9121940012~ORDER~0'
    )
    cy.contains('Open').should('be.visible')
 })

})
