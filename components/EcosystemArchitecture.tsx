import Link from "next/link";
import { branches } from "@/content/ecosystem";
import { branchRelationship, separateDecisions } from "@/content/site";

export function EcosystemArchitecture({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`architecture ${compact ? "architecture-compact" : ""}`} aria-labelledby="architecture-title">
      <figcaption id="architecture-title" className="sr-only">How the three parts of the Ethical Capacity Lab model fit together</figcaption>
      <div className="architecture-frontdoor">
        <span>One website</span>
        <strong>One place to start</strong>
        <p>Explains the three parts and helps visitors find the right place to begin.</p>
      </div>
      <div className="architecture-parent tone-ecl">
        <span>{branches[0].label}</span><h3>{branches[0].title}</h3><p>{branches[0].description}</p>
        {!compact && <ul>{branches[0].functions.map((item) => <li key={item}>{item}</li>)}</ul>}
        <Link href={branches[0].href} data-ecosystem-branch={branches[0].id}>Learn about ECL <span aria-hidden="true">→</span></Link>
      </div>
      <div className="architecture-branches">
        {branches.slice(1).map((branch) => (
          <article key={branch.id} id={branch.id} className={`architecture-branch tone-${branch.tone}`}>
            <span>{branch.label}</span><h3>{branch.title}</h3><p>{branch.description}</p>
            {!compact && <ul>{branch.functions.map((item) => <li key={item}>{item}</li>)}</ul>}
            <Link href={branch.href} data-ecosystem-branch={branch.id}>Learn more <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
      <div className="architecture-relationship"><p>{branchRelationship}</p><p><strong>What remains separate:</strong> {separateDecisions}</p></div>
      <details className="text-alternative"><summary>Written explanation of this diagram</summary><p>The website helps visitors learn about the Ethical Capacity Lab as the parent organization, DoGoodie as the practical work part, and the Liberation from Suffering Network as the relationship network. DoGoodie and the Network may share introductions or possible collaborations, but decisions about work, access, and participation remain separate.</p></details>
    </figure>
  );
}
