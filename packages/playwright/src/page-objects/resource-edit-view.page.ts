import { type Page } from '@playwright/test';
import { ResourceFormPage } from './resource-form.page';

export class ResourceEditViewPage extends ResourceFormPage {
  constructor(
    page: Page,
    routePrefix: string,
    resource: string,
    readonly id: string,
  ) {
    super(page, routePrefix, resource);
  }

  get url() {
    return `${this.routePrefix}/${this.resource}/${this.id}`;
  }

  async visit() {
    await this.page.goto(this.url);
  }
}