/// <reference path="../../../src/components.d.ts" />

describe('vime-embed', () => {
  const embed = 'vime-embed';

  before(() => {
    cy.visit('core/embed/tests');
  });

  it('should lazy load', () => {
    const src = 'https://www.youtube-nocookie.com/embed/DyTCOwB0DVw';

    cy.get(embed)
      .find('iframe')
      .should('not.be.visible');

    cy.get('link[rel="preconnect"]')
      .should('have.attr', 'href', src);

    cy.get(embed)
      .scrollIntoView();

    cy.get(embed)
      .find('iframe')
      .should('be.visible')
      .and('have.attr', 'src', src)
  });
});
