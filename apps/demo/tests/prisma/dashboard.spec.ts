import test, { expect } from '@playwright/test';

test('Visit dashboard', async ({ page }) => {
  await page.goto('/admin');

  await expect(page.getByTestId('dashboard-page')).toBeVisible();
});
