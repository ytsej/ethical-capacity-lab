export type StatusTone = "info" | "pilot" | "review" | "verified" | "limited" | "success" | "warning" | "danger";

export function StatusPill({ label, tone }: { label: string; tone: StatusTone }) {
  return <span className={`pill status-pill pill-${tone}`}>{label}</span>;
}
