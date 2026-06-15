import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HotelGuestInfoPage extends BasePage {
  async fillInfo(data: any, email: string) {
    await this.page.getByRole('textbox', { name: 'Ex. John' }).fill(data.guest.firstName);
    await this.page.getByRole('textbox', { name: 'Ex. Smith' }).fill(data.guest.lastName);
    await this.page.getByRole('textbox', { name: 'Ex. 35' }).fill(data.guest.age);
    
    await this.page.getByRole('combobox').filter({ hasText: 'Select your gender' }).click();
    await this.page.getByRole('option', { name: 'Male', exact: true }).click();
    
    await this.page.locator('input[name="adress"]').fill('123 Main St, Anytown, USA');
    await this.page.locator('input[name="zipcode"]').fill('382531');
    await this.page.locator('input[name="city"]').fill('Anytown');
    await this.page.locator('input[name="email"]').fill(email);
    await this.page.locator('input[name="phone"]').fill('9512345678');
  }
}