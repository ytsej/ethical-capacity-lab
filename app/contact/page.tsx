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

export const metadata = pageMetadata("Contact", "Choose a specialized Ethical Capacity Lab intake or send a data-minimized general message.", "/contact");

const contactRoutes = [
  { title: "Organization challenge", text: "Request review or an introductory conversation.", cta: "Describe an organization challenge", href: "/challenges", tone: "dogoodie" },
  { title: "Builder interest", text: "Share skills, proof, and realistic availability.", cta: "Express builder interest", href: "/builders#expression-of-interest", tone: "dogoodie" },
  { title: "Liberation Network", text: "Express interest or continue a trusted referral.", cta: "Explore Network participation", href: "/liberation/how-it-works#interest", tone: "liberation" },
  { title: "Partnership", text: "Propose a resource, service, introduction, or collaboration.", cta: "Propose a partnership", href: "/partners#partnership-inquiry", tone: "ecl" },
  { title: "Concern", text: "Use the separate conduct, privacy, safety, or treatment route.", cta: "Report a concern", href: "/report-a-concern", tone: "danger" },
] as const;

export default function ContactPage() {
  const submissionAvailable = isFormspreeConfigured("general_contact");

  return <>
    <Breadcrumbs items={[{ label: "Contact" }]} />
    <PageHero eyebrow="Contact" title="Use the route that fits the message" intro="Specialized forms provide the right context and safeguards. General contact is a fallback for administrative questions or when no other route fits." tone="ecl" context="ecl" />
    <Section context="neutral" eyebrow="Specialized pathways" title="Start with the clearest owner">
      <div className="card-grid">{contactRoutes.map((item) => <article className={`card route-card tone-${item.tone}`} key={item.title}><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" href={item.href}>{item.cta} <span aria-hidden="true">→</span></Link></article>)}</div>
    </Section>
    <Section surface context="ecl" eyebrow="Before sending" title="General contact is not an emergency service">
      <Notice title="Sensitive information warning" tone="warning"><p>Do not submit passwords, credentials, health records, legal files, financial-account data, private political records, or confidential evidence. For immediate danger, contact appropriate local emergency services; this site cannot provide emergency response.</p></Notice><p>{responseTimes.contact} {responseTimes.caveat} A message does not guarantee services or a particular response outcome.</p>
    </Section>
    <Section context="ecl" eyebrow="General message" title="Send a data-minimized inquiry">
      <SubmissionForm type="general_contact" submissionAvailable={submissionAvailable} /><p style={{ marginTop: "1rem" }}>Alternate email: <a href={`mailto:${site.email}`}>{site.email}</a>. Do not send sensitive information by email.</p>
    </Section>
  </>;
}
