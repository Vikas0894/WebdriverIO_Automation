import { Given, Then, When } from "@wdio/cucumber-framework";
import { browserMaximise } from "../../helper/browser/browser-maximise";
import { loginPage } from "../../pages/login-product-store/login-page";
import { assertEqual } from "../../helper/assert/assert-equal";
import { browserOpenUrl } from "../../helper/browser/browser-open-url";
import { browserGetUrl } from "../../helper/browser/browser-get-url";
import { configs } from "../../../config/enviroments-config";
import { readExcelFile } from "../../helper/files/read-excel-file";
import logger from "../../helper/logger";

Given(/^I am on product store home$/, async () => {
    await browserOpenUrl(configs.productStore);
    await browserMaximise();
    await logger.info(`execution started`)
});

Then(/^I expect product store home page is displayed$/, async () => {
    await loginPage.waitForPage();
});

When(/^I enetr username and password on login page$/, async () => {
    await loginPage.fillUnAndPwd();
});

Then(/^I verify the user$/, async () => {
    await console.log('excel data', readExcelFile('./data/testData.xlsx', 'TestData'));
    await loginPage.VerifyHomePage();
});

Then(/^I verify (.*) on home page$/, async (expectedUrl: string) => {
    const actulUrl = await browserGetUrl();
    console.log('TestUrl', actulUrl);
    await assertEqual(expectedUrl, actulUrl, 'Url is not matched')
    await logger.info(`execution completed`);
});

When(/^I enetr invalid username and password on login page$/, async () => {
   await loginPage.fillInvalidUnAndPwd();
});
