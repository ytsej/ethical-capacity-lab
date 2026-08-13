import { expect, test } from "@playwright/test";

const desktopPages = [
  ["/", "01-homepage"], ["/start", "02-start"], ["/ecosystem", "03-ecosystem"], ["/about", "04-about"],
  ["/organizations", "05-organizations"], ["/challenges", "06-challenges"], ["/builders", "07-builders"],
  ["/ethical-work", "08-ethical-work"], ["/liberation", "09-liberation"], ["/liberation/how-it-works", "10-liberation-how-it-works"],
  ["/work", "11-work"], ["/partners", "12-partners"], ["/resources", "13-resources"], ["/contact", "14-contact"],
  ["/privacy", "15-privacy"], ["/terms", "16-terms"], ["/accessibility", "17-accessibility"],
  ["/community-standards", "18-community-standards"], ["/report-a-concern", "19-report-a-concern"], ["/impact-hack", "20-impact-hack"],
  ["/page-that-does-not-exist", "21-page-not-found"],
] as const;

const mobilePages = [
  ["/", "01-homepage"], ["/organizations", "05-organizations"], ["/builders", "07-builders"],
  ["/liberation", "09-liberation"], ["/ethical-work", "08-ethical-work"], ["/partners", "12-partners"],
  ["/report-a-concern", "19-report-a-concern"],
] as const;

const uniqueColors = async (locator: import("@playwright/test").Locator, pseudo?: string) => locator.evaluateAll(
  (elements, pseudoElement) => [...new Set(elements.map((element) => getComputedStyle(element, pseudoElement || null).backgroundColor))],
  pseudo,
);

test("components inherit context and semantic colors", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/");
  expect(await page.locator("#services").evaluate((element) => getComputedStyle(element).getPropertyValue("--context-primary").trim())).toBe("#33506b");
  expect(await uniqueColors(page.locator("#services .service-outputs li"))).toEqual(["rgb(231, 237, 241)"]);
  expect(await uniqueColors(page.locator(".homepage-process .client-process li > span"))).toEqual(["rgb(51, 80, 107)"]);
  expect(await uniqueColors(page.locator(".homepage-trust .trust-grid article"), "::before")).toEqual(["rgb(225, 198, 142)"]);
  await expect(page.locator(".homepage-evidence .pill-pilot")).toHaveCount(1);
  await expect(page.locator(".homepage-evidence .pill-review")).toHaveCount(1);

  await page.goto("/builders");
  await expect(page.locator("#opportunities .form-unavailable")).toHaveCSS("border-left-color", "rgb(51, 80, 107)");
  await expect(page.locator("#opportunities .form-unavailable")).not.toHaveCSS("background-color", "rgb(245, 233, 211)");

  await page.goto("/ethical-work");
  expect(await uniqueColors(page.locator(".journey-flow li"))).toEqual(["rgb(245, 233, 211)"]);

  await page.goto("/liberation/how-it-works");
  await expect(page.locator(".notice-trust")).toHaveCSS("border-left-color", "rgb(75, 93, 62)");

  await page.goto("/community-standards");
  await expect(page.locator(".page-hero")).toHaveClass(/context-ecl/);
  await expect(page.locator(".page-hero")).toHaveCSS("background-color", "rgb(246, 241, 231)");

  await page.goto("/report-a-concern");
  await expect(page.locator(".notice-danger")).toHaveCSS("border-left-color", "rgb(140, 47, 38)");

  await page.goto("/contact");
  await expect(page.locator(".submission-form")).toHaveCSS("border-top-color", "rgb(169, 118, 47)");
  await expect(page.locator(".route-card.tone-dogoodie")).toHaveCount(2);
  await expect(page.locator(".route-card.tone-liberation")).toHaveCount(1);
  await expect(page.locator(".route-card.tone-ecl")).toHaveCount(1);
  await expect(page.locator(".route-card.tone-danger")).toHaveCount(1);

  await page.goto("/impact-hack");
  await expect(page.locator(".program-status .status-pill")).toHaveCount(1);
});

test("capture the complete post-pass desktop and mobile review set", async ({ page }) => {
  test.setTimeout(240_000);
  await page.emulateMedia({ reducedMotion: "reduce" });

  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const [route, file] of desktopPages) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(route.includes("does-not-exist") ? 404 : 200);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("nextjs-portal").evaluateAll((elements) => elements.forEach((element) => element.remove()));
    await expect(page.locator("main#main-content h1")).toHaveCount(1);
    await page.screenshot({ path: `review-artifacts/color-consistency-after/desktop/${file}.png`, fullPage: true });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, file] of mobilePages) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await page.locator("nextjs-portal").evaluateAll((elements) => elements.forEach((element) => element.remove()));
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), route).toBeLessThanOrEqual(1);
    await page.screenshot({ path: `review-artifacts/color-consistency-after/mobile/${file}-mobile.png`, fullPage: true });
  }
});
