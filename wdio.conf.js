import allure from "@wdio/allure-reporter";
import fs from "fs";
import path from "path";

export const config = {
  runner: "local",
  // port: 4723,

  specs: ["./test/**/**/chaldal_user_flow.spec.js"],

  exclude: [],

  before: function (capabilities, specs) {
    const allureReportPath = path.join(process.cwd(), "allure-report");
    if (fs.existsSync(allureReportPath)) {
      fs.rmdirSync(allureReportPath, { recursive: true });
    } else {
      console.log("Folder allure report does not exist");
    }
    const allureResultPath = path.join(process.cwd(), "allure-results");
    if (fs.existsSync(allureResultPath)) {
      fs.rmdirSync(allureResultPath, { recursive: true });
    } else {
      console.log("Folder allure result does not exist");
    }
  },

  maxInstances: 10,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "R58R777L6JL",
      "appium:platformVersion": "14.0",
      "appium:automationName": "UiAutomator2",
      // "appium:appPackage": "com.chaldal.poached",
      // "appium:appActivity": "com.chaldal.poached.MainActivity",
      "appium:app": path.join(process.cwd(), "./app/android/Chaldal.apk"),
      "appium:autoGrantPermissions": true,
      "appium:enforceXPath1": true,
      "appium:noReset": true,
    },
  ],

  logLevel: "info",

  bail: 0,

  waitforTimeout: 200000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: [
    [
      "appium",
      {
        command: "appium",
        args: {
          port: 4723,
        },
      },
    ],
  ],

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (error) {
      // Take screenshot
      const screenshot = await browser.takeScreenshot();
      // Attach screenshot to Allure report
      allure.addAttachment(
        "Screenshot on Failure",
        Buffer.from(screenshot, "base64"),
        "image/png"
      );
    }
  },

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  framework: "mocha",

  mochaOpts: {
    ui: "bdd",
    timeout: 250000,
  },
};
