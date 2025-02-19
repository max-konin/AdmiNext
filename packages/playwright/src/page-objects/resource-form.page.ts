import { type Page, expect } from '@playwright/test';

export class ResourceFormPage {
  constructor(
    public page: Page,
    public routePrefix: string,
    public resource: string
  ) {}

  // Locators

  toastLocator() {
    return this.page.getByTestId('toast');
  }

  // Acts

  async clearInput(name: string) {
    await this.page.getByRole('textbox', { name }).clear();
  }

  async fillFormTextField(fieldName: string, value: string) {
    await this.page.fill(`[name="${fieldName}"]`, value);
  }

  async fillFormSelectField(fieldName: string, value: string) {
    await this.page
      .getByRole('combobox', { name: fieldName })
      .selectOption({ label: value });
  }

  async toggleFormCheckbox(fieldName: string) {
    await this.page
      .locator(`label.chakra-field__label[for="${fieldName}"]`)
      .click();
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  // Asserts

  async shouldHaveNotificationWithMessage(message: string) {
    await expect(this.toastLocator()).toContainText(message);
  }
}
