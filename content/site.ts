export type ContentStatus = "current" | "pilot" | "planned" | "archived" | "not_yet_active";

export const site = {
  name: "The Ethical Capacity Lab",
  shortName: "ECL",
  description:
    "The Ethical Capacity Lab connects ethical standards, practical delivery, and trusted relationships so organizations and people can reduce suffering more responsibly.",
  email: "ethicalcapacitylab@gmail.com",
  consultationUrl: "https://hub.ethicalcapacitylab.org/request-consultation",
  defaultUrl: "http://localhost:3000",
  lastReviewed: "2026-08-13",
} as const;

export const currentStage =
  "We are building and testing this model through a small number of real projects, trusted relationships, and clearly defined collaborations. These pages explain how it works and the available ways to take part. We do not claim global scale, guaranteed opportunities, or a fully developed member platform.";

export const generalBoundary =
  "Submitting interest or a request does not guarantee acceptance, work, payment, partnership, referrals, membership, confidential access, or any other outcome. A human reviewer considers the information provided and identifies the most appropriate available next step.";

export const separateDecisions =
  "DoGoodie services, ways for builders to contribute, paid work, access to private projects, Liberation Network participation, partnerships, and public learning are separate decisions. Taking part in one area does not automatically give access or a right to another.";

export const branchRelationship =
  "Possible introductions, relationships, clearly defined collaborations, and opportunities may connect DoGoodie and the Liberation Network. Collaboration is possible but not automatic. Builder status, paid project work, access to private information, and Liberation Network participation remain separate decisions.";

export const team = [
  { name: "Skyler", role: "Vision and final direction", detail: "Guides the ecosystem’s public vision and final strategic direction." },
  { name: "Destine", role: "Product and operations", detail: "Connects product decisions, operating capacity, and responsible delivery." },
  { name: "John Mark", role: "Website and content operations", detail: "Builds and maintains the public website, content structure, and release quality." },
] as const;

export const supportSystems = [
  "Organizers and project managers",
  "Builders and specialists",
  "Reviewers and protections",
  "Partners and resource providers",
  "Systems and documentation",
  "Relationships and community support",
  "Public learning and communication",
] as const;

export const commitments = [
  "Agree on the work before it begins",
  "State clearly whether and how the work is paid",
  "Consent, privacy, and publication permission",
  "A person reviews important decisions",
  "Lawful, safe, and ethical work",
  "Honest results and limits instead of exaggerated claims",
  "No automatic employment, membership, or access",
] as const;

export function siteUrl(path = "/") {
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
  const base = process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || site.defaultUrl;
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}

export function isSearchIndexingEnabled() {
  if (process.env.SITE_ENV !== "production" || !process.env.NEXT_PUBLIC_SITE_URL) return false;

  try {
    const publicUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
    return publicUrl.protocol === "https:" && !["localhost", "127.0.0.1", "::1"].includes(publicUrl.hostname);
  } catch {
    return false;
  }
}
