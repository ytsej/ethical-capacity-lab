export type NavigationLink = { label: string; href: string; description?: string };

export const ecosystemMenu: NavigationLink[] = [
  { label: "Ecosystem Overview", href: "/ecosystem", description: "How the three parts connect" },
  { label: "Ethical Capacity Lab", href: "/about", description: "Governance and methodology" },
  { label: "DoGoodie", href: "/ecosystem#dogoodie", description: "The practical arm" },
  { label: "Liberation Network", href: "/liberation", description: "Relationships and gradual trust" },
  { label: "Principles and Safeguards", href: "/ethical-work", description: "How productive work is protected" },
];

export const workMenu: NavigationLink[] = [
  { label: "Work and Case Studies", href: "/work", description: "Evidence, artifacts, and limitations" },
  { label: "Partnerships and Resources", href: "/partners", description: "Propose a responsible collaboration" },
];

export const primaryNavigation = [
  { label: "Our Ecosystem", menu: ecosystemMenu },
  { label: "For Organizations", href: "/organizations" },
  { label: "For Builders", href: "/builders" },
  { label: "Liberation Network", href: "/liberation" },
  { label: "Work & Partners", menu: workMenu },
  { label: "Resources", href: "/resources" },
] as const;

export const footerGroups = [
  {
    title: "Ecosystem",
    links: [
      { label: "About & Governance", href: "/about" },
      { label: "Ecosystem Overview", href: "/ecosystem" },
      { label: "DoGoodie", href: "/ecosystem#dogoodie" },
      { label: "Liberation Network", href: "/liberation" },
      { label: "Team", href: "/about#team" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Work With Us",
    links: [
      { label: "For Organizations", href: "/organizations" },
      { label: "For Builders", href: "/builders" },
      { label: "Partnerships", href: "/partners" },
      { label: "Submit a Challenge", href: "/challenges" },
      { label: "Start Here", href: "/start" },
    ],
  },
  {
    title: "Trust & Governance",
    links: [
      { label: "Ethical Work", href: "/ethical-work" },
      { label: "Community Standards", href: "/community-standards" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookie and Analytics Notice", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Report a Concern", href: "/report-a-concern" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides and Articles", href: "/resources#guides" },
      { label: "Opportunities", href: "/builders#opportunities" },
      { label: "Community Resources", href: "/resources#community-resources" },
      { label: "Frequently Asked Questions", href: "/resources#faq" },
    ],
  },
] as const;

export const startPaths = [
  {
    title: "I represent an organization",
    description: "Get practical help with a challenge, project, workflow, or idea.",
    cta: "Get organization support",
    href: "/organizations",
    tone: "dogoodie",
  },
  {
    title: "I want to build or contribute",
    description: "Explore ways to contribute skills through clearly scoped and responsibly managed work.",
    cta: "Explore builder pathways",
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
    description: "Browse public resources without applying, joining, or submitting personal information.",
    cta: "Browse resources",
    href: "/resources",
    tone: "neutral",
  },
] as const;
