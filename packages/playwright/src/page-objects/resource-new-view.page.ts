import { Page } from '@playwright/test';

export class ResourceNewViewPage {
  constructor(
    private readonly page: Page,
    private readonly routePrefix: string,
    private readonly resource: string
  ) {}

  get url() {
    return `${this.routePrefix}/${this.resource}/new`;
  }

  // Acts
  async visit() {
    await this.page.goto(this.url);
  }

  async fillFormTextField(fieldName: string, value: string) {
    await this.page.fill(`[name="${fieldName}"]`, value);
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}
