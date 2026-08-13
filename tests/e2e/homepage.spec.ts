import { expect, test } from "@playwright/test";

const expectedSectionHeadings = [
  "Turning good intentions into useful, responsible action.",
  "What can we help you with?",
  "Have a specific challenge?",
  "Three connected parts, different roles",
  "What brings you here?",
  "How working with us can begin",
  "Three promises behind the work",
  "See the work behind the idea",
  "Need help with a real project or challenge?",
];

test("homepage keeps the client-first structure within the corrected ecosystem hierarchy", async ({ page }) => {
  await page.goto("/");
  const sections = page.locator("main#main-content > .homepage > section");
  await expect(sections).toHaveCount(expectedSectionHeadings.length);
  for (const [index, heading] of expectedSectionHeadings.entries()) {
    await expect(sections.nth(index).getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }
});

test("homepage presents exactly four practical service groups immediately after the hero", async ({ page }) => {
  await page.goto("/");
  const serviceSection = page.locator("#services");
  await expect(serviceSection.locator(".service-group-card")).toHaveCount(4);
  for (const title of ["Research and clarify what you need", "Build a website or useful digital tool", "Automate and improve repetitive work", "Test an idea with a small project"]) {
    await expect(serviceSection.getByRole("heading", { name: title, exact: true })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: "See what we can do" })).toHaveAttribute("href", "#services");
});

test("hero and ecosystem explanation identify the three distinct roles", async ({ page }) => {
  await page.goto("/");
  const heroVisual = page.getByRole("complementary", { name: "Ethical Capacity Lab ecosystem roles" });
  await expect(heroVisual.getByRole("heading", { name: "The Ethical Capacity Lab", exact: true })).toBeVisible();
  await expect(heroVisual.getByText("Shared standards and safeguards", { exact: true })).toBeVisible();
  await expect(heroVisual.getByRole("heading", { name: "DoGoodie", exact: true })).toBeVisible();
  await expect(heroVisual.getByText("Practical work and organizational support", { exact: true })).toBeVisible();
  await expect(heroVisual.getByRole("heading", { name: "Liberation Network", exact: true })).toBeVisible();
  await expect(heroVisual.getByText("Trusted relationships and gradual collaboration", { exact: true })).toBeVisible();

  const ecosystemSection = page.locator("main .homepage > section").filter({ has: page.getByRole("heading", { name: "Three connected parts, different roles", exact: true }) });
  await expect(ecosystemSection.locator(".ecosystem-summary")).toHaveCount(3);
  await expect(ecosystemSection.getByText("mutual support", { exact: false })).toBeVisible();
});

test("organization consultations route to the Operations Hub with a challenge-form alternative", async ({ page }) => {
  await page.goto("/");
  const callLinks = page.getByRole("link", { name: /Request a 30-minute consultation/ });
  await expect(callLinks).toHaveCount(2);
  await expect(callLinks.first()).toHaveAttribute("href", "https://hub.ethicalcapacitylab.org/request-consultation");
  await expect(page.getByRole("link", { name: "Describe your challenge instead" })).toHaveAttribute("href", "/challenges");
});

test("audience, ecosystem, and trust routes remain clear", async ({ page }) => {
  await page.goto("/");
  const paths = page.locator(".path-grid .path-card");
  await expect(paths).toHaveCount(5);
  for (const destination of ["/organizations", "/builders", "/liberation", "/partners", "/resources"]) {
    await expect(page.locator(`.path-grid a[href="${destination}"]`)).toHaveCount(1);
  }
  await expect(page.getByRole("link", { name: /See how the ecosystem works/ })).toHaveAttribute("href", "/ecosystem");
  const trustLinks = page.getByRole("navigation", { name: "Trust and safeguard pages" });
  for (const destination of ["/ethical-work", "/privacy", "/report-a-concern"]) {
    await expect(trustLinks.locator(`a[href="${destination}"]`)).toHaveCount(1);
  }
});

test("client process and evidence stay bounded", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".client-process > li")).toHaveCount(3);
  await expect(page.getByText("Contacting us does not guarantee acceptance", { exact: false })).toBeVisible();
  await expect(page.locator(".evidence-card .status-pill")).toHaveText(["Pilot", "In review"]);
  await expect(page.getByText("Verified client work will be added after review and publication consent.", { exact: true })).toBeVisible();
});

for (const viewport of [
  { width: 320, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
]) {
  test(`homepage has no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
