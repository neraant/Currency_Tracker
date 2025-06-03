import { CacheKeys } from './../../../src/constants/cacheKeys';

describe('caching data', () => {
  it('should not request data again if cached', () => {
    cy.intercept('GET', '**/latest**').as('getCurrencies');
    cy.visit('/');
    cy.wait('@getCurrencies');

    cy.get('[data-testid^="currency-card-"]').should('have.length.greaterThan', 0);

    cy.intercept('GET', '**/latest**').as('getCurrenciesReload');

    cy.reload();
    cy.wait(500);

    cy.get('@getCurrenciesReload.all').should('have.length', 0);
  });

  it('should use cached data from localStorage', () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        CacheKeys.CURRENCIES,
        JSON.stringify({
          timestamp: Date.now(),
          data: {
            currencies: [
              {
                code: 'ARS',
                name: 'Argentine Peso',
                icon: '/25c52698d8fc1872869c.svg',
                value: 207.49,
                formattedValue: 'R$ 207.49',
              },
              {
                code: 'AUD',
                name: 'Australian Dollar',
                icon: '/ddcbe6e6306680d862e1.svg',
                value: 0.27,
                formattedValue: 'R$ 0.27',
              },
              {
                code: 'BTC',
                name: 'Bitcoin',
                icon: '/ea6742e4e4709cfe2a29.svg',
                value: 0,
                formattedValue: 'R$ 0.00',
              },
              {
                code: 'CAD',
                name: 'Canadian Dollar',
                icon: '/8426b63f9741d9af88c4.svg',
                value: 0.24,
                formattedValue: 'R$ 0.24',
              },
              {
                code: 'CNY',
                name: 'Yuan',
                icon: '/8f5640cec377a4428a07.svg',
                value: 1.26,
                formattedValue: 'R$ 1.26',
              },
              {
                code: 'EUR',
                name: 'Euro',
                icon: '/85ecbdf958dc0db5bb0d.svg',
                value: 0.15,
                formattedValue: 'R$ 0.15',
              },
              {
                code: 'GBP',
                name: 'Libra',
                icon: '/8b0fa5ad758b963b4720.svg',
                value: 0.13,
                formattedValue: 'R$ 0.13',
              },
              {
                code: 'JPY',
                name: 'Yen',
                icon: '/a67a313cdb55c49ce292.svg',
                value: 25.16,
                formattedValue: 'R$ 25.16',
              },
              {
                code: 'USD',
                name: 'Commercial Dollar',
                icon: '/15f8f7ed3ce26d810c1f.svg',
                value: 0.17,
                formattedValue: 'R$ 0.17',
              },
            ],
            last_updated_at: 1748686143730,
          },
        })
      );
    });

    cy.visit('/');

    cy.get('[data-testid="currency-card-AUD"]').should('contain', 'R$ 0.27');
  });
});
