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

export const metadata = pageMetadata("Contact", "Choose the contact form that matches your message, or send a general message.", "/contact");

const contactRoutes = [
  { title: "Organization challenge", text: "Request review or an introductory conversation.", cta: "Describe an organization challenge", href: "/challenges", tone: "dogoodie" },
  { title: "Builder interest", text: "Share your skills, a work example, and honest availability.", cta: "Share builder interest", href: "/builders#expression-of-interest", tone: "dogoodie" },
  { title: "Liberation Network", text: "Express interest or continue a trusted referral.", cta: "Explore Network participation", href: "/liberation/how-it-works#interest", tone: "liberation" },
  { title: "Partnership", text: "Propose a resource, service, introduction, or collaboration.", cta: "Propose a partnership", href: "/partners#partnership-inquiry", tone: "ecl" },
  { title: "Concern", text: "Use the separate conduct, privacy, safety, or treatment route.", cta: "Report a concern", href: "/report-a-concern", tone: "danger" },
] as const;

export default function ContactPage() {
  const submissionAvailable = isFormspreeConfigured("general_contact");

  return <>
    <Breadcrumbs items={[{ label: "Contact" }]} />
    <PageHero eyebrow="Contact" title="Choose the form that fits your message" intro="Each form asks the questions needed for that type of message. Use general contact for basic questions or when no other option fits." tone="ecl" context="ecl" />
    <Section context="neutral" eyebrow="Contact options" title="Choose the right form">
      <div className="card-grid">{contactRoutes.map((item) => <article className={`card card-with-action route-card tone-${item.tone}`} key={item.title}><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" href={item.href}>{item.cta} <span aria-hidden="true">→</span></Link></article>)}</div>
    </Section>
    <Section surface context="ecl" eyebrow="Before sending" title="General contact is not an emergency service">
      <Notice title="Sensitive information warning" tone="warning"><p>Do not submit passwords, account access details, health records, legal files, financial-account data, private political records, or confidential evidence. For immediate danger, contact appropriate local emergency services; this site cannot provide emergency response.</p></Notice><p>{responseTimes.contact} {responseTimes.caveat} A message does not guarantee services or a particular response.</p>
    </Section>
    <Section context="ecl" eyebrow="General message" title="Send a general message">
      <SubmissionForm type="general_contact" submissionAvailable={submissionAvailable} /><p style={{ marginTop: "1rem" }}>Alternate email: <a href={`mailto:${site.email}`}>{site.email}</a>. Do not send sensitive information by email.</p>
    </Section>
  </>;
}
