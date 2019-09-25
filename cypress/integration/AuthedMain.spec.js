describe('App - post-login', () => {
  const user = {
    name: 'Test',
    password: 'password',
  };

  beforeEach(() => {
    cy.setCookie('svelteUser', JSON.stringify(user));
  });

  afterEach(() => {
    cy.clearCookie('svelteUser');
  });

  it('displays the Log Out and Delete All Items buttons', () => {
    cy.visit('/');
    cy.get('.destructive-button').each((elem, index) => {
      if (index === 0) {
        expect(elem).to.contain('Log Out');
      } else if (index === 1) {
        expect(elem).to.contain('Delete All Items');
      }
    });
  });
});
