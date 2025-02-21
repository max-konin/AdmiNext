import { type Page } from '@playwright/test';
import { ResourceFormPage } from './resource-form.page';

/**
 * Represents the page object for the "New Resource" view in the application.
 * Extends the `ResourceFormPage` to inherit common form functionalities.
 */
export class ResourceNewViewPage extends ResourceFormPage {
  /**
   * Constructs a new instance of the `ResourceNewViewPage` class.
   *
   * @param page - The Playwright `Page` object used to interact with the browser.
   * @param routePrefix - The prefix for the route to the resource.
   * @param resource - The name of the resource.
   */
  constructor(page: Page, routePrefix: string, resource: string) {
    super(page, routePrefix, resource);
  }

  /**
   * Gets the URL for the "New Resource" view.
   *
   * @returns The URL as a string.
   */
  get url() {
    return `${this.routePrefix}/${this.resource}/new`;
  }

  /**
   * Navigates to the "New Resource" view.
   *
   * @returns A promise that resolves when the navigation is complete.
   */
  async visit() {
    await this.page.goto(this.url);
  }
}
