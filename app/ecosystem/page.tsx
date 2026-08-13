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

export const metadata = pageMetadata("How the Parts Connect", "How the Ethical Capacity Lab, DoGoodie, and Liberation from Suffering Network have different roles and support one another.", "/ecosystem");

export default function EcosystemPage() {
  return <><Breadcrumbs items={[{ label: "How the Parts Connect" }]} /><PageHero eyebrow="Our ecosystem" title="Three connected parts with different roles" intro="ECL, DoGoodie, and the Liberation Network work together, but each has a different role. A person or opportunity does not automatically belong in every part." tone="ecl"><div className="button-row"><Link className="button" href="/start">Choose where to start</Link></div></PageHero>
    <Section id="why" eyebrow="Why it exists" title="Good ideas need the right people, tools, and support" intro="Organizations and people often have needs, skills, and relationships that need clear questions, protection, coordination, and honest learning before they can become useful work."><p className="measure">ECL sets shared standards and direction. DoGoodie turns suitable needs into clearly defined projects. The Liberation Network gives relationships time to grow. No part guarantees the result of another.</p></Section>
    <Section surface eyebrow="How it is organized" title="One website, three distinct parts"><EcosystemArchitecture /></Section>
    {branches.map((branch) => <Section key={branch.id} id={branch.id === "ethical-capacity-lab" ? "ethical-capacity-lab" : branch.id === "liberation-network" ? "liberation-network" : "dogoodie"} eyebrow={branch.label} title={branch.title} intro={branch.description} surface={branch.id === "dogoodie"}><div className="split"><ul className="list-check">{branch.functions.map((item) => <li key={item}>{item}</li>)}</ul><div><p>{branch.id === "ethical-capacity-lab" ? "The parent organization provides structure and shared direction but does not claim to run every project." : branch.id === "dogoodie" ? "Work begins only after review and a written description of what is included. Builder participation, paid work, and Network participation remain separate." : "Possible advice, introductions, collaboration, purchases, paid work, or practical support are voluntary and never guaranteed."}</p><Link className="text-link" href={branch.href}>Learn about {branch.title} <span aria-hidden="true">→</span></Link></div></div></Section>)}
    <Section id="behind-the-work" eyebrow="People, tools, and support" title="What helps the work happen"><div className="support-grid">{supportSystems.map((item) => <div key={item}><strong>{item}</strong></div>)}</div></Section>
    <Section id="how-value-moves" surface eyebrow="How support may move" title="One possible route, not a fixed process"><ValueFlow /></Section>
    <Section id="how-the-parts-connect" eyebrow="How the parts support one another" title="Connected, but not automatic"><div className="card-grid">{ecosystemConnections.map((item) => <article key={item.title} className="card"><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div style={{ marginTop: "1.5rem" }}><BoundaryNotice><p>{branchRelationship}</p></BoundaryNotice></div></Section>
    <Section id="what-remains-separate" surface eyebrow="What remains separate" title="Taking part does not guarantee access"><p className="lede">{separateDecisions}</p><ul className="list-boundary list-check"><li>A builder does not automatically belong to the Network.</li><li>A Network participant does not automatically work for DoGoodie.</li><li>ECL does not certify work or guarantee results from any part.</li><li>Reading public information does not create membership or an obligation.</li></ul></Section>
    <Section id="current-stage" eyebrow="Current stage" title="Small, careful, and still learning"><CurrentStageNotice /></Section>
    <Section surface eyebrow="Where to start" title="Start with what you need now"><div className="button-row"><Link className="button" href="/start">Choose where to start</Link><Link className="button button-secondary" href="/ethical-work">See how we protect people and their work</Link></div></Section>
  </>;
}
