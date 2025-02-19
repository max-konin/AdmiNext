import { expect, test } from '@playwright/test';
import { ResourceListViewPage } from '@adminext/playwright';
import { resetDB } from './test-helpers';
import { prisma } from '../../db';

test.beforeEach(async () => {
  await resetDB();
});

test('Visit resource list page', async ({ page }) => {
  const listPage = new ResourceListViewPage(page, '/admin', 'categories');

  await prisma.category.createMany({
    data: [{ name: 'Category 1' }, { name: 'Category 2' }],
  });

  const firstCategory = await prisma.category.findFirstOrThrow();

  await listPage.visit();

  await listPage.shouldHaveTableHeaderWithText('ID');
  await listPage.shouldHaveTableHeaderWithText('Name');
  await listPage.shouldHaveTableHeaderWithText('Created At');
  await listPage.shouldHaveNRecords(2);
  await listPage.shouldHaveTableHeaderWithText('Name');
  await listPage.shouldHaveCellWithText('name', 0, 'Category 1');
  await listPage.shouldHaveCellWithText('name', 1, 'Category 2');
  await listPage.shouldHaveCellWithText(
    'createdAt',
    0,
    firstCategory.createdAt.toLocaleString()
  );
  await listPage.clickOnActionsMenuFirstButton();
  await listPage.deleteFirstItem();
  await listPage.shouldHaveNotificationWithMessage('Record deleted');
  await listPage.shouldHaveNRecords(1);
});

test('Click on "New" button', async ({ page }) => {
  const listPage = new ResourceListViewPage(page, '/admin', 'categories');

  await listPage.visit();
  await listPage.clickOnNewButton();

  await expect(page).toHaveURL('/admin/categories/new');
});

test('Pagination', async ({ page }) => {
  await prisma.category.createMany({
    data: Array.from({ length: 15 }, (_, i) => ({ name: `Category ${i}` })),
  });
  const listPage = new ResourceListViewPage(page, '/admin', 'categories');

  listPage.visit();

  await listPage.shouldHaveNRecords(10);

  await page.waitForTimeout(500);

  await listPage.goToNextPage();
  await listPage.shouldHaveNRecords(5);

  await listPage.setPageSize(20);
  await listPage.shouldHaveNRecords(15);
});
