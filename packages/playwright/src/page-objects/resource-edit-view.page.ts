import { type Page } from '@playwright/test';
import { ResourceFormPage } from './resource-form.page';

/**
 * Represents the resource edit view page.
 * Extends the `ResourceFormPage` to provide functionality specific to editing a resource.
 */
export class ResourceEditViewPage extends ResourceFormPage {
  /**
   * Constructs an instance of the ResourceEditViewPage.
   *
   * @param page - The Playwright Page object used for browser interactions.
   * @param routePrefix - The prefix for the route associated with the resource.
   * @param resource - The name of the resource being edited.
   * @param id - The unique identifier of the resource.
   */
  constructor(
    page: Page,
    routePrefix: string,
    resource: string,
    readonly id: string
  ) {
    super(page, routePrefix, resource);
  }

  /**
   * Constructs the URL for the resource edit view.
   *
   * @returns {string} The URL composed of the route prefix, resource, and id.
   */
  get url() {
    return `${this.routePrefix}/${this.resource}/${this.id}`;
  }

  /**
   * Navigates to the URL specified by the `url` property of the page object.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async visit() {
    await this.page.goto(this.url);
  }
}
