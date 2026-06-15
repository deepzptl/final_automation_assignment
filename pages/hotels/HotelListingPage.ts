import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HotelListingPage extends BasePage {
  async openHotelDetail(): Promise<Page> {
    await this.waitForDom();
    await this.page.waitForTimeout(5000);
    const [hotelPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator('.flex.w-full.flex-col.items-start.justify-start')
        .first()
        .getByText('Minerva Grand Secundrabad')
        .first()
        .click()
    ]);
    await hotelPage.waitForTimeout(2000);
    return hotelPage;
  }
}