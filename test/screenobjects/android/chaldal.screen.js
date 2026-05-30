// Import the element selector helper and driver navigation API from WebdriverIO.
import { $, driver } from "@wdio/globals";

// Screen object for selectors and reusable actions in the Chaldal Android app.
class chaldalScreen {
  // Selector for the Search button/text on the app home screen.
  get clickSearchButton() {
    return $('//android.widget.TextView[@text="Search"]');
  }

  // Selector for the product search input field.
  get inputSearchText() {
    return $('//*[@hint="Search Products"]');
  }

  // Selector for the first quantity/add button on the product details page.
  get quantityOne() {
    return $(
      "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup"
    );
  }

  // Selector for the product tile after the expected search result is visible.
  get selectProduct() {
    return $("(//android.view.ViewGroup)[5]");
  }

  // Selector used to confirm that the product details page has opened.
  get buyNowButton() {
    return $('//android.widget.TextView[@text="Buy Now"]');
  }

  // Selector for the plus button used to increase the selected product quantity.
  get moreQuantity() {
    return $(
      "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[5]/android.view.ViewGroup"
    );
  }

  // Selector for the cart button in the app header/top area.
  get cartButton() {
    return $(
      "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]"
    );
  }

  // Selector for the minus button used to reduce product quantity in the cart.
  get minusButton() {
    return $(
      "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup"
    );
  }

  // Selector for the message shown when the cart has no remaining items.
  get emptyCartMessage() {
    return $(
      "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[1]"
    );
  }

  // Add the current product to the cart and increase its quantity to three.
  async increseQuantity() {
    // Wait for the initial add/quantity control to become enabled.
    await this.quantityOne.waitForEnabled();

    // Tap once to add the first quantity of the product.
    await this.quantityOne.click();

    // Wait for the plus quantity control to become enabled.
    await this.moreQuantity.waitForEnabled();

    // Tap the plus control once to increase quantity from one to two.
    await this.moreQuantity.click();

    // Tap the plus control again to increase quantity from two to three.
    await this.moreQuantity.click();
  }

  // Reduce the product quantity from three to zero in the cart.
  async reduceQuantity() {
    // Wait for the minus quantity control to become enabled.
    await this.minusButton.waitForEnabled();

    // Reduce quantity from three to two.
    await this.minusButton.click();

    // Reduce quantity from two to one.
    await this.minusButton.click();

    // Reduce quantity from one to zero, which should empty the cart.
    await this.minusButton.click();
  }

  // Exit the current app flow after the test finishes.
  async tearDown() {
    // Navigate back from the current cart/flow screen.
    await driver.back();

    // Navigate back again toward the app exit state.
    await driver.back();

    // Navigate back one more time to trigger the exit confirmation if present.
    await driver.back();

    // Confirm/dismiss the Android alert shown during app exit.
    await driver.dismissAlert();
  }
}

// Export one shared screen-object instance for the test spec to use.
export default new chaldalScreen();
