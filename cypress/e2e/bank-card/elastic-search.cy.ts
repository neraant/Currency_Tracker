describe('Elastic search for currencies', () => {
  beforeEach(() => {
    cy.visit('/bank-card');
  });

  it('Should display dropdown menu while typing', () => {
    cy.get('[data-testid="elastic-search"]').type('USD');

    cy.get('[data-testid="currency-selector-wrapper"]').should('be.visible');
    cy.get('[data-testid^="currency-selector-"]').should('have.length.greaterThan', 0);
  });

  it('Should filter data', () => {
    it('Should filter data', () => {
      cy.get('[data-testid="elastic-search"]').clear().type('E');

      cy.get('[data-testid^="currency-selector-"]').should('have.length.greaterThan', 0);

      cy.get('[data-testid^="currency-selector-"]').each(($el) => {
        expect($el.text()).to.include('E');
      });
    });
  });

  it('Sholud select currency from dropdown', () => {
    cy.get('[data-testid="elastic-search"]').click();
    cy.get('[data-testid="currency-selector"]').should('be.visible');

    cy.get('[data-testid="currency-selector-EUR"]').click();

    cy.get('[data-testid="elastic-search"]').should('have.value', 'EUR');
    cy.get('[data-testid="currency-selector"]').should('not.be.visible');
  });

  it('Sholud hide dropdown after selection', () => {
    cy.get('[data-testid="elastic-search"]').click();
    cy.get('[data-testid="currency-selector"]').should('be.visible');

    cy.get('[data-testid="currency-selector-EUR"]').click();
    cy.get('[data-testid="currency-selector"]').should('not.be.visible');
  });

  it('Sholud hide dropdown when click outside', () => {
    cy.get('[data-testid="elastic-search"]').click();
    cy.get('[data-testid="currency-selector"]').should('be.visible');

    cy.get('[data-testid="map-wrapper"]').click();
    cy.get('[data-testid="currency-selector"]').should('not.be.visible');
  });

  it('Sholud show message about empty results', () => {
    cy.get('[data-testid="elastic-search"]').clear().type('SOMETHING');

    cy.get('[data-testid="no-results-message"]').should('be.visible');
    cy.get('[data-testid="no-results-message"]').should('contain', 'Not found');
  });
});
