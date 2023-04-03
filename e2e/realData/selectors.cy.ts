describe('Selectors - real data', () => {
  let countItems = 0
  let countFromBelowCounter = 0
  beforeEach(() => {
    cy.loginTest()
    cy.visit('planning-board')
  })

  it('C3109,C3110,C3111,C3112,C3113,C3262 -  Selectors for PB section', () => {
    //Take default amount of items and orders from pages
    cy.get('a[data-tab-count]')
      .invoke('attr', 'data-tab-count')
      .then((value) => {
        countItems = Number(value)
      })
    //Selectors module - overview
    cy.get('[data-testid="TuneIcon"]').click()
    cy.contains('Destination').should('be.visible')
    cy.contains('Planner code').should('be.visible')
    cy.contains('Source code').should('be.visible')
    cy.contains('Product family').should('be.visible')
    cy.contains('Item number').should('be.visible')
    cy.contains('Apply selectors').should('be.visible')
    //Apply selectors
    cy.contains('YINT').click()
    cy.contains('Apply selectors').click()
    cy.wait(3000)
    cy.get('a[data-tab-count]')
      .invoke('attr', 'data-tab-count')
      .then((value) => {
        expect(Number(value)).to.be.lt(countItems)
      })
    //Remove selectors and check amount of PB items again
    cy.get('.PrivateSwitchBase-input').click()
    cy.get('a[data-tab-count]')
      .invoke('attr', 'data-tab-count')
      .then((value) => {
        expect(Number(value)).to.be.eql(countItems)
      })
  })

  it('C3263 -  Selectors for Supply orders section', () => {
    //Take default amount of items and orders from pages
    cy.visit('/orders')
    cy.wait(3000)
    cy.get('div[aria-rowcount]')
      .invoke('attr', 'aria-rowcount')
      .then((value) => {
        countFromBelowCounter = Number(value)
        console.log(countFromBelowCounter)
      })
    //Apply selectors
    cy.get('.PrivateSwitchBase-input').eq(0).click()
    cy.waitForRequest()
    cy.get('div[aria-rowcount]')
      .invoke('attr', 'aria-rowcount')
      .then((value) => {
        expect(Number(value)).to.be.lt(countFromBelowCounter)
      })
    //Remove selectors and check amount of PB items again
    cy.get('.PrivateSwitchBase-input').eq(0).click()
    cy.waitForRequest()
    cy.get('div[aria-rowcount]')
      .invoke('attr', 'aria-rowcount')
      .then((value) => {
        expect(Number(value)).to.be.eql(countFromBelowCounter)
      })
  })
    
  it('C3264 -  Selectors for Order management section', () => {
    //Take default amount of items and orders from pages
    cy.visit('/order-management')
    cy.wait(3000)
    cy.get('a[data-tab-count]')
      .invoke('attr', 'data-tab-count')
      .then((value) => {
        countItems = Number(value)
      })
    //Apply selectors
    cy.get('.PrivateSwitchBase-input').eq(0).click()
    cy.wait(3000)
    cy.get('a[data-tab-count]')
      .invoke('attr', 'data-tab-count')
      .then((value) => {
        expect(Number(value)).to.be.lt(countItems)
      })
    //Remove selectors and check amount of PB items again
    cy.get('.PrivateSwitchBase-input').eq(0).click()
    cy.wait(2000)
    cy.get('a[data-tab-count]')
      .invoke('attr', 'data-tab-count')
      .then((value) => {
        expect(Number(value)).to.be.eql(countItems)
      })
  })

  it('C3265 -  Selectors for Customer orders section', () => {
    //Take default amount of items and orders from pages
    cy.visit('/customer-orders')
    cy.get('a[data-tab-count]')
        .invoke('attr', 'data-tab-count')
        .then((value) => {
        countItems = Number(value)
        console.log(countItems)
        })
    //Apply selectors
    cy.get('.PrivateSwitchBase-input').eq(0).click()
    cy.wait(3000)
    cy.get('a[data-tab-count]')
        .invoke('attr', 'data-tab-count')
        .then((value) => {
        expect(Number(value)).to.be.lt(countItems)
        })
    //Remove selectors and check amount of OM items again
    cy.get('.PrivateSwitchBase-input').eq(0).click()
    cy.wait(2000)
    cy.get('a[data-tab-count]')
        .invoke('attr', 'data-tab-count')
        .then((value) => {
        expect(Number(value)).to.be.eql(countItems)
        })
    })

  it('C3266 -  Selectors for Items section', () => {
    //Take default amount of items and orders from pages
    cy.visit('/items')
    cy.wait(3000)
    cy.get('div[aria-rowcount]')
      .invoke('attr', 'aria-rowcount')
      .then((value) => {
        countFromBelowCounter = Number(value)
        console.log(countFromBelowCounter)
      })
    //Apply selectors
    cy.get('.PrivateSwitchBase-input').eq(0).click()
    cy.waitForRequest()
    cy.get('div[aria-rowcount]')
      .invoke('attr', 'aria-rowcount')
      .then((value) => {
        expect(Number(value)).to.be.lt(countFromBelowCounter)
      })
    //Remove selectors and check amount of Items items again
    cy.get('.PrivateSwitchBase-input').eq(0).click()
    cy.wait(2000)
    cy.get('div[aria-rowcount]')
      .invoke('attr', 'aria-rowcount')
      .then((value) => {
        expect(Number(value)).to.be.eql(countFromBelowCounter)
      })
    //Clear all
      cy.get('[data-testid="TuneIcon"]').eq(0).click()
      cy.contains('Clear all').click()
      cy.contains('Apply selectors').click()
      cy.get('[data-testid="TuneIcon"]').eq(0).click()
      cy.contains('Clear all').should('not.exist')
  })
    
})