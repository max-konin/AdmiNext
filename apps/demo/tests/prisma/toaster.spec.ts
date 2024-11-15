import test, { expect, Page } from '@playwright/test';
import { prisma } from '../../app/db';

test('"New" record successful notification', async ({ page }) => {
  await createNewRecord(page, 'New Successful Test Record');
  await expect(page.getByText('Saving...')).toBeVisible();
  await expect(page.getByText('Done!')).toBeVisible();
  await prisma.category.deleteMany();
});

test('"New" record failed notification', async ({ page }) => {
  await prisma.category.deleteMany();
  await createNewRecord(page, 'New Test Record');
  await expect(page.getByText('New Test Record')).toBeVisible();
  await createNewRecord(page, 'New Test Record');
  await checkToast(page, 'Failed to add new record');
  await prisma.category.deleteMany();
});

test('"Edit" record successful notification', async ({ page }) => {
  await prisma.category.deleteMany();
  await createNewRecord(page, 'New Successful Test Record');
  await page.getByTestId('resource-table-row').getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await checkToast(page, 'Done!');
  await prisma.category.deleteMany();
});

test('"Edit" record failed notification', async ({ page }) => {
  await prisma.category.deleteMany();
  await createNewRecord(page, 'New Failed Test Record');
  await createNewRecord(page, 'New');
  await page.getByTestId('resource-table-row').first().getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await page.getByRole('textbox').clear();
  await page.getByRole('textbox').fill('New');
  await page.getByRole('button', { name: 'Submit' }).click();
  await checkToast(page, 'Failed to update record');
  await prisma.category.deleteMany();
});

async function createNewRecord(page: Page, recordName: string) {
  await page.goto('/admin/categories/new');
  await page.getByRole('textbox').fill(recordName);
  await page.getByRole('button', { name: 'Submit' }).click();
}

async function checkToast(page: Page, message: string) {
  await expect(page.getByText('Saving...')).toBeVisible();
  await expect(page.getByText(message)).toBeVisible();
}