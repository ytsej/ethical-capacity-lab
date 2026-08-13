import type { ReactNode } from "react";

export type SectionSurface = "default" | "warm" | "dogoodie" | "liberation" | "dark";
export type SectionContext = "neutral" | "ecl" | "dogoodie" | "liberation";

export function Section({ id, className = "", eyebrow, title, intro, children, surface, context, tight = false }: { id?: string; className?: string; eyebrow?: string; title?: string; intro?: string; children: ReactNode; surface?: boolean | SectionSurface; context?: SectionContext; tight?: boolean }) {
  const surfaceTone: SectionSurface = surface === true ? "warm" : surface || "default";

  return (
    <section id={id} className={`${tight ? "section-tight" : "section"} section-surface surface-${surfaceTone} ${context ? `context-${context}` : ""} ${className}`.trim()}>
      <div className="container">
        {(eyebrow || title || intro) && <div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}{title && <h2>{title}</h2>}{intro && <p className="lede">{intro}</p>}</div>}
        {children}
      </div>
    </section>
  );
}
