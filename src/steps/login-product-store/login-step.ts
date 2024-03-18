import { Given, Then, When } from "@wdio/cucumber-framework";
import { $, $$, browser } from "@wdio/globals";
import { browserMaximise } from "../../helper/browser/browser-maximise";
import { loginPage } from "../../pages/login-other/login-page";
import { assertEqual } from "../../helper/assert/assert-equal";
import { browserOpenUrl } from "../../helper/browser/browser-open-url";
import { config } from "../../../config/enviroments-config";
import { readExcelFile } from "../../helper/files/read-excel-file";
import logger from "../../helper/logger";



Given(/^I am on product store home$/, async () => {
    await browserOpenUrl(config.productStore);
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

Then(/^I verify Number Of Product on home page$/, async () => {
    if (!9) throw Error(`Invalid number Provided:${9}`)
    let num = await $$('//div[@class="col-lg-4 col-md-6 mb-4"]');
    assertEqual(num.length, 8, 'Product number is not matched')
    await logger.info(`execution completed`)
});