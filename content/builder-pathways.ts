export const builderParticipationModes = [
  { title: "Learn and build proof", description: "Develop experience through public learning, small exercises, or an approved proof-of-work opportunity." },
  { title: "Contribute to a scoped project", description: "Use relevant skills on real work with clear responsibilities, review, and terms." },
  { title: "Explore higher-trust collaboration", description: "Consider further collaboration only after reliable work, mutual trust, a real need, and available capacity." },
] as const;

export const builderContributionGroups = [
  { title: "Research and documentation", text: "Clarify questions, gather reliable sources, and create useful briefs or working documentation." },
  { title: "Websites and digital tools", text: "Build focused websites, forms, resource hubs, or small internal tools." },
  { title: "Automation and workflow support", text: "Map repetitive work and create reviewable automation that keeps important decisions human." },
  { title: "Content and design", text: "Improve public information, visual communication, journeys, and practical content." },
  { title: "Project coordination and operations", text: "Help organize tasks, documentation, communication, review points, and responsible delivery." },
  { title: "Small experiments or pilots", text: "Test a defined idea, document what happened, and separate evidence from aspiration." },
] as const;

export const builderProtections = [
  "A clear scope and responsible project owner",
  "Compensation discussed before any paid work",
  "Ownership and attribution agreed before productive work",
  "Only the access and information genuinely needed",
  "Clear feedback and review expectations",
  "A defined end point and a way to raise concerns",
] as const;

export const projectTermChecklist = [
  "Scope and output",
  "Timeline and review points",
  "Compensation—or the explicit non-compensated educational nature",
  "Ownership and licenses",
  "Attribution and publication permission",
  "Access, equipment, and responsible contacts",
  "Confidentiality and data handling",
  "Acceptance criteria and feedback",
  "Closure and a safe way to exit",
] as const;

export const impactHackRoles = [
  { title: "Community", label: "Starting role", text: "Accepts the program standards and participates responsibly." },
  { title: "Funded Hacker", label: "Active challenge", text: "Approved to receive an experiment fund for this specific challenge." },
  { title: "Impact Hacker", label: "Eligible completion", text: "Completes an eligible challenge and submits acceptable proof." },
  { title: "Core Builder", label: "Program trust role", text: "Demonstrates useful work, judgment, reliability, communication, and responsible collaboration over time." },
] as const;
