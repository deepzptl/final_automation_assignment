import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightTripSummaryPage extends BasePage {
  async proceed() {
    await this.waitForDom();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Continue to Checkout' }).waitFor({ state: 'visible' });
    await this.page.getByRole('button', { name: 'Continue to Checkout' }).click();
    await this.page.locator(`u:has-text("Click here")`).click();
    await this.waitForDom();
  }
}