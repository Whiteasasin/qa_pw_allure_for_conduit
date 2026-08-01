import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';

let email = null;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);

  email = user.email;
});

test('Update password from settings', async ({ page }) => {
  const settingsPage = new SettingsPage(page);
  const signInPage = new SignInPage(page);
  const homePage = new HomePage(page);
  const password = faker.internet.password();

  await settingsPage.open();
  await settingsPage.updatePassword(password);
  await settingsPage.updateSettingButtonClick();

  await page.waitForURL(/\/profile\/[^/]+$/);

  await settingsPage.open();
  await settingsPage.logoutButtonClick();

  await signInPage.open();
  await signInPage.fillEmailField(email);
  await signInPage.fillPasswordField(password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});