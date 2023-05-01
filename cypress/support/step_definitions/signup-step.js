import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"
var crudId;

Given('I access the MERN CRUD Create Crud Page', () => {
    cy.visit('http://localhost:3000/cruds/new');
})

When('I enter a companyName {string}', (companyName) => {
    cy.get('[name = "companyName"]').type(companyName);
})

And('I enter a phone {word}', (phone) => {
    cy.get('[name = "phone"]').type(phone);
})

And('I enter an email {word}', (email) => {
    cy.get('[name = "email"]').type(email);
})

And('I enter a location {string}', (location) => {
    cy.get('[name = "location"]').type(location);
})

And('I enter a link {word}', (link) => {
    cy.get('[name = "link"]').type(link);
})

And('I enter a description {string}', (description) => {
    cy.get(':nth-child(6) > .form-control').type(description);
})

And('I click on the Submit button', () => {
    cy.intercept('POST', 'http://localhost:3000/api/cruds').as('myXHR')
    cy.get('.btn-primary').click().wait('@myXHR').then((xhr) => {
        cy.log(xhr.response.body._id)
        crudId = xhr.response.body._id
    })
})

And('I click on the Submit button again', () => {
    cy.get('.btn-primary').click()
})

Then('I should be presented with the new url {string}', () => {
    cy.url().should('equal', `http://localhost:3000/cruds/${crudId}`)
})

Then('I should see an error message {string}', () => {
    cy.get('[name = "email"]').should('have.attr', 'required')
    cy.get('[name = "email"]:invalid')
        .invoke('prop', 'validationMessage')
        .should('equal', 'Please match the requested format.')
})



