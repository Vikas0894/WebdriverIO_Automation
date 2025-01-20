//@ts-nocheck
import { path } from "app-root-path";
import { config as configuration } from "dotenv";
import fs from "fs";
console.log("appRoot", path);
configuration({ path: `${path}/.env` });
import allure from "@wdio/allure-reporter";
import { after, beforeScenario } from '../src/helper/hooks';
import { configs } from '../config/enviroments-config';

export const config: WebdriverIO.Config = {
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: "./tsconfig.json",
        },
    },

    runner: 'local',
    specs: [
        "./src/features/**/*.feature"
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: ["--disable-web-security",
                "--headless",
                "--disable-dev-shm-usage",
                "--no-sandbox",
                "--window-size=1920,1080",
            ]
        },
        timeouts: { implicit: 10000, pageLoad: 20000, script: 30000 },
    }
    ],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
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
        // <string[]> (file/dir) require files before executing features
        require: ["./src/steps/**/*.ts"],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        // tagExpression: "@demo",
        tagExpression: "",
        // <number> timeout for step definitions
        timeout: 300000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false,
    },

    onPrepare: function (config, capabilities) {
        if (process.env.RUNNER === "LOCAL" && fs.existsSync("./allure-results")) {
            fs.rmdirSync("./allure-results", { recursive: true });
        }
    },

    beforeScenario: function (world, context) {
        beforeScenario.call(world);
    },

    afterStep: async function (step, scenario, result, context, tagExpression) {
        console.log(`>> step: ${JSON.stringify(step)}`);
        console.log(`>> scenariop is: ${JSON.stringify(scenario)}`);
        console.log(`>> result is : ${JSON.stringify(result)}`);
        console.log(`>> context is: ${JSON.stringify(context)}`);
        if (!tagExpression) {
            // Take screenshot if test case is failed
            await browser.takeScreenshot();
        }

    },

    afterFeature: function (uri, feature) {
        // Add more environment details
        //@ts-ignore
        allure.addEnvironment('ENVIRONMENT', configs.environments);
        //allure.addEnvironment('BROWSER', config.capabilities);
    },

    onComplete: async function (exitCode, config, capabilities, results) {
        //await after();
    },
};
