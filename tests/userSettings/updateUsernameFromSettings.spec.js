import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Update username from settings', async ({ page }) => {
  const settingsPage = new SettingsPage(page);
  const profilePage = new ProfilePage(page);
  const num = faker.number.int({ min: 1, max: 999 });
  const name = `${faker.person.firstName()}${num}`;

  await settingsPage.open();
  await settingsPage.updateName(name);
  await settingsPage.updateSettingButtonClick();

  await page.waitForURL(`**/profile/${name}`);

  await profilePage.assertUserName(name);
});