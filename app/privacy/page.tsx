import { PolicyLayout } from "@/components/PolicyLayout";
import { privacySections } from "@/content/policies";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Privacy Policy",
  "How the Ethical Capacity Lab public website handles form submissions, limited technical data, optional analytics, privacy choices, and external services.",
  "/privacy",
);

export default function PrivacyPage() {
  return <PolicyLayout title="Privacy Policy" intro="How this public website handles information, optional analytics, privacy choices, and links to separately operated services." sections={privacySections} />;
}
