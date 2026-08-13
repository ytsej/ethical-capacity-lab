import Link from "next/link";
import type { Resource } from "@/content/resources";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="resource-card" id={resource.id}>
      <p className="eyebrow">For {resource.audience}</p>
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <details data-resource-id={resource.id}>
        <summary aria-label={`Open “${resource.title}”`}><span aria-hidden="true">Open guide</span></summary>
        <ol>{resource.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <dl className="resource-meta">
          <div><dt>By</dt><dd>{resource.owner}</dd></div>
          <div><dt>Updated</dt><dd>{resource.updated}</dd></div>
          <div><dt>Based on</dt><dd>{resource.source}</dd></div>
          <div><dt>Limitations</dt><dd>{resource.limitations}</dd></div>
        </dl>
        <Link className="text-link" href={resource.nextHref}>{resource.nextLabel} <span aria-hidden="true">→</span></Link>
      </details>
    </article>
  );
}
