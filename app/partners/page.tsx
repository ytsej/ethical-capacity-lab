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

export const metadata = pageMetadata("Partnerships & Resources", "Offer expertise, tools, funding, introductions, or a clearly scoped collaboration to the Ethical Capacity Lab ecosystem.", "/partners");

export default function PartnersPage() {
  const submissionAvailable = isFormspreeConfigured("partnership_inquiry");

  return <>
    <Breadcrumbs items={[{ label: "Partnerships & Resources" }]} />
    <PageHero eyebrow="Partnerships and Resources" title="Offer a resource, service, introduction, or collaboration." intro="We work with partners when there is a clear purpose, responsible ownership, and a practical benefit to the work." tone="ecl">
      <div className="button-row"><Link className="button" href="#partnership-inquiry">Propose a partnership</Link><Link className="button button-secondary" href="/work">See current work</Link></div>
    </PageHero>
    <Section surface="default" eyebrow="What partnership can look like" title="Four useful kinds of support" intro="A proposal can combine categories, but the first message only needs to explain the clearest offer.">
      <div className="partnership-groups">{partnershipGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><ul>{group.examples.map((example) => <li key={example}>{example}</li>)}</ul></article>)}</div><p className="section-footnote">Funding or material support is not presented as tax-deductible unless separately verified and approved.</p>
    </Section>
    <Section surface="warm" eyebrow="What helps a proposal" title="Clear purpose before commitment">
      <div className="split compact-split"><div><p className="lede">We look for a clear purpose, responsible contact, appropriate permissions, honest expectations, and terms that protect everyone involved.</p><Link className="text-link" href="/about">Read governance and safeguards <span aria-hidden="true">→</span></Link></div><ul className="list-check">{partnershipStandards.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul></div>
    </Section>
    <Section surface="dark" tight eyebrow="Public association" title="Names, logos, and endorsements require permission">
      <p className="measure">We do not publish partner names, logos, endorsements, or relationship claims without explicit permission for that use. Submitting a proposal does not create a partnership or public association.</p><Notice title="Current public listing" tone="trust"><p>No public partner list is shown. Partnership proposals remain open even when no names or logos are published.</p></Notice>
    </Section>
    <Section id="partnership-inquiry" surface="default" eyebrow="Partnership inquiry" title="Tell us what you are offering or proposing">
      <p>{responseTimes.partnership} {responseTimes.caveat}</p><SubmissionForm type="partnership_inquiry" submissionAvailable={submissionAvailable} />
    </Section>
  </>;
}
