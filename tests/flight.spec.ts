import { test } from '../fixtures/customFixture';
import testData from '../data/testData.json';
import { FlightTripSummaryPage } from '../pages/flights/FlightTripSummaryPage';
import { FlightSeatMapPage } from '../pages/flights/FlightSeatMapPage';
import { FlightTravellerInfoPage } from '../pages/flights/FlightTravellerInfoPage';

test('End-to-End Flight Booking Flow', async ({ page, homePage, flightSearchPage, flightListingPage }) => {
  await homePage.navigateToFlights();
  
  await flightSearchPage.searchFlight(testData.flight);
  await flightSearchPage.saveCurrentState('flight-searched-state.json'); // 📸 Captured state after search

  await flightListingPage.filterAndSelect();
  await flightListingPage.saveCurrentState('flight-selected-state.json'); // 📸 Captured state after flight selection

  const tripSummaryPage = new FlightTripSummaryPage(page);
  await tripSummaryPage.proceed();

  const seatMapPage = new FlightSeatMapPage(page);
  await seatMapPage.handleSeats();

  const travellerInfoPage = new FlightTravellerInfoPage(page);
  await travellerInfoPage.fillInfo(testData.flight, process.env.USER_EMAIL!);
});