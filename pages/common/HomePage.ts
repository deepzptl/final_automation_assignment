import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HomePage extends BasePage {
  async navigateToFlights() {
    await this.page.goto('/');
    await this.page.getByRole('button', {name: 'Toggle menu'}).click();
    await this.page.getByRole('link', { name: 'Travel' }).click();
    await this.page.locator('.flex-grow.overflow-y-auto.custom-scrollbar').locator('a[href="/flights/search"]').first().click();
  }

  async navigateToHotels() {
    await this.page.goto('/');
    await this.page.getByRole('button', {name: 'Toggle menu'}).click();
    await this.page.getByRole('link', { name: 'Travel' }).click();
    await this.page.locator('.flex-grow.overflow-y-auto.custom-scrollbar').locator('a[href="/hotel/search"]').first().click();
  }

  async openSavedTrips(): Promise<Page> {
    await this.page.goto('/');
    const pagePromise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'Tripplanner saved trips' }).click();
    return await pagePromise;
  }
}