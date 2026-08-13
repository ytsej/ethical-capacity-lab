import { expect, test } from "@playwright/test";

test("organizations uses one shared four-group service taxonomy", async ({ page }) => {
  await page.goto("/organizations");
  await expect(page.locator(".service-group-grid")).toHaveCount(1);
  await expect(page.locator(".service-group-card")).toHaveCount(4);
  await expect(page.locator(".capability-card")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Practical support families" })).toHaveCount(0);
});

test("organization actions and ethical-work route match visitor intent", async ({ page }) => {
  await page.goto("/organizations");
  const callLinks = page.getByRole("link", { name: /Request a 30-minute consultation/ });
  await expect(callLinks).toHaveCount(3);
  await expect(callLinks.first()).toHaveAttribute("href", "https://hub.ethicalcapacitylab.org/request-consultation");
  await expect(page.getByRole("link", { name: "Describe your challenge", exact: true }).first()).toHaveAttribute("href", "/challenges");
  await expect(page.getByRole("link", { name: /Read our ethical-work approach/ })).toHaveAttribute("href", "/ethical-work");
});

for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
  test(`organizations has no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/organizations");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });
}
