const user = require('../fixtures/user');
const items = require('../fixtures/items');

describe('Advanced Flow with User and Items', () => {
  beforeEach(() => {
    cy.clearCookie('svelteUser');
    cy.clearCookie('svelteItems');
    cy.setCookie('svelteUser', JSON.stringify(user));
    cy.setCookie('svelteItems', JSON.stringify(items));
  });

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

  it('item should be sorted alphabetically by name by default', () => {
    cy.visit('/');

    setTimeout(() => {
      cy.get('.authed-main-items-container')
        .find('.item-container')
        .each((elem, index) => {
          if (index === 0) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 0) {
                  expect(_elem).to.have.text('Apples');
                }
              });
          } else if (index === 1) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 0) {
                  expect(_elem).to.have.text('Bananas');
                }
              });
          } else if (index === 2) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 0) {
                  expect(_elem).to.have.text('Cookies');
                }
              });
          } else if (index === 3) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 0) {
                  expect(_elem).to.have.text('Ground Beef');
                }
              });
          }
        });
    }, 5000);
  });

  it('aisle sort works', () => {
    cy.visit('/');
    cy.get('select').select('aisle');

    setTimeout(() => {
      cy.get('.authed-main-items-container')
        .find('.item-container')
        .each((elem, index) => {
          if (index === 0) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 1) {
                  _elem.should('not.exist');
                }
              });
          } else if (index === 1) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 1) {
                  _elem.should('not.exist');
                }
              });
          } else if (index === 2) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 1) {
                  expect(_elem).to.have.text('Aisle: 1.5');
                }
              });
          } else if (index === 3) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 1) {
                  expect(_elem).to.have.text('Aisle: 15');
                }
              });
          }
        });
    }, 5000);
  });

  it('date added sort works', () => {
    cy.visit('/');
    cy.get('select').select('date');

    setTimeout(() => {
      cy.get('.authed-main-items-container')
        .find('.item-container')
        .each((elem, index) => {
          if (index === 0) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 0) {
                  expect(_elem).to.have.text('Cookies');
                }
              });
          } else if (index === 1) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 0) {
                  expect(_elem).to.have.text('Bananas');
                }
              });
          }
        });
    }, 5000);
  });

  it('the store search links should be to HEB by default', () => {
    cy.visit('/');

    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        if (index === 0) {
          cy.get(elem)
            .find('a')
            .should('have.attr', 'href')
            .and('match', /www.heb.com/);
        }
      });
  });

  it('the store search links should be to Wal-Mart when user switches the toggle to Wal-Mart', () => {
    cy.visit('/');
    cy.get('[type="radio"]').check('walmart');

    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        if (index === 0) {
          cy.get(elem)
            .find('a')
            .should('have.attr', 'href')
            .and('match', /www.walmart.com/);
        }
      });
  });

  it('the store search links should be to Kroger when user switches the toggle to Kroger', () => {
    cy.visit('/');
    cy.get('[type="radio"]').check('kroger');

    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        if (index === 0) {
          cy.get(elem)
            .find('a')
            .should('have.attr', 'href')
            .and('match', /www.kroger.com/);
        }
      });
  });

  it('the edit button works for each item', () => {
    cy.visit('/');

    // click on the edit button in the item container
    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        if (index === 0) {
          cy.get(elem)
            .find('button')
            .each((_elem, _index) => {
              if (_index === 1) {
                _elem.click();
              }
            });
        }
      });

    // clear the first input field and replace with 'Caramel apples'
    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        if (index === 0) {
          cy.get(elem)
            .find('input')
            .each((_elem, _index) => {
              if (_index === 0) {
                cy.get(_elem).clear();
                cy.get(_elem).type('Caramel apples');
              }
            });
        }
      });

    // click on the save button in the item container
    cy.get('.authed-main-items-container')
      .find('.item-container')
      .each((elem, index) => {
        if (index === 0) {
          cy.get(elem)
            .find('button')
            .each((_elem, _index) => {
              if (_index === 1) {
                _elem.click();
              }
            });
        }
      });

    // verify that the SECOND item's name is now 'Caramel apples' (order changed with auto sort)
    setTimeout(() => {
      cy.get('.authed-main-items-container')
        .find('.item-container')
        .each((elem, index) => {
          if (index === 1) {
            cy.get(elem)
              .find('p')
              .each((_elem, _index) => {
                if (_index === 0) {
                  expect(_elem).to.have.text('Caramel apples');
                }
              });
          }
        });
    }, 5000);
  });
});
