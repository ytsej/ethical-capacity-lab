export const branches = [
  {
    id: "ethical-capacity-lab",
    label: "Parent organization",
    title: "The Ethical Capacity Lab",
    tone: "ecl",
    description: "The parent organization that sets shared direction, explains how decisions are made, supports careful research, protects people and their work, and manages key relationships.",
    functions: ["Decision-making", "Ways of working", "Research standards", "Ownership of shared work", "Protections for people and their work", "Key relationships", "Shared direction"],
    href: "/about",
  },
  {
    id: "dogoodie",
    label: "Practical work",
    title: "DoGoodie",
    tone: "dogoodie",
    description: "The practical part that helps organizations understand a challenge, build skills, coordinate builders, research options, create useful tools, and complete clearly defined projects.",
    functions: ["Understanding challenges", "Practical guidance and skill-building", "Builder coordination", "Planning and completing projects", "Research and documentation", "Simple digital tools", "Responsible AI and automation"],
    href: "/organizations",
  },
  {
    id: "liberation-network",
    label: "Relationship network",
    title: "Liberation from Suffering Network",
    tone: "liberation",
    description: "A network where people who share the goal of reducing suffering can build trust gradually and explore advice, introductions, collaboration, professional help, and voluntary support.",
    functions: ["Trusted relationships and introductions", "Skills and advice", "Collaboration", "Professional help", "Voluntary referrals or purchases", "Possible paid work", "Possible practical support", "Trust built over time"],
    href: "/liberation",
  },
] as const;

export const valueFlow = [
  "A need, skill, resource, or relationship",
  "Understand the request and find the right place for it",
  "Shared standards, people, relationships, tools, and support",
  "Suitable guidance, supervised work, an introduction, or collaboration",
  "Useful work, results, feedback, and learning",
  "Stronger trust and relationships",
  "Possible future referrals, resources, paid opportunities, purchases, introductions, or deeper participation",
] as const;

export const ecosystemConnections = [
  { title: "Shared standards", text: "ECL supports careful research, protects people and their work, manages shared material, and sets direction without claiming to run every activity." },
  { title: "Practical work", text: "DoGoodie can understand needs, coordinate builders, and complete clearly defined work under written terms." },
  { title: "Relationships over time", text: "The Liberation Network can support voluntary introductions, learning, and collaboration when everyone is interested and enough time and support are available." },
] as const;
