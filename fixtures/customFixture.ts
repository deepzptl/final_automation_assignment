import { test as base } from '@playwright/test';
import { HomePage } from '../pages/common/HomePage';
import { LoginPage } from '../pages/common/LoginPage';
import { FlightSearchPage } from '../pages/flights/FlightSearchPage';
import { FlightListingPage } from '../pages/flights/FlightListingPage';
import { FlightTripSummaryPage } from '../pages/flights/FlightTripSummaryPage';
import { FlightSeatMapPage } from '../pages/flights/FlightSeatMapPage';
import { FlightTravellerInfoPage } from '../pages/flights/FlightTravellerInfoPage';
import { HotelSearchPage } from '../pages/hotels/HotelSearchPage';
import { HotelListingPage } from '../pages/hotels/HotelListingPage';
import { HotelDetailPage } from '../pages/hotels/HotelDetailPage';
import { HotelGuestInfoPage } from '../pages/hotels/HotelGuestInfoPage';
import { TripSavedTripsPage } from '../pages/trips/TripSavedTripsPage';
import { TripPlannerPage } from '../pages/trips/TripPlannerPage';
import { TripSearchPage } from '../pages/trips/TripSearchPage';
import { TripPlanPage } from '../pages/trips/TripPlanPage';

type AppFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  flightSearchPage: FlightSearchPage;
  flightListingPage: FlightListingPage;
  flightTripSummaryPage: FlightTripSummaryPage;
  flightSeatMapPage: FlightSeatMapPage;
  flightTravellerInfoPage: FlightTravellerInfoPage;
  hotelSearchPage: HotelSearchPage;
  hotelListingPage: HotelListingPage;
  hotelDetailPage: HotelDetailPage;
  hotelGuestInfoPage: HotelGuestInfoPage;
  tripSavedTripsPage: TripSavedTripsPage;
  tripPlannerPage: TripPlannerPage;
  tripSearchPage: TripSearchPage;
  tripPlanPage: TripPlanPage;
};
export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  flightSearchPage: async ({ page }, use) => { await use(new FlightSearchPage(page)); },
  flightListingPage: async ({ page }, use) => { await use(new FlightListingPage(page)); },
  flightTripSummaryPage: async ({ page }, use) => { await use(new FlightTripSummaryPage(page)); },
  flightSeatMapPage: async ({ page }, use) => { await use(new FlightSeatMapPage(page)); },
  flightTravellerInfoPage: async ({ page }, use) => { await use(new FlightTravellerInfoPage(page)); },
  hotelSearchPage: async ({ page }, use) => { await use(new HotelSearchPage(page)); },
  hotelListingPage: async ({ page }, use) => { await use(new HotelListingPage(page)); },
  hotelDetailPage: async ({ page }, use) => { await use(new HotelDetailPage(page)); },
  hotelGuestInfoPage: async ({ page }, use) => { await use(new HotelGuestInfoPage(page)); },
  tripSavedTripsPage: async ({ page }, use) => { await use(new TripSavedTripsPage(page)); },
  tripPlannerPage: async ({ page }, use) => { await use(new TripPlannerPage(page)); },
  tripSearchPage: async ({ page }, use) => { await use(new TripSearchPage(page)); },
  tripPlanPage: async ({ page }, use) => { await use(new TripPlanPage(page)); },
});
export { expect } from '@playwright/test';