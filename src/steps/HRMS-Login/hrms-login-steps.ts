import { Given, Then, When } from "@wdio/cucumber-framework";
import { hrmsLoginPage } from "../../pages/hrms-login/hrms-login-page";

Given(/^I am on HRMS login page$/,async () => {
    await hrmsLoginPage.openHrmsApp();
});

Then(/^I expect login page is displayed$/,async () => {
    await hrmsLoginPage.verifyLoginPage();
});

When(/^I enter the valid (.*) and (.*)$/,async (username:string,password:string) => {
    await hrmsLoginPage.enterUsernameAndPassword(username,password);  
});

When(/^I click to the login button$/,async () => {
    await hrmsLoginPage.clickLoginBtn();
});

Then(/^I am expect to the error message displayed on login page$/,async () => {
    await hrmsLoginPage.verifyErrorMesg();
});

