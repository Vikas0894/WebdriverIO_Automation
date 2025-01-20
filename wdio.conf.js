const { after, beforeScenario } = require('./src/helper/hooks');
const { path } = require('app-root-path');
const { config: configuration } = require('dotenv');
const fs = require('fs');
console.log("appRoot", path);
configuration({ path: `${path}/.env` });
const allure = require('@wdio/allure-reporter');
const dotenv = require('dotenv');
const { SlackReporterUtil } = require('./src/helper/reporters/slack-reprter');

dotenv.config();
const headless = process.env.HEADLESS === 'true';
const debug = process.env.DEBUG === 'true';

exports.config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "./tsconfig.json",
    },
  },
  
  specs: ["./src/features/**/*.feature"],
  exclude: [],

  maxInstances: 1,
  
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      "goog:chromeOptions": {
        args: headless
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
    },
  ],

  logLevel: debug ? "info" : "error",

  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,

  services: ['chromedriver'],

  framework: "cucumber",

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
      'junit',
      {
        outputDir: "junit-reports",
        outputFileFormat: function (options) {
          return `results-${options.cid}.xml`;
        },
      },
    ],
  ],

  cucumberOpts: {
    require: ["./src/steps/**/*.ts"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 300000,
    ignoreUndefinedDefinitions: false,
  },

  onPrepare: function (config, capabilities) {
    if (process.env.RUNNER === "LOCAL" && fs.existsSync("./allure-results")) {
      fs.rmdirSync("./allure-results", { recursive: true });
    }
  },

  afterStep: async function (step, scenario, result, context) {
    console.log(`>> step: ${JSON.stringify(step)}`);
    console.log(`>> scenario is: ${JSON.stringify(scenario)}`);
    console.log(`>> result is: ${JSON.stringify(result)}`);
    console.log(`>> context is: ${JSON.stringify(context)}`);

    await browser.takeScreenshot();
  },

  afterScenario: function (world, result, context) {
    const tags = world.pickle.tags.map(tag => tag.name);
    const scenarioName = world.pickle.name;
    const featureName = world.gherkinDocument.feature?.name;

    global.scenarioTags = tags;
    global.scenarioName = scenarioName;
    global.featureName = featureName;

    console.log(`Feature: ${featureName}`);
    console.log(`Scenario: ${scenarioName}`);
    console.log(`Tags: ${tags.join(', ')}`);
  },

  afterFeature: function (uri, feature) {
    allure.addEnvironment('ENVIRONMENT', exports.config.environments);
  },
};
