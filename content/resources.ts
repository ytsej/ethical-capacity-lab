export type Resource = {
  id: string;
  title: string;
  description: string;
  audience: string;
  owner: string;
  updated: string;
  source: string;
  limitations: string;
  nextLabel: string;
  nextHref: string;
  steps: readonly string[];
  category: "For Organizations" | "For Builders" | "Liberation Network" | "Ethical Work and Safeguards" | "Understanding the Ecosystem";
};

const shared = {
  owner: "The Ethical Capacity Lab",
  updated: "3 August 2026",
  source: "Approved ECL Deliverables 1–6 and the public implementation brief",
  limitations: "Educational information only; it is not clinical, legal, financial, therapeutic, or other regulated professional advice.",
} as const;

export const resources: Resource[] = [
  { id: "scope-small-impact-experiment", category: "For Organizations", title: "How to scope a small impact experiment", description: "Turn a broad intention into a small, safe-to-fail test with useful evidence.", audience: "Organizations and builders", ...shared, nextLabel: "Get organization support", nextHref: "/organizations", steps: ["Name one problem and who is affected.", "Choose one fixed output and one responsible owner.", "Set a short timeline, risk boundary, and review point.", "Decide what evidence would be useful before beginning.", "Document the result, limitations, and what remains unproven."] },
  { id: "ethical-collaboration", category: "Ethical Work and Safeguards", title: "What ethical collaboration requires", description: "A practical checklist for scope, power, compensation, ownership, consent, and closure.", audience: "Organizations, builders, and partners", ...shared, nextLabel: "Read the ethical-work approach", nextHref: "/ethical-work", steps: ["Make roles and decision ownership explicit.", "Define compensation or educational status before work.", "Agree on access, ownership, attribution, confidentiality, and review.", "Protect the right to raise concerns or exit safely.", "Close with feedback, acceptance, and documented next steps."] },
  { id: "honest-proof-of-work", category: "For Builders", title: "How to document proof of work honestly", description: "Show what happened without turning uncertainty into a marketing claim.", audience: "Builders, organizations, and reviewers", ...shared, nextLabel: "See current work", nextHref: "/work", steps: ["State the original problem and approved scope.", "Describe contributors only with permission.", "Link or describe the actual output.", "Separate observed results from interpretation.", "Name limitations, failures, missing evidence, and publication consent."] },
  { id: "prepare-a-challenge", category: "For Organizations", title: "How to prepare a useful organization challenge", description: "Provide enough context for review while keeping sensitive information out of the first form.", audience: "Organizations", ...shared, nextLabel: "Describe an organization challenge", nextHref: "/challenges", steps: ["Write a short problem title.", "Explain who is affected and the desired outcome.", "Describe current tools or attempts without sharing credentials.", "Name the timeline, responsible contact, and budget range if relevant.", "Exclude private keys, financial-account data, health records, legal files, and private political records."] },
  { id: "builder-interest", category: "For Builders", title: "How to prepare builder interest", description: "Choose a short work example and realistic availability that help a reviewer understand possible fit.", audience: "Potential builders", ...shared, nextLabel: "Submit builder interest", nextHref: "/builders#expression-of-interest", steps: ["Choose your primary skills.", "Prepare one short example of work you have done.", "Add a public portfolio link only if you have one.", "State realistic availability and the kind of work that interests you.", "Review scope, ownership, compensation, and no-guarantee boundaries."] },
  { id: "bounded-conversation", category: "Liberation Network", title: "How to prepare for a first Network conversation", description: "Understand the purpose, privacy limits, preparation, and possible outcomes of an introductory conversation.", audience: "People interested in or referred to the Liberation Network", ...shared, nextLabel: "See how the Network works", nextHref: "/liberation/how-it-works", steps: ["Review what the Network is—and is not.", "Bring one or two questions and any practical access needs.", "Do not share diagnoses, trauma histories, credentials, financial data, or legal files.", "Expect an approximately 30-minute conversation, not open-ended support.", "Remember that a resource or no next step can be a valid outcome."] },
  { id: "understanding-ecl", category: "Understanding the Ecosystem", title: "Understanding the Ethical Capacity Lab ecosystem", description: "A concise guide to the parent, practical arm, relationship network, and boundaries between them.", audience: "Everyone", ...shared, nextLabel: "See how the ecosystem works", nextHref: "/ecosystem", steps: ["ECL provides shared standards, safeguards, and direction.", "DoGoodie handles practical organizational work.", "The Liberation Network supports relationships and possible voluntary exchange over time.", "Public learning, work, paid projects, partnerships, and deeper access remain separate decisions.", "The ecosystem is early-stage and does not promise an automatic route or guaranteed outcome."] },
];

export const resourceCategories = ["For Organizations", "For Builders", "Liberation Network", "Ethical Work and Safeguards", "Understanding the Ecosystem"] as const;

export const faqs = [
  { question: "Is the Ethical Capacity Lab a certifier or regulator?", answer: "No. ECL is an early-stage institutional parent and shared trust layer. It does not claim certification, auditing, regulatory, clinical, or legal authority." },
  { question: "Does builder interest guarantee paid work?", answer: "No. Interest, program participation, builder pathways, paid projects, employment, confidential access, and Network participation are separate human-reviewed decisions." },
  { question: "Is the Liberation Network a membership or job funnel?", answer: "No. Public learning is open, while deeper participation develops gradually through mutual fit, trust, conduct, care, and capacity. No benefit or access is guaranteed." },
  { question: "What happens after I submit a form?", answer: "A human reviewer checks the minimum information provided and may clarify, route, hold, refer, decline, or suggest a small next step. Submission does not create a professional or confidential relationship." },
  { question: "Can I learn without applying or joining?", answer: "Yes. The resource library and ecosystem pages are public and do not require an application or personal disclosure." },
  { question: "What should I never put in a public form?", answer: "Do not submit passwords, private keys, financial-account information, protected health information, legal case files, private political records, or information you are not authorized to share." },
] as const;
