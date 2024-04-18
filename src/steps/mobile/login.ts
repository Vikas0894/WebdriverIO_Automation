import { Given, Then, When } from "@wdio/cucumber-framework";
import logger from "../../helper/logger";
import AllureReporter from "@wdio/allure-reporter";
import { mobileLoginPage } from "../../pages/mobile-login/mobile-login-page";

Given(/^open the mobile app$/, async () => {
    await logger.info(`App is opened`);
    await AllureReporter.addStep(`Application is open successfully`);
});

When(/^I click on login option$/, async () => {
   await AllureReporter.addStep(`click on login page`);
   await mobileLoginPage.clickOnLoginOption();
});

Then(/^I expect to the sucessful login$/, async () => {
    await logger.info(`login page is displayed`);
    await mobileLoginPage.VerifyAdminPage();
});

When(/^I enter the username and password$/, async () => {
    await mobileLoginPage.enterUserAndPassword('admin@gmail.com', 'admin123');

});

When(/^click on login button$/, async () => {
    await mobileLoginPage.clickOnLoginButton();
});

Then(/^I expect to the login page is displayed$/, async () => {
    await logger.info(`login page is displayed`);
    await mobileLoginPage.waitForPage();
});

When(/^I enter the admin name on Admin page$/, async () => {
 await mobileLoginPage.enterAdminName('Vikas');
});

When(/^I click on submit button$/, async () => {
    await mobileLoginPage.clickOnSubmitButton();
});

Then(/^I expect to admin name displayed on admin page$/, async () => {
    await mobileLoginPage.VerifyAdminName();
});

Then(/^I click two time on back button$/, async () => {
    await mobileLoginPage.clickOnSubmitButton();
});

Then(/^I expect to the Home page is dispalyed$/, async () => {
    await mobileLoginPage.VerifyHomePage();
});
