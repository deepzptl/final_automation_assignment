import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightTripSummaryPage extends BasePage {
  async proceed() {
    await this.waitForDom();
    await this.page.waitForTimeout(3000);
    
    // Strategy 1: Try exact role-based selector
    let continueBtn = this.page.getByRole('button', { name: /Continue to Checkout/i });
    let isFound = false;
    
    try {
      await continueBtn.waitFor({ state: 'visible', timeout: 8000 });
      isFound = true;
    } catch (e) {
      console.log('Strategy 1 failed: Continue to Checkout button not found');
    }
    
    // Strategy 2: Try partial text match
    if (!isFound) {
      continueBtn = this.page.locator('button:has-text("Checkout")');
      try {
        await continueBtn.first().waitFor({ state: 'visible', timeout: 5000 });
        isFound = true;
      } catch (e) {
        console.log('Strategy 2 failed: Checkout button not found');
      }
    }
    
    // Strategy 3: Try any button with "Continue" text
    if (!isFound) {
      continueBtn = this.page.locator('button:has-text("Continue")');
      try {
        await continueBtn.first().waitFor({ state: 'visible', timeout: 5000 });
        isFound = true;
      } catch (e) {
        console.log('Strategy 3 failed: Continue button not found');
      }
    }
    
    // Strategy 4: Log page state and try CSS selector approach
    if (!isFound) {
      const allButtons = await this.page.locator('button').allTextContents();
      const allText = await this.page.locator('body').textContent();
      console.error('=== PAGE STATE DEBUG ===');
      console.error('Available buttons:', allButtons);
      console.error('Page contains "Checkout":', allText?.includes('Checkout'));
      console.error('Page contains "Continue":', allText?.includes('Continue'));
      
      continueBtn = this.page.locator('button[type="button"]').filter({ hasText: /checkout|continue/i }).first();
      try {
        await continueBtn.waitFor({ state: 'visible', timeout: 5000 });
        isFound = true;
      } catch (e) {
        throw new Error(`Unable to locate "Continue to Checkout" button. Available buttons: ${allButtons.join(', ')}`);
      }
    }
    
    await continueBtn.click({ force: true });
    
    // Click the "Click here" link if it exists
    const clickHereLink = this.page.locator(`u:has-text("Click here")`);
    const clickHereExists = await clickHereLink.isVisible({ timeout: 3000 }).catch(() => false);
    if (clickHereExists) {
      await clickHereLink.click();
    }
    
    await this.waitForDom();
  }
}