import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
 

export class TripSearchPage extends BasePage {
  async searchAndPlan(data: any): Promise<Page> {
    // From location
    await this.page.getByRole('textbox', { name: 'Where are you from?' }).click();
    await this.page.getByRole('textbox', { name: 'Where are you from?' }).fill(data.fromSearch);
    
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(1000);
    
    // Try to find and click the from location with multiple strategies
    let fromOption = this.page.locator('div').filter({ hasText: new RegExp(`^${data.fromSelect.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).nth(3);
    
    // Fallback: Try without nth selector
    if (!(await fromOption.isVisible({ timeout: 2000 }).catch(() => false))) {
      fromOption = this.page.getByText(data.fromSelect).first();
    }
    
    // Fallback: Try partial match
    if (!(await fromOption.isVisible({ timeout: 2000 }).catch(() => false))) {
      fromOption = this.page.locator('div:has-text("' + data.fromSelect.split(' ')[0] + '")').first();
    }
    
    try {
      await fromOption.click({ force: true, timeout: 3000 });
    } catch (e) {
      console.error('Failed to click from location:', e.message);
      throw new Error(`Cannot select from location: ${data.fromSelect}`);
    }
    
    // To location
    await this.page.getByRole('textbox', { name: 'Where you want to go?' }).click();
    await this.page.getByRole('textbox', { name: 'Where you want to go?' }).fill(data.toSearch);
    
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(1000);
    
    let toOption = this.page.locator('div').filter({ hasText: new RegExp(`^${data.toSelect.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).first();
    
    // Fallback: Try without regex
    if (!(await toOption.isVisible({ timeout: 2000 }).catch(() => false))) {
      toOption = this.page.getByText(data.toSelect).first();
    }
    
    try {
      await toOption.click({ force: true, timeout: 3000 });
    } catch (e) {
      console.error('Failed to click to location:', e.message);
      throw new Error(`Cannot select to location: ${data.toSelect}`);
    }
    
    // Date selection
    await this.page.getByRole('button', { name: 'showing selected date' }).click();
    const startDays = data.startDaysFromToday ?? 15;
    const tripLengthDays = data.tripLengthDays ?? 1;
    await this.selectCalendarDate(startDays);
    await this.selectCalendarDate(startDays + tripLengthDays);
    
    // Start planning and wait for popup
    const planPagePromise = this.page.waitForEvent('popup', { timeout: 10000 });
    await this.page.getByRole('button', { name: 'Start Planning' }).click();
    return await planPagePromise;
  }
}
