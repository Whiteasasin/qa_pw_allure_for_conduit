import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});


test('Add short bio from settings', async ({ page }) => {
  const settingsPage = new SettingsPage(page);
  const bio = faker.lorem.words(5);

  await settingsPage.open();
  await settingsPage.updateBio(bio);
  await settingsPage.updateSettingButtonClick();

  await page.waitForURL(/\/profile\/[^/]+$/);

  await settingsPage.open();
  await settingsPage.assertBio(bio);
});