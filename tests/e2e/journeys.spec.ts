import { expect, test } from "@playwright/test";

const journeyExpect = expect.configure({ timeout: 15_000 });

test("Journey A: organization to safeguards, work, and challenge", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/start");
  await page.getByRole("link", { name: /Get organization support/ }).click();
  await journeyExpect(page).toHaveURL(/\/organizations$/);
  await page.getByRole("link", { name: /Read our ethical-work approach/ }).click();
  await journeyExpect(page).toHaveURL(/\/ethical-work$/);
  await page.getByRole("link", { name: "Review current work" }).click();
  await page.getByRole("link", { name: "Submit a challenge" }).first().click();
  await journeyExpect(page).toHaveURL(/\/challenges$/);
});

test("Journey B: work to builder safeguards, opportunities, and interest", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/work");
  await page.getByRole("link", { name: "Builder pathway" }).click();
  await page.getByRole("link", { name: /Read the full ethical-work approach/ }).click();
  await page.getByRole("link", { name: "See builder opportunities" }).click();
  await journeyExpect(page).toHaveURL(/\/builders#opportunities$/);
  await page.getByRole("link", { name: "Express interest" }).click();
  await journeyExpect(page).toHaveURL(/#expression-of-interest$/);
});

test("Journey C: public resource to Network conversation and possible small step", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/resources");
  await page.locator('summary[aria-label="Open “How to prepare for a first Network conversation”"]').click();
  await page.getByRole("link", { name: /See how the Network works/ }).click();
  await journeyExpect(page.getByRole("heading", { name: "What the first conversation is like" })).toBeVisible();
  await page.locator("#interest").scrollIntoViewIfNeeded();
  await journeyExpect(page.getByText("No further action is also a valid outcome")).toBeVisible();
});

test("Journey D: work to partnership standards and inquiry", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/work");
  await page.getByRole("link", { name: "Partnership pathway" }).click();
  await journeyExpect(page).toHaveURL(/\/partners$/);
  await journeyExpect(page.getByRole("heading", { name: "Clear purpose before commitment" })).toBeVisible();
  await page.getByRole("link", { name: "Propose a partnership" }).first().click();
  await journeyExpect(page).toHaveURL(/#partnership-inquiry$/);
});

test("Journey E: learn without pressure and choose an optional deeper path", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await page.locator(".path-grid").getByRole("link", { name: "Browse resources" }).click();
  await journeyExpect(page).toHaveURL(/\/resources$/);
  await journeyExpect(page.getByText("You do not need to submit personal information to learn.")).toBeVisible();
  await page.getByRole("link", { name: "Not sure where to go? Start here" }).click();
  await journeyExpect(page).toHaveURL(/\/start$/);
});
