import { PolicyLayout } from "@/components/PolicyLayout";
import { termsSections } from "@/content/policies";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Terms of Use",
  "Terms for using the Ethical Capacity Lab public informational website, resources, forms, links, and available options.",
  "/terms",
);

export default function TermsPage() {
  return <PolicyLayout title="Terms of Use" intro="Terms for using this public informational website, its resources, forms, links, and available options." sections={termsSections} />;
}
