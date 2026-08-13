import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Accessibility", "How we make the ECL website easier to use, what works now, known limits, and how to report a problem.", "/accessibility");

export default function AccessibilityPage() {
  return <><Breadcrumbs items={[{ label: "Accessibility" }]} /><PageHero eyebrow="Website accessibility" title="We want this website to work for more people" intro="We design and test the site so people can use a keyboard, enlarge text, reduce motion, and understand our forms. We keep improving it through testing and feedback." tone="ecl" />
    <Section eyebrow="What works now" title="Ways we make the site easier to use"><ul className="list-check">{["Clear page headings and sections", "A skip link and navigation that work with a keyboard", "Visible outlines around selected links and buttons", "Readable color contrast", "Clear form labels, instructions, and error messages", "Less animation when your device requests it", "Written explanations for diagrams", "Layouts that work on small screens and when text is enlarged", "Important information is never available only in an image"].map((item) => <li key={item}>{item}</li>)}</ul></Section>
    <Section surface eyebrow="Keyboard and forms" title="Familiar controls and clear forms"><p className="measure">Menus and forms use familiar browser controls. If a form has an error, the message identifies the field that needs attention and keeps the information you already entered.</p></Section>
    <Section eyebrow="Other formats" title="Ask for a format that is easier to use"><p className="measure">If a resource or process is difficult to use, contact us for a plain-text explanation or another suitable format. What we can provide depends on the source material and the people and time available.</p></Section>
    <Section surface eyebrow="Known limits" title="What may still be difficult"><ul className="list-boundary list-check"><li>We have not yet had the website checked by an independent accessibility specialist.</li><li>The external forms used by the Impact Hack may work differently from this website.</li><li>The site may work differently with some screen readers, browsers, or devices.</li><li>Some policy pages contain detailed information. Contact us if you need a plain-text explanation or another reasonable format.</li></ul></Section>
    <Section eyebrow="Feedback" title="Report an access problem"><p>Last reviewed: {site.lastReviewed}. We review accessibility messages sent through our general contact form. Some problems may take longer to fix.</p><div className="button-row"><Link className="button" href="/contact">Send accessibility feedback</Link><Link className="button button-secondary" href="/report-a-concern">Report a related concern</Link></div></Section>
  </>;
}
