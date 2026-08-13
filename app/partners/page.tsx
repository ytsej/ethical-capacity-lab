import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubmissionForm } from "@/components/SubmissionForm";
import { partnershipGroups, partnershipStandards } from "@/content/partners";
import { responseTimes } from "@/content/response-times";
import { isFormspreeConfigured } from "@/lib/submissions/formspree";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Partnerships & Resources", "Offer expertise, tools, funding, introductions, or a clearly defined collaboration to the Ethical Capacity Lab.", "/partners");

export default function PartnersPage() {
  const submissionAvailable = isFormspreeConfigured("partnership_inquiry");

  return <>
    <Breadcrumbs items={[{ label: "Partnerships & Resources" }]} />
    <PageHero eyebrow="Partnerships and Resources" title="Offer a resource, service, introduction, or collaboration." intro="We work with partners when there is a clear purpose, a person responsible, and a practical benefit to the work." tone="ecl">
      <div className="button-row"><Link className="button" href="#partnership-inquiry">Propose a partnership</Link><Link className="button button-secondary" href="/work">See current work</Link></div>
    </PageHero>
    <Section surface="default" eyebrow="What partnership can look like" title="Four useful kinds of support" intro="A proposal can combine more than one type of support, but the first message only needs to explain the clearest offer.">
      <div className="partnership-groups">{partnershipGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><ul>{group.examples.map((example) => <li key={example}>{example}</li>)}</ul></article>)}</div><p className="section-footnote">We do not say that funding, equipment, or other support is tax-deductible unless that has been checked and approved separately.</p>
    </Section>
    <Section surface="warm" eyebrow="What helps a proposal" title="Clear purpose before commitment">
      <div className="split compact-split"><div><p className="lede">We look for a clear purpose, a responsible contact, the right permissions, honest expectations, and terms that protect everyone involved.</p><Link className="text-link" href="/about">See how ECL makes decisions and protects people <span aria-hidden="true">→</span></Link></div><ul className="list-check">{partnershipStandards.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul></div>
    </Section>
    <Section surface="dark" tight eyebrow="Using names and logos" title="Names, logos, and public recommendations require permission">
      <p className="measure">We do not publish a partner’s name, logo, public recommendation, or description of the relationship without clear permission for that use. Sending a proposal does not create a partnership or allow either side to announce one.</p><Notice title="Current public list" tone="trust"><p>No public partner list is shown. Partnership proposals remain open even when no names or logos are published.</p></Notice>
    </Section>
    <Section id="partnership-inquiry" surface="default" eyebrow="Partnership inquiry" title="Tell us what you are offering or proposing">
      <p>{responseTimes.partnership} {responseTimes.caveat}</p><SubmissionForm type="partnership_inquiry" submissionAvailable={submissionAvailable} />
    </Section>
  </>;
}
