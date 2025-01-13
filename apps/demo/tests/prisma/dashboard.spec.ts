import test, { expect } from '@playwright/test';

test('Visit dashboard', async ({ page }) => {
  await page.goto('/admin');

  await expect(page.getByTestId('dashboard-page')).toBeVisible();
  await expect(page.getByTestId('user-profile')).toHaveText(
    'User Nameuser@example.com'
  );
});
