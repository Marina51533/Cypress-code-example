import parse from 'date-fns/parse'
import { GridType } from '../../../src/API'


describe('Planning board grid', () => {
  beforeEach(() => {
    cy.loginTest()
    cy.visit('/planning-board')
  })

  it('C3035,C3033,C3031,C3032,C3034,C3028,C3029,C3030 filter by Contains/Not contains/Blank/Not blank/Starts with/Ends with/Equals/Not Equal in items (TEXT) columns', () => {
    //Filter by Contains
    cy.visibleFirstRow()
    cy.clickOnColumnMenu('itemNumber')
    cy.filterByInputText('2200')
    cy.visibleFirstRow()
    cy.get('.ag-pinned-left-cols-container .ag-cell-value').should(
      'contain',
      '2200'
    )
    cy.getCy('clear-filters-button').click()
    cy.clickOnColumnMenu('itemNumber')
    //Filter by Not contains
    cy.filterByOption(GridType.notContains)
    cy.filterByInputText('50')
    cy.visibleFirstRow()
    cy.get('.ag-pinned-left-cols-container .ag-cell-value').should(
      'not.contain',
      '50'
    )
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstRow()
    cy.clickOnColumnMenu('itemNumber')
    //Filter by Blank
    cy.filterByOption(GridType.blank)
    cy.get('.ag-pinned-left-cols-container .ag-cell-value').should(
      'have.length',
      '0'
    )
    cy.getCy('clear-filters-button').click()
    cy.clickOnColumnMenu('itemNumber')
    //Filter by Not Blank
    cy.filterByOption(GridType.notBlank)
    cy.visibleFirstRow()
    cy.get('.ag-pinned-left-cols-container .ag-cell-value').should(
      'have.length.greaterThan',
      1
    )
    cy.getCy('clear-filters-button').click()
    cy.clickOnColumnMenu('itemNumber')
    //Filter Starts with
    cy.filterByOption(GridType.startsWith)
    cy.filterByInputText('55')
    cy.visibleFirstRow()
    cy.get('.ag-pinned-left-cols-container .ag-cell-value').should(
      'contain',
      '50'
    )
    cy.getCy('clear-filters-button').click()
    cy.clickOnColumnMenu('itemNumber')
    //Filter Ends with
    cy.filterByOption(GridType.endsWith)
    cy.filterByInputText('33')
    cy.get('.ag-pinned-left-cols-container .ag-cell-value').should(
      'contain',
      '50'
    )
    cy.getCy('clear-filters-button').click()
    cy.clickOnColumnMenu('itemNumber')
    //Filter Equals
    cy.filterByOption(GridType.equals)
    cy.filterByInputText('600000472')
    cy.get('.ag-pinned-left-cols-container .ag-cell-value').should(
      'contain',
      '600000472'
    )
    cy.getCy('clear-filters-button').click()
    cy.clickOnColumnMenu('itemNumber')
    //Filter Not Equals
    cy.filterByOption(GridType.notEqual)
    cy.filterByInputText('460001211')
    cy.get('.ag-pinned-left-cols-container .ag-cell-value').should(
      'not.contain',
      '460001211'
    )
    cy.getCy('clear-filters-button').click()
  })

  it('C3024,C3036,C3037,C3038,C3039,C3040,C3041,C3042,C3043 Filter Order quantity column Number - Equals/Not equal/Less than/Greater than/Less than or equals/Greater than or equals/In range/Blank/Not blank', () => {
    //Filter by Equals
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByInputText('700')
    cy.wait(2000)
    cy.visibleFirstColumnValue('orderQuantity')
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]')
      .eq(1)
      .should('contain.text', '700')
    cy.getCy('clear-filters-button').click()
    //Filter not Equal
    cy.visibleFirstColumnValue('orderQuantity')
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByOption(GridType.notEqual)
    cy.filterByInputText('219')
    cy.wait(2000)
    cy.visibleFirstColumnValue('orderQuantity')
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]')
      .should(($el) => {
        expect($el.eq(1)).not.to.contain('219')
        expect($el.eq(2)).not.to.contain('219')
      })
      cy.getCy('clear-filters-button')
      .click()
    cy.visibleFirstColumnValue('orderQuantity')
    //Filter less than
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByOption(GridType.lessThan)
    cy.filterByInputText('20')
    //if i don't make this wait - it's try to compate with old values and test failed
    cy.wait(2000)
    cy.visibleFirstColumnValue('orderQuantity')
    cy.visibleFirstColumnValue('orderQuantity')
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]')
      .eq(10)
      .invoke('text')
      .then(parseInt).should('be.lt',20)
    cy.getCy('clear-filters-button').click()
    //Filter Less than or equal to
    cy.visibleFirstColumnValue('orderQuantity')
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByOption(GridType.lessThanOrEqual)
    cy.filterByInputText('20')
    //if i don't make this wait - it's try to compate with old values and test failed
    cy.wait(2000)
    cy.visibleFirstColumnValue('orderQuantity')
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]')
      .eq(10)
      .invoke('text')
      .then(parseInt)
      .should('be.lte', 20)
    cy.getCy('clear-filters-button').click()
    //Filter Greater than
    cy.visibleFirstColumnValue('orderQuantity')
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByOption(GridType.greaterThan)
    cy.filterByInputText('2')
    //if i don't make this wait - it's try to compate with old values and test failed
    cy.wait(2000)
    cy.visibleFirstColumnValue('orderQuantity')
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]')
      .eq(1)
      .invoke('text')
      .then(parseInt)
      .should('be.gt', 2)
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstColumnValue('orderQuantity')
    //Filter Greater than or Equal to
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByOption(GridType.greaterThanOrEqual)
    cy.filterByInputText('20')
    //if i don't make this wait - it's try to compate with old values and test failed
    cy.wait(2000)
    cy.visibleFirstColumnValue('orderQuantity')
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]')
      .eq(1)
      .invoke('text')
      .then(parseInt)
      .should('be.gte', 20)
    cy.getCy('clear-filters-button').click()
    //Filter In range
    cy.visibleFirstColumnValue('orderQuantity')
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByOption(GridType.inRange)
    cy.contains('From').click({ force: true }).type('100')
    cy.wait(2000)
    cy.get('label').contains('To').click({ force: true }).type('4000')
    // verify that first row has order quantity is in range 100 - 400
    //if i don't make this wait - it's try to compate with old values and test failed
    cy.wait(2000)
    cy.get('.ag-row-first [col-id="orderQuantity"]').should(($div) => {
      const n = parseFloat($div.text())
      expect(n).to.be.gte(100).and.be.lte(4000)
    }) 
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstColumnValue('orderQuantity')
    //Filter by Blank
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByOption(GridType.blank)
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]').should(
      'have.length',
      1
    )
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstColumnValue('orderQuantity')
    //Filter by Not Blank
    cy.clickOnColumnMenu('orderQuantity')
    cy.filterByOption(GridType.notBlank)
    cy.visibleFirstColumnValue('orderQuantity')
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]').should(
      'have.length.greaterThan',
      1
    )
  })

  it('C3048,C3049,C3027,C3044,C3045,C3046,C3047 Filter  Date - Shortage date column - Blank/Not blank/Equals/Not equal/Greater than/Lesse than/In range', () => {
    //Filter Equals
    cy.visibleFirstRow()
    cy.clickOnColumnMenu('itemShortageDate')
    cy.inputDate('02/15/2023')
    cy.visibleFirstRow()
    cy.wait(2000)
    cy.get('div[role="grid-cell"],[col-id="itemShortageDate"]').then(
      (elements) => {
        const date = parse('02/15/2023', 'dd/MM/yyyy', new Date())
        const date1 = parse(elements[1].innerText, 'dd/MM/yyyy', new Date())
        const date2 = parse(elements[3].innerText, 'dd/MM/yyyy', new Date())
        expect(date).to.be.eql(date1)
        expect(date2).to.be.eql(date1)
      }
    )
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstRow()
    //Filter Not equals
    cy.clickOnColumnMenu('itemShortageDate')
    cy.filterByOption(GridType.notEqual)
    cy.inputDate('09/05/2022')
    cy.wait(2000)
    cy.get('div[role="grid-cell"],[col-id="itemShortageDate"]').should(
      ($el) => {
        expect($el.eq(1)).to.be.not.eq('09/05/2022')
        expect($el.eq(10)).to.be.not.eq('09/05/2022')
      }
    )
    //Filter Greater than
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstRow()
    cy.clickOnColumnMenu('itemShortageDate')
    cy.filterByOption(GridType.greaterThan)
    cy.inputDate('09/05/2022')
    cy.wait(2000)
    cy.get('div[role="grid-cell"],[col-id="itemShortageDate"]').then(
      (elements) => {
        const date = parse('09/05/2022', 'dd/MM/yyyy', new Date())
        const date1 = parse(elements[3].innerText, 'dd/MM/yyyy', new Date())
        expect(date1).to.be.gt(date)
      }
    )
    //Filter Less than
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstRow()
    cy.clickOnColumnMenu('itemShortageDate')
    cy.filterByOption(GridType.lessThan)
    cy.inputDate('09/05/2023')
    cy.wait(2000)
    cy.get('div[role="grid-cell"],[col-id="itemShortageDate"]')
      .then((elements) => {
        const date = parse('09/05/2023', 'dd/MM/yyyy', new Date())
        const date1 = parse(elements[1].innerText, 'dd/MM/yyyy', new Date())
        const date2 = parse(
          elements[elements.length - 1].innerText,
          'dd/MM/yyyy',
          new Date()
        )
        expect(date1).to.be.lt(date)
        expect(date2).to.be.lt(date)
      })
    //Filter in range
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstRow()
    cy.clickOnColumnMenu('itemShortageDate')
    cy.filterByOption(GridType.inRange)
    cy.inputDateInRange('09/05/2022','09/05/2023')
    cy.wait(2000)
    cy.get('div[role="grid-cell"],[col-id="itemShortageDate"]').then(
      (elements) => {
        const date = parse('09/05/2022', 'dd/MM/yyyy', new Date())
        const date1 = parse(elements[1].innerText, 'dd/MM/yyyy', new Date())
        const date2 = parse(
          elements[elements.length - 1].innerText,
          'dd/MM/yyyy',
          new Date()
        )
        const date3 = parse('09/05/2023', 'dd/MM/yyyy', new Date())
        expect(date1).to.be.gte(date)
        expect(date1).to.be.lte(date3)
        expect(date2).to.be.gte(date)
        expect(date2).to.be.lte(date3)
      }
    )
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstRow()
    //Filter by Blank
    cy.clickOnColumnMenu('itemShortageDate')
    cy.filterByOption(GridType.blank)
    cy.visibleFirstRow()
    cy.get('div[role="grid-cell"],[col-id="itemShortageDate"]').should(
      'have.length.greaterThan',
      2
    )
    //Filter not blank
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstRow()
    cy.clickOnColumnMenu('itemShortageDate')
    cy.filterByOption(GridType.notBlank)
    cy.visibleFirstRow()
    cy.get('div[role="grid-cell"],[col-id="itemShortageDate"]').should(
      'have.length.greaterThan',
      2
    )
  })

  it('Filter Boolen - Multisourced column,Clear all/Yes/No ', () => {
    //Filter by Deselect All
    cy.visibleFirstRow()
    cy.clickOnColumnMenu('multiSourced')
    cy.getCy('clear-button').click()
    cy.wait(2000)
    cy.get('div[role="grid-cell"],[col-id="multiSourced"]').should('have.length', 1)
    //Filter by No
    cy.filterBoolean('No')
    cy.visibleFirstRow()
    cy.get('div[role="grid-cell"],[col-id="multiSourced"] svg').eq(3).invoke('attr', 'aria-label')
    .should('to.be.equal','No')
    //disabled No filter
    cy.filterBoolean('No')
    //Filter by Yes
    cy.filterBoolean('Yes')
    cy.visibleFirstRow()
    cy.get('div[role="grid-cell"],[col-id="multiSourced"] svg')
      .eq(2)
      .invoke('attr', 'aria-label')
      .should('to.be.equal','Yes') 
      
    cy.getCy('clear-filters-button').click()
  })

  it('C3026,C3050,C3051,C3052 Filter Set - Select All/01/02/03', () => {
    //Filter by Deselect All
    /*
    cy.visibleFirstColumnValue('itemStatus')
    cy.clickOnColumnMenu('itemStatus')
    cy.filterByCheckbox(0)
    cy.visibleFirstColumnValue('itemStatus')
    cy.get('div[role="grid-cell"],[col-id="orderQuantity"]').should(
      'have.length',
      1
    )
    //Filter by Select 01
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstColumnValue('itemStatus')
    cy.clickOnColumnMenu('itemStatus')
    cy.visibleFirstColumnValue('itemStatus')
    cy.filterByCheckbox(0)
    cy.filterByCheckbox(1)
    cy.visibleFirstColumnValue('itemStatus')
    cy.get('div[role="grid-cell"],[col-id="itemStatus"]').then((elements) => {
      expect(elements[1].innerText).to.be.eq('01')
      expect(elements[2].innerText).to.be.eq('01')
    })
    //Filter by Select 02
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstColumnValue('itemStatus')
    cy.clickOnColumnMenu('itemStatus')
    cy.filterByCheckbox(0)
    cy.filterByCheckbox(2)
    cy.visibleFirstColumnValue('itemStatus')
    cy.get('div[role="grid-cell"],[col-id="itemStatus"]').then((elements) => {
      expect(elements[1].innerText).to.be.eq('02')
      expect(elements[2].innerText).to.be.eq('02')
    })
    //Filter by Select 03
    
    cy.getCy('clear-filters-button').click()
    cy.visibleFirstColumnValue('itemStatus')
    cy.clickOnColumnMenu('itemStatus')
    cy.filterByCheckbox(0)
    cy.filterByCheckbox(3)
    cy.visibleFirstColumnValue('itemStatus')
    cy.get('div[role="grid-cell"],[col-id="itemStatus"]').then((elements) => {
      expect(elements[1].innerText).to.be.eq('03')
      expect(elements[2].innerText).to.be.eq('03')
    })
    cy.getCy('clear-filters-button').click()*/
  })
})
