import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HomePage extends BasePage {
  async navigateToFlights() {
    this.logStep('Navigating to flight search');
    await this.page.goto('/');
    await this.page.getByRole('button', {name: 'Toggle menu'}).click();
    await this.page.getByRole('link', { name: 'Travel' }).click();
    await this.page.locator('.flex-grow.overflow-y-auto.custom-scrollbar').locator('a[href="/flights/search"]').first().click();
    this.logStep('Flight search page opened');
  }

  async navigateToHotels() {
    this.logStep('Navigating to hotel search');
    await this.page.goto('/');
    await this.page.getByRole('button', {name: 'Toggle menu'}).click();
    await this.page.getByRole('link', { name: 'Travel' }).click();
    await this.page.locator('.flex-grow.overflow-y-auto.custom-scrollbar').locator('a[href="/hotel/search"]').first().click();
    this.logStep('Hotel search page opened');
  }

  async openSavedTrips(): Promise<Page> {
    this.logStep('Opening saved trips');
    await this.page.goto('/');
    const pagePromise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'Tripplanner saved trips' }).click();
    const savedTripsPage = await pagePromise;
    this.logStep('Saved trips page opened in a new tab');
    return savedTripsPage;
  }
}
