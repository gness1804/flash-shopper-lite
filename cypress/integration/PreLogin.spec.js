describe('App Login Flow', () => {
  beforeEach(() => {
    cy.prep('PreLogin');
  });

  it('Contains the correct header text', () => {
    cy.get('#app-header').then(elem =>
      expect(elem).to.contain('Flash Shopper Lite'),
    );
  });

  it('failing to enter in a password displays an error message to the user', () => {
    cy.get('.user-name-input').type('Test');
    cy.get('button').click();
    cy.get('.error-message-display').then(elem =>
      expect(elem).to.contain(
        'Error: user name and password required. Please try again.',
      ),
    );
  });

  it('login flow works with user name and password', () => {
    cy.get('.user-name-input').type('Test');
    cy.get('.password-input').type('password');

    cy.get('.login-button').click();
    cy.get('.user-info-display p').then(elem =>
      expect(elem).to.contain('Hello'),
    );
    cy.get('.user-info-display span').then(elem =>
      expect(elem).to.contain('Test'),
    );
  });
});
