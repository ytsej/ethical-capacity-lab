import Link from "next/link";
import { getOrganizationSchedulingState } from "@/lib/scheduling";

export function OrganizationCallActions({ secondaryLabel = "Describe your challenge instead", secondaryHref = "/challenges" }: { secondaryLabel?: string; secondaryHref?: string }) {
  const scheduling = getOrganizationSchedulingState();

  return (
    <div className="button-row organization-call-actions">
      {scheduling.external ? (
        <a className="button" href={scheduling.href} target="_blank" rel="noreferrer" data-analytics-event="organization_support_clicked">
          {scheduling.label} <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <Link className="button" href={scheduling.href} data-analytics-event="organization_support_clicked">{scheduling.label}</Link>
      )}
      <Link className="button button-secondary" href={secondaryHref} data-analytics-event="organization_support_clicked">{secondaryLabel}</Link>
    </div>
  );
}
