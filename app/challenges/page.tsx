import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice } from "@/components/Notices";
import { OrganizationCallActions } from "@/components/OrganizationCallActions";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubmissionForm } from "@/components/SubmissionForm";
import { responseTimes } from "@/content/response-times";
import { isFormspreeConfigured } from "@/lib/submissions/formspree";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Describe Your Challenge", "A short DoGoodie request form that asks only for needed information, with a separate Operations Hub option for consultations.", "/challenges");

export default function ChallengesPage() {
  const submissionAvailable = isFormspreeConfigured("challenge");

  return (
    <>
      <Breadcrumbs items={[{ label: "For Organizations", href: "/organizations" }, { label: "Describe Your Challenge" }]} />
      <PageHero
        eyebrow="DoGoodie first contact"
        title="Tell us what you are trying to solve"
        intro="Give us enough context to understand the request—without sending detailed records or sensitive material. Most people can complete this form in about 2–3 minutes."
        tone="dogoodie"
        compact
      />

      <Section tight eyebrow="Before you begin" title="A short request is enough">
        <div className="challenge-fit-grid">
          <div>
            <h3>This route may fit if you have</h3>
            <ul className="list-check"><li>A real organizational problem, project, workflow, or idea</li><li>One responsible contact</li><li>A useful result you can describe</li><li>Willingness to agree on what the work includes before it begins</li></ul>
          </div>
          <Notice title="Keep sensitive material out" tone="warning"><p>Do not include passwords, private keys, financial-account information, protected health information, private legal files, confidential client records, or anything you are not authorized to share. No file uploads are accepted.</p></Notice>
        </div>
      </Section>

      <Section id="submit" surface eyebrow="Organization request" title="Describe your challenge">
        <SubmissionForm type="challenge" submissionAvailable={submissionAvailable} />
      </Section>

      <Section tight eyebrow="Prefer a conversation?" title="Request a 30-minute consultation through the Operations Hub">
        <p className="measure">The Operations Hub handles consultation requests and records the information needed for them. It is separate from this Formspree challenge form.</p>
        <OrganizationCallActions secondaryLabel="Return to organization support" secondaryHref="/organizations" />
      </Section>

      <Section tight eyebrow="After you submit" title="A human reviews the request">
        <div className="after-submit-grid">
          <p>{responseTimes.challenge} {responseTimes.caveat}</p>
          <p>We may ask a clarifying question, recommend a smaller step, refer, hold, decline, or take no further action. Consultation requests are handled separately through the Operations Hub.</p>
        </div>
        <div className="button-row"><Link className="button button-secondary" href="/organizations">Return to organization support</Link><Link className="text-link" href="/privacy">Read privacy details <span aria-hidden="true">→</span></Link></div>
      </Section>
    </>
  );
}
