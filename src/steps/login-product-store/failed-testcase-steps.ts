import { Given, When, Then } from '@wdio/cucumber-framework';
import { browserOpenUrl } from '../../helper/browser/browser-open-url';
import { browserMaximise } from '../../helper/browser/browser-maximise';
import { configs } from '../../../config/enviroments-config';
import { loginPage } from '../../pages/login-product-store/login-page';
import { failedTestcasePage } from '../../pages/login-product-store/failed-testcase.page';

Given(/^I am on the login page$/, async () => {
    await browserOpenUrl(configs.productStore);
    await browserMaximise();
});

When(/^I leave the username and password fields empty$/, async () => {
    failedTestcasePage.fillBlankUnAndPwd();
});

When(/^I click on the login button$/, async () => {
    await failedTestcasePage.clickOnLoginButtn();
});

Then(/^I should see an error message indicating that fields are required$/, async () => {
    const alertText = await browser.getAlertText();
    expect(alertText).toContain('Please fill out Username and Password.');
    await browser.acceptAlert();
});