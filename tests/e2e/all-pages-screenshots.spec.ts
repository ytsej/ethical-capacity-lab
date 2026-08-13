import { expect, test } from "@playwright/test";

const screenshotPages = [
  { route: "/", file: "01-homepage.png", status: 200 },
  { route: "/start", file: "02-start-here.png", status: 200 },
  { route: "/ecosystem", file: "03-ecosystem.png", status: 200 },
  { route: "/about", file: "04-about-governance.png", status: 200 },
  { route: "/organizations", file: "05-organizations.png", status: 200 },
  { route: "/challenges", file: "06-submit-a-challenge.png", status: 200 },
  { route: "/builders", file: "07-builders.png", status: 200 },
  { route: "/ethical-work", file: "08-ethical-work.png", status: 200 },
  { route: "/liberation", file: "09-liberation-network.png", status: 200 },
  { route: "/liberation/how-it-works", file: "10-liberation-how-it-works.png", status: 200 },
  { route: "/work", file: "11-work-case-studies.png", status: 200 },
  { route: "/partners", file: "12-partners.png", status: 200 },
  { route: "/resources", file: "13-resources.png", status: 200 },
  { route: "/contact", file: "14-contact.png", status: 200 },
  { route: "/privacy", file: "15-privacy.png", status: 200 },
  { route: "/terms", file: "16-terms.png", status: 200 },
  { route: "/accessibility", file: "17-accessibility.png", status: 200 },
  { route: "/community-standards", file: "18-community-standards.png", status: 200 },
  { route: "/report-a-concern", file: "19-report-a-concern.png", status: 200 },
  { route: "/impact-hack", file: "20-impact-hack.png", status: 200 },
  { route: "/page-that-does-not-exist", file: "21-page-not-found.png", status: 404 },
] as const;

test("capture every public page as a full-page desktop screenshot", async ({ page }) => {
  test.setTimeout(180_000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const item of screenshotPages) {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const onConsole = (message: import("@playwright/test").ConsoleMessage) => { if (message.type() === "error") consoleErrors.push(message.text()); };
    const onPageError = (error: Error) => pageErrors.push(error.message);
    page.on("console", onConsole);
    page.on("pageerror", onPageError);

    const response = await page.goto(item.route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), item.route).toBe(item.status);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("nextjs-portal").evaluateAll((elements) => elements.forEach((element) => element.remove()));
    await expect(page.locator("main#main-content h1")).toHaveCount(1);
    await page.screenshot({ path: `artifacts/all-pages-screenshots/${item.file}`, fullPage: true });
    const actionableConsoleErrors = consoleErrors.filter((message) => {
      if (message.includes("A tree hydrated but some attributes of the server rendered HTML didn't match")) return false;
      if (item.status === 404 && message.includes("Failed to load resource: the server responded with a status of 404")) return false;
      return true;
    });
    expect(actionableConsoleErrors, `console errors on ${item.route}`).toEqual([]);
    expect(pageErrors, `page errors on ${item.route}`).toEqual([]);

    page.off("console", onConsole);
    page.off("pageerror", onPageError);
  }
});
