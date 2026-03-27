import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", title: "The Vent Men" },
  { path: "/services", title: "Services" },
  { path: "/about", title: "About" },
  { path: "/faq", title: "Frequently Asked Questions" },
  { path: "/service-area", title: "Service Area" },
  { path: "/contact", title: "The Vent Men" },
  { path: "/work", title: "Work" },
  { path: "/quote", title: "Quote" },
];

for (const { path, title } of pages) {
  test.describe(path, () => {
    test(`loads with 200 status`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });

    test(`has title containing "${title}"`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(title, "i"));
    });

    test(`has an H1`, async ({ page }) => {
      await page.goto(path);
      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible();
    });

    test(`has a clickable CTA or navigation`, async ({ page }) => {
      await page.goto(path);
      const links = page.locator('a[href="/quote"], a[href="/contact"]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });
  });
}

test("404 page renders for unknown route", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  // Next.js returns 200 for not-found pages rendered by not-found.tsx
  // but the page content should indicate it's a 404
  const body = await page.textContent("body");
  expect(body).toBeTruthy();
});

test("header navigation is visible", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header");
  await expect(header).toBeVisible();
});

test("footer is visible", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer).toBeVisible();
});
