describe("Bysykkelkart", () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Shows map', () => {
    cy.get('.bike-map')
      .should('be.visible');
  })

  it('Shows at least 100 markers on the map', () => {
    cy.get('.bike-map')
      .find('img[src*="spotlight"]')
      .its('length').should('be.gt', 100)
  })

  it('Shows current update time on the page (in HH:MM:SS format)', () => {
    cy.get('.info-text').contains('div', /\d\d:\d\d:\d\d/).should('exist');
  })
});
