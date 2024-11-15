import { test } from '@playwright/test';
import { ResourceEditViewPage } from '@adminext/playwright';
import { prisma } from '../../app/db';

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

  const editPage = new ResourceEditViewPage(page, '/admin', 'categories', categoryId)

  await editPage.visit();

  await editPage.updateRecord('Category 2', 'Failed to update record');
  await editPage.updateRecord('Category New', 'Done');
})