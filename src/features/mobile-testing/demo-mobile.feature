Feature:Login on Mobile application

    @mobile
    Scenario: login in to app
        Given open the mobile app
        When I click on login option
        Then I expect to the login page is displayed
        When I enter the username and password
        And click on login button
        Then I expect to the sucessful login
        When I enter the admin name on Admin page
        And I click on submit button
        Then I expect to admin name displayed on admin page
        And I click two time on back button
        And I expect to the Home page is dispalyed