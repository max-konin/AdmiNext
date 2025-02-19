import { type Page } from '@playwright/test';
import { ResourceFormPage } from './resource-form.page';

export class ResourceNewViewPage extends ResourceFormPage {
  constructor(page: Page, routePrefix: string, resource: string) {
    super(page, routePrefix, resource);
  }

  get url() {
    return `${this.routePrefix}/${this.resource}/new`;
  }

  async visit() {
    await this.page.goto(this.url);
  }
}
