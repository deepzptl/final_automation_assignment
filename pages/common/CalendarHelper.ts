import { Page } from '@playwright/test';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function ordinal(day: number): string {
  const lastTwoDigits = day % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function daysFromToday(days: number, today = new Date()): Date {
  // Noon avoids crossing a date boundary during daylight-saving clock changes.
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + days,
    12,
  );
}

export function calendarDateLabel(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${ordinal(date.getDate())}, ${date.getFullYear()}`;
}

export async function selectDateInOpenCalendar(
  page: Page,
  targetDate: Date,
  maximumMonthChanges = 24,
): Promise<void> {
  const fullLabel = calendarDateLabel(targetDate);
  const labelWithoutYear = fullLabel.slice(0, fullLabel.lastIndexOf(' ') + 1).trim();
  const dateName = new RegExp(`^${escapeRegExp(labelWithoutYear)}(?: ${targetDate.getFullYear()})?$`);

  for (let attempt = 0; attempt <= maximumMonthChanges; attempt++) {
    const dateButtons = page.getByRole('button', { name: dateName });
    const count = await dateButtons.count();

    for (let index = 0; index < count; index++) {
      const dateButton = dateButtons.nth(index);

      if (await dateButton.isVisible() && await dateButton.isEnabled()) {
        await dateButton.click();
        return;
      }
    }

    if (attempt === maximumMonthChanges) {
      break;
    }

    const navigationName = targetDate >= daysFromToday(0)
      ? 'Go to the Next Month'
      : 'Go to the Previous Month';
    const navigationButton = page.getByRole('button', { name: navigationName });

    if (!(await navigationButton.isVisible().catch(() => false))) {
      throw new Error(`Could not find ${fullLabel} or the calendar navigation button.`);
    }

    await navigationButton.click();
  }

  throw new Error(`Could not select ${fullLabel} after ${maximumMonthChanges} month changes.`);
}
