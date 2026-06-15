import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FlightTravellerInfoPage extends BasePage {
  async fillInfo(data: any, email: string) {
    await this.page.getByText('Passenger Detail #4INFANT(').waitFor({ state: 'visible' });
    
    for (let i = 1; ; i++) {
      const firstName = this.page.locator(`input[name="firstName${i}"]`);
      if (!(await firstName.isVisible().catch(() => false))) {
        break;
      }
      
      await firstName.fill(data.passenger.firstName);
      await this.page.locator(`input[name="middleName${i}"]`).fill(data.passenger.middleName);
      await this.page.locator(`input[name="lastName${i}"]`).fill(data.passenger.lastName);
      await this.page.locator(`input[name="DOB${i}"]`).fill(data.passenger.dob);
      
      await this.page.getByRole('combobox').nth(i * 2 - 1).click();
      await this.page.getByRole('option', { name: 'Male', exact: true }).click();
    }
    
    await this.page.locator('input[name="adress"]').fill(data.contact.address);
    await this.page.locator('input[name="zipcode"]').fill(data.contact.zip);
    await this.page.locator('input[name="city"]').fill(data.contact.city);
    await this.page.locator('input[name="email"]').fill(email);
    await this.page.locator('input[name="phone"]').fill(data.contact.phone);
  }
}