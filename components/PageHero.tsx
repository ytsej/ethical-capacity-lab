import type { ReactNode } from "react";

type PageContext = "neutral" | "ecl" | "dogoodie" | "liberation";

export function PageHero({ eyebrow, title, intro, tone = "neutral", context = tone, compact = false, children }: { eyebrow: string; title: string; intro: string; tone?: PageContext; context?: PageContext; compact?: boolean; children?: ReactNode }) {
  return (
    <section className={`page-hero ${compact ? "page-hero-compact" : ""} tone-${tone} context-${context}`}>
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{intro}</p>
        {children}
      </div>
    </section>
  );
}
