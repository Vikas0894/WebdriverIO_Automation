Feature: Signup and verify the invalid data and url

  @product_store @e2e @signUp
  Scenario: SignUp in Product-Store
    Given I am on product store home
    Then I expect product store home page is displayed
    When I click on signUp link on home page
    Then I am expect to the signUp page is displayed
    When I enetr username and password on signUp page
    And I click on signUp button
    Then I verify the signup popup and accept it
    Then I expect product store home page is displayed
