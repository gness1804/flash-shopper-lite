describe('App Landing Page', function () {
  it('Contains the correct footer text', function () {
    cy.visit('/');
    cy
      .get('#app')
      .find('#app-header')
      .then(elem => expect(elem).to.contain('Flash Shopper Lite'));
  });
});
