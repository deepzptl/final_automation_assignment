import { test as base } from '@playwright/test';
import { HomePage } from '../pages/common/HomePage';
import { LoginPage } from '../pages/common/LoginPage';
import { FlightSearchPage } from '../pages/flights/FlightSearchPage';
import { FlightListingPage } from '../pages/flights/FlightListingPage';
import { HotelSearchPage } from '../pages/hotels/HotelSearchPage';
import { HotelListingPage } from '../pages/hotels/HotelListingPage';

type AppFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  flightSearchPage: FlightSearchPage;
  flightListingPage: FlightListingPage;
  hotelSearchPage: HotelSearchPage;
  hotelListingPage: HotelListingPage;
};
export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  flightSearchPage: async ({ page }, use) => { await use(new FlightSearchPage(page)); },
  flightListingPage: async ({ page }, use) => { await use(new FlightListingPage(page)); },
  hotelSearchPage: async ({ page }, use) => { await use(new HotelSearchPage(page)); },
  hotelListingPage: async ({ page }, use) => { await use(new HotelListingPage(page)); },
});
export { expect } from '@playwright/test';