import { Breadcrumbs } from "./Breadcrumbs";
import { PageHero } from "./PageHero";
import { policyUpdated, policyUpdatedIso } from "@/content/policies";

export type PolicySection = { title: string; body: readonly string[] };

export function PolicyLayout({ title, intro, sections, children }: { title: string; intro: string; sections: readonly PolicySection[]; children?: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: title }]} /><PageHero eyebrow="Trust & governance" title={title} intro={intro} tone="ecl" context="ecl" /><div className="container policy-layout"><aside aria-label="Policy information"><p><strong>Last updated</strong><br /><time dateTime={policyUpdatedIso}>{policyUpdated}</time></p></aside><div>{sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}{children}</div></div></>;
}
