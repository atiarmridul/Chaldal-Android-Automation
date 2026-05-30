# AGENTS.md

Common instructions for AI agents working in this repository.

## Scope

These instructions apply to the entire repository rooted at this file.

## Project Summary

- Stack: WebdriverIO + Appium + Mocha (ESM JavaScript).
- Goal: Android end-to-end flow automation for the Chaldal app.
- Main entrypoint: `npm run wdio` (runs `wdio run ./wdio.conf.js`).

## Repository Layout

- `wdio.conf.js`: WDIO runner, Appium service, capabilities, reporting hooks.
- `test/specs/android/chaldal_user_flow.spec.js`: primary user-flow scenario.
- `test/screenobjects/android/chaldal.screen.js`: page/screen object model.
- `app/android/Chaldal.apk`: app binary under test.
- `README.md`: human-facing setup and usage notes.
- `CONTRIBUTING.md`: contribution, test, configuration, and documentation standards.
- `LICENSE`: MIT license.

## Environment Expectations

- Node.js 18+ and npm installed.
- Java 11+ installed.
- Appium 2 available (`appium` command).
- Appium UiAutomator2 driver installed.
- Android device/emulator connected and visible via `adb devices`.
- Capability values in `wdio.conf.js` must match the active device:
  - `appium:deviceName`
  - `appium:platformVersion`
  - `appium:app`
  - `appium:noReset`

## Standard Workflow

1. Install dependencies: `npm install`
2. Confirm Appium driver/device setup:
   - `appium driver list --installed`
   - `adb devices`
3. Update device/app capability values if needed.
4. Run tests: `npm run wdio`
5. Optional report:
   - `allure generate --clean allure-results`
   - `allure open`

## Code Change Guidelines

- Preserve ESM style (`import`/`export`) used across the codebase.
- Keep tests deterministic; avoid unnecessary fixed pauses.
- Prefer stable selectors (`accessibility id`, resource-id, text-based) over fragile absolute XPath when possible.
- Keep screen interactions in screen objects; keep assertions and flow in spec files.
- If changing behavior, update `README.md` when setup, capabilities, scripts, reports, or run steps change.
- Update `CONTRIBUTING.md` if contribution, test, configuration, or documentation standards change.

## Validation Expectations

- After meaningful test/code changes, run `npm run wdio` when device/appium are available.
- If execution is not possible (no device/emulator), state this explicitly in handoff notes.
- Documentation-only changes do not require running the WDIO suite.

## Safety

- Do not delete app binaries, reports, or test assets unless explicitly requested.
- Do not commit generated folders such as `node_modules/`, `allure-results/`, or `allure-report/`.
- Avoid destructive git operations unless explicitly requested.
