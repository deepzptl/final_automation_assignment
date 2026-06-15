import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class TripSavedTripsPage extends BasePage {
  async cleanUpAndCreate(): Promise<Page> {
    // 1. Force Playwright to wait until the new tab is fully rendered
    await this.waitForDom();
    await this.page.waitForTimeout(2000); // Give the UI a moment to settle

    // 2. Automatically accept any "Are you sure you want to delete?" dialogs
    this.page.on('dialog', async dialog => {
      console.log(`Dialog caught: ${dialog.message()}`);
      await dialog.accept();
    });

    const deleteButton = this.page.getByRole('button', { name: 'Delete' });
    try {
        // Wait up to 5 seconds to see if there's an old trip to delete
        await deleteButton.click({ force: true, timeout: 5000 });
        console.log('Old trip deleted.');
        await this.page.waitForTimeout(2000); // Wait for the deletion to process
    } catch (error) {
        console.log('Delete button was not found. Skipping.');
    }  

    // 3. Explicitly wait for the Create Trip button to be visible before clicking
    const createTripBtn = this.page.getByRole('button', { name: 'Create Trip' });
    await createTripBtn.waitFor({ state: 'visible', timeout: 15000 }); // Will throw a clearer error if missing
    
    const pagePromise = this.page.waitForEvent('popup');
    await createTripBtn.click();
    
    return await pagePromise;
  }
}