import { ITestCaseHookParameter } from "@cucumber/cucumber";

const { join } = require('path');
const wd = require('wd');
let scenarioNames: string[] = [];

console.log(`This is type of scenarioNames: ${typeof (scenarioNames)}`);

export const beforeScenario = function (this: ITestCaseHookParameter) {
    const scenarioName = this.pickle.name;
    scenarioNames.push(scenarioName);
};

export const capabilitiese = {
    platformName: 'Android',
    'appium:app': 'storage:filename=android.wdio.native.app.v1.0.8.apk',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '13.0',
    'appium:automationName': 'UiAutomator2',
    'sauce:options': {
        appiumVersion: '2.0.0',
        build: 'appium-build-XPAF7',
        name: process.env.SCENARIO_NAME,
        deviceOrientation: 'PORTRAIT',
    },
};

export const drivere = wd.remote({
    user: 'oauth-shrikantkhairnar313-97b98',
    key: 'd1b11921-b20f-411a-83e1-d50a614d3f57',
    hostname: 'ondemand.eu-central-1.saucelabs.com',
    port: 443,
    baseUrl: 'wd/hub',
    capabilitiese,
});
