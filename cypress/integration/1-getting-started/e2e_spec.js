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



  it('User can enter zip code in search bar', () => {
    // get input tag
    // type zip code
    // press enter to get list of plces
    cy.get('input').should('have.class', 'chakra-input')
      .wait(3000)
      .click()
      .type('94043')
      .type('{enter}')

  })
})