import type { ReactNode } from "react";
import { currentStage } from "@/content/site";

export type NoticeTone = "context" | "neutral" | "ecl" | "dogoodie" | "liberation" | "warning" | "danger" | "success" | "trust" | "boundary" | "stage";

export function Notice({ title, children, tone = "context" }: { title: string; children: ReactNode; tone?: NoticeTone }) {
  return <aside className={`notice notice-${tone}`}><h2>{title}</h2><div>{children}</div></aside>;
}

export function CurrentStageNotice() {
  return <Notice title="Our current stage" tone="ecl"><p>{currentStage}</p></Notice>;
}

export function BoundaryNotice({ children }: { children: ReactNode }) {
  return <Notice title="Boundary to keep in view" tone="context">{children}</Notice>;
}
