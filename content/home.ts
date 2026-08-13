export const homepageEcosystemParts = [
  {
    id: "ethical-capacity-lab",
    title: "The Ethical Capacity Lab",
    label: "Shared standards and safeguards",
    description: "The parent organization that provides shared standards, safeguards, research practices, and direction.",
    cta: "About the Lab",
    href: "/about",
    tone: "ecl",
  },
  {
    id: "dogoodie",
    title: "DoGoodie",
    label: "Practical projects and organizational support",
    description: "The practical arm that helps organizations clarify problems and deliver carefully scoped work.",
    cta: "Explore DoGoodie",
    href: "/organizations",
    tone: "dogoodie",
  },
  {
    id: "liberation-network",
    title: "Liberation from Suffering Network",
    label: "Trusted relationships and gradual collaboration",
    description: "A relationship-based network for learning, conversations, introductions, mutual support, and voluntary collaboration over time.",
    cta: "Explore the Network",
    href: "/liberation",
    tone: "liberation",
  },
] as const;

export const homepageAudiencePaths = [
  {
    title: "I represent an organization",
    description: "Explore practical support for a challenge, project, or workflow.",
    cta: "Get organization support",
    href: "/organizations",
    tone: "dogoodie",
  },
  {
    title: "I want to build or contribute",
    description: "Explore responsible project and contribution pathways.",
    cta: "Explore builder opportunities",
    href: "/builders",
    tone: "dogoodie",
  },
  {
    title: "I want to explore the Liberation Network",
    description: "Learn about conversations, relationships, introductions, and gradual collaboration.",
    cta: "Explore the Network",
    href: "/liberation",
    tone: "liberation",
  },
  {
    title: "I want to offer a resource or partnership",
    description: "Explore ways to contribute expertise, services, tools, funding, or collaboration.",
    cta: "Explore partnerships",
    href: "/partners",
    tone: "ecl",
  },
  {
    title: "I am here to learn or I am not sure yet",
    description: "Browse public resources without pressure to apply or join.",
    cta: "Browse resources",
    href: "/resources",
    tone: "neutral",
  },
] as const;

export const homepageClientSteps = [
  {
    title: "Tell us what you are trying to solve",
    text: "Share the problem, project, or question in plain language.",
  },
  {
    title: "We clarify fit and the next useful step",
    text: "A human reviewer considers whether we can help, need more information, should refer the request, or should recommend a smaller first step.",
  },
  {
    title: "Agree on a clear next step",
    text: "When appropriate, this may be a conversation, research task, small project, tool, pilot, referral, or no further action.",
  },
] as const;

export const homepageTrustCommitments = [
  {
    title: "Clear expectations",
    text: "Productive work should have a clear scope, responsible owner, timeline, terms, and completion point.",
  },
  {
    title: "Human judgment",
    text: "AI and automation may support the work, but important decisions about people, projects, participation, and safety remain human-reviewed.",
  },
  {
    title: "Honest evidence and consent",
    text: "We do not invent outcomes, publish relationships without permission, or treat early experiments as proven impact.",
  },
] as const;

export const homepageTrustLinks = [
  { label: "Ethical Work", href: "/ethical-work" },
  { label: "Privacy", href: "/privacy" },
  { label: "Report a Concern", href: "/report-a-concern" },
] as const;
