
Feature: MERN CRUD Create Crud Page

    Scenario: Create Crud using valid credentials
        Given I access the MERN CRUD Create Crud Page
        When I enter a companyName "NAB Innovation Centre Vietnam"
        And I enter a phone 251-777-777777
        And I enter an email a@gmail.com
        And I enter a location "HCM City"
        And I enter a link https://nab-vietnam.apac.positivethinking.tech/en/listing/
        And I enter a description "We serve the financial needs of our Australian, New Zealand and global customers."
        And I click on the Submit button
        Then I should be presented with the new url "http://localhost:3000/cruds/crudId"

# Scenario: Create Crud using invalid credentials
#     Given I access the MERN CRUD Create Crud Page
#     When I enter a companyName "NAB Innovation Centre Vietnam"
#     And I enter a phone 251-777-777777
#     And I enter an email abc@abc
#     And I enter a location "HCM City"
#     And I enter a description "We serve the financial needs of our Australian, New Zealand and global customers.""
#     And I click on the Submit button
#     Then I should be presented with the notice alert

