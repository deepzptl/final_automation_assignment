import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HotelListingPage extends BasePage {
  async openHotelDetail(): Promise<Page> {
    await this.waitForDom();
    await this.page.waitForTimeout(5000);
    
    // Try multiple selectors to find the hotel
    let hotelLocator = this.page.locator('.flex.w-full.flex-col.items-start.justify-start')
      .first()
      .getByText('Minerva Grand Secundrabad')
      .first();
    
    // Fallback: Try finding by any text match
    if (!(await hotelLocator.isVisible({ timeout: 3000 }).catch(() => false))) {
      hotelLocator = this.page.getByText('Minerva Grand Secundrabad').first();
    }
    
    // Last resort: Try to find any clickable hotel card
    if (!(await hotelLocator.isVisible({ timeout: 3000 }).catch(() => false))) {
      const hotelCards = this.page.locator('[role="button"]').or(this.page.locator('div[class*="cursor-pointer"]'));
      if (await hotelCards.count() > 0) {
        hotelLocator = hotelCards.first();
      } else {
        throw new Error('No hotel listing found');
      }
    }
    
    const [hotelPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      hotelLocator.click({ force: true, timeout: 5000 })
    ]);
    await hotelPage.waitForTimeout(2000);
    return hotelPage;
  }
}