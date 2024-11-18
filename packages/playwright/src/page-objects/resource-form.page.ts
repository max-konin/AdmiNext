import { type Page, expect } from '@playwright/test';

export class ResourceFormPage {
  constructor(
    private readonly page: Page,
    private readonly routePrefix: string,
    private readonly resource: string,
    private readonly id?: string,
  ) { }

  get url() {
    const newPageUrl = `${this.routePrefix}/${this.resource}/new`;
    const editPageUrl = `${this.routePrefix}/${this.resource}/${this.id}`;
    return this.id ? editPageUrl : newPageUrl;
  }

  // Locators

  toastLocator() {
    return this.page.getByTestId('toast');
  }

  // Acts

  async visit() {
    await this.page.goto(this.url);
  }

  async clearInput() {
    await this.page.getByRole('textbox').clear();
  }

  async fillInput(text: string) {
    await this.page.getByRole('textbox').fill(text);
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

  async updateCategory(inputText: string) {
    await this.clearInput();
    await this.fillInput(inputText);
    await this.submitForm();
  }

  // Asserts

  async shouldHaveNotificationWithMessage(message: string) {
    await expect(this.toastLocator()).toContainText(message);
  }
}
