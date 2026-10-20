import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IconTile, pathIcons, type BranchTone } from "./icons";

export function AudiencePathCard({ path, compact = false }: { path: { title: string; description: string; cta: string; href: string; tone: string }; compact?: boolean }) {
  const pathChoice = path.href === "/organizations" ? "organization" : path.href === "/builders" ? "builder" : path.href === "/liberation" ? "liberation" : path.href === "/partners" ? "partner" : path.href === "/resources" ? "learner" : undefined;
  const icon = pathIcons[path.href];
  const tone = path.tone as BranchTone;

  if (compact) {
    return (
      <article className={`path-card path-card-compact tone-${path.tone}`}>
        {icon && <IconTile icon={icon} tone={tone} />}
        <h3>{path.title}</h3>
        <p>{path.description}</p>
        <Link className="text-link" href={path.href} data-path-choice={pathChoice}>{path.cta} <span aria-hidden="true">→</span></Link>
      </article>
    );
  }

  return (
    <Link className={`path-card tone-${path.tone}`} href={path.href} data-path-choice={pathChoice}>
      <span className="path-card-top">
        {icon && <IconTile icon={icon} tone={tone} />}
        <ArrowUpRight className="path-card-arrow" aria-hidden="true" strokeWidth={1.75} />
      </span>
      <span className="eyebrow">Choose a path</span>
      <h3>{path.title}</h3>
      <p>{path.description}</p>
      <span className="path-card-cta">{path.cta} <span aria-hidden="true">→</span></span>
    </Link>
  );
}
