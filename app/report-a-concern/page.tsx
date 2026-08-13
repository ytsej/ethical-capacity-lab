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

export const metadata = pageMetadata("Report a Concern", "A separate form for concerns about behavior, privacy, project treatment, public claims, community interactions, accessibility, or safety.", "/report-a-concern");

export default function ConcernPage() {
  const submissionAvailable = isFormspreeConfigured("concern_report");
  return <><Breadcrumbs items={[{ label: "Report a Concern" }]} /><PageHero eyebrow="Safety and concerns" title="A separate form for concerns" intro="Report behavior, privacy, project treatment, how a partner or professional is described, community interactions, accessibility, safety, or another risk. Your name and email are optional unless you want a reply." tone="ecl" />
    <Section eyebrow="Before using this form" title="This is not an emergency service"><Notice title="Immediate danger" tone="danger"><p>Do not use this form for immediate danger or urgent crisis support. Contact appropriate local emergency services or another qualified local resource. ECL does not provide emergency, crisis, therapeutic, legal, or investigative services.</p></Notice></Section>
    <Section surface eyebrow="What you can report" title="Choose the type that fits best"><div className="card-grid">{["Behavior, harassment, discrimination, or retaliation", "Privacy or sharing information without permission", "Project treatment, work, pay, or ownership", "How a partner or professional is described", "Community or one-on-one interaction", "Accessibility, safety, deception, or another risk"].map((item) => <article className="card" key={item}><h3>{item}</h3><p>Share only the information needed to understand the concern and send it to the right person.</p></article>)}</div></Section>
    <Section eyebrow="Privacy and review" title="Know the limits before sending"><ul className="list-check"><li>{responseTimes.concern} {responseTimes.caveat}</li><li>You may leave out your name and email unless you want a reply.</li><li>We cannot promise anonymity, especially when details may identify the situation.</li><li>We may need to share limited information for safety, a fair review, the law, or another person’s rights.</li><li>ECL does not claim to have trained safety specialists or promise a specific investigation or result.</li><li>Retaliation against people who report, witness, review, or ask us to reconsider a decision is not accepted.</li></ul></Section>
    <Section id="concern-form" surface eyebrow="Concern form" title="Submit the minimum information needed"><SubmissionForm type="concern_report" submissionAvailable={submissionAvailable} /><p style={{ marginTop: "1rem" }}>Alternate contact: <a href={`mailto:${site.email}`}>{site.email}</a>. Email is not guaranteed to be more secure; do not send sensitive attachments or extensive evidence without arranging a safer method.</p></Section>
    <Section eyebrow="After you send it" title="We may reply, ask questions, refer it, or review it"><p className="measure">A person may confirm receipt, ask a question, set an immediate limit, refer the issue, begin a first review, or explain that ECL does not have authority over it. A response does not guarantee privacy, a formal decision, a consequence, a solution, or referral to an outside organization.</p><div className="button-row"><Link className="button button-secondary" href="/community-standards">Community Standards</Link><Link className="text-link" href="/privacy">Privacy Policy</Link></div></Section>
  </>;
}
