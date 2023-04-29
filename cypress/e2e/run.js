import { v4 as uuidv4 } from 'uuid';

const formPage = require("../pages/formPage")
var crudId;

describe('CRUD - Table View', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/cruds/new')
    })

    // Use the Cypress testing framework's "it" method to define a test case called "TC1 - Happy Case"
    it('TC1 - Happy Case', () => {
        formPage.getInformation('NAB Innovation Centre Vietnam', '251-777-777777', uuidv4() + '@gmail.com',
            'HCM City', 'https://nab-vietnam.apac.positivethinking.tech/en/listing/',
            'We serve the financial needs of our Australian, New Zealand and global customers.')
        // Intercept HTTP requests to a specific URL and alias it as "myXHR"
        cy.intercept('POST', 'http://localhost:3000/api/cruds').as('myXHR')

        // Chain several commands to locate and click an element with ".btn-primary" class,
        // wait for the matching XHR request to complete, and extract an ID from the response body
        cy.get('.btn-primary').click().wait('@myXHR').then((xhr) => {
            cy.log(xhr.response.body._id)
            crudId = xhr.response.body._id
            // Assert that the current URL matches a specific pattern including the extracted ID
            cy.url().should('equal', `http://localhost:3000/cruds/${crudId}`)
        })
    })


})
describe('CRUD - Table View', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/cruds')
    })
    it('TC9 - Delete Crud', () => {
        //Delete Crud 'NAB Innovation Centre Vietnam' 
        cy.get(':nth-child(1) > :nth-child(7) > .btn').click()
        cy.url().should('equal', `http://localhost:3000/cruds/${crudId}/delete`)
        cy.get('h2').contains('NAB Innovation Centre Vietnam')
        cy.get(':nth-child(7) > small').contains(`${crudId}`)
        cy.get('.btn-danger').click()
        cy.url().should('equal', 'http://localhost:3000/cruds')
        cy.get('.table-responsive').should('not.contains', 'NAB Innovation Centre Vietnam')
    })
})

