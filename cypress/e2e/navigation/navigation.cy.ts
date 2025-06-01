describe('Navigation', () => {
  it('Should navigate between pages through the menu', () => {
    cy.visit('/');

    cy.get('[data-testid="link-timeline"]').click();
    cy.url().should('include', '/timeline');
    cy.get('[data-testid="chart-container"]').should('be.visible');

    cy.get('[data-testid="link-bank-card"]').click();
    cy.url().should('include', '/bank-card');
    cy.get('[data-testid="map-container"]').should('be.visible');

    cy.get('[data-testid="link-home"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('[data-testid="currency-converter-container"]').should('be.visible');

    cy.get('[data-testid="link-contacts"]').click();
    cy.url().should('include', '/contacts');
    cy.get('[data-testid="contacts-container"]').should('be.visible');
  });

  it('Should light active element in header links', () => {
    cy.visit('/');
    cy.get('[data-testid="link-home"]').should('have.class', 'active');

    cy.visit('/timeline');
    cy.get('[data-testid="link-timeline"]').should('have.class', 'active');

    cy.visit('/bank-card');
    cy.get('[data-testid="link-bank-card"]').should('have.class', 'active');

    cy.visit('/contacts');
    cy.get('[data-testid="link-contacts"]').should('have.class', 'active');
  });
});
