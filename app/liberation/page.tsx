import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { networkActivities, networkIsNot, networkTrustSteps } from "@/content/liberation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Liberation from Suffering Network", "A relationship-based network for learning, useful conversations, trusted introductions, mutual support, and gradual collaboration.", "/liberation");

export default function LiberationPage() {
  return <>
    <Breadcrumbs items={[{ label: "Liberation Network" }]} />
    <PageHero eyebrow="Liberation from Suffering Network" title="Build useful relationships with people trying to reduce suffering." intro="The Network is a relationship-based space for learning, conversations, trusted introductions, mutual support, and gradual collaboration." tone="liberation">
      <p className="hero-boundary">It is not a job network, therapy service, guaranteed support system, or automatic membership program.</p>
      <div className="button-row"><Link className="button" href="/liberation/how-it-works">See how it works</Link><Link className="button button-secondary" href="/resources">Learn through public resources</Link></div>
    </PageHero>
    <Section id="what-people-do" surface="default" eyebrow="What people may do here" title="Start with useful, voluntary interaction" intro="Different people may choose different activities. None is required or guaranteed.">
      <ul className="activity-list">{networkActivities.map((item) => <li key={item}>{item}</li>)}</ul>
    </Section>
    <Section id="who-it-may-serve" surface="warm" tight eyebrow="Who it may be useful for" title="People who want to build trust gradually">
      <p className="lede">The Network may be useful for people who care about reducing suffering and are comfortable with clear consent, boundaries, and voluntary exchange. No political or moral identity test is required.</p>
    </Section>
    <Section id="contribute-and-receive" surface="default" eyebrow="What people may offer or receive" title="Possibilities, not promised benefits">
      <div className="exchange-statement"><p>People may sometimes offer or receive advice, introductions, skills, professional resources, referrals, purchases, collaboration, or other voluntary support.</p><strong>None of these outcomes is guaranteed, required, or owed.</strong></div>
    </Section>
    <Section surface="liberation" id="trust" eyebrow="How trust develops" title="Take one small step at a time">
      <ol className="simple-steps">{networkTrustSteps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}</ol><p className="section-footnote">This is not a ranking system or automatic ladder.</p>
    </Section>
    <Section surface="default" tight id="relationship-to-dogoodie" eyebrow="Relationship to DoGoodie" title="Connected possibilities, but separate decisions">
      <p className="measure">The Network may sometimes lead to introductions or collaborations connected to DoGoodie, but the two are separate. Network participation does not guarantee project access, paid work, clients, or other material benefits.</p>
    </Section>
    <Section surface="default" eyebrow="What is not guaranteed" title="Clear boundaries protect relationships">
      <ul className="list-boundary list-check compact-rule-list">{networkIsNot.map((item) => <li key={item}>{item}</li>)}</ul>
    </Section>
    <Section id="express-interest" surface="liberation" tight eyebrow="Your next step" title="Learn more before sharing information">
      <p className="measure">Review the simple process, what a first conversation is like, and the short interest form.</p><div className="button-row"><Link className="button" href="/liberation/how-it-works">See how the Network works</Link><Link className="button button-secondary" href="/resources">Browse public resources</Link></div>
    </Section>
  </>;
}
