import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class TripSearchPage extends BasePage {
  async searchAndPlan(data: any): Promise<Page> {
    await this.page.getByRole('textbox', { name: 'Where are you from?' }).click();
    await this.page.getByRole('textbox', { name: 'Where are you from?' }).fill(data.fromSearch);
    await this.page.locator('div').filter({ hasText: new RegExp(`^${data.fromSelect.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).nth(3).click();
    
    await this.page.getByRole('textbox', { name: 'Where you want to go?' }).click();
    await this.page.getByRole('textbox', { name: 'Where you want to go?' }).fill(data.toSearch);
    await this.page.locator('div').filter({ hasText: new RegExp(`^${data.toSelect.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).first().click();
    
    await this.page.getByRole('button', { name: 'showing selected date' }).click();
    await this.page.getByRole('button', { name: data.startDate }).click();
    await this.page.getByRole('grid', { name: 'July' }).getByLabel(data.endDate).click();
    
    const planPagePromise = this.page.waitForEvent('popup');
    await this.page.getByRole('button', { name: 'Start Planning' }).click();
    return await planPagePromise;
  }
}