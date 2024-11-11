import test, { expect, Page } from '@playwright/test';
import { prisma } from '../../app/db';

test('"New" record successful notification', async ({ page }) => {
  await page.goto('/admin/categories/new');
  await page.getByRole('textbox').fill('New Success Test Record');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Loading...')).toBeVisible();
  await expect(page.getByText('Done!')).toBeVisible();
  await prisma.category.deleteMany();
});

test('"New" record failed notification', async ({ page }) => {
  await page.goto('/admin/categories/new');
  await page.getByRole('textbox').fill('New Failed Test Record');
  await page.route('**/*', async route => {
    await route.abort();
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Failed to add new record')).toBeVisible();
});

test('"Edit" record successful notification', async ({ page }) => {
  await prisma.category.deleteMany();
  await createNewRecord(page, 'New Success Test Record');
  const id = await getRecordId(page, 'New Success Test Record');
  await page.goto(`/admin/categories/${id}`);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Loading...')).toBeVisible();
  await expect(page.getByText('Done!')).toBeVisible();
  await prisma.category.deleteMany();
});

test('"Edit" record failed notification', async ({ page }) => {
  await prisma.category.deleteMany();
  await createNewRecord(page, 'New Failed Test Record');
  const id = await getRecordId(page, 'New Failed Test Record');
  await page.goto(`/admin/categories/${id}`);
  await page.route('**/*', async route => {
    await route.abort();
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Failed to update record')).toBeVisible();
  await prisma.category.deleteMany();
});

async function createNewRecord(page: Page, recordName: string) {
  await page.goto('/admin/categories/new');
  await page.getByRole('textbox').fill(recordName);
  await page.getByRole('button', { name: 'Submit' }).click();
}

async function getRecordId(page: Page, recordName: string) {
  await page.goto('/admin/categories');
  await expect(page.getByText(recordName)).toBeVisible();
  return await page.getByTestId('resource-table-cell__id').first().textContent();
}