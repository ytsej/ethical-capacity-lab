import {
  AppWindow,
  BookOpen,
  Building2,
  ClipboardCheck,
  Compass,
  FlaskConical,
  Hammer,
  Handshake,
  HeartHandshake,
  Landmark,
  MessagesSquare,
  Search,
  ShieldCheck,
  Signpost,
  UserCheck,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type BranchTone = "ecl" | "dogoodie" | "liberation" | "neutral";

/** One icon per branch, reused wherever a branch is introduced. */
export const branchIcons: Record<BranchTone, LucideIcon> = {
  ecl: Landmark,
  dogoodie: Wrench,
  liberation: HeartHandshake,
  neutral: Compass,
};

export const pathIcons: Record<string, LucideIcon> = {
  "/organizations": Building2,
  "/builders": Hammer,
  "/liberation": HeartHandshake,
  "/partners": Handshake,
  "/resources": BookOpen,
};

export const serviceIcons: Record<string, LucideIcon> = {
  research: Search,
  build: AppWindow,
  improve: Workflow,
  test: FlaskConical,
};

export const trustIcons: readonly LucideIcon[] = [ClipboardCheck, UserCheck, ShieldCheck];

export const processIcons: readonly LucideIcon[] = [MessagesSquare, Signpost, Handshake];

export function IconTile({ icon: Icon, tone = "ecl", size = "md" }: { icon: LucideIcon; tone?: BranchTone | "dark"; size?: "sm" | "md" | "lg" }) {
  return (
    <span className={`icon-tile icon-tile-${tone} icon-tile-${size}`} aria-hidden="true">
      <Icon strokeWidth={1.75} />
    </span>
  );
}
