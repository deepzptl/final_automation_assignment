import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightListingPage extends BasePage {
  async filterAndSelect() {
    await this.waitForDom();
    await this.page.waitForTimeout(3000);
    await this.page.locator('span', { hasText: '2 Stop' }).dispatchEvent('click');
    await this.page.waitForTimeout(3000);
    
    const slider = this.page.locator('.rc-slider').first();
    const box = await slider.boundingBox();
    if (box) {
      await this.page.mouse.move(box.x + 5, box.y + box.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2, { steps: 20 });
      await this.page.mouse.up();
    }
    
    await this.page.waitForTimeout(3000);
    await this.waitForDom();
    await this.page.waitForTimeout(3000);
    await this.page.locator('[id="Air Canada"]').click();
    await this.waitForNetwork();
    
    await this.page.getByRole('button', { name: 'Sort by : Price (low to high)' }).click();
    await this.page.locator('p').filter({ hasText: 'Arrival (earliest)' }).last().click({force:true});
    await this.page.locator(`div.flex > section.flex > div.flex`).first().click();
  }
}