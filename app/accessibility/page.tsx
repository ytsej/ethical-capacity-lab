import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Accessibility", "ECL website accessibility commitment, current measures, known limitations, alternative formats, and feedback route.", "/accessibility");

export default function AccessibilityPage() {
  return <><Breadcrumbs items={[{ label: "Accessibility" }]} /><PageHero eyebrow="Access commitment" title="Build access into the public front door" intro="We aim to apply WCAG 2.2 AA practices and improve through testing and feedback. We do not claim full conformance without independent verification." tone="ecl" />
    <Section eyebrow="Current measures" title="What the website supports"><ul className="list-check">{["Semantic landmarks and one logical page heading", "Skip link and keyboard-reachable navigation", "Visible focus styles and Escape-to-close menus", "Contrast-reviewed brand colors", "Accessible labels, hints, inline errors, and error summaries", "Reduced-motion support", "Text alternatives for semantic diagrams", "Responsive layouts from 320px and zoom-friendly text", "No required information provided only through images"].map((item) => <li key={item}>{item}</li>)}</ul></Section>
    <Section surface eyebrow="Keyboard and forms" title="Native behavior first"><p className="measure">Menus use buttons, links, details, and focus management. Forms associate errors with controls, move focus to the error summary, preserve typed values on validation failure, and state loading, unavailable, error, and confirmed-success states.</p></Section>
    <Section eyebrow="Alternative formats" title="Ask for a reasonable format"><p className="measure">If a resource or process is difficult to use, contact us for a plain-text explanation or another reasonable format. Availability depends on the source and current capacity.</p></Section>
    <Section surface eyebrow="Known limitations" title="Where access may vary"><ul className="list-boundary list-check"><li>We have not yet commissioned an independent accessibility review.</li><li>Third-party Impact Hack Google Forms have their own accessibility behavior.</li><li>Some screen-reader, browser, and device combinations may behave differently.</li><li>Some policy sections are necessarily detailed; contact us if you need a plain-text explanation or another reasonable format.</li></ul></Section>
    <Section eyebrow="Feedback" title="Report an access barrier"><p>Last reviewed: {site.lastReviewed}. We aim to handle accessibility feedback through the general-contact target, but complex remediation may take longer.</p><div className="button-row"><Link className="button" href="/contact">Send accessibility feedback</Link><Link className="button button-secondary" href="/report-a-concern">Report a related concern</Link></div></Section>
  </>;
}
