# Chaldal Android Mobile Application Automation

This is a Chaldal app user flow-checking test case execution. Here, we open the app, search for a product, add the product to the cart, set the quantity to three, and return to the search page. Then, we go to the cart page, set the previously added product quantity to zero, and verify that the cart is empty with the empty cart message. Then, we close the app gracefully.

## Features List

- Auto Grant Permission.
- Go to the search page.
- Search for a product.
- Select a product from the search result and go to the product details page.
- Add the product to the cart with quantity 3.
- Return to the Search page and go to the Cart page.
- Reduce the product quantity from 3 to 0.
- Verify the empty card page message.
- Close the app.

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- NPM (v10.x or higher)
- Java (v11 or higher)
- Android Studio and configured emulator or physical device.

### Installation

Clone the project

```bash
  git clone https://github.com/atiarmridul/Chaldal-Android-Automation.git
```

Install dependencies

```bash
  npm install
```

## Usage

Start the test

```bash
  npm run wdio
```

## Running Tests

To run tests, run the following command

```bash
  npm run wdio
```

## Show Report

```bash
  allure generate --clean allure-results
```

```bash
  allure open
```

## Tech Stack

- WebdriverIo 9.x
- Appium 2.x
- Node.js 18.x
- NPM 10.x
- Mocha
- Java 19.x

## Dependencies

- allure: ^0.0.0
- allure-commandline: ^2.30.0
- appium-uiautomator2-driver: ^3.7.9

## Dev Dependencies

- @wdio/allure-reporter: ^9.1.3
- @wdio/appium-service: ^8.38.2
- @wdio/cli: ^8.38.2
- @wdio/local-runner: ^8.38.2
- @wdio/mocha-framework: ^8.38.2
- @wdio/spec-reporter: ^8.38.2
- appium: ^2.5.0
- kill-port: ^2.0.1
- ts-node: ^10.9.2
- webdriverio: ^9.0.9

## Appendix

1. Set JAVA_HOME
2. Set ANDROID_HOME
3. Add your emulator name in "appium:deviceName" in the capabilities found in the wdio.conf.js file.
4. Add your emulator platform version in "appium:platformVersion" in the capabilities found in the wdio.conf.js file.

```javascript
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": "emulator-5554", // add your emulator/device name here.
        "appium:platformVersion": "11.0", // add your emulator/device platform version here.
        "appium:automationName": "UiAutomator2",
        "appium:app": path.join(process.cwd(), "./app/android/Chaldal.apk"),
        "appium:autoGrantPermissions": true

    }]
```

## Project Structure

```
/Users/atiarrahmanchowdhury/Chaldal-Android-Automation/
├───.gitignore
├───jsconfig.json
├───package-lock.json
├───package.json
├───Readme.md
├───wdio.conf.js
├───.git/...
├───app/
│   └───android/
│       └───Chaldal.apk
└───test/
    ├───screenobjects/
    │   └───android/
    │       └───chaldal.screen.js
    └───specs/
        └───android/
            └───chaldal_user_flow.spec.js
```

## Acknowledgements

- [WebdriverIO](https://webdriver.io/)
- [Appium](https://appium.io/)
- [Node.js](https://nodejs.org/en)
- [Allure Report](https://docs.qameta.io/allure/)
