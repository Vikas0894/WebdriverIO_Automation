import { Then, When } from "@wdio/cucumber-framework";
import { wdioLoginPage } from "../../pages/wdio-mobile-app/wdio-login-page";

When(/^I enter the email and password on login page$/, async () => {
    await wdioLoginPage.fillEmailAndPwd();
});

When(/^I Click on login button$/, async () => {
    await wdioLoginPage.clickLoginButton();
});

Then(/^I expect to sucessful message is displayed$/, async () => {
    await wdioLoginPage.verifySuccessLogin();
});

