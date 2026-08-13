import { Breadcrumbs } from "./Breadcrumbs";
import { PageHero } from "./PageHero";
import { policyUpdated } from "@/content/policies";

export type PolicySection = { title: string; body: readonly string[] };

export function PolicyLayout({ title, intro, sections, children }: { title: string; intro: string; sections: readonly PolicySection[]; children?: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: title }]} /><PageHero eyebrow="Trust & governance" title={title} intro={intro} tone="ecl" context="ecl" /><div className="container policy-layout"><aside><p><strong>Last updated</strong><br />{policyUpdated}</p><p>This page describes the current public website.</p></aside><div>{sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}{children}</div></div></>;
}
