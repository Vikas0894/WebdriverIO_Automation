Feature: Demo api

    @smoke @e2e
    Scenario Outline: Verify the get method
        Given get list of users from reqres.in
        And Create a users in reqres.in
        Examples:
            | TestId  |
            | API_001 |