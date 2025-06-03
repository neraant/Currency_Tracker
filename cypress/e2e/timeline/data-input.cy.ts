describe('Input data on chart bars', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.twelvedata.com/time_series**', {
      fixture: 'timeline-data.json',
    }).as('getChartData');
    cy.visit('/timeline');
    cy.wait('@getChartData');
  });

  it('Should re-render chart after bar edit', () => {
    let imageBefore = '';

    cy.wait('@getChartData');

    cy.get('[data-testid="chart"]').then(($canvas) => {
      const canvas = $canvas[0] as HTMLCanvasElement;
      imageBefore = canvas.toDataURL();
    });

    cy.get('[data-testid="chart"]').click();
    cy.get('[data-testid="chart-input-Low"]').clear().type('1');
    cy.get('[data-testid="chart-input-Open"]').clear().type('2');
    cy.get('[data-testid="chart-input-Close"]').clear().type('3');
    cy.get('[data-testid="chart-input-High"]').clear().type('4');
    cy.get('[data-testid="modal-submit-button"]').click();

    cy.wait(300);

    cy.get('[data-testid="chart"]').then(($canvas) => {
      const canvas = $canvas[0] as HTMLCanvasElement;
      const imageAfter = canvas.toDataURL();
      expect(imageAfter).not.to.eq(imageBefore);
    });
  });

  it('Should validate input data', () => {
    cy.get('[data-testid="chart"]').click();
    cy.get('[data-testid="chart-input-Low"]').clear().type('s');
    cy.get('[data-testid="chart-input-Open"]').clear().type('s');
    cy.get('[data-testid="chart-input-Close"]').clear().type('s');
    cy.get('[data-testid="chart-input-High"]').clear().type('s');

    cy.get('[data-testid="modal-submit-button"]').click();

    cy.get('[data-testid="modal"]').should('be.visible');
  });
});
