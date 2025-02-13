import test, { expect } from '@playwright/test';

test('Visit custom page', async ({ page }) => {
  await page.goto('/admin');
  await page.getByRole('link', { name: 'Custom Page First' }).click();
  await expect(page.getByTestId('custom-page-first')).toBeVisible();
  await page.getByRole('link', { name: 'Custom Page Second' }).click();
  await expect(page.getByTestId('custom-page-second')).toBeVisible();
});
