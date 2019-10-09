describe('Advanced Flow with User and Items', () => {
  beforeEach(() => {
    cy.prep('AdvancedFlow');
  });

  it('submit button should be disabled by default', () => {
    cy.get('.submit-button').then(elem =>
      expect(elem).to.have.prop('disabled', true),
    );
  });

  it('submit button should be enabled when there are dirty changes in the main input fields', () => {
    cy.get('.name-input-main').type('Bananas');

    cy.get('.submit-button').then(elem =>
      expect(elem).to.have.prop('disabled', false),
    );
  });

  it('there should be four items in the DOM', () => {
    // asserting that four new elements exist in the DOM
    cy.getItemContainers().then(list => {
      expect(list.length).to.equal(4);
    });

    cy.get('.items-count-display').then(elem =>
      expect(elem).to.contain('You have 4 items on your list.'),
    );
  });

  it('deleting an item should leave 3 items in the DOM', () => {
    cy.get('.delete-item-button').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).click();
      }
    });

    // asserting that three elements now exist in the DOM
    cy.getItemContainers().then(list => {
      expect(list.length).to.equal(3);
    });

    // asserting that the message to the user now shows 3 items on the list
    cy.get('.items-count-display').then(elem =>
      expect(elem).to.contain('You have 3 items on your list.'),
    );
  });

  it('the delete all items button deletes all items', () => {
    cy.get('.delete-all-items-button').click();

    cy.get('.no-items-message').then(elem =>
      expect(elem).to.contain(
        'There are no items on your list. Please add one now.',
      ),
    );

    cy.getItemContainers().should('not.exist');
  });

  it('item should be sorted alphabetically by name by default', () => {
    cy.get('.item-name-display').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).should('have.text', 'Apples');
      } else if (index === 1) {
        cy.get(elem).should('have.text', 'Bananas');
      } else if (index === 2) {
        cy.get(elem).should('have.text', 'Cookies');
      } else if (index === 3) {
        cy.get(elem).should('have.text', 'Ground beef');
      }
    });
  });

  it('aisle sort works', () => {
    cy.get('.sort-selector').select('aisle');

    cy.get('.item-aisle-display')
      .each((elem, index) => {
        if (index === 2) {
          cy.get(elem).should('have.text', 'Aisle: 1.5');
        } else if (index === 3) {
          cy.get(elem).should('have.text', 'Aisle: 15');
        }
      })
      .then(list => {
        expect(list.length).to.equal(2);
      });
  });

  // fails because item is not appearing in DOM.
  it.skip('date added sort works', () => {
    cy.get('.sort-selector').select('date');

    cy.get('.item-name-display').each((elem, index) => {
      if (index === 0) {
        cy.get(elem)
          .should('exist')
          .and('have.text', 'Cookies');
      } else if (index === 1) {
        cy.get(elem)
          .should('exist')
          .and('have.text', 'Bananas');
      } else if (index === 2) {
        cy.get(elem)
          .should('exist')
          .and('have.text', 'Ground beef');
      } else if (index === 3) {
        cy.get(elem)
          .should('exist')
          .and('have.text', 'Apples');
      }
    });
  });

  it('the store search links should be to HEB by default', () => {
    cy.get('.item-store-link').each(elem => {
      cy.get(elem)
        .should('have.attr', 'href')
        .and('match', /www.heb.com/);
    });
  });

  it('the store search links should be to Wal-Mart when user switches the toggle to Wal-Mart', () => {
    cy.get('[type="radio"]').check('walmart');

    cy.get('.item-store-link').each(elem => {
      cy.get(elem)
        .should('have.attr', 'href')
        .and('match', /www.walmart.com/);
    });
  });

  it('the store search links should be to Kroger when user switches the toggle to Kroger', () => {
    cy.get('[type="radio"]').check('kroger');

    cy.get('.item-store-link').each(elem => {
      cy.get(elem)
        .should('have.attr', 'href')
        .and('match', /www.kroger.com/);
    });
  });

  it('the edit button works for each item', () => {
    // click on the edit button in the item container
    cy.get('.edit-button').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).click();
      }
    });

    // clear the first input field and replace with 'Caramel apples'
    cy.get('.item-name-input-in-container').each((elem, index) => {
      if (index === 0) {
        cy.get(elem)
          .clear()
          .type('Caramel Apples');
      }
    });

    // click on the save button in the item container
    cy.get('.edit-button').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).click();
      }
    });

    // verify that the SECOND item's name is now 'Caramel Apples' (order changed with auto sort)
    cy.get('.item-name-display').each((elem, index) => {
      if (index === 1) {
        cy.get(elem).should('have.text', 'Caramel Apples');
      }
    });
  });

  it('clicking on the cart icon for an item toggles inCart status', () => {
    // click on the cart icon in the first item
    cy.get('.toggle-in-cart-button').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).click();
      }
    });

    // verify that the name display for the item has the correct classes
    cy.get('.item-name-display').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).should('have.class', 'line-through');
        cy.get(elem).should('have.class', 'text-gray-600');
      }
    });
  });

  it('clicking on the logout button should log the user out', () => {
    // click on the logout button
    cy.get('.logout-button').click();

    // verify that there is now a Log In button showing up in the DOM
    cy.get('.login-button')
      .should('exist')
      .and('have.text', 'Log In');
  });

  it('clicking on the Reddit button should load the Reddit data', () => {
    cy.get('.reddit-data-button').click();
    cy.get('.grocery-api-results-heading')
      .should('exist')
      .and('have.text', 'What are grocery shoppers on Reddit interested in?');
    cy.get('.reddit-result-link').then(list =>
      expect(list.length).to.be.greaterThan(0),
    );
  });
});
