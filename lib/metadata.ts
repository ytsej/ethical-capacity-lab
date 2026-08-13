import type { Metadata } from "next";
import { site } from "@/content/site";

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "The Ethical Capacity Lab — build the capacity behind meaningful work",
};

export function pageMetadata(title: string, description: string, path: string, options: { absoluteTitle?: boolean } = {}): Metadata {
  const displayTitle = options.absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: options.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: displayTitle,
      description,
      url: path,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [socialImage.url],
    },
  };
}
