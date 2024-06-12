Feature: To verify invalid login

    @product_store @e2e @invalid-login
    Scenario: Product-Store | Verify Invalid login
        Given I am on product store home
        Then I expect product store home page is displayed
        When I enetr invalid username and password on login page
        Then I verify the user
