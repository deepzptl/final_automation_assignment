import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class TripPlannerPage extends BasePage {
  async dismissPopup() {
    await this.waitForDom();
    const popupImage = this.page.locator('img[src*="Group 369"]').first();
    await popupImage.waitFor({ state: 'visible', timeout: 15000 });
    await popupImage.click({ force: true });
  }
}