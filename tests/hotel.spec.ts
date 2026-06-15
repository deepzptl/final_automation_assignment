import { test } from '../fixtures/customFixture';
import testData from '../data/testData.json';
import { HotelDetailPage } from '../pages/hotels/HotelDetailPage';
import { HotelGuestInfoPage } from '../pages/hotels/HotelGuestInfoPage';

test('@smoke @regression @all End-to-End Hotel Booking Flow', async ({ homePage, hotelSearchPage, hotelListingPage }) => {
  await homePage.navigateToHotels();
  
  await hotelSearchPage.search(testData.hotel);
  await hotelSearchPage.saveCurrentState('hotel-searched-state.json'); // 📸 State captured
  
  // Handling the popup/new tab elegantly
  const newTabPage = await hotelListingPage.openHotelDetail();
  const hotelDetailPage = new HotelDetailPage(newTabPage);
  
  const proceedToGuest = await hotelDetailPage.clickBookNow();
  if (proceedToGuest) {
    const hotelGuestInfoPage = new HotelGuestInfoPage(newTabPage);
    await hotelGuestInfoPage.fillInfo(testData.hotel, process.env.USER_EMAIL!);
  }
});