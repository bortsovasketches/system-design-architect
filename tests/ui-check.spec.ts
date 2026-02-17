import { test, expect } from '@playwright/test';

test('styles are loaded correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check for body background color (slate-50 = rgb(248, 250, 252))
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', 'rgb(248, 250, 252)');

    // Check for glassmorphism
    // Check for glassmorphism - looking for any button that is likely a glass panel (Quick Picks)
    const glassPanel = page.getByRole('button').filter({ hasText: 'Netflix' }).first();
    await expect(glassPanel).toBeVisible();

    // Check for gradient text
    // Check for gradient text in H1
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Design complex');
    await expect(heading).toHaveCSS('background-clip', 'text');

    // Check for Status Pill
    const pill = page.getByText('System Design Architect');
    await expect(pill).toBeVisible();
});

test('mermaid diagram renders without error', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Perform a search/click to show the diagram
    await page.getByRole('button', { name: 'netflix' }).click();

    // Wait for the diagram to be present
    await page.waitForSelector('.mermaid-canvas svg', { timeout: 10000 });

    // Check if the svg is rendered
    const svg = page.locator('.mermaid-canvas svg');
    await expect(svg).toBeVisible();

    // Ensure no error text is visible
    await expect(page.getByText('Syntax error')).not.toBeVisible();
    await expect(page.getByText('Error rendering diagram')).not.toBeVisible();
});
