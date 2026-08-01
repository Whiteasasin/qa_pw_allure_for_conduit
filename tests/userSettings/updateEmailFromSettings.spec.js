import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Update email from settings', async ({ page }) => {
  const settingsPage = new SettingsPage(page);
  const email = faker.internet.email().toLowerCase();

  await settingsPage.open();
  await settingsPage.updateEmail(email);
  await settingsPage.updateSettingButtonClick();

  await page.waitForURL(/\/profile\/[^/]+$/);

  await settingsPage.open();
  await settingsPage.assertEmail(email);
});