import { $, driver, expect } from "@wdio/globals";

import chaldalScreen from "../../screenobjects/android/chaldal.screen.js";

describe("Chaldal Application User flow creation", () => {
  before(async () => {
    await driver.pause(10000);
  });

  it("Search product, add to cart and delete from cart.", async () => {
    await chaldalScreen.clickSearchButton.waitForEnabled({ timeout: 15000 });
    await chaldalScreen.clickSearchButton.click();
    await chaldalScreen.inputSearchText.waitForEnabled({ timeout: 15000 });
    await chaldalScreen.inputSearchText.addValue("toothbrush");
    await browser.keys("Enter");

    // await $("android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)");

    await chaldalScreen.selectProduct.waitForEnabled({ timeout: 10000 });
    await chaldalScreen.selectProduct.click();

    await chaldalScreen.increseQuantity();
    await driver.back();
    await chaldalScreen.cartButton.waitForEnabled({ timeout: 3000 });
    await chaldalScreen.cartButton.click();
    await chaldalScreen.reduceQuantity();

    const expectEmptyCartText = "Nothing to see here";
    await chaldalScreen.emptyCartMessage.waitForEnabled();
    const actualEmptyCartText = await chaldalScreen.emptyCartMessage.getText();

    await expect(actualEmptyCartText).toEqual(expectEmptyCartText);

    await chaldalScreen.closeApp();
  });
});
