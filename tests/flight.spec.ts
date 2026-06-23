import { test } from '../fixtures/customFixture';
import testData from '../data/testData.json';
import * as dotenv from 'dotenv';
dotenv.config();
test('@smoke @regression @all End-to-End Flight Booking Flow', async ({ homePage, flightSearchPage, flightListingPage, flightTripSummaryPage, flightSeatMapPage, flightTravellerInfoPage }) => {
  await homePage.navigateToFlights();
  
  await flightSearchPage.searchFlight(testData.flight);
  await flightSearchPage.saveCurrentState('flight-searched-state.json'); // 📸 Captured state after search

  await flightListingPage.filterAndSelect();
  await flightListingPage.saveCurrentState('flight-selected-state.json'); // 📸 Captured state after flight selection

  await flightTripSummaryPage.proceed();

  await flightSeatMapPage.handleSeats();

  await flightTravellerInfoPage.fillInfo(testData.flight, process.env.USER_EMAIL!);
});