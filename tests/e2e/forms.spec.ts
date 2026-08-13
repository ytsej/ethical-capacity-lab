import { expect, test } from "@playwright/test";

test("general form exposes associated required and email errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Email (required)").fill("invalid");
  await page.getByRole("button", { name: "Send message" }).click();
  const summary = page.locator(".error-summary");
  await expect(summary).toBeFocused();
  await expect(summary).toContainText("Name is required");
  await expect(summary).toContainText("valid email");
  await expect(page.getByLabel("Email (required)")).toHaveAttribute("aria-invalid", "true");
});

test("valid general form reports Formspree acceptance without a local reference", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name (required)").fill("Preview Tester");
  await page.getByLabel("Email (required)").fill(`preview-${Date.now()}@example.org`);
  await page.getByLabel("Topic (required)").selectOption("General question");
  await page.getByLabel("Message (required)").fill("This dummy submission verifies the Formspree acceptance state without local persistence.");
  await page.getByLabel(/I have read the privacy notice/).check();
  await page.getByRole("button", { name: "Send message" }).click();
  const status = page.getByRole("status");
  await expect(status).toContainText("Message received");
  await expect(status).toContainText("Formspree accepted");
  await expect(status).not.toContainText("Reference:");
  await expect(page).toHaveURL(/\/contact$/);
});

test("challenge form stays separate from the Operations Hub consultation pathway", async ({ page }) => {
  await page.goto("/challenges");
  await expect(page.getByLabel("How should we respond?")).toHaveCount(0);
  const consultation = page.getByRole("link", { name: /Request a 30-minute consultation/ });
  await expect(consultation).toHaveAttribute("href", "https://hub.ethicalcapacitylab.org/request-consultation");
  await page.getByRole("button", { name: "Send request for review" }).click();
  await expect(page.locator(".error-summary")).toContainText("This acknowledgment is required");
});

test("valid dummy concern is accepted through the separate Formspree test path", async ({ page }) => {
  await page.goto("/report-a-concern");
  await page.getByLabel("Relationship to the ecosystem (required)").selectOption("Visitor");
  await page.getByLabel("Concern category (required)").selectOption("Community interaction");
  await page.getByLabel("Description (required)").fill(`Dummy browser-test concern ${Date.now()} with no real people, allegation, evidence, or sensitive information.`);
  await page.getByLabel("Is there an immediate safety concern? (required)").selectOption("No");
  await page.getByLabel(/I understand that confidentiality has limits/).check();
  await page.getByLabel(/I have read the privacy notice/).check();
  await page.getByRole("button", { name: "Submit concern" }).click();
  const status = page.getByRole("status");
  await expect(status).toContainText("Concern received");
  await expect(status).toContainText("Formspree accepted");
});

test("server validation rejects malformed payload without putting data in the URL", async ({ request }) => {
  const response = await request.post("/api/submissions", { data: { type: "general_contact", data: { email: "secret@example.org" }, companyFax: "" } });
  expect(response.status()).toBe(422);
  expect(response.url()).not.toContain("secret@example.org");
  expect((await response.json()).fields.consent).toBeTruthy();
});

test("recent exact duplicate is rejected", async ({ page }) => {
  const email = `duplicate-${Date.now()}@example.org`;
  async function fillAndSubmit() {
    await page.getByLabel("Name (required)").fill("Duplicate Tester");
    await page.getByLabel("Email (required)").fill(email);
    await page.getByLabel("Topic (required)").selectOption("General question");
    await page.getByLabel("Message (required)").fill("This exact dummy submission verifies recent duplicate protection.");
    await page.getByLabel(/I have read the privacy notice/).check();
    await page.getByRole("button", { name: "Send message" }).click();
  }
  await page.goto("/contact");
  await fillAndSubmit();
  await expect(page.getByRole("status")).toContainText("Message received");
  await page.reload();
  await fillAndSubmit();
  await expect(page.locator(".error-summary")).toContainText("already accepted recently");
});
