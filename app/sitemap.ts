import type { MetadataRoute } from "next";
import { publicSeoRoutes } from "@/content/seo";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicSeoRoutes.map((route) => ({
    url: siteUrl(route.path),
    lastModified: new Date(`${route.lastModified}T00:00:00+08:00`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
