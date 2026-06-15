import { test } from '../fixtures/customFixture';
import testData from '../data/testData.json';

test('@smoke @regression @all End-to-End Hotel Booking Flow', async ({ homePage, hotelSearchPage, hotelListingPage, hotelDetailPage, hotelGuestInfoPage }) => {
  await homePage.navigateToHotels();
  
  await hotelSearchPage.search(testData.hotel);
  await hotelSearchPage.saveCurrentState('hotel-searched-state.json'); // 📸 State captured
  
  // Handling the popup/new tab elegantly
  const newTabPage = await hotelListingPage.openHotelDetail();
  
  const proceedToGuest = await hotelDetailPage.clickBookNow();
  if (proceedToGuest) {
    await hotelGuestInfoPage.fillInfo(testData.hotel, process.env.USER_EMAIL!);
  }
});