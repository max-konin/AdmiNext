import { type Page, expect } from '@playwright/test';

/**
 * Represents a page object for the resource list view in a Playwright test.
 * Provides methods to interact with and assert the state of the resource list view.
 */
export class ResourceListViewPage {
  /**
   * Constructs an instance of the ResourceListViewPage.
   *
   * @param page - The Playwright Page object used to interact with the browser.
   * @param routePrefix - The prefix for the route associated with the resource list view.
   * @param resource - The name of the resource being managed in the list view.
   */
  constructor(
    private readonly page: Page,
    private readonly routePrefix: string,
    private readonly resource: string
  ) {}

  /**
   * Gets the URL for the resource list view.
   *
   * @returns {string} The URL constructed from the route prefix and resource.
   */
  get url() {
    return `${this.routePrefix}/${this.resource}`;
  }

  // Locators

  /**
   * Returns a locator for the table rows in the resource list view.
   *
   * @returns {Locator} A Playwright Locator object targeting elements with the test ID 'resource-table-row'.
   */
  tableRowLocator() {
    return this.page.getByTestId('resource-table-row');
  }

  /**
   * Retrieves the locator for the resource table header.
   *
   * @returns {Locator} The locator for the resource table header element.
   */
  tableHeaderLocator() {
    return this.page.getByTestId('resource-table-header');
  }

  /**
   * Returns a locator for a specific cell in a resource table.
   *
   * @param nth - The index of the cell in the table row.
   * @param fieldName - The name of the field corresponding to the cell.
   * @returns A locator for the specified table cell.
   */
  tableCellLocator(nth: number, fieldName: string) {
    return this.page.getByTestId(`resource-table-cell__${nth}_${fieldName}`);
  }

  /**
   * Returns a locator for the "New" button on the page.
   *
   * @returns {Locator} A Playwright locator for the "New" button.
   */
  newButtonLocator() {
    return this.page.getByRole('link', { name: 'New' });
  }

  /**
   * Returns a locator for the toast element identified by the 'toast' test ID.
   *
   * @returns {Locator} The locator for the toast element.
   */
  toastLocator() {
    return this.page.getByTestId('toast');
  }

  /**
   * Retrieves the first actions menu button element on the page.
   *
   * @returns {Locator} The locator for the first actions menu button.
   */
  firstActionsMenuButton() {
    return this.page.getByTestId('actions-menu').first();
  }

  /**
   * Returns the locator for the first delete item button in the resource list view.
   *
   * @returns {Locator} The locator for the first delete item button.
   */
  deleteFirstItemLocator() {
    return this.page.getByTestId('delete-item').first();
  }

  // Acts

  /**
   * Navigates to the URL specified by the `url` property of the page object.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async visit() {
    await this.page.goto(this.url);
  }

  /**
   * Clicks on the "New" button on the resource list view page.
   *
   * @returns {Promise<void>} A promise that resolves when the click action is completed.
   */
  async clickOnNewButton() {
    return this.newButtonLocator().click();
  }

  /**
   * Clicks on the first button in the actions menu.
   *
   * This method waits for the first actions menu button to be visible
   * and then performs a click action on it.
   *
   * @returns {Promise<void>} A promise that resolves when the click action is completed.
   */
  async clickOnActionsMenuFirstButton() {
    await this.firstActionsMenuButton().waitFor({ state: 'visible' });
    await this.firstActionsMenuButton().click();
  }

  /**
   * Deletes the first item in the resource list view.
   *
   * This method locates the first item in the list and performs a click action
   * to delete it.
   *
   * @returns {Promise<void>} A promise that resolves when the click action is completed.
   */
  async deleteFirstItem() {
    await this.deleteFirstItemLocator().click();
  }

  /**
   * Navigates to the next page in the resource list view.
   *
   * This method simulates a click on the element identified by the test ID 'next-page'.
   *
   * @returns {Promise<void>} A promise that resolves when the click action is completed.
   */
  async goToNextPage() {
    return this.page.getByTestId('next-page').click();
  }

  /**
   * Sets the page size for the resource list view.
   *
   * @param size - The number of items to display per page.
   * @returns A promise that resolves when the page size has been set.
   */
  async setPageSize(size: number) {
    await this.page.getByTestId('pagination-page-size-select').click();
    await this.page.getByRole('option', { name: size.toString() }).click();
  }

  // Asserts

  /**
   * Asserts that the table row locator has the specified number of records.
   *
   * @param n - The expected number of records.
   * @returns A promise that resolves when the assertion is complete.
   */
  async shouldHaveNRecords(n: number) {
    await expect.soft(this.tableRowLocator()).toHaveCount(n);
  }

  /**
   * Asserts that the table header contains the specified text.
   *
   * @param text - The text to be checked within the table header.
   * @returns A promise that resolves when the assertion is complete.
   */
  async shouldHaveTableHeaderWithText(text: string) {
    await expect.soft(this.tableHeaderLocator().getByText(text)).toBeVisible();
  }

  /**
   * Verifies that the table cell at the specified position contains the expected text.
   *
   * @param fieldName - The name of the field to locate the cell.
   * @param nth - The index of the cell in the table.
   * @param text - The expected text to be present in the cell.
   * @returns A promise that resolves when the expectation is checked.
   */
  async shouldHaveCellWithText(fieldName: string, nth: number, text: string) {
    await expect.soft(this.tableCellLocator(nth, fieldName)).toHaveText(text);
  }

  /**
   * Asserts that a notification with the specified message is present.
   *
   * @param message - The message that the notification should contain.
   * @returns A promise that resolves when the assertion is complete.
   */
  async shouldHaveNotificationWithMessage(message: string) {
    await expect.soft(this.toastLocator()).toContainText(message);
  }
}
