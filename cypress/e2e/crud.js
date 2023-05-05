import { v4 as uuidv4 } from 'uuid';

const formPage = require("../pages/formPage")
var crudId;

describe('Create New Crud', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/cruds/new')
    })

    it('TC1 - Happy Case', () => {
        formPage.getInformation('NAB Innovation Centre Vietnam', '251-777-777777', uuidv4() + '@gmail.com',
            'HCM City', 'https://nab-vietnam.apac.positivethinking.tech/en/listing/',
            'We serve the financial needs of our Australian, New Zealand and global customers.')

        // Intercept HTTP requests to a specific URL and alias it as "myXHR"
        //https://docs.cypress.io/api/commands/intercept
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

    it('TC2 - Leaves all fields blank', () => {
        formPage.clickSubmit()
        cy.get('[name="companyName"]').should('have.attr', 'required')
        cy.get('[name="companyName"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please fill out this field.')
        cy.get('[name = "companyName"]').should('have.css', 'border-color', 'rgb(134, 183, 254)')
    })

    it('TC3 - Invalid Phone', () => {
        formPage.getInformation('NAB Innovation Centre Vietnam', '1234567890', uuidv4() + '@gmail.com',
            'HCM City', 'https://nab-vietnam.apac.positivethinking.tech/en/listing/',
            'We serve the financial needs of our Australian, New Zealand and global customers.')
        formPage.clickSubmit()
        //Appear alert notice when enter invalid value
        cy.get('[name = "phone"]').should('have.attr', 'required')
        cy.get('[name = "phone"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please match the requested format.')
        cy.get('[name = "phone"]').should('have.css', 'border-color', 'rgb(134, 183, 254)')
    })

    it('TC4 - Invalid Email', () => {
        formPage.getInformation('NAB Innovation Centre Vietnam', '251-777-777777', uuidv4() + '@abc',
            'HCM City', 'https://nab-vietnam.apac.positivethinking.tech/en/listing/',
            'We serve the financial needs of our Australian, New Zealand and global customers.')
        formPage.clickSubmit()
        //Appear alert notice when enter invalid value
        cy.get('[name = "email"]').should('have.attr', 'required')
        cy.get('[name = "email"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please match the requested format.')
        cy.get('[name = "email"]').should('have.css', 'border-color', 'rgb(134, 183, 254)')
    })

    it('TC5 - Invalid Link', () => {
        formPage.getInformation('NAB Innovation Centre Vietnam', '251-777-777777', uuidv4() + '@gmail.com',
            'HCM City', 'def',
            'We serve the financial needs of our Australian, New Zealand and global customers.')
        formPage.clickSubmit()
        //Appear alert notice when enter invalid value
        cy.get('[name = "link"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please enter a URL.')
        cy.get('[name = "link"]').should('have.css', 'border-color', 'rgb(134, 183, 254)')
    })
})

describe('Crud Operations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/cruds')
    })
    it('TC6 - View all Cruds', () => {
        //View all Cruds 
        cy.get('.table-responsive').should('be.visible')
        cy.get('.link-line').contains('NAB Innovation Centre Vietnam')
    })

    it('TC7 - View one Crud by crudId', () => {
        //View Crud 'NAB Innovation Centre Vietnam' 
        cy.get(':nth-child(1) > :nth-child(5) > .btn').click()
        cy.url().should('equal', `http://localhost:3000/cruds/${crudId}`)
        cy.get('h2').contains('NAB Innovation Centre Vietnam')
        cy.get(':nth-child(7) > small').contains(`${crudId}`)
    })

    it('TC8 - Update Crud', () => {
        //Update Crud 'NAB Innovation Centre Vietnam' - Update Location and Link
        cy.get(':nth-child(1) > :nth-child(6) > .btn').click()
        cy.url().should('equal', `http://localhost:3000/cruds/${crudId}/edit`)
        cy.get('h1').contains('NAB Innovation Centre Vietnam')
        cy.get('[name = "location"]').clear().type('Ha Noi Capital')
        cy.get('[name = "link"]').clear().type('https://nab-vn.apac.positivethinking.tech/contact-us.html')
        cy.get('.btn-primary').click()
        cy.url().should('equal', `http://localhost:3000/cruds/${crudId}`)
        cy.get(':nth-child(7) > small').contains(`${crudId}`)
    })

    it('TC9 - Delete Crud', () => {
        //Delete Crud 'NAB Innovation Centre Vietnam' 
        cy.get(':nth-child(1) > :nth-child(7) > .btn').click()
        cy.url().should('equal', `http://localhost:3000/cruds/${crudId}/delete`)
        cy.get('h2').contains('NAB Innovation Centre Vietnam')
        cy.get(':nth-child(7) > small').contains(`${crudId}`)
        cy.get('.btn-danger').click()
        cy.url().should('equal', 'http://localhost:3000/cruds')
    })
})