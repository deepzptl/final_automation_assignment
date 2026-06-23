import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HotelListingPage extends BasePage {
  async openHotelDetail(): Promise<Page> {
    await this.page.waitForURL(/\/hotel\/listing-stay\//, { timeout: 30_000 });

    // Hotel inventory is loaded asynchronously. Select an actual visible result
    // instead of a fixed hotel name, because availability changes by date.
    const firstHotelTitle = this.page.locator('.nc-PropertyCardH h2')
      .filter({ visible: true })
      .first();
    await firstHotelTitle.waitFor({ state: 'visible', timeout: 45_000 });

    const isHotelDetailUrl = (url: URL) =>
      /\/hotel\/(?!listing-stay\/|search(?:\/|$))/.test(url.pathname);

    const destinationPromise = Promise.race([
      this.page.context().waitForEvent('page', { timeout: 30_000 })
        .then(hotelPage => ({ hotelPage, openedPopup: true })),
      this.page.waitForURL(isHotelDetailUrl, { timeout: 30_000 })
        .then(() => ({ hotelPage: this.page, openedPopup: false })),
    ]);

    // One click only: a duplicate click can open the wrong application page.
    await firstHotelTitle.click();
    const { hotelPage, openedPopup } = await destinationPromise;

    if (openedPopup) {
      await hotelPage.waitForURL(isHotelDetailUrl, { timeout: 30_000 });
    }

    await hotelPage.waitForLoadState('domcontentloaded');
    return hotelPage;
  }
}
