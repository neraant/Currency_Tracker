describe('Chart displaying', () => {
  beforeEach(() => {
    cy.visit('/timeline');
  });

  it('should display currency selector', () => {
    cy.get('[data-testid="currency-selector-wrapper"]').should('be.visible');
    cy.get('[data-testid="currency-selector"] li').should('have.length.greaterThan', 1);
  });

  it('should reload chart after currency selection', () => {
    cy.get('[data-testid="currency-selector-wrapper"]').click();
    cy.get('[data-testid="currency-selector-EUR"]').click();
    cy.get('[data-testid="currency-chart-text"]').should('contain', 'EUR');
  });
});
