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

export const metadata = pageMetadata("Work & Case Studies", "Current Ethical Capacity Lab and DoGoodie work, what was made, what we learned, permission to publish, and what is still unknown.", "/work");

export default function WorkPage() {
  return <><Breadcrumbs items={[{ label: "Work & Case Studies" }]} /><PageHero eyebrow="Our work" title="See what we have built and what we have learned" intro="Each example explains the problem, what we agreed to do, who helped when we have permission to name them, what was made, what happened, and what we still do not know." tone="dogoodie"><div className="button-row"><Link className="button" href="/challenges">Submit a challenge</Link></div></PageHero>
    <Section eyebrow="Current program" title="The first DoGoodie mini-challenge"><ProgramStatus /></Section>
    <Section surface eyebrow="Work list" title="Real work with clear limits"><div className="card-grid two">{workItems.map((item) => <article className="card card-with-action" id={item.slug} key={item.slug}><StatusPill label={item.displayStatus} tone={item.displayStatus === "Pilot" ? "pilot" : "review"} /><h3>{item.title}</h3><p>{item.problem}</p><Link className="text-link" href={`#details-${item.slug}`}>Read the full project <span aria-hidden="true">↓</span></Link></article>)}</div></Section>
    {workItems.map((item) => <Section key={item.slug} id={`details-${item.slug}`} eyebrow={`${item.displayStatus} work`} title={item.title} surface={item.slug === "ecosystem-architecture"}><dl className="case-study"><div><dt>Problem</dt><dd>{item.problem}</dd></div><div><dt>Background</dt><dd>{item.context}</dd></div><div><dt>What we agreed to do</dt><dd>{item.scope}</dd></div><div><dt>Contributors</dt><dd>{item.contributors}</dd></div><div><dt>What was made</dt><dd>{item.output}</dd></div><div><dt>Result</dt><dd>{item.result}</dd></div><div><dt>How we know</dt><dd>{item.evidence}</dd></div><div><dt>Limits</dt><dd>{item.limitations}</dd></div><div><dt>What we still do not know</dt><dd>{item.unproven}</dd></div><div><dt>Permission to publish</dt><dd>{item.consent}</dd></div></dl><Link className="text-link" href={item.href}>Go to the related page <span aria-hidden="true">→</span></Link></Section>)}
    <Section eyebrow="People, tools, and support" title="What helps the work happen"><div className="support-grid">{supportSystems.map((item) => <div key={item}><strong>{item}</strong></div>)}</div></Section>
    <Section surface eyebrow="Participant projects" title="No participant project is published yet"><Notice title="What is published" tone="context"><p>Participant projects will be added only after review and permission to publish. We do not currently publish participant results, personal recommendations, impact numbers, or completion counts.</p></Notice><div className="button-row"><Link className="button button-secondary" href="/builders">For builders</Link><Link className="text-link" href="/partners">For partners</Link></div></Section>
  </>;
}
