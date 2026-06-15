import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class TripPlanPage extends BasePage {
  async save() {
    await this.waitForDom();
    await this.page.getByTestId('SaveIcon').waitFor({state:'visible'});
    await this.page.getByTestId('SaveIcon').click();
  }
}