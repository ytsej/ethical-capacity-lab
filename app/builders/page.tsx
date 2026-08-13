import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubmissionForm } from "@/components/SubmissionForm";
import { builderContributionGroups, builderParticipationModes, builderProtections } from "@/content/builder-pathways";
import { responseTimes } from "@/content/response-times";
import { isFormspreeConfigured } from "@/lib/submissions/formspree";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("For Builders", "Ways to contribute technical, creative, research, design, content, and project-support skills through clearly defined DoGoodie work.", "/builders");

export default function BuildersPage() {
  const submissionAvailable = isFormspreeConfigured("builder_interest");

  return <>
    <Breadcrumbs items={[{ label: "For Builders" }]} />
    <PageHero eyebrow="For Builders" title="Use your skills on real, clearly defined work." intro="Builders may contribute technical, creative, research, design, content, or project-support skills when a project has a clear purpose, responsible owner, expectations, and review process." tone="ecl" context="dogoodie">
      <p className="hero-boundary">Expressing interest is not a job application and does not guarantee paid work or future projects.</p>
      <div className="button-row"><Link className="button" href="#expression-of-interest">Express interest</Link><Link className="button button-secondary" href="#opportunities">See current opportunities</Link></div>
    </PageHero>
    <Section id="what-builders-do" surface="dogoodie" eyebrow="What builders may contribute" title="Useful skills take several forms" intro="Students, self-taught contributors, and experienced specialists may all share their interest. A clear work example and honest availability matter more than prestigious qualifications.">
      <div className="phase2-topic-grid">{builderContributionGroups.map((item) => <article className="phase2-topic" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </Section>
    <Section surface="default" id="ways-to-participate" eyebrow="Ways to participate" title="Choose the kind of involvement that fits now">
      <div className="participation-options">{builderParticipationModes.map((mode) => <article key={mode.title}><h3>{mode.title}</h3><p>{mode.description}</p></article>)}</div>
      <p className="section-footnote">These are possible ways to participate, not guaranteed stages or an automatic ladder.</p>
    </Section>
    <Section surface="warm" eyebrow="Builder protections" title="What you should be able to expect">
      <div className="split compact-split"><ul className="list-check">{builderProtections.map((item) => <li key={item}>{item}</li>)}</ul><div><p>We must say before work begins whether it is paid, voluntary, or for learning. We will not ask people to complete free work as a hidden part of selection.</p><Link className="text-link" href="/ethical-work">Read how we work responsibly <span aria-hidden="true">→</span></Link></div></div>
    </Section>
    <Section id="opportunities" surface="dogoodie" eyebrow="Current opportunities" title="No additional public builder opportunity is listed right now">
      <div className="form-unavailable"><h3>General interest remains open</h3><p>You may share general interest, but this is not a current job opening or a promise of work. Any future listing must state what the work includes, whether and how it is paid, who owns the work, the timeline, the review process, and how it ends.</p><Link className="text-link" href="/impact-hack">Review the current $5 Impact Hack program</Link></div>
    </Section>
    <Section surface="default" tight eyebrow="Relationship to the Liberation Network" title="Connected relationships, separate decisions">
      <p className="measure">Ways for builders to contribute and the Liberation Network may overlap through relationships or collaboration, but they are separate. Being a builder does not automatically give Network access, and Network participation does not automatically create project work or payment.</p><Link className="text-link" href="/liberation">Learn about the Liberation Network <span aria-hidden="true">→</span></Link>
    </Section>
    <Section id="expression-of-interest" surface="default" eyebrow="Share your interest" title="Tell us what you can contribute">
      <p className="measure">You do not need a polished portfolio. This first step usually takes about 2–4 minutes.</p><p>{responseTimes.builder} {responseTimes.caveat}</p><SubmissionForm type="builder_interest" submissionAvailable={submissionAvailable} />
    </Section>
    <Section surface="warm" tight eyebrow="More information" title="Review the details when you need them">
      <nav className="trust-links-light" aria-label="Information for builders"><Link href="/ethical-work">Working Responsibly</Link><Link href="/community-standards">Community Standards</Link><Link href="/report-a-concern">Report a Concern</Link></nav>
    </Section>
  </>;
}
