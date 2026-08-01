import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../../src/ui/pages/SettingsPage';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Log out user', async ({ page }) => {
  const settingsPage = new SettingsPage(page);
  const homePage = new HomePage(page);

  await settingsPage.open();
  await settingsPage.logoutButtonClick();

  await homePage.assertSignUpTabIsVisible();

});