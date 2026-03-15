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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// ავტორიზაციის Custom Command
Cypress.Commands.add('login', (email, password) => {
  // 1. ვიყენებთ წერტილს კლასისთვის: .iprof
  cy.get('.iprof').click({ force: true }); 
  
  // 2. ვავსებთ მონაცემებს
  cy.get('input[name="login_email"]').type(email);
  cy.get('input[name="login_password"]').type(password);
  
  // 3. ვაჭერთ შესვლის ღილაკს
  cy.get('.avtorization > .input-shablon > .form-button').click();
});
// რეგისტრაციის Custom Command
Cypress.Commands.add('register', (user) => {
  cy.visit('https://testzootopia.loremipsum.ge/ka/register');
  cy.get('input[name="first_name"]').type(user.firstName);
  cy.get('input[name="reg_email"]').type(user.email);
  cy.get('input[name="personal_id"]').type(user.personalId);
  cy.get('input[name="phone"]').type(user.phone);
  cy.get('input[name="reg_password"]').type(user.password);
  cy.get('input[name="reg_password_confirmation"]').type(user.confirmPassword);
  cy.get('input[type="checkbox"]').check({ force: true });
  cy.contains('რეგისტრაცია').click();
});