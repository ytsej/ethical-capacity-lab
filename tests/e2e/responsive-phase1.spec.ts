import { expect, test } from "@playwright/test";

for (const route of ["/organizations", "/challenges", "/contact"]) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    test(`${route} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(route);
      await expect(page.locator("main h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    });
  }
}
