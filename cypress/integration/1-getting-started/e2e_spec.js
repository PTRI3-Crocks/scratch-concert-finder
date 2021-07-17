const APP = 'http://localhost:8080'

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit(APP)
  })

  it('page loads successfully', async () => {
    // check page title - In The Loop
    cy.get('title')
      .should('have.text', 'In The Loop')
  })

  it('User can lookup places in given zipcode', () => {
    // get input tag
    // type zip code
    // press enter to get list of places
    cy.get('input').should('have.class', 'chakra-input')
      .wait(3000)
      .click()
      .type('94043')
      .type('{enter}')
    
    cy.get('div.placesPanel').find('div').its('length').should('be.gte', 1)
  })

  it('User can lookup concerts in a give place', () => {
    cy.get('input').should('have.class', 'chakra-input')
      .wait(3000)
      .click()
      .type('94043')
      .type('{enter}')

    cy.get('div.placesPanel').find('div').first().click()
    
    cy.get('div.MuiGrid-grid-xs-4 div.MuiContainer-root').find('div').its('length').should('be.gte', 1)
      
  })
})