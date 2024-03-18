Feature: To Verify the number of product

    @product_store @e2e
    Scenario Outline: Product-Store login and verify product
        Given I am on product store home
        Then I expect product store home page is displayed
        When I enetr username and password on login page
        Then I verify the user
        Then I verify Number Of Product on home page

        Examples:
            | TestId   | Numberofproduct |
            | Test_001 | 9               |
