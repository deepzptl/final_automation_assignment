import { test } from '../fixtures/customFixture';
import testData from '../data/testData.json';
import { TripSavedTripsPage } from '../pages/trips/TripSavedTripsPage';
import { TripPlannerPage } from '../pages/trips/TripPlannerPage';
import { TripSearchPage } from '../pages/trips/TripSearchPage';
import { TripPlanPage } from '../pages/trips/TripPlanPage';

test('@regression @all Create Trip Planner Flow', async ({ homePage }) => {
  const savedTripsTab = await homePage.openSavedTrips();
  const tripSavedTripsPage = new TripSavedTripsPage(savedTripsTab);
  
  const tripPlannerTab = await tripSavedTripsPage.cleanUpAndCreate();
  const tripPlannerPage = new TripPlannerPage(tripPlannerTab);
  
  await tripPlannerPage.dismissPopup();
  
  const tripSearchPage = new TripSearchPage(tripPlannerTab);
  const tripPlanTab = await tripSearchPage.searchAndPlan(testData.trip);

  const tripPlanPage = new TripPlanPage(tripPlanTab);
  await tripPlanPage.save();
  await tripPlanPage.saveCurrentState('trip-planned-state.json'); // 📸 Final State Saved
});