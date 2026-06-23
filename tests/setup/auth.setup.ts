import { test } from '../../fixtures/customFixture'; 
import * as dotenv from 'dotenv';
dotenv.config();

test('Authenticate and Save State @smoke @regression @all', async ({ loginPage }) => {
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await loginPage.saveCurrentState('login-state.json');
});
