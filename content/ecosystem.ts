export const branches = [
  {
    id: "ethical-capacity-lab",
    label: "Institutional parent",
    title: "The Ethical Capacity Lab",
    tone: "ecl",
    description: "The institutional parent for shared governance, methodology, research standards, ethical safeguards, intellectual property stewardship, and strategic relationships.",
    functions: ["Governance", "Methodology", "Research standards", "Intellectual property stewardship", "Ethical safeguards", "Strategic relationships", "Shared ecosystem direction"],
    href: "/about",
  },
  {
    id: "dogoodie",
    label: "Practical arm",
    title: "DoGoodie",
    tone: "dogoodie",
    description: "The practical arm for challenge discovery, capacity-building, builder coordination, research, systems, ethical automation, and carefully scoped project delivery.",
    functions: ["Challenge discovery", "Consulting and capacity-building", "Builder coordination", "Project scoping and delivery", "Research and documentation", "Lightweight systems", "Ethical AI and automation"],
    href: "/organizations",
  },
  {
    id: "liberation-network",
    label: "Relationship network",
    title: "Liberation from Suffering Network",
    tone: "liberation",
    description: "A relationship-based network where values-aligned people can build trust gradually and explore advice, introductions, collaboration, professional resources, and voluntary mutual support.",
    functions: ["Trusted relationships and introductions", "Skills and advice", "Collaboration", "Professional resources", "Voluntary referrals or purchasing", "Possible paid work", "Possible material support", "Gradual trust"],
    href: "/liberation",
  },
] as const;

export const valueFlow = [
  "Need, capability, resource, or relationship",
  "Clarification and routing",
  "Shared standards, people, relationships, tools, and support systems",
  "Appropriate consultation, supervised work, introduction, or collaboration",
  "Useful output, evidence, feedback, and learning",
  "Stronger trust and relationships",
  "Possible future referrals, resources, paid opportunities, purchases, introductions, or deeper participation",
] as const;

export const ecosystemConnections = [
  { title: "Shared trust", text: "ECL provides common research, safeguards, stewardship, and direction without claiming to manage every activity directly." },
  { title: "Practical delivery", text: "DoGoodie can clarify needs, coordinate builders, and deliver carefully scoped work under explicit terms." },
  { title: "Relationships over time", text: "The Liberation Network can support voluntary introductions, learning, and collaboration when mutual fit and capacity exist." },
] as const;
