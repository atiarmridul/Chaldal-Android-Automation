// Import the WebdriverIO driver for device navigation and expect for assertions.
import { driver, expect } from "@wdio/globals";

// Import Allure reporter so this test can add readable report metadata.
import allureReporter from "@wdio/allure-reporter";

// Import the Chaldal screen object that stores selectors and reusable app actions.
import chaldalScreen from "../../screenobjects/android/chaldal.screen.js";

// Group all test cases for the Chaldal Android user-flow automation.
describe("Chaldal Application User flow creation", () => {
  // Validate the full product search, cart add, cart remove, and empty-cart flow.
  it("Search product, add to cart and delete from cart.", async () => {
    // Add a human-readable scenario description to the Allure report.
    allureReporter.addDescription(
      "This Chaldal app user-flow test opens the app, searches for a product, adds the product to the cart, sets the quantity to three, returns to the search page, opens the cart, reduces the product quantity to zero, verifies the empty-cart message, and closes the app gracefully."
    );

    // Wait until the Search entry point is interactive before tapping it.
    await chaldalScreen.clickSearchButton.waitForEnabled();

    // Open the search input screen.
    await chaldalScreen.clickSearchButton.click();

    // Wait until the product search field can receive text.
    await chaldalScreen.inputSearchText.waitForEnabled();

    // Type the product keyword that should return toothbrush search results.
    await chaldalScreen.inputSearchText.addValue("toothbrush");

    // Submit the search from the Android keyboard.
    await browser.keys("Enter");

    // Give the app time to load search results before scrolling.
    await driver.pause(5000);

    // Scroll the result list until the expected product name is visible.
    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("ProDentalB Rice Husk Toothbrush")'
    );

    // Wait for the product tile to become tappable.
    await chaldalScreen.selectProduct.waitForEnabled({ timeout: 10000 });

    // Open the product details page.
    await chaldalScreen.selectProduct.click();

    // Verify the product details page opened by checking for the Buy Now button.
    await expect(chaldalScreen.buyNowButton).toExist();

    // Add the product to the cart and increase the quantity to three.
    await chaldalScreen.increseQuantity();

    // Return from the product details page to the previous app screen.
    await driver.back();

    // Wait until the cart button is available in the top app area.
    await chaldalScreen.cartButton.waitForEnabled({ timeout: 3000 });

    // Open the cart screen.
    await chaldalScreen.cartButton.click();

    // Reduce the product quantity until the cart becomes empty.
    await chaldalScreen.reduceQuantity();

    // Store the exact empty-cart message expected after removing all items.
    const expectEmptyCartText = "Nothing to see here";

    // Wait until the empty-cart message is visible and readable.
    await chaldalScreen.emptyCartMessage.waitForEnabled();

    // Read the actual empty-cart message shown by the app.
    const actualEmptyCartText = await chaldalScreen.emptyCartMessage.getText();

    // Assert that the cart shows the expected empty state.
    await expect(actualEmptyCartText).toEqual(expectEmptyCartText);
  });

  // Run cleanup after the test case finishes.
  after(async () => {
    // Navigate out of the app flow and dismiss the exit confirmation dialog.
    await chaldalScreen.tearDown();
  });
});
