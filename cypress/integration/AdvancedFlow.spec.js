describe('Advanced Flow with User and Items', () => {
  const user = {
    name: 'Test',
    password: 'password',
  };

  const items = [
    {
      name: 'Bananas',
      aisle: '15',
      quantity: '2 bunches',
      note: '',
      inCart: false,
      id: 1569374409096,
    },
    {
      name: 'Cookies',
      aisle: '',
      quantity: '',
      note: '',
      inCart: false,
      id: 1569370254356,
    },
    {
      name: 'Ground beef',
      aisle: '1.5',
      quantity: '1 lb',
      note: 'In meat section.',
      inCart: false,
      id: 1569374438855,
    },
    {
      name: 'Apples',
      aisle: '',
      quantity: '2',
      note: '',
      inCart: false,
      id: 1569374521481,
    },
  ];

  beforeEach(() => {
    cy.setCookie('svelteUser', JSON.stringify(user));
    cy.setCookie('svelteItems', JSON.stringify(items));
  });

  afterEach(() => {
    cy.clearCookie('svelteUser');
    cy.clearCookie('svelteItems');
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
        if (index === 1) {
          elem.click();
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
});
