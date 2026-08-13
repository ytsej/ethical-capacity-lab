import { expect, test } from "@playwright/test";

test("analytics remains off before consent and preferences can be changed", async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
  await page.goto("/");

  const banner = page.getByRole("region", { name: "Analytics cookie choices" });
  await expect(banner).toBeVisible();
  await page.screenshot({ path: "review-artifacts/production-finalization-consent-desktop.png" });
  await expect(page.locator('script[data-ecl-ga4="true"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.cookie.includes("_ga"))).toBe(false);

  const defaultConsent = await page.evaluate(() => {
    const entries = (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>));
    return entries.find((entry) => entry[0] === "consent" && entry[1] === "default");
  });
  expect(defaultConsent?.[2]).toMatchObject({ analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });

  await banner.getByRole("button", { name: "Decline analytics" }).click();
  await expect(banner).toHaveCount(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ecl_consent_v1") || "{}").analytics)).toBe(false);
  await expect(page.locator('script[data-ecl-ga4="true"]')).toHaveCount(0);

  await page.getByRole("button", { name: "Cookie settings" }).click();
  const dialog = page.getByRole("dialog", { name: "Cookie preferences" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Accept analytics" }).click();
  await expect(page.locator('script[data-ecl-ga4="true"]')).toHaveCount(1);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ecl_consent_v1") || "{}").analytics)).toBe(true);

  await page.evaluate(() => { document.cookie = "_ga=test; path=/"; });
  await page.getByRole("button", { name: "Cookie settings" }).click();
  await dialog.getByRole("button", { name: "Decline analytics" }).click();
  expect(await page.evaluate(() => document.cookie.includes("_ga="))).toBe(false);
  expect(await page.evaluate(() => window.__eclAnalyticsGranted)).toBe(false);
});

test("manage preferences is keyboard operable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const manage = page.getByRole("button", { name: "Manage preferences" });
  await manage.focus();
  await manage.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Cookie preferences" });
  await expect(dialog).toBeVisible();
  await page.screenshot({ path: "review-artifacts/production-finalization-consent-mobile.png" });
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(manage).toBeFocused();
});
