import { expect, test } from '@playwright/test';
import { ResourceListViewPage } from '@adminext/playwright';
import { resetDB } from './test-helpers';
import { drizzleClient, usersTable } from '../../db';

test.beforeEach(async () => {
  await resetDB();
});

test('Visit resource list page', async ({ page }) => {
  const listPage = new ResourceListViewPage(page, '/admin', 'users');

  await drizzleClient.insert(usersTable).values([
    { name: 'User 1', age: 20, email: 'user1@example.com' },
    { name: 'User 2', age: 30, email: 'user2@example.com' },
  ]);

  await listPage.visit();

  await listPage.shouldHaveTableHeaderWithText('ID');
  await listPage.shouldHaveTableHeaderWithText('Name');
  await listPage.shouldHaveTableHeaderWithText('Age');
  await listPage.shouldHaveNRecords(2);
  await listPage.shouldHaveTableHeaderWithText('Name');
  await listPage.shouldHaveCellWithText('name', 0, 'User 1');
  await listPage.shouldHaveCellWithText('name', 1, 'User 2');
  await listPage.clickOnActionsMenuFirstButton();
  await listPage.deleteFirstItem();
  await listPage.shouldHaveNotificationWithMessage('Record deleted');
  await listPage.shouldHaveNRecords(1);
});

test('Click on "New" button', async ({ page }) => {
  const listPage = new ResourceListViewPage(page, '/admin', 'users');

  await listPage.visit();
  await listPage.clickOnNewButton();

  await expect(page).toHaveURL('/admin/users/new');
});
