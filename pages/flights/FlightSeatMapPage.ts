import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightSeatMapPage extends BasePage {
  async handleSeats() {
    const flights = this.page.locator(`div.mb-40 > div.flex > div.flex`).first().getByRole('button', { name: /Flight/i });
    await flights.first().waitFor({ state: 'visible' });
    
    for (let i = 0; i < await flights.count(); i++) {
      await flights.nth(i).click();
      const noSeat = this.page.getByRole('heading', { name: 'Seat booking is not available for this flight', level: 4 });
      if (!(await noSeat.isVisible().catch(() => false))) {
        console.log(`Found available seat in Flight ${i + 1}`);
        break;
      }
    }
    await this.page.locator('label').first().click();
    await this.page.getByRole('button', { name: 'Skip/Move to Checkout...' }).click();
  }
}