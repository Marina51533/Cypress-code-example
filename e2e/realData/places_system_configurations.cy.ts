describe('Places - real data', () => {
  let countPlaces = 0
  beforeEach(() => {
    cy.loginTest()
    cy.visit('/configuration/list-of-places')
  })

  it('C3234,C3236,C3237,C3238,C3243 Place without tags - overview,add new Internal place,edit place,add tag', () => {
    //Create a tag for testing
    cy.visit('/configuration/places-tags')
    cy.get('[data-testid="AddCircleOutlineIcon"]').click()
    cy.get('.MuiFormLabel-root').eq(0).click({ force: true }).type('Cy_tag')
    cy.get('.MuiFormLabel-root')
      .eq(1)
      .click({ force: true })
      .type('Tags description')
    cy.contains('Add tag').click()
    cy.waitForRequest()
    cy.contains(
      'New place tag Tags description has been successfully added.'
    ).should('be.visible')
    cy.get('[row-id="Cy_tag"]').should('be.visible')
    //Places section overview, positive testing
    cy.visit('/configuration/list-of-places')
    //Take amount of places
    cy.get('p[data-count-places]')
      .invoke('attr', 'data-count-places')
      .then((value) => {
        countPlaces = Number(value)
      })
    //Overview
    cy.getCy('switch-show-map').should('be.visible')
    cy.getCy('new-place-button').should('be.visible')
    cy.get('[role="grid"]').should('be.visible')
    //Add place - 1 step - Cancel btn
    cy.clickOn('new-place-button')
    cy.clickOn('close-modal')
    cy.getCy('step-index-1').should('not.exist')
    //Add place - 1 step - General
    cy.clickOn('new-place-button')
    cy.addTextintoTextfield('place-name-textfield', 'Cypress name')
    cy.addTextintoTextfield('place-id-textfield', 'zzz')
    cy.addTextintoTextfield('contact-name-textfield', 'Cypress')
    cy.addTextintoTextfield('email-textfield', 'cy_1234@mail.com')
    cy.addTextintoTextfield('phone-textfield', '123432345')
    cy.clickOn('next-step-button')
    //Field Input Address should be visible
    cy.getCy('additional-information-textfield').should('be.visible')
    cy.clickOn('close-modal')
    //Add place - 2 step - Location
    cy.clickOn('new-place-button')
    cy.addTextintoTextfield('place-name-textfield', 'Cypress name')
    cy.addTextintoTextfield('place-id-textfield', 'zzz')
    cy.addTextintoTextfield('contact-name-textfield', 'Cypress')
    cy.addTextintoTextfield('email-textfield', 'cy_1234@mail.com')
    cy.addTextintoTextfield('phone-textfield', '123432345')
    cy.clickOn('next-step-button')
    cy.contains('Place address')
      .click({ force: true })
      .type('Edgware Road, London, UK')
      .click()
    cy.addTextintoTextfield('additional-information-textfield', 'Some text')
    cy.clickOn('next-step-button')
    cy.clickOn('close-modal')
    //Add place - 3 step - Settings
    cy.clickOn('new-place-button')
    cy.addTextintoTextfield('place-name-textfield', 'Cypress name')
    cy.addTextintoTextfield('place-id-textfield', 'zzz')
    cy.addTextintoTextfield('contact-name-textfield', 'Cypress')
    cy.addTextintoTextfield('email-textfield', 'cy_1234@mail.com')
    cy.addTextintoTextfield('phone-textfield', '123432345')
    cy.clickOn('next-step-button')
    cy.contains('Place address').click({ force: true }).type('Edgware Road')
    cy.contains('Edgware Road, London, UK').click()
    cy.addTextintoTextfield('additional-information-textfield', 'Some text')
    cy.clickOn('next-step-button')
    cy.clickOn('internal-button')
    cy.clickOn('switch-manufacturing')
    cy.clickOn('switch-inbound')
    cy.clickOn('switch-outbound')
    cy.chooseValueFromTextfield('autocomplete-textfield', 'Mon')
    cy.addTextintoTextfield('leadtime-factor-textfield', '20')
    cy.clickOn('switch-inventory')
    cy.clickOn('save-place-button')
    cy.waitForRequest()
    cy.get('[row-id="zzz"]').should('be.visible')
    cy.contains('New place Cypress name has been successfully added.').should(
      'be.visible'
    )
    //Check amount of the places after the new was added
    cy.get('p[data-count-places]')
      .invoke('attr', 'data-count-places')
      .then((value) => {
        expect(Number(value)).to.be.eql(countPlaces + 1)
      })
    //Edit
    cy.wait(1000)
    cy.get('[row-id="zzz"]').find('svg').eq(1).click({ force: true })
    cy.addTextintoTextfield('place-name-textfield', 'Cypress name edited')
    cy.chooseValueFromTextfield('autocomplete-textfield', 'Cy_tag')
    cy.clickOn('next-step-button')
    cy.clickOn('next-step-button')
    cy.clickOn('switch-manufacturing')
    cy.clickOn('switch-inbound')
    cy.clickOn('save-place-button')
    cy.contains(
      'The place Cypress name edited has been successfully edited.'
    ).should('be.visible')
    cy.get('[row-id="zzz"]').should('be.visible')
    //Delete the place
    cy.get('[row-id="zzz"]').find('svg').eq(1).click({ force: true })
    cy.clickOn('delete-place-button')
    cy.waitForRequest()
    cy.get('[row-id="zzz"]').should('not.exist')
    //Check amount of places after deleting the one place
    cy.get('p[data-count-places]')
      .invoke('attr', 'data-count-places')
      .then((value) => {
        expect(Number(value)).to.be.eql(countPlaces)
      })
  })

  it('C3234,C3239,C3251,C3242,C3241,C3240 Place with tags - overview, External place,delete tag,count the amount of places, the map overview', () => {
    //Take amount of places
    cy.get('p[data-count-places]')
      .invoke('attr', 'data-count-places')
      .then((value) => {
        countPlaces = Number(value)
      })
    //Check the toggle
    cy.clickOn('new-place-button')
    cy.addTextintoTextfield('place-name-textfield', 'Cy_name_external')
    cy.addTextintoTextfield('place-id-textfield', 'zx')
    cy.chooseValueFromTextfield('autocomplete-textfield', 'Cy_tag')
    cy.addTextintoTextfield('contact-name-textfield', 'Cy_external')
    cy.addTextintoTextfield('email-textfield', 'cy_1234@mail.com')
    cy.addTextintoTextfield('phone-textfield', '123432345')
    cy.clickOn('is-active-switch')
    cy.clickOn('next-step-button')
    //Check the previous pages - information should be saved for General,Settings and Location
    cy.contains('Place address').click({ force: true }).type('Edgware Road')
    cy.contains('Edgware Road, London, UK').click()
    cy.addTextintoTextfield(
      'additional-information-textfield',
      'Some cy_text'
    )
    cy.clickOn('step-index-0')
    cy.contains('Contact Information').should('be.visible')
    cy.clickOn('step-index-1')
    cy.contains('Address').should('be.visible')
    cy.clickOn('next-step-button')
    cy.getCy('external-button').click()
    cy.chooseValueFromTextfield('autocomplete-textfield', 'Mon')
    cy.addTextintoTextfield('leadtime-factor-textfield', '30')
    cy.clickOn('save-place-button')
    cy.waitForRequest()
    cy.get('[row-id="zx"]').should('be.visible')
    cy.contains(
      'New place Cy_name_external has been successfully added.'
    ).should('be.visible')
    //Check amount of the places after the new was added
    cy.get('p[data-count-places]')
      .invoke('attr', 'data-count-places')
      .then((value) => {
        expect(Number(value)).to.be.eql(countPlaces + 1)
      })
    //Edit
    cy.get('[row-id="zx"]').find('svg').eq(1).click({ force: true })
    cy.addTextintoTextfield('place-name-textfield', 'Cy_ex edited')
    cy.get('[data-testid="CancelIcon"]').click()
    cy.clickOn('next-step-button')
    cy.clickOn('next-step-button')
    cy.clickOn('save-place-button')
    cy.contains('The place Cy_ex edited has been successfully edited.').should(
      'be.visible'
    )
    cy.get('[row-id="zx"]').should('be.visible')
    //Delete the place
     cy.get('[row-id="zx"]').find('svg').eq(1).click({ force: true })
    cy.clickOn('delete-place-button')
    cy.waitForRequest()
    cy.get('[row-id="zx"]').should('not.exist')
    //Check the toggle
    cy.clickOn('switch-show-map')
    cy.get('[class="leaflet-pane leaflet-map-pane"]').should('be.visible')
    cy.clickOn('switch-show-map')
    cy.get('[class="leaflet-pane leaflet-map-pane"]').should('not.exist')
    //Check amount of the places after the place was deleted
    cy.get('p[data-count-places]')
      .invoke('attr', 'data-count-places')
      .then((value) => {
        expect(Number(value)).to.be.eql(countPlaces)
      })
    //Delete the tag
    cy.visit('/configuration/places-tags')
    cy.get('[row-id="Cy_tag"]').find('svg').eq(0).click({ force: true })
    cy.get('[data-testid="DeleteOutlineIcon"]').click()
    cy.waitForRequest()
    cy.get('[row-id="Cy_tag"]').should('not.exist')
  })
})
