Feature: Validate HRMS application with invalid data

  @login @hrms @e2e
  Scenario Outline: Login with Invalid set of data
    Given I am on HRMS login page
    Then I expect login page is displayed
    When I enter the valid <Username> and <Password>
    And I click to the login button
    Then I am expect to the error message displayed on login page

    Examples:
      | Test_ID  | Username                    | Password  |
      | test_001 | Vikas.kumar@dntinfotech.com | Test@1994 |
