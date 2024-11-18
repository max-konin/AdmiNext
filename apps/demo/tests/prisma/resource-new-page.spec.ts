import {
  ResourceFormPage,
  ResourceListViewPage,
} from '@adminext/playwright';
import test from '@playwright/test';
import { prisma } from '../../app/db';

test.afterEach(async () => {
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
});

test('Visit resource new page and submit the form', async ({ page }) => {
  const categoryName = 'Category 1';
  await prisma.category.create({
    data: {
      name: categoryName,
    },
  });

  const newPage = new ResourceFormPage(page, '/admin', 'posts');

  await newPage.visit();
  await newPage.fillFormTextField('title', 'New post');
  await newPage.fillFormTextField('content', 'Awesome post');
  await newPage.fillFormSelectField('category', categoryName);
  await newPage.toggleFormCheckbox('published');
  await newPage.submitForm();
  await newPage.shouldHaveNotificationWithMessage('Done!');

  const listPage = new ResourceListViewPage(page, '/admin', 'posts');

  await page.waitForURL(listPage.url);
  await listPage.shouldHaveNRecords(1);
  await listPage.shouldHaveCellWithText('title', 0, 'New post');
  await listPage.shouldHaveCellWithText('category', 0, categoryName);
  await listPage.shouldHaveCellWithText('published', 0, '✅');
  await listPage.shouldHaveNotificationWithMessage('Done!');
});
