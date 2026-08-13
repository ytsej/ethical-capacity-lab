import type { Metadata } from "next";
import { afterEach, describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { publicSeoRoutes } from "@/content/seo";
import { isSearchIndexingEnabled } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const originalSiteEnvironment = process.env.SITE_ENV;
const originalPublicUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteEnvironment === undefined) delete process.env.SITE_ENV;
  else process.env.SITE_ENV = originalSiteEnvironment;

  if (originalPublicUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = originalPublicUrl;
});

describe("SEO metadata", () => {
  it("builds canonical, Open Graph, and Twitter metadata for a page", () => {
    const metadata = pageMetadata("Contact", "A sufficiently descriptive page summary for search results.", "/contact");

    expect(metadata).toMatchObject({
      title: "Contact",
      description: "A sufficiently descriptive page summary for search results.",
      alternates: { canonical: "/contact" },
      openGraph: {
        type: "website",
        siteName: "The Ethical Capacity Lab",
        title: "Contact | The Ethical Capacity Lab",
        url: "/contact",
      },
      twitter: { card: "summary_large_image", title: "Contact | The Ethical Capacity Lab" },
    } satisfies Metadata);
  });

  it("uses an absolute title for the home page", () => {
    const metadata = pageMetadata("The Ethical Capacity Lab | A clear home-page title", "Home-page description.", "/", { absoluteTitle: true });
    expect(metadata.title).toEqual({ absolute: "The Ethical Capacity Lab | A clear home-page title" });
  });
});

describe("search indexing safeguards", () => {
  it("keeps indexing disabled without an explicit HTTPS production URL", () => {
    process.env.SITE_ENV = "preview";
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    expect(isSearchIndexingEnabled()).toBe(false);

    process.env.SITE_ENV = "production";
    expect(isSearchIndexingEnabled()).toBe(false);
  });

  it("enables indexing only for an explicit non-local HTTPS production URL", () => {
    process.env.SITE_ENV = "production";
    process.env.NEXT_PUBLIC_SITE_URL = "https://ethicalcapacitylab.org";
    expect(isSearchIndexingEnabled()).toBe(true);

    const productionRobots = robots();
    expect(productionRobots).toMatchObject({
      rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
      sitemap: "https://ethicalcapacitylab.org/sitemap.xml",
      host: "https://ethicalcapacitylab.org/",
    });
  });

  it("allows preview crawling so crawlers can read noindex directives", () => {
    process.env.SITE_ENV = "preview";
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    expect(robots()).toEqual({ rules: { userAgent: "*", allow: "/" } });
  });
});

describe("sitemap", () => {
  it("contains every public route once on the configured canonical origin", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://ethicalcapacitylab.org";
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(publicSeoRoutes.length);
    expect(new Set(urls).size).toBe(publicSeoRoutes.length);
    expect(urls).toContain("https://ethicalcapacitylab.org/");
    expect(urls).toContain("https://ethicalcapacitylab.org/report-a-concern");
    expect(urls).toContain("https://ethicalcapacitylab.org/cookies");
    expect(entries.every((entry) => entry.lastModified instanceof Date)).toBe(true);
  });
});
