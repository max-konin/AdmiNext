import { type Page, expect } from '@playwright/test';

/**
 * Represents a page object model for interacting with a resource form page.
 */
export class ResourceFormPage {
  constructor(
    public page: Page,
    public routePrefix: string,
    public resource: string
  ) {}

  // Locators

  /**
   * Returns a locator for the toast element identified by the test ID 'toast'.
   *
   * @returns {Locator} A locator for the toast element.
   */
  toastLocator() {
    return this.page.getByTestId('toast');
  }

  // Acts

  /**
   * Clears the input field with the specified name.
   *
   * @param name - The name attribute of the input field to clear.
   * @returns A promise that resolves when the input field has been cleared.
   */
  async clearInput(name: string) {
    await this.page.getByRole('textbox', { name }).clear();
  }

  /**
   * Fills a text field in the form with the specified value.
   *
   * @param fieldName - The name attribute of the text field to fill.
   * @param value - The value to input into the text field.
   * @returns A promise that resolves when the text field has been filled.
   */
  async fillFormTextField(fieldName: string, value: string) {
    await this.page.fill(`[name="${fieldName}"]`, value);
  }

  /**
   * Fills a select field in a form with the specified value.
   *
   * @param fieldName - The name of the select field to fill.
   * @param value - The value to select in the field.
   * @returns A promise that resolves when the field has been filled.
   */
  async fillFormSelectField(fieldName: string, value: string) {
    await this.page
      .getByRole('combobox', { name: fieldName })
      .selectOption({ label: value });
  }

  /**
   * Toggles the checkbox for a given form field.
   *
   * @param fieldName - The name of the form field whose checkbox needs to be toggled.
   * @returns A promise that resolves when the checkbox has been toggled.
   */
  async toggleFormCheckbox(fieldName: string) {
    await this.page
      .locator(`label.chakra-field__label[for="${fieldName}"]`)
      .click();
  }

  /**
   * Submits the form by clicking the button with the role 'button' and name 'Submit'.
   *
   * @returns {Promise<void>} A promise that resolves when the form is submitted.
   */
  async submitForm() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  // Asserts

  /**
   * Asserts that a notification with the specified message is present.
   *
   * @param message - The message that the notification should contain.
   * @returns A promise that resolves when the assertion is complete.
   */
  async shouldHaveNotificationWithMessage(message: string) {
    await expect(this.toastLocator()).toContainText(message);
  }
}
