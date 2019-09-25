describe('App Login Flow', () => {
  it('Contains the correct header text', () => {
    cy.visit('/');
    cy.get('#app')
      .find('#app-header')
      .then(elem => expect(elem).to.contain('Flash Shopper Lite'));
  });

  it('failing to enter in a password display an error message to the user', () => {
    cy.visit('/');
    cy.get('input').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).type('Test');
      }
    });
    cy.get('button').click();
    cy.get('#app')
      .find('.error-message-display')
      .then(elem =>
        expect(elem).to.contain(
          'Error: user name and password required. Please try again.',
        ),
      );
  });

  it('login flow works with user name and password', () => {
    cy.visit('/');
    cy.get('input').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).type('Test');
      } else if (index === 1) {
        cy.get(elem).type('password');
      }
    });
    cy.get('button').click();
    cy.get('#app')
      .find('.user-info-display p')
      .then(elem => expect(elem).to.contain('Hello'));
    cy.get('#app')
      .find('.user-info-display span')
      .then(elem => expect(elem).to.contain('Test'));
  });
});