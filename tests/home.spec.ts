import { test, expect } from '@playwright/test';

test.describe('System Design Architect', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('homepage loads successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/System Design Architect/);
        await expect(page.getByRole('heading', { name: 'System Architect' })).toBeVisible();
    });

    test('search functionality works', async ({ page }) => {
        const input = page.getByPlaceholder('e.g. x.com, uber, netflix...');
        await input.fill('netflix');
        await input.press('Enter');

        // Wait for loading to finish (1.5s delay + animation)
        // Increasing timeout to 15s to be safe
        await expect(page.getByText('System Narrative')).toBeVisible({ timeout: 15000 });

        // Check for content
        await expect(page.getByText('Netflix is like a super-advanced video store')).toBeVisible();
    });

    test('complexity slider changes content', async ({ page }) => {
        // Perform search first
        const input = page.getByPlaceholder('e.g. x.com, uber, netflix...');
        await input.fill('x.com');
        await input.press('Enter');

        await expect(page.getByText('System Narrative')).toBeVisible({ timeout: 15000 });

        // Default is ELI5
        await expect(page.getByText('Think of X (Twitter) like a giant digital bulletin board')).toBeVisible();

        // Switch to Senior SWE
        await page.getByRole('button', { name: 'Senior SWE' }).click();

        // Use loose matching for markdown content
        await expect(page.getByText('X.com is a classic')).toBeVisible();
        await expect(page.getByText('Read-Heavy')).toBeVisible();
    });

    test('library grid works', async ({ page }) => {
        // Use exact match to avoid matching multiple buttons
        await page.getByRole('button', { name: 'uber', exact: true }).click();

        await expect(page.getByText('System Narrative')).toBeVisible({ timeout: 15000 });
        await expect(page.getByText('Uber works like a matchmaker')).toBeVisible();
    });
});
