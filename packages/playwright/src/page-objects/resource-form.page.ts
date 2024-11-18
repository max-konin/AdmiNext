import { type Page, expect } from '@playwright/test';

export class ResourceFormPage {
  constructor(
    public page: Page,
    public routePrefix: string,
    public resource: string,
  ) { }

  // Locators

  toastLocator() {
    return this.page.getByTestId('toast');
  }

  // Acts

  async clearInput() {
    await this.page.getByRole('textbox').clear();
  }

  async fillInput(text: string) {
    await this.page.getByRole('textbox').fill(text);
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  // Asserts

  async shouldHaveNotificationWithMessage(message: string) {
    await expect(this.toastLocator()).toContainText(message);
  }
}
