import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const route of ["/", "/start", "/organizations", "/challenges", "/contact", "/builders", "/liberation", "/liberation/how-it-works", "/partners", "/resources", "/privacy", "/terms", "/cookies", "/report-a-concern"]) {
  test(`axe reports no serious or critical issues on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const severe = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
  });
}

for (const form of [
  { route: "/challenges", button: "Send request for review" },
  { route: "/contact", button: "Send message" },
  { route: "/builders", button: "Submit builder interest" },
  { route: "/liberation/how-it-works", button: "Submit Network interest" },
  { route: "/partners", button: "Propose a partnership" },
]) {
  test(`axe reports no serious or critical issues on ${form.route} error state`, async ({ page }) => {
    await page.goto(form.route);
    await page.getByRole("button", { name: form.button }).click();
    await expect(page.locator(".error-summary")).toBeFocused();
    const results = await new AxeBuilder({ page }).analyze();
    const severe = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
  });
}

for (const form of [
  { route: "/builders", button: "Submit builder interest" },
  { route: "/liberation/how-it-works", button: "Submit Network interest" },
  { route: "/partners", button: "Propose a partnership" },
]) {
  test(`axe reports no serious or critical issues on ${form.route} success state`, async ({ page }) => {
    await page.goto(form.route);
    const submissionForm = page.locator(".submission-form");
    for (const input of await submissionForm.locator('input[required]:not([type="checkbox"])').all()) {
      await input.fill(await input.getAttribute("type") === "email" ? `axe-${Date.now()}@example.org` : "Accessible test response");
    }
    for (const textarea of await submissionForm.locator("textarea[required]").all()) await textarea.fill("A sufficiently detailed accessible test response for human review.");
    for (const select of await submissionForm.locator("select[required]").all()) if (!(await select.inputValue())) await select.selectOption({ index: 1 });
    for (const checkbox of await submissionForm.locator('input[type="checkbox"]').all()) await checkbox.check();
    await page.route("**/api/submissions", (route) => route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ title: "Request received", message: "Formspree accepted the request for human review.", provider: "formspree" }) }));
    await page.getByRole("button", { name: form.button }).click();
    await expect(page.getByRole("status")).toContainText("Formspree accepted");
    const results = await new AxeBuilder({ page }).analyze();
    const severe = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
  });
}

test("reduced motion preference keeps content available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ecosystem");
  await expect(page.getByRole("heading", { name: "One website, three distinct parts" })).toBeVisible();
});

for (const route of ["/", "/organizations", "/challenges", "/contact"]) {
  test(`${route} reflows at a 200%-zoom-equivalent viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 720, height: 900 });
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });
}
