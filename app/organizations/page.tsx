import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OrganizationCallActions } from "@/components/OrganizationCallActions";
import { PageHero } from "@/components/PageHero";
import { ServiceGroups } from "@/components/ServiceGroups";
import { Section } from "@/components/Section";
import { StatusPill } from "@/components/StatusPill";
import { giveFirstModel } from "@/content/capabilities";
import { responseTimes } from "@/content/response-times";
import { workItems } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "For Organizations",
  "Bring DoGoodie a real problem and explore a practical next step through research, digital tools, workflow improvements, automation, or a small test.",
  "/organizations",
);

const firstEngagementSteps = [
  "You tell us the challenge.",
  "We review whether we have the right people and time to help.",
  "We may ask a few clarifying questions.",
  "When useful, we have a short introductory conversation.",
  "We recommend a next step.",
  "Before work begins, we write down what is included and the terms.",
] as const;

const organizationNeeds = [
  "A real problem or question",
  "One responsible contact",
  "Enough context to understand the request",
  "Willingness to agree on what the work includes and give timely feedback",
  "Respect for builder and project protections",
  "No sensitive credentials or unnecessary confidential information in the first submission",
] as const;

export default function OrganizationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "For Organizations" }]} />
      <PageHero
        eyebrow="For organizations"
        title="Bring us a real problem. We will help clarify the next useful step."
        intro="DoGoodie works on clearly defined research, websites and digital tools, workflow improvements, automation, and small practical tests. Every request is reviewed to see whether it is suitable and whether we have the right people and time."
        tone="ecl"
        context="dogoodie"
        compact
      >
        <OrganizationCallActions secondaryLabel="Describe your challenge" />
      </PageHero>

      <Section
        id="services"
        surface="dogoodie"
        eyebrow="Practical support"
        title="What we can help with"
        intro="You do not need to diagnose the service first. Bring the situation you are facing; these examples show what a useful output might look like."
      >
        <ServiceGroups showBring />
      </Section>

      <Section surface="default" tight eyebrow="Start with a conversation or written request" title="Have a specific challenge?">
        <div className="client-cta-panel">
          <div>
            <p className="lede">Request a 30-minute consultation through the Operations Hub, or describe the challenge in writing if that is easier.</p>
            <p>The Operations Hub records consultation-request details separately from this website’s Formspree forms.</p>
            <p>{responseTimes.challenge} {responseTimes.caveat}</p>
          </div>
          <OrganizationCallActions />
        </div>
      </Section>

      <Section surface="warm" eyebrow="A practical first step" title="What a first engagement may look like">
        <ol className="first-engagement-list">
          {firstEngagementSteps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}
        </ol>
        <div className="outcome-strip" aria-label="Possible review outcomes">
          <strong>Possible outcomes</strong>
          <ul>{["Proceed", "Smaller test", "Referral", "Hold", "Decline", "No further action"].map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
        </div>
        <p className="process-boundary">A first conversation is for clarification and fit. It is not open-ended free consulting or a promise of future work.</p>
      </Section>

      <Section surface="default" eyebrow="Good first-contact information" title="What we need from you">
        <div className="organization-needs">
          <ul className="list-check">{organizationNeeds.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="organization-note">
            <p className="eyebrow">Keep the first request safe</p>
            <p>Describe the situation without passwords, financial-account information, health information, private legal files, or confidential material you are not authorized to share.</p>
            <Link className="text-link" href="/challenges">Review the short challenge form <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </Section>

      <Section surface="dogoodie" eyebrow="Clear boundaries" title="How we work responsibly">
        <div className="responsible-work-grid">
          <div>
            <h3>Terms before productive work</h3>
            <p>Before work begins, we agree on what is included, responsibilities, pay when relevant, ownership, access, privacy, review points, and how the work ends.</p>
            <Link className="text-link" href="/ethical-work">Read how we work responsibly <span aria-hidden="true">→</span></Link>
          </div>
          <div>
            <h3>A small first piece of help</h3>
            <p>In some cases, we may offer a small and clearly limited first piece of help when it is useful for both sides and we have enough time and support.</p>
            <ul className="compact-rule-list">{giveFirstModel.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="section-footnote">There is no automatic continuation.</p>
          </div>
        </div>
      </Section>

      <Section surface="default" eyebrow="Real work, honest status" title="Current evidence">
        <div className="organization-proof-grid">
          {workItems.map((item) => (
            <article className="card-with-action" key={item.slug}>
              <StatusPill label={item.slug === "ecosystem-architecture" ? "Published guide" : "Current program"} tone={item.slug === "ecosystem-architecture" ? "limited" : "info"} />
              <h3>{item.title}</h3>
              <p>{item.output}</p>
              <p className="section-footnote">{item.limitations}</p>
              <Link className="text-link" href={item.href}>Review {item.title} <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
        <p className="empty-evidence">Reviewed client work will be added only after the client gives permission to publish it.</p>
      </Section>

      <Section surface="warm" tight eyebrow="Next step" title="Tell us what you are trying to solve">
        <div className="final-cta">
          <p className="lede">A short request is enough to begin. We may clarify, refer, hold, decline, or recommend a smaller first step.</p>
          <OrganizationCallActions />
        </div>
      </Section>
    </>
  );
}
