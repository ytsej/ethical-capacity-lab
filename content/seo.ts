export type PublicSeoRoute = {
  path: `/${string}` | "/";
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const standardPage = { lastModified: "2026-08-13", changeFrequency: "monthly", priority: 0.7 } as const;

export const publicSeoRoutes = [
  { path: "/", lastModified: "2026-08-10", changeFrequency: "weekly", priority: 1 },
  { path: "/start", lastModified: "2026-08-10", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ecosystem", ...standardPage },
  { path: "/about", ...standardPage },
  { path: "/organizations", lastModified: "2026-08-10", changeFrequency: "weekly", priority: 0.9 },
  { path: "/challenges", lastModified: "2026-08-10", changeFrequency: "weekly", priority: 0.8 },
  { path: "/builders", lastModified: "2026-08-10", changeFrequency: "weekly", priority: 0.8 },
  { path: "/ethical-work", ...standardPage },
  { path: "/liberation", ...standardPage },
  { path: "/liberation/how-it-works", ...standardPage },
  { path: "/work", lastModified: "2026-08-10", changeFrequency: "weekly", priority: 0.8 },
  { path: "/partners", ...standardPage },
  { path: "/resources", ...standardPage },
  { path: "/contact", lastModified: "2026-08-10", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", ...standardPage },
  { path: "/terms", ...standardPage },
  { path: "/cookies", ...standardPage },
  { path: "/accessibility", ...standardPage },
  { path: "/community-standards", ...standardPage },
  { path: "/report-a-concern", lastModified: "2026-08-10", changeFrequency: "monthly", priority: 0.8 },
  { path: "/impact-hack", lastModified: "2026-08-10", changeFrequency: "daily", priority: 0.8 },
] as const satisfies readonly PublicSeoRoute[];
