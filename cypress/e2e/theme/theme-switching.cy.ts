describe('Application theme toggling', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should toggle theme (dark/light)', () => {
    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'dark');

    cy.get('[data-testid="theme-wrapper"]').click();

    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'light');

    cy.get('[data-testid="theme-wrapper"]').click();

    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'dark');
  });

  it('Should save theme after reloading the page', () => {
    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'dark');

    cy.get('[data-testid="theme-wrapper"]').click();

    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'light');

    cy.reload();

    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'light');
  });

  it('Should apply theme for all the pages', () => {
    cy.get('[data-testid="theme-wrapper"]').click();

    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'light');

    cy.get('[data-testid="link-timeline"]').click();
    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'light');

    cy.get('[data-testid="link-bank-card"]').click();
    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'light');

    cy.get('[data-testid="link-contacts"]').click();
    cy.get('[data-testid="theme-wrapper"]').should('have.attr', 'data-theme', 'light');
  });
});
