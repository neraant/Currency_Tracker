describe('currency convert modal on the home page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.currencyapi.com/v3/latest**', {
      fixture: 'currencies.json',
    }).as('getCurrencies');
    cy.visit('/');
    cy.wait('@getCurrencies');
  });

  it('should open modal window when clicking on the card', () => {
    cy.get('[data-testid="currency-card-USD"]').click();
    cy.get('[data-testid="modal"]').should('be.visible');
  });

  it('should display information about selected value in modal window', () => {
    cy.get('[data-testid="currency-card-USD"]').then(($card) => {
      const currencyName = $card.find('[data-testid="currency-card-title"]').text().trim();

      cy.wrap($card).click();

      cy.get('[data-testid="modal"]').should('be.visible');

      cy.get('[data-testid="currency-convert-modal-label"]').should('contain.text', 'USD');
    });
  });

  it('should convert currency', () => {
    cy.get('[data-testid="currency-card-USD"]').click();

    cy.get('[data-testid="modal"]').within(() => {
      cy.get('[data-testid="amount-input"]').clear().type('100');

      cy.get('[data-testid="converted-output"]').should('be.visible');

      cy.get('[data-testid="modal-submit-button"]').click();

      cy.get('[data-testid="converted-output"]').invoke('val').should('not.be.empty');

      cy.get('[data-testid="currency-convert-modal-label"]').should('contain.text', 'USD');
    });
  });

  it('should close the modal', () => {
    cy.get('[data-testid="currency-card-USD"]').click();
    cy.get('[data-testid="modal"]').should('be.visible');

    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="modal"]').should('not.be.visible');

    cy.get('[data-testid="currency-card-USD"]').click();
    cy.get('[data-testid="overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.be.visible');
  });
});
