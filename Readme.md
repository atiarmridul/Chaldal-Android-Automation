# Chaldal Android Mobile Application Automation

This a Chaldal app user flow checking test case execution. Here we open the app, search a product, add the product into the cart, set quantity to three, return to search page. Then we go to cart page, set the previously added product quantity to zero and verify the cart is empty with the empty cart message. Then we close the app gracelully.


- We used WebdriverIO as local runner, Mocha as test runner and Appium as a service. Also Node.js with WebdriverIO is used to allows for efficient, scalable, and maintainable test automation. 

## Features

- Auto Grant Permission.
- So to search page.
- Search a product.
- Select a product from search result and go to details page.
- Add the product to cart with quantity 3
- Return to Search page and go to cart page.
- Reduce the product quantity from 3 to 0.
- Verify the empty card page message.
- Close the app.

## Run Locally

Clone the project

```bash {"id":"01J7TWY4RKEYT0E8W8P4QQK3KR"}
  git clone https://github.com/atiarmridul/Chaldal-Android-Automation.git

```

Install dependencies

```bash {"id":"01J7TWY4RKEYT0E8W8P7Q1J3BH"}
  npm install

```

Start the test

```bash {"id":"01J7TWY4RKEYT0E8W8P99KNTTW"}
  npm run wdio

```

Show Report

```bash {"id":"01J7TX353VH5ZPK2XEH83HJW23"}
  allure generate --clean allure-results

  
  allure open
```

## Tech Stack

- WebdriverIo 8.x
- Appium 2.x
- Node.js 18.x
- NPM 10.x
- Test Runner: Mocha

## Tools Used

- VS Code.
- Android Studio.
- Git.
- Javascript.
- Appium Inspector.
- Allure Report.

## Appendix

1. Set JAVA_HOME [If using a emulator]
2. Set ANDROID_HOME [If using a emulator]
3. Add your emulator name in "appium:deviceName" in capabilities found in the wdio.conf.js file.
4. Add your emulator platform version in "appium:platformVersion" in capabilities found in the wdio.conf.js file.

```javascript {"id":"01J7TWY4RMT4WSQXJ69TMKPYPV"}
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": "emulator-5554", // add your emulator name here. 
        "appium:platformVersion": "11.0", // add your emulator platform version here. 
        "appium:automationName": "UiAutomator2",
        "appium:app": path.join(process.cwd(), "./app/android/Chaldal.apk"),
        "appium:autoGrantPermissions": true

    }]


```
