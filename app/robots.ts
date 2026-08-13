import type { MetadataRoute } from "next";
import { isSearchIndexingEnabled, siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!isSearchIndexingEnabled()) return { rules: { userAgent: "*", allow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: siteUrl("/sitemap.xml"), host: siteUrl() };
}
