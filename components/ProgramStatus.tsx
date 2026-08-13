import Link from "next/link";
import { getProgramStatus, impactHack, programStatusCopy } from "@/content/programs";
import { StatusPill, type StatusTone } from "./StatusPill";

const statusTones = {
  upcoming: "pilot",
  applications_open: "info",
  reviewing: "review",
  active: "info",
  judging: "review",
  archived: "limited",
} satisfies Record<ReturnType<typeof getProgramStatus>, StatusTone>;

export function ProgramStatus() {
  const status = getProgramStatus();
  const copy = programStatusCopy[status];
  const href = status === "applications_open" ? impactHack.applicationUrl : status === "active" ? impactHack.submissionUrl : "/impact-hack#timeline";
  const external = href.startsWith("http");
  return (
    <aside className="program-status">
      <div><StatusPill label={status.replaceAll("_", " ")} tone={statusTones[status]} /><h2>{impactHack.name}</h2><p>{copy.label}</p></div>
      {external ? <a className="button button-small" href={href} target="_blank" rel="noopener noreferrer">{copy.action}<span className="sr-only"> (opens in a new tab)</span></a> : <Link className="button button-small" href={href}>{copy.action}</Link>}
    </aside>
  );
}
