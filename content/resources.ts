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
  category: "For Organizations" | "For Builders" | "Liberation Network" | "Working Responsibly" | "Understanding the Ecosystem";
};

const shared = {
  owner: "The Ethical Capacity Lab",
  updated: "3 August 2026",
  source: "ECL research, our published website model, and our protections for people and their work",
  limitations: "General information only; it is not medical, mental-health, legal, financial, or other licensed professional advice.",
} as const;

export const resources: Resource[] = [
  { id: "scope-small-impact-experiment", category: "For Organizations", title: "How to plan a small test", description: "Turn a broad idea into a small test that is safe to try and easy to review.", audience: "Organizations and builders", ...shared, nextLabel: "Get organization support", nextHref: "/organizations", steps: ["Name one problem and who is affected.", "Choose one clear result and one person responsible.", "Set a short timeline, safety limits, and a review point.", "Decide what information would help you judge the test before it begins.", "Record the result, its limits, and what you still do not know."] },
  { id: "ethical-collaboration", category: "Working Responsibly", title: "What responsible collaboration requires", description: "A practical checklist for the work, decision-making, pay, ownership, permission, and a clear ending.", audience: "Organizations, builders, and partners", ...shared, nextLabel: "Read how we work responsibly", nextHref: "/ethical-work", steps: ["Name each role and who makes each decision.", "Say whether and how the work is paid before it begins.", "Agree on access, ownership, public credit, privacy, and review.", "Protect the right to raise concerns or leave safely.", "Finish with feedback, approval of the work, and written next steps."] },
  { id: "honest-proof-of-work", category: "For Builders", title: "How to document your work honestly", description: "Show what happened without presenting uncertain results as proven success.", audience: "Builders, organizations, and reviewers", ...shared, nextLabel: "See current work", nextHref: "/work", steps: ["State the original problem and what you agreed to do.", "Name contributors only with their permission.", "Link to or describe what was made.", "Separate what you observed from what you think it means.", "Name failures, missing information, other limits, and permission to publish."] },
  { id: "prepare-a-challenge", category: "For Organizations", title: "How to prepare a useful organization challenge", description: "Provide enough context for review while keeping sensitive information out of the first form.", audience: "Organizations", ...shared, nextLabel: "Describe an organization challenge", nextHref: "/challenges", steps: ["Write a short problem title.", "Explain who is affected and the desired outcome.", "Describe current tools or attempts without sharing credentials.", "Name the timeline, responsible contact, and budget range if relevant.", "Exclude private keys, financial-account data, health records, legal files, and private political records."] },
  { id: "builder-interest", category: "For Builders", title: "How to share your interest as a builder", description: "Choose a short work example and give honest availability so a reviewer can understand whether there may be a suitable project.", audience: "Potential builders", ...shared, nextLabel: "Share builder interest", nextHref: "/builders#expression-of-interest", steps: ["Choose your main skills.", "Prepare one short example of work you have done.", "Add a public portfolio link only if you have one.", "State your honest availability and the kind of work that interests you.", "Review what the work includes, ownership, pay, and the fact that work is not guaranteed."] },
  { id: "bounded-conversation", category: "Liberation Network", title: "How to prepare for a first Network conversation", description: "Understand the purpose, privacy limits, preparation, and possible outcomes of an introductory conversation.", audience: "People interested in or referred to the Liberation Network", ...shared, nextLabel: "See how the Network works", nextHref: "/liberation/how-it-works", steps: ["Review what the Network is—and is not.", "Bring one or two questions and any practical access needs.", "Do not share diagnoses, trauma histories, credentials, financial data, or legal files.", "Expect an approximately 30-minute conversation, not open-ended support.", "Remember that a resource or no next step can be a valid outcome."] },
  { id: "understanding-ecl", category: "Understanding the Ecosystem", title: "How the three parts of ECL work together", description: "A short guide to ECL, DoGoodie, the Liberation Network, and the limits between them.", audience: "Everyone", ...shared, nextLabel: "See how the three parts work", nextHref: "/ecosystem", steps: ["ECL provides shared standards, protections, and direction.", "DoGoodie handles practical work for organizations.", "The Liberation Network supports relationships and possible voluntary help over time.", "Public learning, project work, paid work, partnerships, and deeper access are separate decisions.", "The model is still being tested and does not promise an automatic route or a guaranteed result."] },
];

export const resourceCategories = ["For Organizations", "For Builders", "Liberation Network", "Working Responsibly", "Understanding the Ecosystem"] as const;

export const faqs = [
  { question: "Does the Ethical Capacity Lab certify or regulate organizations?", answer: "No. ECL is still developing. It does not issue certificates, conduct official audits, regulate anyone, or provide medical or legal services." },
  { question: "Does sharing builder interest guarantee paid work?", answer: "No. Sharing interest, joining a program, receiving paid work, becoming an employee, getting access to private projects, and taking part in the Network are separate decisions made by people." },
  { question: "Is the Liberation Network a membership program or a way to get a job?", answer: "No. Anyone can read the public information. Any closer involvement develops gradually when everyone is interested, trust has grown, and there is enough time and support available. No benefit or access is guaranteed." },
  { question: "What happens after I submit a form?", answer: "A person reviews the needed information and may ask a question, send it to the right person, put it on hold, refer it, decline it, or suggest a small next step. Sending a form does not create a professional or private client relationship." },
  { question: "Can I learn without applying or joining?", answer: "Yes. The resource library and ecosystem pages are public and do not require an application or personal disclosure." },
  { question: "What should I never put in a public form?", answer: "Do not submit passwords, private keys, financial-account information, protected health information, legal case files, private political records, or information you are not authorized to share." },
] as const;
