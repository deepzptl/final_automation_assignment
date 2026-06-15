import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HotelDetailPage extends BasePage {
  async clickBookNow(): Promise<boolean> {
    await this.page.getByRole('button', { name: 'Book Now' }).first().click({force: true});
    await this.page.waitForTimeout(2000);
    
    const priceError = this.page.getByText('Sorry, There is a problem in checking price!', { exact: true });
    if (await priceError.isVisible().catch(() => false)) {
      console.log('Price error encountered - test reached booking page');
      await this.page.getByRole('button', { name: '×' }).click();
      return false; 
    }
    return true; 
  }
}