// tests/v2-homepage.spec.ts
import { test, expect } from "@playwright/test";

test.describe("V2 Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/v2");
  });

  test("renders hero setup with headline", async ({ page }) => {
    // The h1 contains line breaks so we match on partial text within it
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("drink");
    await expect(h1).toContainText("dirty water");
    await expect(page.getByText("Calgary, AB")).toBeVisible();
  });

  test("renders hero punchline after scroll", async ({ page }) => {
    // Scroll down to trigger the punchline
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(1000);
    // The h2 contains line breaks so we match on partial text within it
    const punchline = page.locator("#hero-punchline h2");
    await expect(punchline).toContainText("dirty air");
  });

  test("renders credential bar", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
    await expect(page.getByText("4.9/5")).toBeVisible();
    await expect(page.getByText("Google Rating")).toBeVisible();
  });

  test("renders differentiator cards", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2.5));
    await page.waitForTimeout(1000);
    await expect(
      page.getByText("Uniformed, Professional Techs")
    ).toBeVisible();
    await expect(
      page.getByText("Truck-Mounted HyperVac Equipment")
    ).toBeVisible();
  });

  test("before/after slider is interactive", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 3.5));
    await page.waitForTimeout(1000);
    const slider = page.getByRole("slider");
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  test("quote CTA links to /quote", async ({ page }) => {
    const quoteLink = page.getByRole("link", { name: "Build My Quote" });
    await expect(quoteLink).toHaveAttribute("href", "/quote");
  });

  test("Get My Price links to /quote", async ({ page }) => {
    const priceLink = page.getByRole("link", { name: "Get My Price" });
    await expect(priceLink).toHaveAttribute("href", "/quote");
  });

  test("renders reviews section", async ({ page }) => {
    await expect(page.getByText("What Calgary Says")).toBeVisible();
  });

  test("renders about mini section", async ({ page }) => {
    await expect(page.getByText("Dan & Charlie")).toBeVisible();
  });

  test("renders retro footer", async ({ page }) => {
    await expect(page.getByText("(403) 555-VENT")).toBeVisible();
  });

  test("page has correct metadata", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("V2");
    const robotsMeta = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robotsMeta).toContain("noindex");
  });
});
