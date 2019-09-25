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
    cy.clearCookie('svelteItems');
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

  it('adding an item via the input field should add an item to the UI', () => {
    cy.visit('/');
    cy.get('form input').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).type('Bananas');
      }
    });
    cy.get('form button').click();

    // asserting that the item's box now exists in the DOM
    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        /* eslint-disable no-unused-expressions */
        if (index === 0) {
          expect(elem).to.exist;
          /* eslint-enable no-unused-expressions */
          cy.get(elem)
            .find('p')
            .then(_elem => expect(_elem).to.contain('Bananas'));
        }
      });

    // asserting that the message to the user now shows 1 item on the list
    cy.get('.user-info-display p').each((elem, index) => {
      if (index === 1) {
        expect(elem).to.contain('You have 1 item on your list.');
      }
    });
  });
});
