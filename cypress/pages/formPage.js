class formPage {
    elements = {
        companyName: '[name = "companyName"]',
        phone: '[name = "phone"]',
        email: '[name = "email"]',
        location: '[name = "location"]',
        link: '[name = "link"]',
        discription: ':nth-child(6) > .form-control',
        btnSubmit: '.btn-primary'
    }
    getInformation(CompanyName, Phone, Email, Location, Link, Discription) {
        cy.get(this.elements.companyName).type(CompanyName)
        cy.get(this.elements.phone).type(Phone)
        cy.get(this.elements.email).type(Email)
        cy.get(this.elements.location).type(Location)
        cy.get(this.elements.link).type(Link)
        cy.get(this.elements.discription).type(Discription)
    }
    clickSubmit() {
        cy.get(this.elements.btnSubmit).click()
    }
    getPhone(Phone) {
        cy.get(this.elements.phone).type(Phone)
    }
    getEmail(Email) {
        cy.get(this.elements.email).type(Email)
    }
    getLink(Link) {
        cy.get(this.elements.link).type(Link)
    }
}
module.exports = new formPage();