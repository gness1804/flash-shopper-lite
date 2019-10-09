describe('Item Entry Post-Login', () => {
  beforeEach(() => {
    cy.prep('ItemEntry');
  });

  it('displays the Log Out and Delete All Items buttons', () => {
    cy.get('.logout-button').then(elem =>
      cy.get(elem).should('have.text', 'Log Out'),
    );
    cy.get('.delete-all-items-button').then(elem =>
      cy.get(elem).should('have.text', 'Delete All Items'),
    );
  });

  it('adding an item via the input field should add an item to the UI', () => {
    cy.get('.name-input-main').type('Bananas');
    cy.get('.submit-button').click();

    // asserting that the item's box now exists in the DOM
    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        /* eslint-disable no-unused-expressions */
        if (index === 0) {
          expect(elem).to.exist;
          /* eslint-enable no-unused-expressions */
          cy.get(elem)
            .find('.item-name-display')
            .then(_elem => expect(_elem).to.contain('Bananas'));
        }
      });

    // asserting that the message to the user now shows 1 item on the list
    cy.get('.items-count-display').then(elem =>
      expect(elem).to.contain('You have 1 item on your list.'),
    );
  });
});
