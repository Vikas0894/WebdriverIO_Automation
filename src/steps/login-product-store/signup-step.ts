import { Then, When } from "@cucumber/cucumber";
import { signupPage } from "../../pages/login-product-store/signup-page";

When(/^I click on signUp link on home page$/, async () => {
    await signupPage.clcikOnSignUp();
});

Then(/^I am expect to the signUp page is displayed$/, async () => {
    await signupPage.waitForPage();
});

When(/^I enetr username and password on signUp page$/, async () => {
    await signupPage.fillUserAndPwd();
});

When(/^I click on signUp button$/, async () => {
    await signupPage.clcikOnSignUpBtn();
});

Then(/^I verify the signup popup and accept it$/, async () => {
    await signupPage.VerifySignUp();
});
