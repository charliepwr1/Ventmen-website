import { test, expect } from "@playwright/test";

test.describe("Quote Builder", () => {
  test("loads Step 1 with house type options", async ({ page }) => {
    await page.goto("/quote");
    await expect(page.getByText("What type of home")).toBeVisible();
    await expect(page.getByText(/Detached/i)).toBeVisible();
    await expect(page.getByText(/Townhome/i)).toBeVisible();
    await expect(page.getByText(/Apartment/i)).toBeVisible();
  });

  test("auto-advances to Step 2 on house type selection", async ({ page }) => {
    await page.goto("/quote");
    await page.getByText(/Detached House/i).click();
    // Should auto-advance to Step 2
    await expect(page.getByText("Tell us about your home")).toBeVisible();
  });

  test("can navigate through all 5 steps", async ({ page }) => {
    await page.goto("/quote");

    // Step 1: Select house type (auto-advance)
    await page.getByText(/Detached House/i).click();

    // Step 2: Home details
    await expect(page.getByText("Tell us about your home")).toBeVisible();
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    // Step 3: Home features
    await expect(page.getByText("What else does your home have")).toBeVisible();
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    // Step 4: Package selection
    await expect(page.getByText("Here's what we recommend")).toBeVisible();
    await expect(page.getByText(/Deep Clean/i).first()).toBeVisible();
    await expect(page.getByText(/\$\d+/).first()).toBeVisible();
    await page
      .getByRole("button", { name: "Continue to Booking", exact: true })
      .click();

    // Step 5: Contact form
    await expect(page.getByText("Almost there")).toBeVisible();
    await expect(
      page.locator('input[type="text"], input[type="email"], input[type="tel"]').first()
    ).toBeVisible();
  });

  test("shows pricing on Step 4", async ({ page }) => {
    await page.goto("/quote");
    await page.getByText(/Detached House/i).click();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    // Step 4 should show package prices
    await expect(page.getByText(/\$\d+\.\d{2}/).first()).toBeVisible();
    // Trust signals should appear
    await expect(page.getByText(/Video documentation/i)).toBeVisible();
  });
});
