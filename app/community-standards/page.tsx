import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Community Standards", "Respect, consent, privacy, conduct, solicitation, conflict, reporting, review, consequences, and reconsideration standards.", "/community-standards");
const standards = [
  ["Respect and dignity", "Treat people as people—not inputs, status markers, audiences to manipulate, or sources of owed labor."],
  ["Consent and boundaries", "Ask before involving, recording, quoting, introducing, showcasing, or expanding a request. A no, pause, or safe exit must be respected."],
  ["Privacy and confidentiality", "Share only what is necessary and authorized. Do not expose private identities, evidence, contact details, financial data, or confidential spaces."],
  ["No harassment or exploitation", "No harassment, discrimination, threats, retaliation, stalking, doxxing, scams, impersonation, coercion, deception, or exploitative labor."],
  ["Responsible technology and AI", "No credential theft, malware, deceptive automation, illegal scraping, spam, or AI-assisted harm. Verify material claims and protect private data."],
  ["Appropriate requests and solicitation", "Do not pressure people for work, money, purchasing, referrals, access, emotional labor, professional services, or introductions."],
  ["Conflicts and safe exit", "Disclose relevant conflicts, stop when risk appears, and use the project or community exit route without retaliation."],
];

export default function CommunityStandardsPage() {
  return <><Breadcrumbs items={[{ label: "Community Standards" }]} /><PageHero eyebrow="Shared commitments" title="Build boldly. Treat people carefully." intro="Action never excuses harm, deception, exploitation, or disrespect. These standards protect community participation, conversations, builder work, and collaboration without becoming an ideological loyalty test." tone="ecl" context="ecl" />
    <Section eyebrow="Why the standards exist" title="Shared commitments with enforceable boundaries"><p className="lede">Positive culture needs clear examples, fair review, confidentiality limits, consequences, and a route to question decisions.</p></Section>
    <Section surface eyebrow="Conduct" title="What participants commit to"><div className="card-grid">{standards.map(([title, text]) => <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></Section>
    <Section eyebrow="Reporting" title="Raise concerns without retaliation"><p className="measure">Builders, organizations, Network participants, partners, visitors, and people affected by ecosystem activity may use the concern route. Share only what is needed to review safely.</p><Link className="button" href="/report-a-concern">Report a concern</Link></Section>
    <Section surface eyebrow="Review and consequences" title="Proportionate human response"><p className="measure">A review may clarify facts, request information, set a boundary, warn, restrict, pause, remove, disqualify, end a project, correct public material, or refer a matter elsewhere. Action depends on available evidence, safety, authority, and applicable obligations.</p><Notice title="Fairness and limits" tone="boundary"><p>No outcome, confidentiality, or anonymous treatment is guaranteed. People should not retaliate against reporters, witnesses, reviewers, or those requesting reconsideration.</p></Notice></Section>
    <Section eyebrow="Appeals or reconsideration" title="A decision may be questioned"><p className="measure">When appropriate, a person affected by a moderation, eligibility, participation, or project decision may request reconsideration through contact or the concern process. Reconsideration does not guarantee reversal.</p></Section>
    <Section surface eyebrow="Updates" title="Standards will develop with real use"><p>Last updated: 3 August 2026. Material changes will be dated and reflected in related project terms and forms.</p><div className="button-row"><Link className="button button-secondary" href="/ethical-work">Ethical Work</Link><Link className="text-link" href="/privacy">Privacy Policy</Link></div></Section>
  </>;
}
