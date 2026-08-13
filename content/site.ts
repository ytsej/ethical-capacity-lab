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
  "We are building and testing this ecosystem through a small number of real projects, trusted relationships, and carefully scoped collaborations. This public website explains the model and current pathways; it does not claim global scale, guaranteed opportunities, or a mature member platform.";

export const generalBoundary =
  "Submitting interest or a request does not guarantee acceptance, work, payment, partnership, referrals, membership, confidential access, or any other outcome. A human reviewer considers the information provided and identifies the most appropriate available next step.";

export const separateDecisions =
  "DoGoodie services, builder pathways, paid work, confidential project access, Liberation Network participation, partnerships, and public learning are separate decisions. Participation in one area does not automatically create access or entitlement in another.";

export const branchRelationship =
  "Possible introductions, relationships, scoped collaborations, and opportunities may move between DoGoodie and the Liberation Network. Collaboration is possible but not automatic. Builder status, paid project work, confidential access, and Liberation Network participation remain separate decisions.";

export const team = [
  { name: "Skyler", role: "Vision and final direction", detail: "Guides the ecosystem’s public vision and final strategic direction." },
  { name: "Destine", role: "Product and operations", detail: "Connects product decisions, operating capacity, and responsible delivery." },
  { name: "John Mark", role: "Project owner and executor", detail: "Owns website implementation, content structure, and launch-scope execution." },
] as const;

export const supportSystems = [
  "Organizers and project managers",
  "Builders and specialists",
  "Reviewers and safeguards",
  "Partners and resource providers",
  "Systems and documentation",
  "Relationships and community infrastructure",
  "Public learning and communication",
] as const;

export const commitments = [
  "Scope before productive work",
  "Compensation or educational status made explicit",
  "Consent, privacy, and publication permission",
  "Human review for consequential decisions",
  "Lawful, safe, and ethical work",
  "Proof and limitations over exaggerated claims",
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
