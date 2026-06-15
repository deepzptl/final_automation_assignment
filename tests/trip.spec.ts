import { test } from '../fixtures/customFixture';
import testData from '../data/testData.json';

test('@regression @all Create Trip Planner Flow', async ({ homePage, tripSavedTripsPage, tripPlannerPage, tripSearchPage, tripPlanPage }) => {
  const savedTripsTab = await homePage.openSavedTrips();
  
  const tripPlannerTab = await tripSavedTripsPage.cleanUpAndCreate();
  
  await tripPlannerPage.dismissPopup();
  
  const tripPlanTab = await tripSearchPage.searchAndPlan(testData.trip);

  await tripPlanPage.save();
  await tripPlanPage.saveCurrentState('trip-planned-state.json'); // 📸 Final State Saved
});