import { expect, test, type Page } from "@playwright/test";

const phase2Routes = ["/start", "/builders", "/liberation", "/liberation/how-it-works", "/partners", "/resources"];

test("Start Here presents five concise routes, the QR entry, and no form", async ({ page }) => {
  await page.goto("/start");
  await expect(page.locator(".path-grid .path-card")).toHaveCount(5);
  for (const destination of ["/organizations", "/builders", "/liberation", "/partners", "/resources"]) {
    await expect(page.locator(`.path-grid a[href="${destination}"]`)).toHaveCount(1);
  }
  await expect(page.locator(".qr-card img")).toBeVisible();
  await expect(page.locator(".submission-form")).toHaveCount(0);
});

test("Builders presents scoped work, honest opportunities, and a short form", async ({ page }) => {
  await page.goto("/builders");
  await expect(page.getByRole("heading", { name: "Use your skills on real, clearly scoped work." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Express interest" })).toHaveAttribute("href", "#expression-of-interest");
  await expect(page.getByRole("link", { name: "See current opportunities" })).toHaveAttribute("href", "#opportunities");
  await expect(page.locator(".phase2-topic")).toHaveCount(6);
  await expect(page.locator(".participation-options article")).toHaveCount(3);
  await expect(page.getByText("not a job application", { exact: false }).first()).toBeVisible();
  await expect(page.getByLabel("Portfolio or proof link (optional)")).not.toHaveAttribute("required", "");
  await expect(page.locator(".submission-form .form-field")).toHaveCount(11);
});

test("Liberation overview stays concrete and routes to learning and process", async ({ page }) => {
  await page.goto("/liberation");
  await expect(page.getByRole("heading", { name: "Build useful relationships with people trying to reduce suffering." })).toBeVisible();
  await expect(page.getByRole("link", { name: "See how it works" })).toHaveAttribute("href", "/liberation/how-it-works");
  await expect(page.getByRole("link", { name: "Learn through public resources" })).toHaveAttribute("href", "/resources");
  await expect(page.locator(".activity-list li")).toHaveCount(8);
  await expect(page.getByText("not a job network, therapy service", { exact: false })).toBeVisible();
});

test("Network process is shorter and never requests a referred person's contact", async ({ page }) => {
  await page.goto("/liberation/how-it-works");
  await expect(page.locator("main#main-content > section")).toHaveCount(7);
  await expect(page.locator(".simple-steps li")).toHaveCount(5);
  await expect(page.getByRole("heading", { name: "What the first conversation is like" })).toBeVisible();
  await expect(page.locator('[name="referrer"]')).toHaveCount(0);
  await expect(page.getByText("Please do not share another person’s private contact details", { exact: false })).toBeVisible();
  await expect(page.locator(".submission-form .form-field")).toHaveCount(10);
});

test("Partners groups proposals and defaults public display to no", async ({ page }) => {
  await page.goto("/partners");
  await expect(page.getByRole("heading", { name: "Offer a resource, service, introduction, or collaboration." })).toBeVisible();
  await expect(page.locator(".partnership-groups article")).toHaveCount(4);
  await expect(page.getByRole("link", { name: "Propose a partnership" }).first()).toHaveAttribute("href", "#partnership-inquiry");
  await expect(page.getByLabel("Public name or logo display permission (required)")).toHaveValue("No public display permission");
  await expect(page.locator(".submission-form .form-field")).toHaveCount(11);
});

test("Resources groups guides and gives every disclosure a descriptive name", async ({ page }) => {
  await page.goto("/resources");
  await expect(page.locator(".resource-categories > section")).toHaveCount(5);
  await expect(page.locator(".resource-card")).toHaveCount(7);
  for (const summary of await page.locator(".resource-card summary").all()) {
    await expect(summary).toHaveAttribute("aria-label", /^Open “.+”$/);
  }
  await page.locator('summary[aria-label="Open “How to prepare builder interest”"]').click();
  await expect(page.getByText("Choose your primary skills.", { exact: true })).toBeVisible();
});

async function fillBuilder(page: Page, email: string) {
  await page.getByLabel("Name or professional name (required)").fill("Builder Tester");
  await page.getByLabel("Email (required)").fill(email);
  await page.getByLabel("Primary skills (required)").fill("Research, documentation, and lightweight websites");
  await page.getByLabel("One short example of something you have worked on (required)").fill("I created a short research brief and a public information page.");
  await page.getByLabel("Type of work that interests you (required)").fill("Research and small digital projects with clear review.");
  await page.getByLabel("Realistic availability (required)").fill("Four hours per week");
  await page.getByLabel(/expressing interest is not a job application/).check();
  await page.getByLabel(/I have read the privacy notice/).check();
}

async function fillNetwork(page: Page, email: string) {
  await page.getByLabel("Name or alias (required)").fill("Network Tester");
  await page.getByLabel("Email (required)").fill(email);
  await page.getByLabel("How did you hear about the Network? (required)").fill("Through the public resource library");
  await page.getByLabel("Are you expressing your own interest or referring someone? (required)").selectOption("My own expression of interest");
  await page.getByLabel("What interests you about the Network? (required)").fill("Useful conversations, public learning, and gradual collaboration.");
  await page.getByLabel("What would you prefer as a next step? (required)").selectOption("Keep learning through public resources");
  await page.getByLabel(/does not create membership/).check();
  await page.getByLabel(/I have read the privacy notice/).check();
}

async function fillPartner(page: Page, email: string) {
  await page.getByLabel("Name (required)").fill("Partner Tester");
  await page.getByLabel("Email (required)").fill(email);
  await page.getByLabel("Partnership or resource type (required)").selectOption("Tools and practical resources");
  await page.getByLabel("What are you offering or proposing? (required)").fill("A limited software resource for one clearly scoped project.");
  await page.getByLabel("What do you hope it could help accomplish? (required)").fill("Help a small team organize and review public information.");
  await page.getByLabel(/I have read the privacy notice/).check();
}

for (const form of [
  { name: "builder", route: "/builders", submit: "Submit builder interest", fill: fillBuilder, title: "Builder interest received", boundary: "not a job application" },
  { name: "Network", route: "/liberation/how-it-works", submit: "Submit Network interest", fill: fillNetwork, title: "Network interest received", boundary: "does not create membership" },
  { name: "partnership", route: "/partners", submit: "Propose a partnership", fill: fillPartner, title: "Partnership proposal received", boundary: "does not create a partnership" },
]) {
  test(`${form.name} form reports Formspree acceptance and shows its specific success boundary`, async ({ page }) => {
    await page.goto(form.route);
    await form.fill(page, `${form.name.toLowerCase()}-${Date.now()}@example.org`);
    await page.getByRole("button", { name: form.submit }).click();
    await expect(page.getByRole("status")).toContainText(form.title);
    await expect(page.getByRole("status")).toContainText(form.boundary);
    await expect(page.getByRole("status")).not.toContainText("Reference:");
  });

  test(`${form.name} form reports Formspree rejection without claiming success`, async ({ page }) => {
    await page.goto(form.route);
    await page.route("**/api/submissions", (route) => route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Formspree could not accept the submission. Nothing was reported as received." }),
    }));
    await form.fill(page, `${form.name.toLowerCase()}-rejected-${Date.now()}@example.org`);
    await page.getByRole("button", { name: form.submit }).click();
    await expect(page.locator(".error-summary")).toContainText("Formspree could not accept the submission");
    await expect(page.locator(".error-summary")).toContainText("Nothing was reported as received");
    await expect(page.getByRole("status")).toHaveCount(0);
  });
}

for (const route of phase2Routes) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    test(`${route} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    });
  }
}
