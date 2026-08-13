import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { ProgramStatus } from "@/components/ProgramStatus";
import { Section } from "@/components/Section";
import { StatusPill } from "@/components/StatusPill";
import { supportSystems } from "@/content/site";
import { workItems } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Work & Case Studies", "Current Ethical Capacity Lab and DoGoodie work, evidence, publication consent, limitations, and what remains unproven.", "/work");

export default function WorkPage() {
  return <><Breadcrumbs items={[{ label: "Work & Case Studies" }]} /><PageHero eyebrow="Evidence and practical work" title="Proof means showing limits, too" intro="Current and completed work is presented with its problem, scope, contributors where permitted, output, result, evidence, limitations, and publication consent." tone="dogoodie"><div className="button-row"><Link className="button" href="/challenges">Submit a challenge</Link></div></PageHero>
    <Section eyebrow="Current program" title="The first DoGoodie mini-challenge"><ProgramStatus /></Section>
    <Section surface eyebrow="Case-study index" title="Real artifacts, modest conclusions"><div className="card-grid two">{workItems.map((item) => <article className="card" id={item.slug} key={item.slug}><StatusPill label={item.displayStatus} tone={item.displayStatus === "Pilot" ? "pilot" : "review"} /><h3>{item.title}</h3><p>{item.problem}</p><Link className="text-link" href={`#details-${item.slug}`}>Read the evidence record <span aria-hidden="true">↓</span></Link></article>)}</div></Section>
    {workItems.map((item) => <Section key={item.slug} id={`details-${item.slug}`} eyebrow={`${item.displayStatus} work`} title={item.title} surface={item.slug === "ecosystem-architecture"}><dl className="case-study"><div><dt>Problem</dt><dd>{item.problem}</dd></div><div><dt>Context</dt><dd>{item.context}</dd></div><div><dt>Approved scope</dt><dd>{item.scope}</dd></div><div><dt>Contributors</dt><dd>{item.contributors}</dd></div><div><dt>Output</dt><dd>{item.output}</dd></div><div><dt>Result</dt><dd>{item.result}</dd></div><div><dt>Evidence</dt><dd>{item.evidence}</dd></div><div><dt>Limitations</dt><dd>{item.limitations}</dd></div><div><dt>What remains unproven</dt><dd>{item.unproven}</dd></div><div><dt>Publication consent</dt><dd>{item.consent}</dd></div></dl><Link className="text-link" href={item.href}>Follow the related path <span aria-hidden="true">→</span></Link></Section>)}
    <Section eyebrow="People and support systems" title="Outputs depend on infrastructure"><div className="support-grid">{supportSystems.map((item) => <div key={item}><strong>{item}</strong></div>)}</div></Section>
    <Section surface eyebrow="Verified participant work" title="No participant project is published yet"><Notice title="Honest empty state" tone="context"><p>Verified projects will appear after review and publication consent. No winner, testimonial, impact metric, or participant count is invented.</p></Notice><div className="button-row"><Link className="button button-secondary" href="/builders">Builder pathway</Link><Link className="text-link" href="/partners">Partnership pathway</Link></div></Section>
  </>;
}
