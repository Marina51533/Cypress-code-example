describe('Tags section - real data', () => {
  beforeEach(() => {
    cy.loginTest()
    cy.visit('/configuration/places-tags')
  })

  it('C3245,C3246,C3247,C3248,C3249,C3250 -  Tags section', () => {
    //Create a place for testing
    cy.visit('configuration/list-of-places')
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
    cy.clickOn('save-place-button')
    cy.waitForRequest()
    cy.get('[row-id="zzz"]').should('be.visible')
    cy.contains('New place Cypress name has been successfully added.').should(
      'be.visible'
    )
    //Tags section overview, add new tag - cancel btn
    cy.visit('/configuration/places-tags')
    cy.contains('New tag').should('be.visible')
    cy.get('[role="grid"]').should('be.visible')
    cy.contains('New tag').click()
    cy.contains('Cancel').click()
    cy.get('[role="grid"]').should('be.visible')
    //Add new tag - add tag without place inside
    cy.contains('New tag').click()
    cy.get('.MuiFormLabel-root')
      .eq(0)
      .click({ force: true })
      .type('Cy_test_tag')
    cy.get('.MuiFormLabel-root')
      .eq(1)
      .click({ force: true })
      .type('Tags_test description')
    cy.contains('Add tag').click()
    cy.waitForRequest()
    cy.contains(
      'New place tag Tags_test description has been successfully added.'
    ).should('be.visible')
    cy.get('[row-id="Cy_test_tag"]').should('be.visible')
    //Edit tag - Cancel btn
    cy.get('[row-id="Cy_test_tag"]').find('svg').eq(0).click()
    cy.contains('Cancel').click()
    cy.get('[role="grid"]').should('be.visible')
    //Edit tag - rename,change description,add place
    cy.get('[row-id="Cy_test_tag"]').find('svg').eq(0).click({ force: true })
    cy.get('.MuiInputBase-root')
      .eq(1)
      .find('input')
      .clear()
      .click({ force: true })
      .type('Tags_test description_edited')
    cy.chooseValueFromTextfield('autocomplete-textfield', 'zzz')
    cy.contains('Save changes').click()
    cy.waitForRequest()
    cy.get('[row-id="Cy_test_tag"]').should('be.visible')
    cy.contains(
      'The place tag Tags_test description_edited has been successfully edited.'
    ).should('be.visible')
    //Delete the tag, that a place has - Cancel btn
    cy.get('[row-id="Cy_test_tag"]').find('svg').eq(0).click()
    cy.get('[data-testid="DeleteOutlineIcon"]').click()
    cy.clickOn('close-delete-tag-modal')
    cy.get('[data-testid="DeleteOutlineIcon"]').click()
    cy.contains('Delete').click()
    cy.waitForRequest()
    cy.get('[row-id="Cy_test_tag"]').should('not.exist')
    cy.contains(
      'The place tag Tags_test description_edited has been successfully removed.'
    ).should('be.visible')
    //Delete the testing place
    cy.visit('/configuration/list-of-places')
    cy.get('[row-id="zzz"]').find('svg').eq(1).click({ force: true })
    cy.clickOn('delete-place-button')
    cy.waitForRequest()
    cy.get('[row-id="zzz"]').should('not.exist')
    //Create a tag without place
    cy.visit('/configuration/places-tags')
    cy.contains('New tag').click()
    cy.get('.MuiFormLabel-root')
      .eq(0)
      .click({ force: true })
      .type('Cypress_test')
    cy.get('.MuiFormLabel-root')
      .eq(1)
      .click({ force: true })
      .type('Cypress description')
    cy.contains('Add tag').click()
    cy.waitForRequest()
    cy.contains(
      'New place tag Cypress description has been successfully added.'
    ).should('be.visible')
    cy.get('[row-id="Cypress_test"]').should('be.visible')
    //Delete the tag
    cy.get('[row-id="Cypress_test"]').find('svg').eq(0).click()
    cy.get('[data-testid="DeleteOutlineIcon"]').click()
    cy.waitForRequest()
    cy.get('[row-id="Cypress_test"]').should('not.exist')
    cy.contains(
      'The place tag Cypress description has been successfully removed.'
    ).should('be.visible')
  })
})
