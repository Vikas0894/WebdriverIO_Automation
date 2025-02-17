//import { after,beforeScenario } from './src/helper/sendEmailNotification';
import { after, beforeScenario } from './src/helper/hooks';
import { path } from "app-root-path";
import { config as configuration } from "dotenv";
import fs from "fs";
console.log("appRoot", path);
configuration({ path: `${path}/.env` });
import allure from "@wdio/allure-reporter";
import dotenv from 'dotenv';
import { SlackReporterUtil } from './src/helper/reporters/slack-reprter';

dotenv.config();
const headless = process.env.HEADLESS === 'true';
const debug: boolean = process.env.DEBUG === 'true'

export const config: WebdriverIO.Config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  //
  // =====================
  // ts-node Configurations
  // =====================
  //
  // You can write tests using TypeScript to get autocompletion and type safety.
  // You will need typescript and ts-node installed as devDependencies.
  // WebdriverIO will automatically detect if these dependencies are installed
  // and will compile your config and tests for you.
  // If you need to configure how ts-node runs please use the
  // environment variables for ts-node or use wdio config's autoCompileOpts section.
  //

  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: "./tsconfig.json",
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    // tsConfigPathsOpts: {
    //     baseUrl: './'
    // }
  },

  //port: 4723,
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
  // then the current working directory is where your `package.json` resides, so `wdio`
  // will be called from there.
  //
  specs: ["./src/features/**/*.feature"],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  // suites: {
  //   smoke: ["./test-suites/smoke/**/*.feature"],
  //   regression: ["./test-suites/regression/**/*.feature"]
  // },
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  capabilities: [
    {
      // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      // grid with only 5 firefox instances available you can make sure that not more than
      // 5 instances get started at a time.

      // capabilities for local Appium web tests on an Android Emulator
      // "appium:appPackage": "com.code2lead.kwad",
      // "appium:appActivity": "com.code2lead.kwad.MainActivity",
      // "platformName": "Android",
      // "appium:deviceName": "Pixel_3a",
      // "appium:udid": "065613117T112979",
      // "appium:automationName": "UiAutomator2",
      // "appium:app": "C://WebdriverIOAutomation/app/android/Android_Demo_App.apk",

      /*
      => Configuring tests in headless mode:-
          1. Add these flags as chrome options
              1. --headless
              2. --disable-dev-shm-usage
              3. --no-sandbox
              4. --window-size=1920,1080
              5. --disable-gpu
          2. Additional flags
              1. --proxy-server
              2. binary
              3. --auth-server-whitelist="   "
          3. Make use of process.env obj to set headless flag
  
*/
      maxInstances: 1,
      browserName: 'chrome',
      "goog:chromeOptions": {
        args:
          headless
            ? [
              "--disable-web-security",
              "--headless",
              "--disable-dev-shm-usage",
              "--no-sandbox",
              "--window-size=1920,1080",
            ]
            : [],
      },
      acceptInsecureCerts: true,
      timeouts: { implicit: 10000, pageLoad: 20000, script: 30000 },
      // If outputDir is provided WebdriverIO can capture driver session logs
      // it is possible to configure which logTypes to include/exclude.
      // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
      // excludeDriverLogs: ['bugreport', 'server'],
      //},

      // {
      // cross browser
      // maxInstances: 3,
      // //
      // browserName: "firefox",
      // acceptInsecureCerts: true,
      // timeouts: { implicit: 10000, pageLoad: 20000, script: 30000 },

    }
  ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: debug ? "info" : "error",

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
  //   webdriver: 'info',
  //   '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 1,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.

  // cross browser service
  //services: ["geckodriver"],
  services: ['chromedriver'],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "cucumber",
  /**
  *The number of times to retry the entire specfile when it fails as a whole
  *specFileRetries: 1,
  
  *Delay in seconds between the spec file retry attempts
  *specFileRetriesDelay: 0,
  
  Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  specFileRetriesDeferred: false,
  
  Test reporter for stdout.
  The only one supported by default is 'dot'
  see also: https://webdriver.io/docs/dot-reporter
*/

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        useCucumberStepReporter: true,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        addTags: true,
      },
    ],
    [
      'junit', {
        outputDir: "junit-reports",
        outputFileFormat: function (options) { // optional
          //return `results-${new Date().getDate()}.xml`
          return `results-${options.cid}.xml`
        }
      }
    ],
  ],

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
    // tagExpression: "@demo",
    tagExpression: "",
    // <number> timeout for step definitions
    timeout: 300000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
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
  // beforeSession: function (config, capabilities, specs, cid) {
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
  afterScenario: function (world, result, context) {
    const tags = world.pickle.tags.map((tag: { name: string }) => tag.name);
    const scenarioName = world.pickle.name;
    const featureName = world.gherkinDocument.feature?.name;

    // Save details for Slack notification
    (global as any).scenarioTags = tags;
    (global as any).scenarioName = scenarioName;
    (global as any).featureName = featureName;

    console.log(`Feature: ${featureName}`);
    console.log(`Scenario: ${scenarioName}`);
    console.log(`Tags: ${tags.join(', ')}`);
  },
  /**
   *
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
  // after: async function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: async function (exitCode, config, capabilities, results) {
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
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  // onReload: function(oldSessionId, newSessionId) {
  // }
  after: async function (world, result, context) {
    console.log(`>> world: ${JSON.stringify(world)}`);
    //   await sendEmailNotification(emailData.subject, emailData.body, emailData.toEmail, emailData.regards);
    // await after();
  }
};
