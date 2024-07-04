import { Given, Then, When } from "@wdio/cucumber-framework";
import logger from "../../helper/logger";
import AllureReporter from "@wdio/allure-reporter";
import { wdioSignupPage } from "../../pages/wdio-mobile-app/wdio-signup-page";
import { wdioLoginPage } from "../../pages/wdio-mobile-app/wdio-login-page";
import { getEmail } from "../../helper/get-email";
import { getRandomString } from "../../helper/get-random-string";

let username = getEmail(7);
let password = getRandomString("alphanumeric", 8);

Given(/^I launch the Android application$/, async () => {
    await logger.info(`App is opened`);
    await AllureReporter.addStep(`Application is open successfully`);
});

Then(/^I should see the main screen$/, async () => {
    await wdioSignupPage.waitForPage();
});

When(/^I click on login Widget$/, async () => {
    await wdioLoginPage.clickOnLoginWindget();
});

Then(/^I expect to login page is displayed$/, async () => {
    await wdioLoginPage.verifyLoginPage();
});

When(/^I navigate the signup page$/, async () => {
    await wdioSignupPage.clickOnSignUp();
});

Then(/^I expect to signup page is displayed$/, async () => {
    await wdioSignupPage.verifySignUpPage();
});

When(/^I enter the email and password on signup page$/, async () => {
    await wdioSignupPage.fillEditBox(username, password);
});

When(/^I enter the confirm password on signup page$/, async () => {
    await wdioSignupPage.enterConfirmPassword(password);
});

When(/^I click on signup button$/, async () => {
    await wdioSignupPage.clickOnSubmitBtn();
});

Then(/^I expect to sucessful alert pop up is displayed$/, async () => {
    await wdioSignupPage.verifySignUpPopUp();
});


When(/^I accept the alert pop Up$/, async () => {
    await wdioSignupPage.acceptAlertPopUp();
});
