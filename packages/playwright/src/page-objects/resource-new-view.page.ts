import { type Page } from '@playwright/test';
import { ResourceFormPage } from './resource-form.page';

export class ResourceNewViewPage extends ResourceFormPage {
  constructor(
    page: Page,
    routePrefix: string,
    resource: string,
  ) {
    super(page, routePrefix, resource);
  }

  get url() {
    return `${this.routePrefix}/${this.resource}/new`;
  }

  async visit() {
    await this.page.goto(this.url);
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
}
