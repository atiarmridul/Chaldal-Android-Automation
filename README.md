# Chaldal Android Automation

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Appium](https://img.shields.io/badge/Appium-2-662D91?logo=appium&logoColor=white)](https://appium.io/)
[![WebdriverIO](https://img.shields.io/badge/WebdriverIO-WDIO-EA5906?logo=webdriverio&logoColor=white)](https://webdriver.io/)
[![Android](https://img.shields.io/badge/Android-Automation-3DDC84?logo=android&logoColor=white)](https://developer.android.com/)
[![Mocha](https://img.shields.io/badge/Test%20Runner-Mocha-8D6748?logo=mocha&logoColor=white)](https://mochajs.org/)
[![ESM](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)](https://nodejs.org/api/esm.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

End-to-end Android UI automation for a core Chaldal shopping flow using WebdriverIO + Appium.

## What This Test Covers

The test validates this user journey:

1. Open the app
2. Search for a product (`toothbrush`)
3. Open a product details page
4. Add quantity up to 3
5. Open cart
6. Reduce quantity to 0
7. Verify the cart-empty message (`Nothing to see here`)

## Quick Start

```bash
npm install
npm run wdio
```

## Prerequisites

- Node.js 18+ and npm
- Java 11+
- Appium 2+
- Appium UiAutomator2 driver
- Android emulator or physical Android device
- Android SDK / `adb`

Check your setup:

```bash
node -v
npm -v
java -version
appium -v
appium driver list --installed
adb devices
```

Install the Android driver if it is missing:

```bash
appium driver install uiautomator2
```

## Project Structure

```text
.
├── app/android/Chaldal.apk
├── test/screenobjects/android/chaldal.screen.js
├── test/specs/android/chaldal_user_flow.spec.js
├── wdio.conf.js
└── README.md
```

## NPM Scripts

| Command | Purpose |
| --- | --- |
| `npm run wdio` | Runs the Android user-flow spec through `wdio.conf.js`. |

## Setup

1. Clone the repository:

```bash
git clone https://github.com/atiarmridul/Chaldal-Android-Automation.git
cd Chaldal-Android-Automation
```

2. Install dependencies:

```bash
npm install
```

3. Update device/app capabilities in `wdio.conf.js` if needed:

- `appium:deviceName`
- `appium:platformVersion`
- `appium:app`
- `appium:noReset`

Example:

```js
capabilities: [
  {
    platformName: "Android",
    "appium:deviceName": "emulator-5554",
    "appium:platformVersion": "14.0",
    "appium:automationName": "UiAutomator2",
    "appium:app": path.join(process.cwd(), "./app/android/Chaldal.apk"),
    "appium:autoGrantPermissions": true,
    "appium:noReset": true,
  },
];
```

Use `adb devices` to get the connected device name. Set `appium:noReset` based on the scenario you want to validate:

- `true`: keeps app data between runs.
- `false`: starts from a cleaner install state.

## Run Tests

```bash
npm run wdio
```

Expected outcome:

- WDIO run completes successfully
- Spec output shows the scenario passed
- Allure artifacts are generated in `allure-results/`

## Reports and Artifacts

The WDIO `before` hook removes old `allure-results/` and `allure-report/` folders before each run. On failure, the test attaches a screenshot to the Allure result.

Generate and open the Allure report:

```bash
allure generate --clean allure-results
allure open
```

These generated folders are ignored by Git:

- `allure-results/`
- `allure-report/`
- `node_modules/`

## Test Standards

- Keep test flow and assertions in `test/specs/android/`.
- Keep screen selectors and reusable actions in `test/screenobjects/android/`.
- Prefer stable selectors such as accessibility id, resource-id, and visible text before absolute XPath.
- Avoid fixed pauses when a WebdriverIO wait can express the condition.
- Keep test data explicit in the spec unless it becomes shared across multiple scenarios.
- Update this README when setup, capabilities, scripts, reports, or run steps change.

## Coding Standards

- Use ESM syntax: `import` and `export`.
- Keep async WebdriverIO calls awaited.
- Use clear method names for screen-object actions.
- Keep generated files, reports, and dependencies out of Git.
- Do not commit local device-specific values unless they are intended as documented defaults.

## Troubleshooting

### Device or emulator not detected

- Ensure an emulator is running, or a device is connected.
- Confirm visibility with:

```bash
adb devices
```

### Appium startup issues

- Verify Appium installation:

```bash
appium -v
```

- Ensure port `4723` is not blocked by another process.

### Capability mismatch errors

- Confirm `appium:deviceName` and `appium:platformVersion` match the active device.
- Confirm APK path exists: `./app/android/Chaldal.apk`
- If the app starts in an unexpected state, review the `appium:noReset` capability.

### Java/Android SDK environment issues

- Make sure `JAVA_HOME` and Android SDK paths are configured correctly.

### UiAutomator2 driver missing

Install or verify the driver:

```bash
appium driver install uiautomator2
appium driver list --installed
```

## Tech Stack

- WebdriverIO / WDIO runner
- Appium 2
- Mocha
- Allure Reporter

Dependency versions are defined in `package.json` and locked in `package-lock.json`.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, test, configuration, and documentation standards.

## License

This project is licensed under the [MIT License](./LICENSE).

## References

- [WebdriverIO Docs](https://webdriver.io/docs/gettingstarted)
- [Appium Docs](https://appium.io/docs/en/about-appium/intro/)
- [Allure Docs](https://docs.qameta.io/allure/)
