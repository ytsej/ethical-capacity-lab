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
    <Section eyebrow="Why the standards exist" title="Shared rules with clear limits"><p className="lede">A positive culture needs clear examples, fair review, honest privacy limits, consequences, and a way to question decisions.</p></Section>
    <Section surface eyebrow="Conduct" title="What participants commit to"><div className="card-grid">{standards.map(([title, text]) => <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></Section>
    <Section eyebrow="Reporting" title="Raise concerns without retaliation"><p className="measure">Builders, organizations, Network participants, partners, visitors, and people affected by ecosystem activity may use the concern route. Share only what is needed to review safely.</p><Link className="button" href="/report-a-concern">Report a concern</Link></Section>
    <Section surface eyebrow="Review and consequences" title="A person chooses a response that fits the situation"><p className="measure">A review may check the facts, request information, set a limit, give a warning, restrict or pause access, remove someone, end a project, correct public information, or refer the matter elsewhere. The response depends on the available information, safety, ECL’s authority, and relevant responsibilities.</p><Notice title="Fairness and limits" tone="boundary"><p>We cannot guarantee a particular result, complete privacy, or anonymity. People must not retaliate against those who report, witness, review, or ask us to reconsider a decision.</p></Notice></Section>
    <Section eyebrow="Questioning a decision" title="You may ask us to review a decision again"><p className="measure">When appropriate, a person affected by a content, participation, program, or project decision may ask for another review through general contact or the concern process. Another review does not guarantee that the decision will change.</p></Section>
    <Section surface eyebrow="Updates" title="Standards will develop with real use"><p>Last updated: 3 August 2026. Material changes will be dated and reflected in related project terms and forms.</p><div className="button-row"><Link className="button button-secondary" href="/ethical-work">Ethical Work</Link><Link className="text-link" href="/privacy">Privacy Policy</Link></div></Section>
  </>;
}
