# Contributing

This project uses WebdriverIO, Appium, Mocha, and ESM JavaScript for Android UI automation.

## Before You Start

Make sure your local environment can run the test suite:

```bash
npm install
appium driver list --installed
adb devices
npm run wdio
```

Install the Android driver if needed:

```bash
appium driver install uiautomator2
```

## Branch and Commit Guidelines

- Create focused changes for one feature, fix, or documentation update at a time.
- Use clear commit messages that describe the behavior or documentation changed.
- Do not commit generated folders such as `node_modules/`, `allure-results/`, or `allure-report/`.
- Do not commit local-only device settings unless they are intended project defaults.

## Test Guidelines

- Keep test scenarios in `test/specs/android/`.
- Keep selectors and reusable app actions in `test/screenobjects/android/`.
- Prefer stable selectors such as accessibility id, resource-id, and visible text.
- Avoid absolute XPath unless no stable selector is available.
- Prefer WebdriverIO waits over fixed pauses.
- Keep assertions in spec files so the test intent stays visible.

## Configuration Guidelines

Before running tests, confirm the values in `wdio.conf.js` match the active Android device or emulator:

- `appium:deviceName`
- `appium:platformVersion`
- `appium:app`
- `appium:noReset`

Use `adb devices` to confirm the connected device name.

## Documentation Guidelines

Update `README.md` when you change:

- setup steps
- npm scripts
- required tools or versions
- Appium capabilities
- report generation
- test execution behavior

## Validation

Run the test suite after meaningful test or configuration changes:

```bash
npm run wdio
```

If a device, emulator, or Appium server is not available, mention that in the handoff notes.
