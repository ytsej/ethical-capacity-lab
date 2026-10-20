import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { branchIcons } from "./icons";
import { LogoMark } from "./Logo";

type PageContext = "neutral" | "ecl" | "dogoodie" | "liberation";

export function PageHero({ eyebrow, title, intro, tone = "neutral", context = tone, compact = false, icon, children }: { eyebrow: string; title: string; intro: string; tone?: PageContext; context?: PageContext; compact?: boolean; icon?: LucideIcon; children?: ReactNode }) {
  const Icon = icon ?? branchIcons[context];

  return (
    <section className={`page-hero ${compact ? "page-hero-compact" : ""} tone-${tone} context-${context}`}>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lede">{intro}</p>
          {children}
        </div>
        <div className="page-hero-emblem" aria-hidden="true">
          <span className="emblem-ring emblem-ring-outer" />
          <span className="emblem-ring emblem-ring-inner" />
          <span className="emblem-core"><Icon strokeWidth={1.5} /></span>
          <span className="emblem-seed"><LogoMark /></span>
        </div>
      </div>
    </section>
  );
}
