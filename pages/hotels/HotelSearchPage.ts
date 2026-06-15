import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HotelSearchPage extends BasePage {
  async search(data: any) {
    await expect(this.page).toHaveURL(/.*hotel\/search/);
    await this.page.getByRole('textbox', { name: 'What hotel you looking for?' }).fill(data.location);
    await this.page.waitForTimeout(2000);
    
    await this.page.locator('div').filter({ hasText: new RegExp(`^${data.locationSelect}$`) }).first().click();
    await this.page.waitForTimeout(1500);
    
    await this.page.getByRole('button', { name: 'showing selected date' }).click();
    await this.page.waitForTimeout(1500);
    
    await this.page.getByRole('button', { name: data.checkIn }).dispatchEvent('click');
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('button', { name: data.checkOut }).dispatchEvent('click');
    await this.page.waitForTimeout(1500);
    
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(1000);
    
    await this.page.getByRole('button', { name: 'Room, 1 Guest' }).click();
    await this.page.waitForTimeout(1000);
    
    await this.page.getByRole('button', { name: 'Increase adults' }).click();
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('button', { name: 'Increase children' }).click();
    await this.page.waitForTimeout(1000);
    
    await this.page.getByRole('button', { name: 'Search' }).click();
  }
}