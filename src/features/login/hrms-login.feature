Feature: Login in HRMS application

    @login @hrms @e2e
    Scenario Outline: Login with Valid set of data
        Given I am on HRMS login page
        Then I expect login page is displayed
        When I enter the valid <Username> and <Password>
        And I click to the login button
        Then I expect navigate to the HRMS dashboard page

        Examples:
            | Test_ID  | Username                | Password       |
            | test_001 | Vikas.k@dntinfotech.com | Mammypapa@1994 |