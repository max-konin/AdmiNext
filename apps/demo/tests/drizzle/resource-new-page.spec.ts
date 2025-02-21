import {
  ResourceListViewPage,
  ResourceNewViewPage,
} from '@adminext/playwright';
import test from '@playwright/test';

import { resetDB } from './test-helpers';

test.beforeEach(async () => {
  await resetDB();
});
test('Visit resource new page and submit the form', async ({ page }) => {
  const newPage = new ResourceNewViewPage(page, '/admin', 'users');

  await newPage.visit();
  await newPage.fillFormTextField('name', 'ZZ Top');
  await newPage.fillFormTextField('age', '99');
  await newPage.fillFormTextField('email', 'zz@top.ai');
  await newPage.submitForm();
  await newPage.shouldHaveNotificationWithMessage('Done!');

  const listPage = new ResourceListViewPage(page, '/admin', 'users');

  await page.waitForURL(listPage.url);
  await listPage.shouldHaveNRecords(1);
  await listPage.shouldHaveCellWithText('name', 0, 'ZZ Top');
  await listPage.shouldHaveCellWithText('age', 0, '99');
});
