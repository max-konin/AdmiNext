import { expect, test } from '@playwright/test';
import { ResourceEditViewPage } from '@adminext/playwright';
import { resetDB } from './test-helpers';
import { drizzleClient, usersTable } from '../../db';
import { eq } from 'drizzle-orm';

test.beforeEach(async () => {
  await resetDB();
});

test('Visit resource edit page', async ({ page }) => {
  await drizzleClient.insert(usersTable).values([
    { name: 'User 1', age: 20, email: 'user1@example.com' },
    { name: 'User 2', age: 30, email: 'user2@example.com' },
  ]);

  const user = await drizzleClient.query.usersTable.findFirst();

  const userId = String(user!.id);

  const editPage = new ResourceEditViewPage(page, '/admin', 'users', userId);

  await editPage.visit();

  await editPage.clearInput('name');
  await editPage.fillFormTextField('name', 'Update user name');
  await editPage.submitForm();
  await editPage.shouldHaveNotificationWithMessage('Done');

  const updatedUser = await drizzleClient.query.usersTable.findFirst({
    where: eq(usersTable.id, user!.id),
  });

  expect(updatedUser!.name).toBe('Update user name');
});
