import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightTripSummaryPage extends BasePage {
  async proceed() {
    this.logStep('Waiting for trip summary');
    await this.waitForDom();
    const continueButton = this.page.getByRole('button', { name: /Continue to Checkout/i });

    // The summary contents depend on a slow API and occasionally render only
    // the page shell. Retry one page load before failing the test.
    let buttonReady = await continueButton
      .waitFor({ state: 'visible', timeout: 20_000 })
      .then(() => true)
      .catch(() => false);

    if (!buttonReady) {
      this.logStep('Checkout button is not ready; reloading trip summary once');
      await this.page.reload({ waitUntil: 'domcontentloaded' });
      buttonReady = await continueButton
        .waitFor({ state: 'visible', timeout: 20_000 })
        .then(() => true)
        .catch(() => false);
    }

    if (!buttonReady) {
      throw new Error(`Continue to Checkout button did not load at ${this.page.url()}`);
    }

    this.logStep('Continuing to checkout');
    await continueButton.click();

    // Click the "Click here" link if it exists
    const clickHereLink = this.page.locator(`u:has-text("Click here")`);
    const clickHereExists = await clickHereLink.isVisible({ timeout: 2000 }).catch(() => false);
    if (clickHereExists) {
      this.logStep('Opening the seat-selection step');
      await clickHereLink.click();
    }

    await this.waitForDom();
    this.logStep('Checkout step opened');
  }
}
