import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  async login(email: string, pass: string) {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Sign in or join using your' }).click();
    await expect(this.page).toHaveURL(/.*login/);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(pass);
    await this.page.getByRole('checkbox', { name: 'Remember me' }).check();
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.waitForNetwork();
    await this.page.waitForTimeout(3000);
  }
}