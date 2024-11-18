import { test } from '@playwright/test';
import { prisma } from '../../app/db';
import { ResourceFormPage } from '@adminext/playwright';

test.afterEach(async () => {
  await prisma.category.deleteMany();
});

test('Visit resource edit page', async ({ page }) => {
  await prisma.category.createMany({
    data: [{ name: 'Category 1' }, { name: 'Category 2' }],
  });

  const category = await prisma.category.findUnique({
    where: { name: 'Category 1' },
  });

  const categoryId = String(category!.id);

  const editPage = new ResourceFormPage(page, '/admin', 'categories', categoryId);

  await editPage.visit();

  await editPage.updateCategory('Category 2');
  await editPage.shouldHaveNotificationWithMessage('Failed to update record');
  await editPage.updateCategory('Category New');
  await editPage.shouldHaveNotificationWithMessage('Done');
})
