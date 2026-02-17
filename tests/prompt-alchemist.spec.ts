import { test, expect } from '@playwright/test';

test('PromptAlchemist works correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 1. Search for 'netflix' to reveal the results
    await page.getByRole('button', { name: 'netflix' }).click();

    // 2. Wait for the PromptAlchemist button
    const alchemistBtn = page.getByText('Vibe-Coding Prompt');
    await expect(alchemistBtn).toBeVisible();

    // 3. Click to expand
    await alchemistBtn.click();

    // 4. Check for generated S.C.A.F.F. content
    await expect(page.getByText('Layer 1: Constraints')).toBeVisible();
    await expect(page.getByText('Layer 2: Requirements')).toBeVisible();

    // 5. Test Copy button (mock checking text or button state change)
    const copyBtn = page.getByRole('button', { name: 'Copy Full S.C.A.F.F. Prompt' });
    await expect(copyBtn).toBeVisible();

    await copyBtn.click();
    await expect(page.getByText('Copied to Clipboard')).toBeVisible();
});
