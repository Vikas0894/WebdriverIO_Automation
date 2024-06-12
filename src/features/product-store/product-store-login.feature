Feature: To verify the url

    @product_store @e2e @valid_login
    Scenario Outline: Product-Store login and verify url
        Given I am on product store home
        Then I expect product store home page is displayed
        When I enetr username and password on login page
        Then I verify the user
        Then I verify <ExpectedUrl> on home page

        Examples:
            | TestId   | ExpectedUrl                |
            | Test_001 | https://www.demoblaze.com/ |
