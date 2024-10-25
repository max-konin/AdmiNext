import {
  ResourceListViewPage,
  ResourceNewViewPage,
} from '@adminext/playwright';
import test from '@playwright/test';
import { prisma } from '../../app/db';

test.afterEach(async () => {
  await prisma.category.deleteMany();
});

test('Visit resource new page and submit the form', async ({ page }) => {
  const newPage = new ResourceNewViewPage(page, '/admin', 'categories');

  await newPage.visit();
  await newPage.fillFormTextField('name', 'New Category');
  await newPage.submitForm();

  const listPage = new ResourceListViewPage(page, '/admin', 'categories');

  await page.waitForURL(listPage.url);
  await listPage.shouldHaveNRecords(1);
});
