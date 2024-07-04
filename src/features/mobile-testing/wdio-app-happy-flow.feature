Feature: Testing WDIO Android Application

    Background: Verify App Launch
        Given I launch the Android application
        Then I should see the main screen
        When I click on login Widget
        Then I expect to login page is displayed

    @mobile @wdioSignup
    Scenario: SignUp in app
        When I navigate the signup page
        Then I expect to signup page is displayed
        When I enter the email and password on signup page
        And I enter the confirm password on signup page
        And I click on signup button
        Then I expect to sucessful alert pop up is displayed
        When I accept the alert pop Up
        Then I expect to signup page is displayed

    @mobile @wdioLogin
    Scenario: Login in app
        When I enter the email and password on login page
        And I Click on login button
        Then I expect to sucessful message is displayed
