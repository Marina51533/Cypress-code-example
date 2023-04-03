describe('Supply orders - real data', () => {
  beforeEach(() => {
    cy.loginTest()
    cy.visit('/orders')
  })
  
  it('C3117,C3116 The main Orders section page - Expedite btn - send request', () => {
    cy.clickOnItemMainPage(1)
    //Cancel Expedite
    cy.getCy('expedite-button').click()
    cy.contains('Cancel').click()
    //Send request
    cy.getCy('expedite-button').click()
    cy.getCy('cc-textfield').type('CC-textfield')
    cy.inputDate('12/12/2025')
    cy.getCy('send-request-button').click()
    cy.getCy('expedite-button').should('not.be.visible')
  })

  it('C3118,C3119,C3120,C3134,C3135,C3121,C3122 Order detail - Comment,Change order', () => {
    cy.visit(
      '/orders/LOC~A001~ITEM~220000230~SUP~NL29BS~REF~DEMO9121940004~ORDER~0'
    )
    //Comment module: Default comment- Cancel
    cy.getCy('edit-button').click()
    cy.getCy('cancel-button-comment').click()
    //Default comment - Edit
    cy.getCy('edit-button').click()
    cy.getCy('comment-textfield')
      .find('textarea')
      .eq(0)
      .clear({ force: true })
      .type('Delete the default text')
    cy.getCy('save-button').click()
    cy.getCy('edit-button').should('be.visible')
    cy.contains('Delete the default text').should('be.visible')
    //Default comment - delete
    cy.getCy('edit-button').click()
    cy.getCy('delete-comment-button').click({ force: true })
    cy.waitForRequest()
    //Create a new comment - cancel
    cy.get('[data-testid="ChatBubbleOutlineIcon"]').click({ force: true })
    cy.getCy('cancel-button-comment').click({ force: true })
    //Create a new comment - post
    cy.get('[data-testid="ChatBubbleOutlineIcon"]').click({ force: true })
    cy.getCy('comment-textfield')
      .find('textarea')
      .eq(0)
      .type('Test')
    cy.getCy('save-button').click()
    cy.wait(2000) //to check,that the message is shown
    cy.contains('Test').should('be.visible')
    cy.getCy('edit-button').should('be.visible')
    //Change order functionality
    cy.contains('Change Order').click()
    cy.getCy('quantity-textfield').should('be.visible')
    //cancel
    cy.getCy('cancel-change-order-button').click()
    //text
    cy.contains('Change Order').click()
    cy.getCy('quantity-textfield').should('be.visible')
    cy.inputQuantity('20000')
    cy.inputDate('12102023')
    cy.selectReasonAndSubmit()
    cy.getCy('submit-select-button').should('not.be.visible')
  })

  it('C3123,C3124,C3126,C3136,C3138,C3137 Orders detail page  - Expedite btn,info module', () => {
    cy.visit(
      'orders/LOC~A001~ITEM~220000084~SUP~NL29BS~REF~DEMO9121940002~ORDER~0'
    )
    cy.contains('Expedite').click()
    cy.getCy('cc-textfield').should('be.visible')
    cy.getCy('date-picker-textfield').should('be.visible')
    //Cancel Expedite
    // cy.getCy('cancel-button').click({ force : true })
    // //Send request
    // cy.getCy('send-request-button').click()
    cy.getCy('cc-textfield').type('CC-textfield')
    cy.inputDate('12/12/2025')
    //Order detail page checking - the path includes /orders/
    cy.contains('Order detail')
      .eq(0)
      .click()
      .should('have.attr', 'target', '_blank')
    cy.url().should('include', '/orders')
    //the API  request is 200
    cy.contains('Order detail')
      .eq(0)
      .then((link) => {
        cy.request(link.prop('href')).its('status').should('eq', 200)
      })
    //Send request btn - the item is expedited
    cy.getCy('send-request-button').click()
    cy.waitForRequest()
    //Rejected
    cy.getCy('reject-from-alert').click()
    //Expedited the item again
    cy.contains('Expedite').click()
    cy.getCy('cc-textfield').type('CC-textfield')
    cy.inputDate('12/12/2025')
    cy.getCy('send-request-button').click()
    cy.waitForRequest()
    //Info module - Accepted - Cancel
    cy.getCy('refresh-from-alert').click()
    cy.contains('Update order').should('be.visible')
    cy.getCy('modal-title').should(
      'have.text',
      'Expedite request satisfied'
    )
    cy.contains('12/12/2025').should('be.visible')
    cy.getCy('close-modal-button').click()
    // //Info module - Accepted - Update
    cy.getCy('refresh-from-alert',{ timeout: 3000 }).click()
    cy.getCy('satisfy-request-button').click()
  })

  it('C3127,C3128,C3129,C3130,C3131,C3133,C3132 Orders detail page - Split order, Change order,cancel order', () => {
    cy.visit(
    '/orders/LOC~A001~ITEM~220000230~SUP~NL29BS~REF~DEMO9121940004~ORDER~0'
    )
    cy.getCy('split-order').click()
    cy.getCy('modal-title').should('have.text', 'Split order')
    cy.getCy('close-split-modal').filter(':visible').click()
    //Split btn - split order functionality
    cy.getCy('split-order').click()
    cy.getCy('modal-title').should('have.text', 'Split order')
    //here the first date
    cy.inputDate('12122023', 0)
    //here  the second qty and date
    cy.inputQuantity('20000', 1)
    cy.inputDate('12122023', 1)
    //add and delete the third order
    cy.getCy('add-split').click()
    cy.getCy('delete-split-button').click()
    //select reason dropdown
    cy.selectReasonAndSubmit()
    cy.waitForRequest()
    //verification of the next page- new value of order qty and date are shown
    cy.contains('20000').should('be.visible')
    cy.contains('12/12/2023').should('be.visible')
     //change the order qty/date to their default values
    cy.contains('Change Order').click()
    cy.getCy('quantity-textfield').clear().type('20000')
    cy.inputDate('02102027', 0)
    cy.selectReasonAndSubmit()
    cy.getCy('field-orderQuantity').contains('20,000')
    cy.contains('02/10/2027').should('be.visible')
    //Cancel order - overview,Dont cancel btn
    cy.getCy('cancel-order').click()
    cy.getCy('cancel-order-submit-button').should('be.visible')
    cy.getCy('dont-cancel-button').should('be.visible')
    cy.getCy('dont-cancel-button').click()
    //Cancel order - Cancel
    cy.getCy('cancel-order').click()
    cy.selectReasonCancelOrderAndSubmit()
    //The order should have Cancelled in state
    cy.getCy('field-orderStatus').should('have.text', 'CANCELLED')
    cy.getCy('re-open-order').should('be.visible')
    //Re-open an order - Cancel btn
    cy.getCy('re-open-order').click()
    cy.getCy('cancel-reopen-order').click()
    //Re-open an order - re-open btn
    cy.getCy('re-open-order').click()
    cy.selectReasonReOpenOrderAndSubmit()
    cy.waitForRequest()
    cy.getCy('field-orderStatus').should('have.text', 'Open')
    cy.getCy('expedite-button').should('be.visible')
  })

})
