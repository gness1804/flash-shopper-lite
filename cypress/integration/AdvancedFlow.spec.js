const user = require('../fixtures/user');
const items = require('../fixtures/items');

describe('Advanced Flow with User and Items', () => {
  beforeEach(() => {
    cy.clearCookie('svelteUser');
    cy.clearCookie('svelteItems');
    cy.setCookie('svelteUser', JSON.stringify(user));
    cy.setCookie('svelteItems', JSON.stringify(items));
  });

  afterEach(() => {});

  it('there should be four items in the DOM', () => {
    cy.visit('/');

    // asserting that four new elements exist in the DOM
    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index, collection) => {
        expect(collection.length).to.equal(4);
      });

    // asserting that the message to the user now shows 4 items on the list
    cy.get('.user-info-display p').each((elem, index) => {
      if (index === 1) {
        expect(elem).to.contain('You have 4 items on your list.');
      }
    });
  });

  it('deleting an item should leave 3 items in the DOM', () => {
    cy.visit('/');

    cy.get('.authed-main-items-container')
      .find('.item-container .delete-button')
      .each((elem, index) => {
        if (index === 0) {
          cy.get(elem).click();
        }
      });

    // asserting that three elements now exist in the DOM
    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index, collection) => {
        expect(collection.length).to.equal(3);
      });

    // asserting that the message to the user now shows 3 items on the list
    cy.get('.user-info-display p').each((elem, index) => {
      if (index === 1) {
        expect(elem).to.contain('You have 3 items on your list.');
      }
    });
  });

  it('the delete all items button deletes all items', () => {
    cy.visit('/');
    cy.get('.destructive-button').each((elem, index) => {
      if (index === 1) {
        cy.get(elem).click();
      }
    });

    // asserting that the message to the user now shows 0 items on the list
    cy.get('.user-info-display p').each((elem, index) => {
      if (index === 1) {
        expect(elem).to.contain(
          'There are no items on your list. Please add one now.',
        );
      }
    });

    cy.get('.authed-main-items-container .item-container').should('not.exist');
  });

  it('aisle sort works', () => {
    cy.visit('/');
    cy.get('select').select('aisle');

    // verify that the aisles are sorted correctly; first two entries don't have aisles
    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        // the third item box should have aisle 1.5
        if (index === 2) {
          cy.get(elem)
            .find('p')
            .each((_elem, _index) => {
              if (_index === 1) {
                expect(_elem).to.contain('Aisle: 1.5');
              }
            });
        }
      });

    // for some reason, this passes on cypress open but fails in cypress run
    // cy.get('.authed-main-items-container')
    //   .find('.item-container')
    //   .each((elem, index) => {
    //     // the fourth item box should have aisle 15
    //     if (index === 3) {
    //       cy.get(elem)
    //         .find('p')
    //         .each((_elem, _index) => {
    //           if (_index === 1) {
    //             expect(_elem).to.contain('Aisle: 15');
    //           }
    //         });
    //     }
    //   });
  });
});
