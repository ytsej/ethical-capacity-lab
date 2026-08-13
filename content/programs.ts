import type { ContentStatus } from "./site";

export type ProgramStatus = "upcoming" | "applications_open" | "reviewing" | "active" | "judging" | "archived";

export const impactHack = {
  slug: "impact-hack",
  name: "The $5 Impact Hack",
  status: "current" as ContentStatus,
  timezone: "Asia/Manila",
  timezoneLabel: "PHT",
  applicationOpen: "2026-07-20T00:00:00+08:00",
  applicationClose: "2026-08-10T23:59:00+08:00",
  reviewStart: "2026-08-11T00:00:00+08:00",
  reviewEnd: "2026-08-12T23:59:59+08:00",
  challengeStart: "2026-08-15T00:00:00+08:00",
  submissionDeadline: "2026-08-21T23:59:00+08:00",
  judgingStart: "2026-08-22T00:00:00+08:00",
  archiveAt: "2026-12-31T23:59:59+08:00",
  winnerAnnouncement: null as string | null,
  applicationUrl: "https://forms.gle/kg1XqgdgRMzj1HuG9",
  submissionUrl: "https://forms.gle/T75zfcjeBbsLyMp7A",
  experimentFund: "$5 per approved participant",
  capacity: "Up to 200 approved participants",
  totalFunding: "Up to $1,000 in experiment funds",
  grandPrize: "$250 Grand Prize",
  eligibility: "Global, age 18+, individual entries only—subject to legal, payment-platform, safety, and operational feasibility",
} as const;

export function getProgramStatus(now = new Date()): ProgramStatus {
  const t = now.getTime();
  if (t < Date.parse(impactHack.applicationOpen)) return "upcoming";
  if (t <= Date.parse(impactHack.applicationClose)) return "applications_open";
  if (t < Date.parse(impactHack.challengeStart)) return "reviewing";
  if (t <= Date.parse(impactHack.submissionDeadline)) return "active";
  if (t <= Date.parse(impactHack.archiveAt)) return "judging";
  return "archived";
}

export const programStatusCopy: Record<ProgramStatus, { label: string; action: string }> = {
  upcoming: { label: "Applications open July 20, 2026", action: "Review the challenge" },
  applications_open: { label: "Applications open through August 10, 2026 at 11:59 PM PHT", action: "Open the application form" },
  reviewing: { label: "Applications are under review", action: "Review the timeline" },
  active: { label: "The seven-day challenge is active", action: "Open the final submission form" },
  judging: { label: "Submissions are under review; the winner date is to be announced", action: "Review the program" },
  archived: { label: "This edition is archived", action: "Review the program record" },
};
