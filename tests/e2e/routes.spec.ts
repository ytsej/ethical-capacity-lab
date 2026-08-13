import { expect, test } from "@playwright/test";

const canonicalRoutes = ["/", "/start", "/ecosystem", "/about", "/organizations", "/challenges", "/builders", "/ethical-work", "/liberation", "/liberation/how-it-works", "/work", "/partners", "/resources", "/contact", "/privacy", "/terms", "/cookies", "/accessibility", "/community-standards", "/report-a-concern", "/impact-hack"];

for (const route of canonicalRoutes) {
  test(`${route} renders with one h1`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main-content")).toBeVisible();
  });
}

test("sitemap and robots are actual routes", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("/report-a-concern");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Allow: /");
  const homepage = await request.get("/");
  expect(homepage.headers()["x-robots-tag"]).toContain("noindex");
  const socialImage = await request.get("/opengraph-image");
  expect(socialImage.ok()).toBeTruthy();
  expect(socialImage.headers()["content-type"]).toContain("image/png");
});

test("legacy routes redirect permanently", async ({ request }) => {
  const redirects = { "/community": "/builders", "/join": "/builders#expression-of-interest", "/faq": "/resources#faq", "/proof-of-work": "/work", "/manifesto": "/ethical-work", "/submit-a-challenge": "/challenges", "/ethical-capacity-lab": "/about", "/liberation-network": "/liberation" };
  for (const [from, to] of Object.entries(redirects)) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status(), from).toBe(308);
    expect(response.headers().location).toBe(to);
  }
});

test("all rendered internal links resolve", async ({ page, request }) => {
  test.setTimeout(120_000);
  const links = new Set<string>();
  for (const route of canonicalRoutes) {
    await page.goto(route);
    for (const href of await page.locator('a[href^="/"]').evaluateAll((anchors) => anchors.map((a) => (a as HTMLAnchorElement).getAttribute("href")!).filter(Boolean))) links.add(href.split("#")[0] || "/");
  }
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});

test("canonical routes use unique document titles", async ({ page }) => {
  test.setTimeout(60_000);
  const titles = new Set<string>();
  for (const route of canonicalRoutes) {
    await page.goto(route);
    const title = await page.title();
    expect(title, route).toMatch(/(?:ECL|Ethical Capacity Lab)/);
    expect(titles.has(title), `duplicate title: ${title}`).toBe(false);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname, route).toBe(route);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical!);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    titles.add(title);
  }
});

test("public pages do not expose internal production or reviewer notes", async ({ page }) => {
  test.setTimeout(60_000);
  const internalPhrases = [
    "this page describes the current public website",
    "implemented in this preview",
    "approved deliverables",
    "public implementation brief",
    "implementation evidence",
    "live submission credentials",
    "configured in this environment",
    "production property setting",
    "production setting has been confirmed",
    "internal build",
    "honest empty state",
    "no winner, impact metric, completion count, or testimonial is invented",
  ];

  for (const route of canonicalRoutes) {
    await page.goto(route);
    const copy = (await page.locator("body").innerText()).toLowerCase();
    for (const phrase of internalPhrases) expect(copy, `${route}: ${phrase}`).not.toContain(phrase);
  }

  await page.goto("/cookies");
  await expect(page.getByText("Last updated", { exact: true })).toBeVisible();
  await expect(page.locator("aside[aria-label='Policy information'] time")).toHaveAttribute("datetime", "2026-08-13");
});

test("home and breadcrumb structured data are present and valid JSON", async ({ page }) => {
  await page.goto("/");
  const homeSchemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const homeGraph = homeSchemas.map((schema) => JSON.parse(schema)).find((schema) => Array.isArray(schema["@graph"]));
  expect(homeGraph["@graph"].map((entry: { "@type": string }) => entry["@type"])).toEqual(expect.arrayContaining(["Organization", "WebSite"]));

  await page.goto("/challenges");
  const breadcrumbSchemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const breadcrumb = breadcrumbSchemas.map((schema) => JSON.parse(schema)).find((schema) => schema["@type"] === "BreadcrumbList");
  expect(breadcrumb.itemListElement).toHaveLength(3);
  expect(breadcrumb.itemListElement[1].item).toContain("/organizations");
});
