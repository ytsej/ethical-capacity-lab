import { expect, test } from "@playwright/test";

const colors = {
  default: "rgb(255, 253, 248)",
  warm: "rgb(246, 241, 231)",
  dogoodie: "rgb(231, 237, 241)",
  liberation: "rgb(233, 236, 225)",
  dark: "rgb(42, 40, 35)",
} as const;

const expectedRhythms: Record<string, Array<keyof typeof colors>> = {
  "/": ["warm", "dogoodie", "default", "warm", "default", "dogoodie", "dark", "warm", "default"],
  "/start": ["warm", "default", "warm"],
  "/organizations": ["warm", "dogoodie", "default", "warm", "default", "dogoodie", "default", "warm"],
  "/builders": ["warm", "dogoodie", "default", "warm", "dogoodie", "default", "default", "warm"],
  "/liberation": ["liberation", "default", "warm", "default", "liberation", "default", "default", "liberation"],
  "/liberation/how-it-works": ["liberation", "default", "liberation", "warm", "default", "liberation", "default"],
  "/partners": ["warm", "default", "warm", "dark", "default"],
  "/resources": ["warm", "default", "warm"],
};

for (const [route, rhythm] of Object.entries(expectedRhythms)) {
  test(`${route} follows its semantic background rhythm`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const sections = route === "/" ? page.locator(".homepage > section") : page.locator("main#main-content > section");
    const backgrounds = await sections.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).backgroundColor));
    expect(backgrounds).toEqual(rhythm.map((tone) => colors[tone]));
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
}

for (const route of ["/", "/organizations", "/builders", "/liberation", "/partners"]) {
  test(`${route} keeps a calm mobile surface rhythm`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    const tintedSections = await page.locator(".section-surface.surface-dogoodie, .section-surface.surface-liberation").count();
    expect(tintedSections).toBeLessThanOrEqual(3);
  });
}
