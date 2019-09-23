describe('App Landing Page', () => {
  it('Contains the correct footer text', () => {
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
});
