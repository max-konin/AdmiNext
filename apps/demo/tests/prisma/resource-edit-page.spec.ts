import { test } from '@playwright/test';
import { ResourceEditViewPage } from '@adminext/playwright';
import { resetDB } from './test-helpers';
import { prisma } from '../../db';

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

  await editPage.clearInput('name');
  await editPage.fillFormTextField('name', 'Category 2');
  await editPage.submitForm();
  await editPage.shouldHaveNotificationWithMessage('Failed to update record');
  await editPage.clearInput('name');
  await editPage.fillFormTextField('name', 'Category New');
  await editPage.submitForm();
  await editPage.shouldHaveNotificationWithMessage('Done');
});
