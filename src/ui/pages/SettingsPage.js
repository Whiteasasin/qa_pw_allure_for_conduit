import { expect, testStep } from "../../common/helpers/pw";

export class SettingsPage {
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.photoUrlInput = page.getByPlaceholder('URL of profile picture');
    this.userNameInput = page.getByPlaceholder('Username');
    this.bioInput = page.getByPlaceholder('Short bio about you');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.
      getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.
      getByRole('button', { name: 'Or click here to logout.' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async updatePhotoLink(link) {
    await this.step(`Update photo url`, async () => {
      await this.photoUrlInput.fill(link);
    });
  }

  async updateName(name) {
    await this.step(`Update username`, async () => {
      await this.userNameInput.fill(name);
    });
  }

  async updateBio(text) {
    await this.step(`Update bio`, async () => {
      await this.bioInput.fill(text);
    });
  }

  async updateEmail(email) {
    await this.step(`Update email`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async updatePassword(password) {
    await this.step(`Update password`, async () => {
      await this.passwordInput.fill(password);
    });
  }

  async updateSettingButtonClick() {
    await this.step(`Update settings button click`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async logoutButtonClick() {
    await this.step(`Logout button click`, async () => {
      await this.logoutButton.click();
    });
  }

  async assertPhotoLink(link) {
    await this.step(`Assert photo url`, async () => {
      await expect(this.photoUrlInput).toHaveValue(link);
    });
  }

  async assertUsername(name) {
    await this.step(`Assert correct username`, async () => {
      await expect(this.userNameInput).toHaveValue(name);
    });
  }

  async assertBio(text) {
    await this.step(`Assert correct bio`, async () => {
      await expect(this.bioInput).toHaveValue(text);
    });
  }

  async assertEmail(email) {
    await this.step(`Assert correct email`, async () => {
      await expect(this.emailInput).toHaveValue(email);
    });
  }
}