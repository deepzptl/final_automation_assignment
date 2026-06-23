import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightSearchPage extends BasePage {
  async searchFlight(data: any) {
    this.logStep('Starting flight search');
    await expect(this.page).toHaveURL(/.*flights\/search/);
    await this.page.getByRole('tab', { name: 'One way' }).click();
    this.logStep('Selecting departure airport');
    await this.page.getByRole('textbox', { name: 'Departing from?' }).fill(data.fromSearch);
    await this.page.locator('div').filter({ hasText: new RegExp(`^${data.fromSelect.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).first().click();
    this.logStep('Selecting destination airport');
    await this.page.getByRole('textbox', { name: 'Going to?' }).fill(data.toSearch);
    await this.page.locator('div').filter({ hasText: new RegExp(`^${data.toSelect.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).first().click();
    this.logStep('Selecting departure date');
    await this.page.locator('#date').click();
    await this.selectCalendarDate(data.departureDaysFromToday ?? 15);
    this.logStep('Selecting cabin class and passengers');
    await this.page.getByRole('button', { name: 'Economy' }).click();
    await this.page.getByRole('menuitem', { name: 'Business class' }).click();
    await this.page.getByRole('button', { name: 'Passenger' }).click();
    await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await this.page.locator('div:nth-child(2) > .flex.items-center.justify-between > .flex.items-center > button:nth-child(3)').click();
    await this.page.locator('div:nth-child(3) > .flex.items-center.justify-between > .flex.items-center > button:nth-child(3)').click();
    this.logStep('Submitting flight search');
    await this.page.getByRole('button', { name: 'Search' }).click();
    this.logStep('Flight search submitted');
  }
}
