import { expect, test } from "@playwright/test";

test("desktop dropdown opens and Escape returns focus", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Our Ecosystem" });
  await trigger.focus();
  await trigger.press("Enter");
  await expect(page.getByRole("link", { name: "How the Parts Connect", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("mobile navigation traps focus, closes with Escape, and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole("button", { name: /Close/ });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Report a Concern" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("footer exposes trust and resource routes", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "Report a Concern" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Frequently Asked Questions" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Cookie and Analytics Notice" })).toBeVisible();
  await expect(footer.getByRole("button", { name: "Cookie settings" })).toBeVisible();
});
