import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ResourceCard } from "@/components/ResourceCard";
import { Section } from "@/components/Section";
import { faqs, resourceCategories, resources } from "@/content/resources";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Resources", "Public guides about organization support, ways for builders to contribute, responsible work, the Liberation Network, and how the three parts connect.", "/resources");

export default function ResourcesPage() {
  return <>
    <Breadcrumbs items={[{ label: "Resources" }]} />
    <PageHero eyebrow="Public learning" title="Learn before you decide what to do next." intro="Browse practical guides about the ecosystem, ethical work, builder participation, and the Liberation Network. You do not need to submit personal information to learn." tone="ecl">
      <div className="button-row"><Link className="button" href="#guides">Browse guides</Link><Link className="button button-secondary" href="/start">Not sure where to go? Start here</Link></div>
    </PageHero>
    <Section id="guides" surface="default" eyebrow="Practical guides" title="Choose a topic that fits">
      <div className="resource-categories">{resourceCategories.map((category) => { const categoryResources = resources.filter((resource) => resource.category === category); return <section aria-labelledby={`resource-category-${category.replaceAll(" ", "-").toLowerCase()}`} key={category}><h3 id={`resource-category-${category.replaceAll(" ", "-").toLowerCase()}`}>{category}</h3><div className="resource-grid">{categoryResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div></section>; })}</div>
    </Section>
    <Section id="faq" surface="warm" eyebrow="Frequently asked questions" title="Plain answers to common questions">
      <div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
    </Section>
  </>;
}
