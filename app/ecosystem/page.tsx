import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EcosystemArchitecture } from "@/components/EcosystemArchitecture";
import { CurrentStageNotice, BoundaryNotice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ValueFlow } from "@/components/ValueFlow";
import { branches, ecosystemConnections } from "@/content/ecosystem";
import { branchRelationship, separateDecisions, supportSystems } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Ecosystem Overview", "How the Ethical Capacity Lab, DoGoodie, and Liberation from Suffering Network remain distinct and support one another.", "/ecosystem");

export default function EcosystemPage() {
  return <><Breadcrumbs items={[{ label: "Ecosystem Overview" }]} /><PageHero eyebrow="Our ecosystem" title="Different responsibilities. Shared ethical capacity." intro="The ecosystem exists to connect institutional trust, practical delivery, and relationships without implying that every need, person, or opportunity belongs in the same system." tone="ecl"><div className="button-row"><Link className="button" href="/start">Choose your path</Link></div></PageHero>
    <Section id="why" eyebrow="Why it exists" title="Meaningful intent needs supporting capacity" intro="Organizations and people often have needs, skills, and relationships that do not become useful work without clarification, safeguards, coordination, and honest learning."><p className="measure">ECL builds the common trust layer, DoGoodie turns suitable needs into carefully scoped work, and the Liberation Network makes room for relationships to develop gradually. No branch guarantees the outcomes of another.</p></Section>
    <Section surface eyebrow="Live architecture" title="One front door, three distinct parts"><EcosystemArchitecture /></Section>
    {branches.map((branch) => <Section key={branch.id} id={branch.id === "ethical-capacity-lab" ? "ethical-capacity-lab" : branch.id === "liberation-network" ? "liberation-network" : "dogoodie"} eyebrow={branch.label} title={branch.title} intro={branch.description} surface={branch.id === "dogoodie"}><div className="split"><ul className="list-check">{branch.functions.map((item) => <li key={item}>{item}</li>)}</ul><div><p>{branch.id === "ethical-capacity-lab" ? "The parent provides structure and trust but does not claim to manage every project directly." : branch.id === "dogoodie" ? "Work begins only after a suitable review and written scope. Builder participation, paid work, and Network participation remain separate." : "Possible advice, introductions, collaboration, purchasing, paid work, or material support are voluntary and never guaranteed."}</p><Link className="text-link" href={branch.href}>Explore {branch.title} <span aria-hidden="true">→</span></Link></div></div></Section>)}
    <Section id="behind-the-work" eyebrow="People and support systems" title="The infrastructure behind visible output"><div className="support-grid">{supportSystems.map((item) => <div key={item}><strong>{item}</strong></div>)}</div></Section>
    <Section id="how-value-moves" surface eyebrow="How value moves" title="A possible flow, not a funnel"><ValueFlow /></Section>
    <Section id="how-the-parts-connect" eyebrow="How the parts support one another" title="Connection without automatic access"><div className="card-grid">{ecosystemConnections.map((item) => <article key={item.title} className="card"><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div style={{ marginTop: "1.5rem" }}><BoundaryNotice><p>{branchRelationship}</p></BoundaryNotice></div></Section>
    <Section id="what-remains-separate" surface eyebrow="What remains separate" title="Participation is not entitlement"><p className="lede">{separateDecisions}</p><ul className="list-boundary list-check"><li>Every builder does not automatically belong to the Network.</li><li>Every Network participant does not work for DoGoodie.</li><li>ECL does not certify or guarantee branch outcomes.</li><li>Public learning does not create membership or obligation.</li></ul></Section>
    <Section id="current-stage" eyebrow="Current stage" title="Deliberately small and evidence-seeking"><CurrentStageNotice /></Section>
    <Section surface eyebrow="How to engage" title="Start with your present need"><div className="button-row"><Link className="button" href="/start">Choose a path</Link><Link className="button button-secondary" href="/ethical-work">Review safeguards</Link></div></Section>
  </>;
}
