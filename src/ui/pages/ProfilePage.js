import { expect, testStep } from "../../common/helpers/pw";

export class ProfilePage {
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.userName = page.locator('div h4');
  }

  async step (title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertUserName (name) {
    await this.step(`Assert correct username`, async () => {
      await expect(this.userName).toHaveText(name);
    });
  }
}