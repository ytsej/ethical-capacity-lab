import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AudiencePathCard } from "@/components/AudiencePathCard";
import { OrganizationCallActions } from "@/components/OrganizationCallActions";
import { ServiceGroups } from "@/components/ServiceGroups";
import { Section } from "@/components/Section";
import { StatusPill } from "@/components/StatusPill";
import { IconTile, branchIcons, processIcons, trustIcons } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import {
  homepageAudiencePaths,
  homepageClientSteps,
  homepageEcosystemParts,
  homepageTrustCommitments,
  homepageTrustLinks,
} from "@/content/home";
import { workItems } from "@/content/work";
import { JsonLd } from "@/components/JsonLd";
import { site, siteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "The Ethical Capacity Lab | Practical, Responsible Action",
  "The Ethical Capacity Lab connects practical project support through DoGoodie with trusted relationship-building through the Liberation from Suffering Network.",
  "/",
  { absoluteTitle: true },
);

const workArt: Record<string, { src: string; alt: string } | undefined> = {
  "five-dollar-impact-hack": { src: "/dogoodie/impact-hack.jpg", alt: "The $5 Impact Hack campaign artwork" },
};

export default function HomePage() {
  const homepageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl()}#organization`,
        name: site.name,
        alternateName: site.shortName,
        url: siteUrl(),
        description: site.description,
        email: site.email,
        logo: { "@type": "ImageObject", url: siteUrl("/icon.svg"), width: 128, height: 128 },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl()}#website`,
        name: site.name,
        alternateName: site.shortName,
        url: siteUrl(),
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl()}#organization` },
      },
    ],
  };
  const DoGoodieIcon = branchIcons.dogoodie;
  const LiberationIcon = branchIcons.liberation;
  const LabIcon = branchIcons.ecl;

  return (
    <div className="homepage">
      <JsonLd data={homepageSchema} />
      <section className="hero-home hero-home-client context-ecl">
        <div className="hero-backdrop" aria-hidden="true">
          <span className="hero-glow hero-glow-gold" />
          <span className="hero-glow hero-glow-green" />
          <LogoMark className="hero-watermark" />
        </div>
        <div className="container hero-home-grid">
          <div className="hero-home-copy">
            <p className="hero-kicker"><LogoMark /> <span>The Ethical Capacity Lab</span></p>
            <h1>Turning good intentions into <em>useful, responsible action.</em></h1>
            <p className="lede">
              The Ethical Capacity Lab brings together practical project support through DoGoodie and trusted relationship-building through the Liberation from Suffering Network, guided by shared standards and protections.
            </p>
            <p className="hero-follow-up">
              Organizations can get practical help, builders can contribute their skills, and values-aligned people can learn, connect, and explore collaboration over time.
            </p>
            <div className="button-row">
              <Link className="button" href="#services">See what we can do <ArrowRight aria-hidden="true" strokeWidth={2} /></Link>
              <Link className="button button-secondary" href="/start">Find your path</Link>
            </div>
            <ul className="hero-promises" aria-label="Three promises behind the work">
              {homepageTrustCommitments.map((commitment) => (
                <li key={commitment.title}><Check aria-hidden="true" strokeWidth={2.5} />{commitment.title}</li>
              ))}
            </ul>
          </div>
          <aside className="ecosystem-hero-visual" aria-label="Ethical Capacity Lab ecosystem roles">
            <p className="eyebrow">One ecosystem, distinct roles</p>
            <div className="ecosystem-hero-branches">
              <article className="tone-dogoodie">
                <IconTile icon={DoGoodieIcon} tone="dogoodie" />
                <span>Practical work</span>
                <h3>DoGoodie</h3>
                <p>Practical work and organizational support</p>
              </article>
              <article className="tone-liberation">
                <IconTile icon={LiberationIcon} tone="liberation" />
                <span>Relationship network</span>
                <h3>Liberation Network</h3>
                <p>Trusted relationships and gradual collaboration</p>
              </article>
            </div>
            <svg className="ecosystem-hero-stems" viewBox="0 0 400 64" preserveAspectRatio="none" aria-hidden="true">
              <path d="M200 64 C200 30 100 34 100 0" />
              <path d="M200 64 C200 30 300 34 300 0" />
            </svg>
            <div className="ecosystem-hero-foundation">
              <IconTile icon={LabIcon} tone="ecl" size="lg" />
              <div>
                <span>Shared foundation</span>
                <h2>The Ethical Capacity Lab</h2>
                <p>Shared standards and protections</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Section
        id="services"
        surface="dogoodie"
        context="dogoodie"
        eyebrow="Practical help through DoGoodie"
        title="What can we help you with?"
        intro="Start with the problem you have. These four groups show the kinds of work and outputs DoGoodie can responsibly explore with an organization."
      >
        <ServiceGroups />
        <p className="section-footnote">Every request is reviewed for suitability, safety, what the work would include, and whether the right people and time are available. A service group does not guarantee acceptance or a particular result.</p>
      </Section>

      <Section className="homepage-challenge" surface="default" context="dogoodie" tight>
        <div className="client-cta-panel">
          <div className="client-cta-copy">
            <p className="eyebrow">For organizations</p>
            <h2>Have a specific challenge?</h2>
            <p className="lede">If you represent an organization and have a real problem, project, workflow, or idea you want to explore, request a 30-minute consultation.</p>
            <p>The request opens in the Operations Hub, where consultation details are recorded. A consultation is for clarification and fit—not open-ended consulting or a promise of work.</p>
          </div>
          <OrganizationCallActions />
          <LogoMark className="client-cta-mark" />
        </div>
      </Section>

      <Section
        className="homepage-ecosystem"
        surface="warm"
        context="ecl"
        eyebrow="One ecosystem, three roles"
        title="Three connected parts, different roles"
        intro="The Ethical Capacity Lab provides the shared foundation. DoGoodie handles practical work, while the Liberation Network makes room for trusted relationships to develop over time."
      >
        <div className="ecosystem-summary-grid">
          {homepageEcosystemParts.map((part) => (
            <article className={`ecosystem-summary tone-${part.tone}`} key={part.id}>
              <IconTile icon={branchIcons[part.tone]} tone={part.tone} size="lg" />
              <p className="eyebrow">{part.label}</p>
              <h3>{part.title}</h3>
              <p>{part.description}</p>
              <Link className="text-link" href={part.href}>{part.cta} <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
        <p className="ecosystem-boundary">These parts support one another, but services, builder work, paid projects, partnerships, confidential access, and Network participation remain separate decisions.</p>
        <Link className="text-link" href="/ecosystem">See how the ecosystem works <span aria-hidden="true">→</span></Link>
      </Section>

      <Section
        className="homepage-paths"
        surface="default"
        context="neutral"
        eyebrow="Choose the path that fits today"
        title="What brings you here?"
        intro="Choose the path that best matches what you need today."
      >
        <div className="path-grid path-grid-compact">
          {homepageAudiencePaths.map((path) => <AudiencePathCard compact key={path.href} path={path} />)}
        </div>
      </Section>

      <Section className="homepage-process" surface="dogoodie" context="dogoodie" eyebrow="A simple first step" title="How working with us can begin">
        <ol className="client-process">
          {homepageClientSteps.map((step, index) => {
            const StepIcon = processIcons[index];
            return (
              <li key={step.title}>
                <span aria-hidden="true">{index + 1}</span>
                <StepIcon className="client-process-icon" aria-hidden="true" strokeWidth={1.5} />
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </li>
            );
          })}
        </ol>
        <p className="process-boundary">Contacting us does not guarantee acceptance, work, funding, or a continuing engagement.</p>
      </Section>

      <Section
        className="homepage-trust"
        surface="dark"
        context="ecl"
        eyebrow="Why trust the process?"
        title="Three promises behind the work"
        intro="Trust should come from clear expectations, human judgment, and honest evidence—not broad promises."
      >
        <div className="trust-panel trust-panel-compact">
          <div className="trust-grid">
            {homepageTrustCommitments.map((commitment, index) => (
              <article key={commitment.title}>
                <IconTile icon={trustIcons[index]} tone="dark" />
                <h3>{commitment.title}</h3>
                <p>{commitment.text}</p>
              </article>
            ))}
          </div>
          <nav className="trust-links" aria-label="Trust and safety pages">
            {homepageTrustLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>
            ))}
          </nav>
        </div>
      </Section>

      <Section className="homepage-evidence" surface="warm" context="ecl" eyebrow="Work and evidence" title="See the work behind the idea" intro="We show current work honestly and separate real outputs from claims that are not yet proven.">
        <div className="evidence-grid evidence-grid-compact">
          {workItems.map((item) => {
            const art = workArt[item.slug];
            return (
              <article className="evidence-card" key={item.slug}>
                <div className={`evidence-media ${art ? "" : "evidence-media-diagram"}`} data-reveal="clip">
                  {art ? (
                    <Image src={art.src} alt={art.alt} width={800} height={800} sizes="(max-width: 800px) 100vw, 600px" />
                  ) : (
                    <div className="evidence-diagram" aria-hidden="true">
                      <span className="tone-ecl"><LabIcon strokeWidth={1.5} /></span>
                      <span className="tone-dogoodie"><DoGoodieIcon strokeWidth={1.5} /></span>
                      <span className="tone-liberation"><LiberationIcon strokeWidth={1.5} /></span>
                    </div>
                  )}
                </div>
                <div className="evidence-body">
                  <StatusPill label={item.displayStatus} tone={item.displayStatus === "Pilot" ? "pilot" : "review"} />
                  <h3>{item.title}</h3>
                  <p><strong>Output:</strong> {item.output}</p>
                  <p className="evidence-limitation"><strong>Current limitation:</strong> {item.limitations}</p>
                  <Link className="text-link" href={item.href}>Review {item.title} <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="empty-evidence">Reviewed client work will be added after the client gives permission to publish it.</p>
        <div className="stage-statement stage-statement-compact">
          <p>We are building this model through a small number of real projects and clearly defined collaborations. We do not claim global scale, guaranteed opportunities, or a fully developed member platform.</p>
        </div>
        <div className="button-row"><Link className="button button-secondary" href="/work">View work and case studies</Link></div>
      </Section>

      <Section className="homepage-final" surface="default" context="dogoodie" tight>
        <div className="final-cta">
          <LogoMark className="final-cta-mark" />
          <p className="eyebrow">A clear next step</p>
          <h2>Need help with a real project or challenge?</h2>
          <p className="lede">Tell us what you are trying to solve. We will review the request and explain the most useful available next step.</p>
          <OrganizationCallActions secondaryHref="/start" secondaryLabel="Not sure where you fit? Start here" />
        </div>
      </Section>
    </div>
  );
}
