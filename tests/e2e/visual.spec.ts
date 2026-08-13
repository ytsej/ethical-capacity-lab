import { expect, test } from "@playwright/test";

const artifact = (name: string) => `test-results/phase1-review/${name}.png`;
const hierarchyArtifact = (name: string) => `test-results/homepage-brand-hierarchy/${name}.png`;
const phase2Artifact = (name: string) => `test-results/phase2-review/${name}.png`;
const hideDevelopmentIndicator = async (page: import("@playwright/test").Page) => page.evaluate(() => document.querySelectorAll("nextjs-portal").forEach((element) => element.remove()));
const hideStickyChromeForElementCapture = async (page: import("@playwright/test").Page) => page.addStyleTag({ content: ".site-header,.skip-link{display:none!important}" });

test("capture Phase 1 homepage review frames", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await hideDevelopmentIndicator(page);
  await expect(page.getByRole("heading", { name: "Turning good intentions into useful, responsible action." })).toBeVisible();
  await page.screenshot({ path: hierarchyArtifact("homepage-desktop-1440"), fullPage: true });
  await page.locator("#services").screenshot({ path: artifact("03-homepage-services") });
  const callSection = page.locator(".homepage > section").filter({ has: page.getByRole("heading", { name: "Have a specific challenge?", exact: true }) });
  await callSection.screenshot({ path: artifact("04-homepage-organization-cta") });

  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: hierarchyArtifact("homepage-tablet-768"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: hierarchyArtifact("homepage-mobile-390"), fullPage: true });
});

test("capture Phase 1 organizations review frames", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/organizations");
  await hideDevelopmentIndicator(page);
  await expect(page.getByRole("heading", { name: "Bring us a real problem. We will help clarify the next useful step." })).toBeVisible();
  await page.screenshot({ path: artifact("05-organizations-desktop"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/organizations");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: artifact("06-organizations-mobile"), fullPage: true });
});

test("capture the simplified challenge form and response states", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/challenges#submit");
  await hideDevelopmentIndicator(page);
  const form = page.locator(".submission-form");
  await expect(form).toBeVisible();
  await form.screenshot({ path: artifact("07-simplified-challenge-form") });

  async function fill(email: string) {
    await page.getByLabel("Full name (required)").fill("Review Screenshot");
    await page.getByLabel("Email (required)").fill(email);
    await page.getByLabel("Organization name (required)").fill("Review Organization");
    await page.getByLabel("What are you trying to solve? (required)").fill("We need a clearer way to collect and review public requests.");
    await page.getByLabel("Who is this for or who is affected? (required)").fill("Our team and visitors.");
    await page.getByLabel("What would a useful outcome look like? (required)").fill("A short, understandable intake process.");
    await page.getByLabel(/I confirm this request contains no passwords/).check();
    await page.getByLabel(/I give permission to contact me/).check();
    await page.getByLabel(/I have read the privacy notice/).check();
  }

  await page.route("**/api/submissions", (route) => route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ title: "Organization request received", message: "Formspree accepted the request for human review.", provider: "formspree" }) }));
  await fill("success@example.org");
  await page.getByRole("button", { name: "Send request for review" }).click();
  await page.getByRole("status").screenshot({ path: artifact("08-successful-submission") });

  await page.unroute("**/api/submissions");
  await page.reload();
  await hideDevelopmentIndicator(page);
  await page.route("**/api/submissions", (route) => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "Formspree could not accept the submission. Nothing was reported as received." }) }));
  await fill("partial@example.org");
  await page.getByRole("button", { name: "Send request for review" }).click();
  await page.locator(".error-summary").screenshot({ path: artifact("09-formspree-provider-failure") });
});

test("capture Phase 2 audience journeys and forms", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  await page.goto("/start");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("01-start-desktop"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/start");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("02-start-mobile"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/builders");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("03-builders-desktop"), fullPage: true });
  await hideStickyChromeForElementCapture(page);
  await page.locator(".submission-form").screenshot({ path: phase2Artifact("05-builder-form") });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/builders");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("04-builders-mobile"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/liberation");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("06-liberation-desktop"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/liberation");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("07-liberation-mobile"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/liberation/how-it-works");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("08-liberation-how-it-works"), fullPage: true });
  await hideStickyChromeForElementCapture(page);
  await page.locator(".submission-form").screenshot({ path: phase2Artifact("09-liberation-form") });

  await page.goto("/partners");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("10-partners-desktop"), fullPage: true });
  await hideStickyChromeForElementCapture(page);
  await page.locator(".submission-form").screenshot({ path: phase2Artifact("11-partner-form") });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/partners");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("11a-partners-mobile"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/resources");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("12-resources-desktop"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/resources");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("13-resources-mobile"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/ecosystem");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("14-ecosystem-desktop"), fullPage: true });

  await page.goto("/about");
  await hideDevelopmentIndicator(page);
  await page.screenshot({ path: phase2Artifact("15-about-desktop"), fullPage: true });
});
