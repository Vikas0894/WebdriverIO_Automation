Feature: Demo api

  @api @e2e @get
  Scenario: Verify the get method
    When get list of users from reqres.in
    Then I should receive 200 status code

  @api @e2e @post
  Scenario: Create a user
    When I send a POST request with the following data
      | key        | value                    |
      | first_name | Vikas                    |
      | last_name  | Kumar                    |
      | avatar     |                          |
      | email      | george.bluth@reqres.in   |
      | job        | Automation Test Engineer |
    Then I should receive a 201 status code

  @api @e2e @delete
  Scenario: User deletion
    Given I send a DELETE request to delete user
    Then the user should be deleted successfully

    @api @failed
    Scenario: Verify the get method with invalid endpoint
      When get list of users from invalid endpoint
      Then I should receive 404 status code

    @api @failed
    Scenario: Create a user with missing required fields
      When I send a POST request with the following data
        | key        | value                  |
        | first_name |                        |
        | last_name  |                        |
        | avatar     |                        |
        | email      | george.bluth@reqres.in |
        | job        |                        |
      Then I should receive a 400 status code

    @api @failed
    Scenario: User deletion with invalid user ID
      Given I send a DELETE request to delete user with invalid ID
      Then I should receive a 404 status code
