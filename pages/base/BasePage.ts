import { Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async saveCurrentState(fileName: string) {
    const path = `.auth/${fileName}`;
    await this.page.context().storageState({ path });
    console.log(`State saved to: ${path}`);
  }

  async waitForNetwork() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForDom() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}