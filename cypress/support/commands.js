// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })

const user = require('../fixtures/user');
const items = require('../fixtures/items');

Cypress.Commands.add('prep', fileName => {
  switch (fileName) {
    case 'PreLogin':
      cy.clearCookie('svelteUser');
      cy.clearCookie('svelteItems');
      cy.visit('/');
      break;
    case 'ItemEntry':
      cy.clearCookie('svelteUser');
      cy.clearCookie('svelteItems');
      cy.setCookie('svelteUser', JSON.stringify(user));
      cy.visit('/');
      break;
    case 'AdvancedFlow':
      cy.clearCookie('svelteUser');
      cy.clearCookie('svelteItems');
      cy.setCookie('svelteUser', JSON.stringify(user));
      cy.setCookie('svelteItems', JSON.stringify(items));
      break;
    default:
      cy.clearCookie('svelteUser');
      cy.clearCookie('svelteItems');
      break;
  }
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
