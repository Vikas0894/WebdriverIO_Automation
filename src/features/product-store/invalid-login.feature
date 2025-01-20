Feature: To verify invalid login

  @product_store @e2e @invalid-login
  Scenario: Product-Store | Verify Invalid login
    Given I am on product store home
    Then I expect product store home page is displayed
    When I enetr invalid username and password on login page
    Then I verify the user

  @product_store @failed-login
  Scenario: Intentionally fail login with empty credentials
    Given I am on the login page
    When I leave the username and password fields empty
    And I click on the login button
    Then I should see an error message indicating that fields are required
