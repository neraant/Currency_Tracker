describe('Filtering banks by currencies', () => {
  beforeEach(() => {
    cy.visit('/bank-card');
  });

  it('Should display all markers by default', () => {
    cy.get('[data-testid="marker"]').should('have.length.greaterThan', 2);
  });

  it('Should update bank info about accessible currencies in popup', () => {
    cy.get('[data-testid="marker"]').first().click({ force: true });

    cy.get('[data-testid="bank-info"]').within(() => {
      cy.get('[data-testid="available-currencies"]').should('contain', 'EUR');
    });
  });
});
