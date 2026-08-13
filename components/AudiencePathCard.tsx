import Link from "next/link";

export function AudiencePathCard({ path, compact = false }: { path: { title: string; description: string; cta: string; href: string; tone: string }; compact?: boolean }) {
  const pathChoice = path.href === "/organizations" ? "organization" : path.href === "/builders" ? "builder" : path.href === "/liberation" ? "liberation" : path.href === "/partners" ? "partner" : path.href === "/resources" ? "learner" : undefined;
  if (compact) {
    return (
      <article className={`path-card path-card-compact tone-${path.tone}`}>
        <h3>{path.title}</h3>
        <p>{path.description}</p>
        <Link className="text-link" href={path.href} data-path-choice={pathChoice}>{path.cta} <span aria-hidden="true">→</span></Link>
      </article>
    );
  }

  return (
    <Link className={`path-card tone-${path.tone}`} href={path.href} data-path-choice={pathChoice}>
      <span className="eyebrow">Choose a path</span>
      <h3>{path.title}</h3>
      <p>{path.description}</p>
      <span>{path.cta} <span aria-hidden="true">→</span></span>
    </Link>
  );
}
