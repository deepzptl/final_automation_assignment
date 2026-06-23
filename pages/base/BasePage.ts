import { Page } from '@playwright/test';
import { calendarDateLabel, daysFromToday, selectDateInOpenCalendar } from '../common/CalendarHelper';

export class BasePage {
  constructor(public page: Page) {}

  protected logStep(message: string) {
    console.log(`[STAGE] [${this.constructor.name}] ${message}`);
  }

  async saveCurrentState(fileName: string) {
    const path = `.auth/${fileName}`;
    await this.page.context().storageState({ path });
    this.logStep(`Browser state saved to ${path}`);
  }

  async waitForNetwork() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForDom() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectCalendarDate(daysAhead = 15): Promise<Date> {
    const targetDate = daysFromToday(daysAhead);
    this.logStep(`Selecting calendar date: ${calendarDateLabel(targetDate)}`);
    await selectDateInOpenCalendar(this.page, targetDate);
    this.logStep(`Calendar date selected: ${calendarDateLabel(targetDate)}`);
    return targetDate;
  }
}
