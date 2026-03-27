import { test, expect } from "@playwright/test";

test.describe("Quote Builder", () => {
  test("loads the first step", async ({ page }) => {
    await page.goto("/quote");
    // Step 1 should be visible
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("displays house type options", async ({ page }) => {
    await page.goto("/quote");
    // Should see house type options (Apartment, Townhome, Detached)
    await expect(page.getByText(/apartment/i).first()).toBeVisible();
    await expect(page.getByText(/townhome/i).first()).toBeVisible();
    await expect(page.getByText(/detached/i).first()).toBeVisible();
  });

  test("can navigate to step 2", async ({ page }) => {
    await page.goto("/quote");
    // Click the Continue button (exact match to avoid Next.js Dev Tools button)
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    // Step 2 should show package options
    await expect(page.getByText(/basic/i).first()).toBeVisible();
    await expect(page.getByText(/pro/i).first()).toBeVisible();
  });

  test("shows pricing information", async ({ page }) => {
    await page.goto("/quote");
    // Navigate to step 2 where pricing is shown
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    // Should display dollar amounts
    await expect(page.getByText(/\$\d+/).first()).toBeVisible();
  });

  test("can navigate through all 4 steps", async ({ page }) => {
    await page.goto("/quote");

    // Step 1 → Step 2
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await expect(page.getByText(/basic/i).first()).toBeVisible();

    // Step 2 → Step 3
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    // Step 3 → Step 4
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    // Step 4 should show contact form fields
    await expect(page.locator('input[type="text"], input[type="email"], input[type="tel"]').first()).toBeVisible();
  });
});
