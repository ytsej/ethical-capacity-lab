import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubmissionForm } from "@/components/SubmissionForm";
import { conversationDetails, networkTrustSteps } from "@/content/liberation";
import { responseTimes } from "@/content/response-times";
import { isFormspreeConfigured } from "@/lib/submissions/formspree";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("How the Liberation Network Works", "How public learning, a short interest form, a first conversation, and possible voluntary next steps work.", "/liberation/how-it-works");

export default function LiberationHowPage() {
  const submissionAvailable = isFormspreeConfigured("liberation_interest");

  return <>
    <Breadcrumbs items={[{ label: "Liberation Network", href: "/liberation" }, { label: "How It Works" }]} />
    <PageHero eyebrow="How the Network works" title="Start with a small, human next step." intro="You can learn publicly, express your own interest, or continue a referral. Every later step depends on consent, mutual interest, trust, and current capacity." tone="liberation" />
    <Section surface="default" eyebrow="A simple participation journey" title="The process can pause at any point">
      <ol className="simple-steps">{networkTrustSteps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}</ol><p className="section-footnote">A referral adds context but does not guarantee a conversation or any later step.</p>
    </Section>
    <Section id="conversation" surface="liberation" eyebrow="Approximately 30 minutes" title="What the first conversation is like">
      <div className="conversation-grid"><article><h3>Purpose and format</h3><ul className="list-check"><li>One-to-one, with a clear purpose</li><li>Time to clarify questions, interest, and practical fit</li><li>No obligation to continue</li><li>You may decline a question or stop</li></ul></article><article><h3>What it does not provide</h3><ul className="list-boundary list-check"><li>Therapy or crisis support</li><li>Legal, financial, or other professional advice</li><li>A promise of work, money, referrals, support, or membership</li></ul></article></div>
    </Section>
    <Section surface="warm" eyebrow="Privacy and consent" title="Share only what this decision needs">
      <p className="measure">{conversationDetails.avoid}</p><Notice title="Privacy limits" tone="trust"><p>{conversationDetails.privacy}</p></Notice>
    </Section>
    <Section surface="default" eyebrow="Possible next steps" title="No further action is also a valid outcome">
      <ul className="activity-list activity-list-compact">{["Another conversation", "A useful resource", "An introduction", "A small collaboration", "A referral", "Public learning only", "No further action"].map((item) => <li key={item}>{item}</li>)}</ul><p className="section-footnote">No option is presented as success or failure. Any introduction or collaboration requires fresh consent from everyone involved.</p>
    </Section>
    <Section id="interest" surface="liberation" eyebrow="Short interest form" title="Tell us what you would prefer">
      <p className="measure">Use this form for your own interest or a referral made with permission. Please do not share another person’s private contact details unless you have their permission.</p><p>{responseTimes.liberation} {responseTimes.caveat}</p><SubmissionForm type="liberation_interest" submissionAvailable={submissionAvailable} />
    </Section>
    <Section surface="default" tight eyebrow="Questions and supporting links" title="Review before deciding">
      <div className="faq-list"><details><summary>Does a conversation create membership?</summary><p>No. It is an introductory conversation, not membership or guaranteed access.</p></details><details><summary>Can a trusted referral guarantee acceptance?</summary><p>No. The person referred still chooses whether to proceed, and any next step depends on mutual fit and capacity.</p></details><details><summary>What if no next step fits?</summary><p>A resource, pause, or respectful close can be the appropriate result.</p></details></div><nav className="trust-links-light" aria-label="Network safeguards"><Link href="/community-standards">Community Standards</Link><Link href="/privacy">Privacy</Link><Link href="/report-a-concern">Report a Concern</Link></nav>
    </Section>
  </>;
}
