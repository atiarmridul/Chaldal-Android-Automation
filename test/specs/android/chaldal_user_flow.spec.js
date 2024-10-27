import { driver, expect } from "@wdio/globals";
import allureReporter from "@wdio/allure-reporter";

import chaldalScreen from "../../screenobjects/android/chaldal.screen.js";

describe("Chaldal Application User flow creation", () => {
  // before(async () => {
  // });

  it("Search product, add to cart and delete from cart.", async () => {
    allureReporter.addDescription(
      "This a Chaldal app user flow checking test case execution. Here we open the app, search a product, add the product into the cart, set quantity to three, return to search page. Then we go to cart page, set the previously added product quantity to zero and verify the cart is empty with the empty cart message. Then we close the app gracelully."
    );

    // Search for the item “toothbrush”
    await chaldalScreen.clickSearchButton.waitForEnabled();
    await chaldalScreen.clickSearchButton.click();

    await chaldalScreen.inputSearchText.waitForEnabled();
    await chaldalScreen.inputSearchText.addValue("toothbrush");
    await browser.keys("Enter");
    await driver.pause(5000);

    // Scroll down to an item and Open the Item screen
    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("ProDentalB Rice Husk Toothbrush")'
    );

    await chaldalScreen.selectProduct.waitForEnabled({ timeout: 10000 });
    await chaldalScreen.selectProduct.click();

    // Verify the product details page is opened.
    await expect(chaldalScreen.buyNowButton).toExist();

    // Click the Plus (+) icon 3 times to add to the cart.
    await chaldalScreen.increseQuantity();
    await driver.back();

    // Go to the cart screen from the top
    await chaldalScreen.cartButton.waitForEnabled({ timeout: 3000 });
    await chaldalScreen.cartButton.click();

    // Click the Minus (-) icon to empty the card
    await chaldalScreen.reduceQuantity();

    // Verify Text “Nothing to see here” on cart screen after removing items
    const expectEmptyCartText = "Nothing to see here";
    await chaldalScreen.emptyCartMessage.waitForEnabled();
    const actualEmptyCartText = await chaldalScreen.emptyCartMessage.getText();
    await expect(actualEmptyCartText).toEqual(expectEmptyCartText);
  });

  after(async () => {
    // Close the applicatio
    await chaldalScreen.tearDown();
  });
});
