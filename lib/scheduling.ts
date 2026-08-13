import { site } from "@/content/site";

export type OrganizationSchedulingState = {
  configured: boolean;
  href: string;
  label: string;
  external: boolean;
};

export function getOrganizationSchedulingState(): OrganizationSchedulingState {
  return {
    configured: true,
    href: site.consultationUrl,
    label: "Request a 30-minute consultation",
    external: true,
  };
}
