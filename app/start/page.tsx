import type { Metadata } from "next";
import { AudiencePathCard } from "@/components/AudiencePathCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { QRCodeCard } from "@/components/QRCodeCard";
import { Section } from "@/components/Section";
import { startPaths } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Start Here", "Choose the Ethical Capacity Lab option that best matches what brings you here.", "/start");

export default function StartPage() {
  return <>
    <Breadcrumbs items={[{ label: "Start Here" }]} />
    <PageHero eyebrow="Start Here" title="What brings you here?" intro="Choose the option that best matches what you need today. You do not need to understand the whole ecosystem before getting started." tone="ecl" />
    <Section surface="default" eyebrow="Choose your path" title="Five clear places to begin" intro="Each option opens an explanation before any form. Choosing a path does not create approval, membership, or a promise of support.">
      <div className="path-grid path-grid-compact">{startPaths.map((path) => <AudiencePathCard compact key={path.href} path={path} />)}</div>
    </Section>
    <Section surface="warm" tight eyebrow="QR-ready entry" title="Keep this page as the shared starting point" intro="The QR code points to this page without third-party tracking. It can be reused in conversations, events, and printed material.">
      <QRCodeCard />
    </Section>
  </>;
}
