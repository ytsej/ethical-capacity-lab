import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { PolicyLayout } from "@/components/PolicyLayout";
import { cookieSections } from "@/content/policies";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Cookie and Analytics Notice",
  "How the Ethical Capacity Lab website uses essential preference storage and consent-controlled Google Analytics cookies.",
  "/cookies",
);

export default function CookiesPage() {
  return (
    <PolicyLayout
      title="Cookie and Analytics Notice"
      intro="How this website remembers your privacy choice and uses optional analytics only with permission."
      sections={cookieSections}
    >
      <section>
        <h2>Review your current choice</h2>
        <p>You can reopen the analytics preference controls whenever you want.</p>
        <CookieSettingsButton className="button button-secondary" />
      </section>
    </PolicyLayout>
  );
}
