import test, { expect } from '@playwright/test';

test('Resource name is incorrect', async ({ page }) => {
  await page.goto('/admin/unknown');

  await expect(page.locator('body')).toContainText('404');
});

test('Resource is not found', async ({ page }) => {
  await page.goto('/admin/categories/999999');

  await expect(page.locator('body')).toContainText('404');
});
