import { Given, Then, When } from "@wdio/cucumber-framework";
import { hrmsLoginPage } from "../../pages/hrms-login/hrms-login-page";

Given(/^I am on HRMS login page$/,async () => {
    await hrmsLoginPage.openHrmsApp();
});

Then(/^I expect login page is displayed$/,async () => {
    await hrmsLoginPage.verifyLoginPage();
});

When(/^I enter the valid (.*) and (.*)$/,async (username:String,password:String) => {
    throw new Error("6ttt6");
    
});

When(/^I click to the login button$/,async () => {
    
});

Then(/^I expect navigate to the HRMS dashboard page$/,async () => {
    
});

