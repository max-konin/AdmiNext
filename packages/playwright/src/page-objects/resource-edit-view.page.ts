import { type Page, expect } from '@playwright/test';

export class ResourceEditViewPage {
  constructor(
    private readonly page: Page,
    private readonly routePrefix: string,
    private readonly resource: string,
    private readonly id: string,
  ) { }

  get url() {
    return `${this.routePrefix}/${this.resource}/${this.id}`;
  }

  // Locators

  toastLocator() {
    return this.page.getByTestId('toast');
  }

  // Act  

  async visit() {
    await this.page.goto(this.url);
  }

  async clearInput() {
    await this.page.getByRole('textbox').clear();
  }

  async fillInput(text: string) {
    await this.page.getByRole('textbox').fill(text);
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async updateRecord(inputText: string, message: string) {
    await this.clearInput();
    await this.fillInput(inputText);
    await this.submitForm();
    await this.shouldHaveNotificationWithMessage(message);
  }

  // Asserts

  async shouldHaveNotificationWithMessage(message: string) {
    await expect(this.toastLocator()).toContainText(message);
  }
}