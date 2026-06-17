import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightSeatMapPage extends BasePage {
  async handleSeats() {
    const flights = this.page.locator(`div.mb-40 > div.flex > div.flex`).first().getByRole('button', { name: /Flight/i });
    await flights.first().waitFor({ state: 'visible' });
    
    for (let i = 0; i < await flights.count(); i++) {
      await flights.nth(i).click({ force: true });
      const noSeat = this.page.getByRole('heading', { name: 'Seat booking is not available for this flight', level: 4 });
      if (!(await noSeat.isVisible().catch(() => false))) {
        console.log(`Found available seat in Flight ${i + 1}`);
        break;
      }
    }
    
    // Click first available seat with force option
    const seatLabel = this.page.locator('label').first();
    try {
      await seatLabel.click({ force: true });
    } catch (e) {
      console.error('Failed to click seat label:', e.message);
      // Try alternative approach - click by input
      await this.page.locator('input[type="radio"]').first().click({ force: true });
    }
    
    await this.page.getByRole('button', { name: 'Skip/Move to Checkout...' }).click({ force: true });
  }
}