import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Ethical Capacity Lab",
    short_name: "ECL",
    description: "Ethical standards, practical delivery, and trusted relationships.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#F6F1E7",
    theme_color: "#F6F1E7",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
