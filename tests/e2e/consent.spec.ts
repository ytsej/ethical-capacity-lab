import { expect, test } from "@playwright/test";

test("analytics remains off before consent and preferences can be changed", async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const banner = page.getByRole("region", { name: "Analytics cookie choices" });
  const dialog = page.getByRole("dialog", { name: "Cookie preferences" });
  await expect(banner).toBeVisible();
  await expect(dialog).not.toBeVisible();
  await page.screenshot({ path: "review-artifacts/cookie-consent-banner-desktop.png" });
  await expect(page.locator('script[data-ecl-ga4="true"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.cookie.includes("_ga"))).toBe(false);

  const defaultConsent = await page.evaluate(() => {
    const entries = (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>));
    return entries.find((entry) => entry[0] === "consent" && entry[1] === "default");
  });
  expect(defaultConsent?.[2]).toMatchObject({ analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });

  await banner.getByRole("button", { name: "Manage preferences" }).click();
  await expect(dialog).toBeVisible();
  await expect(banner).toHaveCount(0);
  expect(await dialog.evaluate((element) => element.getBoundingClientRect().width)).toBeLessThanOrEqual(500);
  await page.screenshot({ path: "review-artifacts/cookie-preferences-modal-desktop.png" });

  await dialog.getByRole("button", { name: "Close cookie preferences" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(banner).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("ecl_consent_v1"))).toBeNull();

  await banner.getByRole("button", { name: "Decline analytics" }).click();
  await expect(banner).toHaveCount(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ecl_consent_v1") || "{}").analytics)).toBe(false);
  await expect(page.locator('script[data-ecl-ga4="true"]')).toHaveCount(0);

  const footerSettings = page.getByRole("button", { name: "Cookie settings" });
  await footerSettings.click();
  await expect(dialog).toBeVisible();
  await expect(banner).toHaveCount(0);
  await dialog.getByRole("button", { name: "Accept analytics" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(banner).toHaveCount(0);
  await expect(footerSettings).toBeFocused();
  await expect(page.locator('script[data-ecl-ga4="true"]')).toHaveCount(1);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ecl_consent_v1") || "{}").analytics)).toBe(true);

  await page.evaluate(() => { document.cookie = "_ga=test; path=/"; });
  await footerSettings.click();
  await dialog.getByRole("button", { name: "Decline analytics" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(banner).toHaveCount(0);
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
  await expect(page.getByRole("region", { name: "Analytics cookie choices" })).toHaveCount(0);
  const dialogBox = await dialog.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  expect(dialogBox.width).toBeLessThanOrEqual(366);
  expect(dialogBox.height).toBeLessThanOrEqual(820);
  await page.screenshot({ path: "review-artifacts/cookie-preferences-modal-mobile-390.png" });
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("region", { name: "Analytics cookie choices" })).toBeVisible();
  await expect(manage).toBeFocused();
  expect(await page.evaluate(() => localStorage.getItem("ecl_consent_v1"))).toBeNull();
});

for (const width of [430, 768]) {
  test(`preferences modal fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "Manage preferences" }).click();
    const dialog = page.getByRole("dialog", { name: "Cookie preferences" });
    await expect(dialog).toBeVisible();
    const box = await dialog.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, height: rect.height };
    });
    expect(box.left).toBeGreaterThanOrEqual(12);
    expect(box.right).toBeLessThanOrEqual(width - 12);
    expect(box.height).toBeLessThanOrEqual(876);
  });
}
