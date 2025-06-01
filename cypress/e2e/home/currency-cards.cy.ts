describe('currency cards on the home page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.currencyapi.com/v3/latest**', {
      fixture: 'currencies.json',
    }).as('getCurrencies');
    cy.visit('/');
    cy.wait('@getCurrencies');
  });

  it('should show cards with currency and name', () => {
    cy.get('[data-testid="currency-card-list"]').should('have.length.greaterThan', 0);

    cy.get('[data-testid="currency-card-list"]')
      .first()
      .within(() => {
        cy.get('[data-testid="currency-card-title"]').should('be.visible');
        cy.get('[data-testid="currency-card-text"]').should('be.visible');
        cy.get('[data-testid="currency-card-icon"]').should('be.visible');
      });
  });

  it('should show all major currencies', () => {
    const expectedCureencies = ['USD', 'EUR', 'CAD', 'ARS', 'JPY', 'BTC', 'AUD', 'CNY', 'GBP'];

    expectedCureencies.forEach((currency) => {
      cy.get(`[data-testid="currency-card-${currency}"]`).should('be.visible');
    });
  });

  it('should show formattedValue correctly', () => {
    cy.get('[data-testid="currency-card-text"]').each(($rate) => {
      const rateText = $rate.text();
      expect(rateText).to.match(/^R\$ \d+\.\d{2,4}$/);
    });
  });
});
