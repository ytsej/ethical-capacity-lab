import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubmissionForm } from "@/components/SubmissionForm";
import { responseTimes } from "@/content/response-times";
import { site } from "@/content/site";
import { isFormspreeConfigured } from "@/lib/submissions/formspree";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Report a Concern", "Separate concern intake for conduct, privacy, project treatment, representation, community, accessibility, or ecosystem risks.", "/report-a-concern");

export default function ConcernPage() {
  const submissionAvailable = isFormspreeConfigured("concern_report");
  return <><Breadcrumbs items={[{ label: "Report a Concern" }]} /><PageHero eyebrow="Safeguarding and escalation" title="A separate route for concerns" intro="Report conduct, privacy, project treatment, partner representation, community interaction, accessibility, safety, or other ecosystem risks. Name and email are optional unless you request follow-up." tone="ecl" />
    <Section eyebrow="Before using this form" title="This is not an emergency service"><Notice title="Immediate danger" tone="danger"><p>Do not use this form for immediate danger or urgent crisis support. Contact appropriate local emergency services or another qualified local resource. ECL does not provide emergency, crisis, therapeutic, legal, or investigative services.</p></Notice></Section>
    <Section surface eyebrow="What can be reported" title="Use the category that best fits"><div className="card-grid">{["Conduct, harassment, discrimination, or retaliation", "Privacy or confidentiality", "Project treatment, labor, compensation, or ownership", "Partner or professional representation", "Community or one-on-one interaction", "Accessibility, safety, deception, or another ecosystem risk"].map((item) => <article className="card" key={item}><h3>{item}</h3><p>Share only the minimum information needed to understand and route the concern.</p></article>)}</div></Section>
    <Section eyebrow="Confidentiality and review" title="Honest limits before submission"><ul className="list-check"><li>{responseTimes.concern} {responseTimes.caveat}</li><li>Name and email may be omitted unless follow-up is requested.</li><li>Anonymity cannot be promised, including where details identify the situation indirectly.</li><li>Information may need to be shared on a limited basis for safety, fair review, applicable law, or another person’s rights.</li><li>ECL does not claim trained safeguarding staff or promise a specific investigation or outcome.</li><li>Retaliation against reporters, witnesses, reviewers, or people seeking reconsideration is not accepted.</li></ul></Section>
    <Section id="concern-form" surface eyebrow="Concern form" title="Submit the minimum information needed"><SubmissionForm type="concern_report" submissionAvailable={submissionAvailable} /><p style={{ marginTop: "1rem" }}>Alternate contact: <a href={`mailto:${site.email}`}>{site.email}</a>. Email is not guaranteed to be more secure; do not send sensitive attachments or extensive evidence without arranging a safer method.</p></Section>
    <Section eyebrow="After submission" title="Acknowledge, clarify, route, or review"><p className="measure">A human reviewer may acknowledge, clarify, set an immediate boundary, refer the issue, begin an initial review, or explain that the matter is outside current authority. A response does not guarantee confidentiality, a finding, consequence, remedy, or external escalation.</p><div className="button-row"><Link className="button button-secondary" href="/community-standards">Community Standards</Link><Link className="text-link" href="/privacy">Privacy Policy</Link></div></Section>
  </>;
}
