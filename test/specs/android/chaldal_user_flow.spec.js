import { driver, expect } from "@wdio/globals";
import allureReporter from "@wdio/allure-reporter";

import chaldalScreen from "../../screenobjects/android/chaldal.screen.js";

describe("Chaldal Application User flow creation", () => {
  before(async () => {
    await driver.pause(15000);
  });

  it("Search product, add to cart and delete from cart.", async () => {
    allureReporter.addDescription(
      "This a Chaldal app user flow checking test case execution. Here we open the app, search a product, add the product into the cart, set quantity to three, return to search page. Then we go to cart page, set the previously added product quantity to zero and verify the cart is empty with the empty cart message. Then we close the app gracelully."
    );
    allureReporter.addStep("Open the app & Click on the search icon");

    await chaldalScreen.clickSearchButton.waitForEnabled();
    await chaldalScreen.clickSearchButton.click();

    allureReporter.addStep("Search with a product name");
    await chaldalScreen.inputSearchText.waitForEnabled();
    await chaldalScreen.inputSearchText.addValue("toothbrush");
    await browser.keys("Enter");

    await $(
      "android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)"
    );

    allureReporter.addStep(
      "Select a product from the search result list and go to its details page"
    );
    await chaldalScreen.selectProduct.waitForEnabled({ timeout: 10000 });
    await chaldalScreen.selectProduct.click();

    allureReporter.addStep("Increase the product quantity from 0 to 3");
    await chaldalScreen.increseQuantity();

    allureReporter.addStep("Return to search result page");
    await driver.back();

    allureReporter.addStep("Go to cart page");
    await chaldalScreen.cartButton.waitForEnabled({ timeout: 3000 });
    await chaldalScreen.cartButton.click();

    allureReporter.addStep("decrease the product quantity from 3 to 0");
    await chaldalScreen.reduceQuantity();

    allureReporter.addStep("Verify that cart page is showing expected message");
    const expectEmptyCartText = "Nothing to see here";
    await chaldalScreen.emptyCartMessage.waitForEnabled();
    const actualEmptyCartText = await chaldalScreen.emptyCartMessage.getText();
    await expect(actualEmptyCartText).toEqual(expectEmptyCartText);
  });

  after(async () => {
    allureReporter.addStep("Close the app gracefully");
    await chaldalScreen.tearDown();
  });
});
