import { test, expect } from '@playwright/test';

test('EffortDashboard renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Search for 'netflix'
    await page.getByRole('button', { name: 'netflix' }).click();

    // Check header
    await expect(page.getByRole('heading', { name: /Effort Multiplier/i })).toBeVisible({ timeout: 10000 });

    // Check sections
    await expect(page.getByText(/Est. Build Time/i)).toBeVisible();
    await expect(page.getByText('Complexity', { exact: true })).toBeVisible();

    // Check checklist
    await expect(page.getByText('Production Readiness')).toBeVisible();
    await expect(page.getByText('Auth & User Sessions')).toBeVisible();
});
