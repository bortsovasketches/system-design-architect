import { test, expect } from '@playwright/test';

test('Rosetta Stone tooltips work correctly', async ({ page }) => {
    // Navigate to a page with known terms (e.g., X.com has "Database", "API")
    await page.goto('http://localhost:3000');

    // Search for 'x.com'
    await page.getByRole('button', { name: 'x.com' }).click();

    // Convert text to regex to match the highlighted term.
    // The NarrativeRenderer wraps terms in a span with border-b-2.
    // 'Database' is in the X.com narrative.

    const term = page.getByText('Database', { exact: true }).first();
    await expect(term).toBeVisible();

    // Hover over the term
    await term.hover();

    // Check if tooltip appears
    const tooltip = page.getByText('Vibe Translation');
    await expect(tooltip).toBeVisible();

    // Check for specific analogy text (The Pantry / Fridge)
    await expect(page.getByText('The Pantry / Fridge')).toBeVisible();
});
