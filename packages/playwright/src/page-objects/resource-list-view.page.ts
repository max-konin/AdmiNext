import { type Page, expect } from '@playwright/test';

export class ResourceListViewPage {
  constructor(
    private readonly page: Page,
    private readonly routePrefix: string,
    private readonly resource: string
  ) { }

  get url() {
    return `${this.routePrefix}/${this.resource}`;
  }

  // Locators

  tableRowLocator() {
    return this.page.getByTestId('resource-table-row');
  }

  tableHeaderLocator() {
    return this.page.getByTestId('resource-table-header');
  }

  tableCellLocator(nth: number, fieldName: string) {
    return this.page.getByTestId(`resource-table-cell__${nth}_${fieldName}`);
  }

  newButtonLocator() {
    return this.page.getByRole('link', { name: 'New' });
  }

  toastLocator() {
    return this.page.getByTestId('toast');
  }

  firstMenuButton() {
    return this.page.getByRole('row').getByRole('button').first();
  }

  deleteFirstItemLocator() {
    return this.page.getByTestId('delete-item').first();
  }

  // Acts

  async visit() {
    await this.page.goto(this.url);
  }

  async clickOnNewButton() {
    return this.newButtonLocator().click();
  }

  async clickFirstMenuButton() {
    return this.firstMenuButton().click();
  }

  async deleteFirstItem() {
    return this.deleteFirstItemLocator().click();
  }

  // Asserts

  async shouldHaveNRecords(n: number) {
    await expect.soft(this.tableRowLocator()).toHaveCount(n);
  }

  async shouldHaveTableHeaderWithText(text: string) {
    await expect.soft(this.tableHeaderLocator().getByText(text)).toBeVisible();
  }

  async shouldHaveCellWithText(fieldName: string, nth: number, text: string) {
    await expect.soft(this.tableCellLocator(nth, fieldName)).toHaveText(text);
  }

  async shouldHaveNotificationWithMessage(message: string) {
    await expect.soft(this.toastLocator()).toContainText(message);
  }
}
