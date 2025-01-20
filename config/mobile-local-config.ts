//@ts-nocheck
import { path } from "app-root-path";
import { config as configuration } from "dotenv";
import fs from "fs";
console.log("appRoot", path);
configuration({ path: `${path}/.env` });
import { configs } from "./enviroments-config";
import allure from "@wdio/allure-reporter";
import { join } from "path";
import { getPathAndriodApp, getPathWDIOApp } from "./enviroments-config";

export const config: WebdriverIO.Config = {

  // Runner Configuration
  // ====================
  //
  //
  // =====================
  // ts-node Configurations
  // =====================
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "./tsconfig.json",
    },
  },

  port: 4723,
  runner: 'local',
  // ==================
  // Specify Test Files
  // ==================
  //
  specs: ["./src/features/**/*.feature"],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  // suites:{
  // },

  // Capabilities
  // ============
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  capabilities: [
    {
      // capabilities for local Appium web tests on an Android Emulator
      "platformName": "Android",
      "appium:deviceName": "Pixel API 33",
      'appium:platformVersion': '13',
      "appium:automationName": "UiAutomator2",
      // "appium:appPackage": "com.code2lead.kwad",
      // "appium:appActivity": "com.code2lead.kwad.MainActivity",
      //'appium:app': join(process.cwd(), getPathAndriodApp()),
      'appium:app': join(process.cwd(), getPathWDIOApp()),
      //"appium:udid": "065613117T112979", //for real device

      maxInstances: 1,
      acceptInsecureCerts: true,
      timeouts: { implicit: 10000, pageLoad: 20000, script: 30000 },
      // If outputDir is provided WebdriverIO can capture driver session logs
      // it is possible to configure which logTypes to include/exclude.
      // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
      // excludeDriverLogs: ['bugreport', 'server'],
    },
  ],

  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  //Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "error",
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //   webdriver: 'error',
  //   '@wdio/appium-service': 'error'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,

  baseUrl: 'http://localhost',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  // cross browser service
  //services: ["chromedriver", "geckodriver"],
  services: ['appium'],

  framework: "cucumber",

  // specFileRetries: 1,

  // specFileRetriesDelay: 0,

  // specFileRetriesDeferred: false,

  reporters: [
    "spec",
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

  //
  // If you are using Cucumber you need to specify the location of your step definitions.
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
    tagExpression: "",

    // <number> timeout for step definitions
    timeout: 300000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
  },

  // =====
  // Hooks
  // =====
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
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just after a worker process has exited.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {Number} exitCode 0 - success, 1 - fail
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {Number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {String} cid worker id (e.g. 0-0)
   */
  // beforeSession: async function (config, capabilities, specs, cid) {
  //   try {
  //     AppiumServer.setPort(APPIUM_PORT); // Set custom port
  //     await AppiumServer.start();
  //   } catch (error) {
  //     console.error('Error starting Appium server:', error);
  //     throw error;
  //   }
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Cucumber Hooks
   *
   * Runs before a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  // beforeFeature: function (uri, feature) {
  // },
  /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
   * @param {Object}                 context  Cucumber World object
   */
  beforeScenario: function (world, context) {
    // console.log(`world is:${JSON.stringify(world)}`)
    let arr = world.pickle.name.split(/:/);

    // @ts-ignore
    if (arr.length > 0) browser.config.testid = arr[0];

    // @ts-ignore
    if (!browser.config.testid)
      throw Error(
        `Error getting testid for current scenario:${world.pickle.name}`
      );
  },
  /**
   *
   * Runs before a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   * @param {Object}             context  Cucumber World object
   */
  // beforeStep: function (step, scenario, context) {
  // },
  /**
   *
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
  /**
   *
   * Runs after a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
   * @param {Object}                 result           results object containing scenario results
   * @param {boolean}                result.passed    true if scenario has passed
   * @param {string}                 result.error     error stack if scenario failed
   * @param {number}                 result.duration  duration of scenario in milliseconds
   * @param {Object}                 context          Cucumber World object
   */
  // afterScenario: async function (world, result, context) {
  //   await browser.takeScreenshot();
  // },
  /**
   *
   * Runs after a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  afterFeature: function (uri, feature) {
    // Add more environment details
    allure.addEnvironment("ENVIRONMENT", configs.environments);
  },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: async function (config, capabilities, specs) {
  //   try {
  //     await AppiumServer.stop();
  //   } catch (error) {
  //     console.error('Error stopping Appium server:', error);
  //     throw error;
  //   }
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: function (exitCode, config, capabilities, results) {
    /*
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
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  // onReload: function(oldSessionId, newSessionId) {
  // }

  // before: async () => {
  // },

  // after: async () => {
  // },
};
