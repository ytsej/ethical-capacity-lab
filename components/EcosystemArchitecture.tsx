import Link from "next/link";
import { branches } from "@/content/ecosystem";
import { branchRelationship, separateDecisions } from "@/content/site";

export function EcosystemArchitecture({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`architecture ${compact ? "architecture-compact" : ""}`} aria-labelledby="architecture-title">
      <figcaption id="architecture-title" className="sr-only">The Ethical Capacity Lab ecosystem architecture</figcaption>
      <div className="architecture-frontdoor">
        <span>Unified public website</span>
        <strong>One trusted public front door</strong>
        <p>Explains the ecosystem and routes each visitor to a relevant pathway.</p>
      </div>
      <div className="architecture-parent tone-ecl">
        <span>{branches[0].label}</span><h3>{branches[0].title}</h3><p>{branches[0].description}</p>
        {!compact && <ul>{branches[0].functions.map((item) => <li key={item}>{item}</li>)}</ul>}
        <Link href={branches[0].href} data-ecosystem-branch={branches[0].id}>About governance <span aria-hidden="true">→</span></Link>
      </div>
      <div className="architecture-branches">
        {branches.slice(1).map((branch) => (
          <article key={branch.id} id={branch.id} className={`architecture-branch tone-${branch.tone}`}>
            <span>{branch.label}</span><h3>{branch.title}</h3><p>{branch.description}</p>
            {!compact && <ul>{branch.functions.map((item) => <li key={item}>{item}</li>)}</ul>}
            <Link href={branch.href} data-ecosystem-branch={branch.id}>Explore this pathway <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
      <div className="architecture-relationship"><p>{branchRelationship}</p><p><strong>What remains separate:</strong> {separateDecisions}</p></div>
      <details className="text-alternative"><summary>Text alternative for this diagram</summary><p>The unified website routes visitors to the Ethical Capacity Lab as institutional parent, DoGoodie as practical arm, and the Liberation from Suffering Network as relationship network. DoGoodie and the Network may exchange introductions or scoped possibilities, but their work, access, and participation decisions remain separate.</p></details>
    </figure>
  );
}
