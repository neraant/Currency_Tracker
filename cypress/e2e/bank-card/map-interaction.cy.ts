describe('Banks map interaction', () => {
  beforeEach(() => {
    cy.visit('/bank-card');
  });

  it('Should display map with markers', () => {
    cy.get('[data-testid="map-wrapper"]').should('be.visible');
    cy.get('[data-testid="marker"]').should('be.visible');
  });

  it('Should display bank info on marker click', () => {
    cy.get('[data-testid="marker"]').first().click({ force: true });
    cy.get('[data-testid="bank-info"]').should('be.visible');
  });

  it('Sholud close popup on map click', () => {
    cy.get('[data-testid="marker"]').first().click({ force: true });
    cy.get('[data-testid="bank-info"]').should('be.visible');

    cy.get('[data-testid="map-wrapper"]').click(100, 100);

    cy.get('[data-testid="bank-info"]').should('not.exist');
  });
});
