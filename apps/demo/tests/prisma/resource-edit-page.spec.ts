import { test } from '@playwright/test';
import { prisma } from '../../app/db-prisma';
import { ResourceEditViewPage } from '@adminext/playwright';
import { resetDB } from './test-helpers';

test.beforeEach(async () => {
  await resetDB();
});

test('Visit resource edit page', async ({ page }) => {
  await prisma.category.createMany({
    data: [{ name: 'Category 1' }, { name: 'Category 2' }],
  });

  const category = await prisma.category.findUnique({
    where: { name: 'Category 1' },
  });

  const categoryId = String(category!.id);

  const editPage = new ResourceEditViewPage(
    page,
    '/admin',
    'categories',
    categoryId
  );

  await editPage.visit();

  await editPage.clearInput();
  await editPage.fillInput('Category 2');
  await editPage.submitForm();
  await editPage.shouldHaveNotificationWithMessage('Failed to update record');
  await editPage.clearInput();
  await editPage.fillInput('Category New');
  await editPage.submitForm();
  await editPage.shouldHaveNotificationWithMessage('Done');
});
