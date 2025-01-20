//@ts-nocheck
import { path } from "app-root-path";
import { config as configuration } from "dotenv";
import fs from "fs";
console.log("appRoot", path);
configuration({ path: `${path}/.env` });
import allure from "@wdio/allure-reporter";
import { capabilitiese } from '../src/helper/mobile-sauce-caps';
//import { after, beforeScenario } from '../src/helper/hooks';
import { after, beforeScenario } from '../src/helper/sendEmailNotification';
import dotenv from 'dotenv';

dotenv.config();
let currentScenarioName: string;

export const config: WebdriverIO.Config = {
    autoCompileOpts: {
        autoCompile: true,
        // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
        // for all available options
        tsNodeOpts: {
            transpileOnly: true,
            project: "./tsconfig.json",
        },
    },

    // Override or add capabilities
    capabilities: [capabilitiese],

    // Add the Sauce Labs user and key to the config
    user: process.env.SAUCE_USERNAME || 'oauth-shrikantkhairnar313-97b98',
    key: process.env.SAUCE_ACCESS_KEY || 'd1b11921-b20f-411a-83e1-d50a614d3f57',

    // Set hostname and port for Sauce Labs
    hostname: 'ondemand.eu-central-1.saucelabs.com',
    port: 443,
    protocol: 'https',

    // Sauce Labs service
    services: ['sauce'],

    // Other WebDriverIO configurations
    runner: 'local',
    specs: [
        "./src/features/**/*.feature"
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: ['spec',
        [
            "allure",
            {
                outputDir: "allure-results",
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true,
            },
        ],
    ],

    cucumberOpts: {
        require: ["./src/steps/**/*.ts"], // <string[]> (file/dir) require files before executing features
        backtrace: false,                  // <boolean> show full backtrace for errors
        requireModule: [],                 // <string[]> ("module") require custom module(s)
        dryRun: false,                     // <boolean> invoke formatters without executing steps
        failFast: false,                   // <boolean> abort the run on first failure
        format: ['pretty'],                // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,                      // <boolean> disable colors in formatter output
        snippets: true,                    // <boolean> hide step definition snippets for pending steps
        source: true,                      // <boolean> hide source uris
        profile: [],                       // <string[]> (name) specify the profile to use
        strict: false,                     // <boolean> fail if there are any undefined or pending steps
        tagExpression: '',                 // <string> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 60000,                    // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },
    /**
     * Hooks
     */
    /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
    onPrepare: function (config, capabilities) {
        if (process.env.RUNNER === "LOCAL" && fs.existsSync("./allure-results")) {
            fs.rmdirSync("./allure-results", { recursive: true });
        }
    },
    before: (capabilities, specs) => {
        // This hook runs before the WebDriver session starts.
        // We'll set up the scenario name dynamically in this hook.
        if (capabilities && capabilities['sauce:options'] && currentScenarioName) {
            capabilities['sauce:options'].name = currentScenarioName;
        }
    },
    /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
   * @param {Object}                 context  Cucumber World object
   */
    beforeScenario: function (world, context) {
        //beforeScenario.call(world);
        currentScenarioName = world.pickle.name;
    },
    /**
     * Runs after a Cucumber Step.
     * @param {Pickle.IPickleStep} step             step data
     * @param {IPickle}            scenario         scenario pickle
     * @param {Object}             result           results object containing scenario results
     * @param {boolean}            result.passed    true if scenario has passed
     * @param {string}             result.error     error stack if scenario failed
     * @param {number}             result.duration  duration of scenario in milliseconds
     * @param {Object}             context          Cucumber World object
     */
    afterStep: async function (step, scenario, result, context) {
        console.log(`>> step: ${JSON.stringify(step)}`);
        console.log(`>> scenariop is: ${JSON.stringify(scenario)}`);
        console.log(`>> result is : ${JSON.stringify(result)}`);
        console.log(`>> context is: ${JSON.stringify(context)}`);

        // Take screenshot if test case is failed
        await browser.takeScreenshot();
    },
    /*
    * Runs after a Cucumber Feature.
    * @param {String}                   uri      path to feature file
    * @param {GherkinDocument.IFeature} feature  Cucumber feature object
    */
    afterFeature: function (uri, feature) {
        // Add more environment details
        //@ts-ignore
        allure.addEnvironment('ENVIRONMENT', config.environments);
        //allure.addEnvironment('BROWSER', config.capabilities);
    },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param exitCode 
     * @param config 
     * @param capabilities 
     * @param results 
     */
    onComplete: function (exitCode, config, capabilities, results) {
        /**
     * To send email notification
     */
        await after();

        /**
         * To send Slack notification
         */
        console.log('Test execution completed. Sending Slack notification...');
        const username = process.env.USER || process.env.USERNAME || 'Unknown User';
        await SlackReporterUtil.sendSlackNotification(username);
        console.log('Slack notification sent.');
    },
    /*
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    // onReload: function(oldSessionId, newSessionId) {
    // }
    after: async function (world, result, context) {
        //   await sendEmailNotification(emailData.subject, emailData.body, emailData.toEmail, emailData.regards);
        // await after();
    }
};
