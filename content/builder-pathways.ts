export const builderParticipationModes = [
  { title: "Learn and show your work", description: "Develop experience through public learning, small exercises, or an approved chance to complete a work example." },
  { title: "Contribute to a clearly defined project", description: "Use relevant skills on real work with clear responsibilities, review, and written terms." },
  { title: "Explore closer collaboration", description: "Consider further collaboration only after reliable work, mutual trust, a real need, and enough time and support." },
] as const;

export const builderContributionGroups = [
  { title: "Research and documentation", text: "Clarify questions, gather reliable sources, and create useful briefs or working documentation." },
  { title: "Websites and digital tools", text: "Build focused websites, forms, resource hubs, or small internal tools." },
  { title: "Automation and workflow help", text: "Map repetitive work and create automation that people can check, while keeping important decisions with people." },
  { title: "Content and design", text: "Improve public information, visual communication, journeys, and practical content." },
  { title: "Project coordination and operations", text: "Help organize tasks, documentation, communication, review points, and responsible delivery." },
  { title: "Small tests", text: "Test a defined idea, record what happened, and separate evidence from hopes or claims." },
] as const;

export const builderProtections = [
  "A clear description of the work and a responsible project owner",
  "Compensation discussed before any paid work",
  "Ownership and public credit agreed before work begins",
  "Only the access and information genuinely needed",
  "Clear feedback and review expectations",
  "A defined end point and a way to raise concerns",
] as const;

export const projectTermChecklist = [
  "What the work includes and what will be made",
  "Timeline and review points",
  "Whether and how the work is paid—or a clear statement that it is an unpaid learning activity",
  "Who owns the work and who may reuse it",
  "Public credit and permission to publish",
  "Needed access, equipment, and responsible contacts",
  "Privacy and how information is handled",
  "How the work will be reviewed and accepted",
  "How the work ends and a safe way to leave",
] as const;

export const impactHackRoles = [
  { title: "Community", label: "Starting role", text: "Accepts the program standards and participates responsibly." },
  { title: "Funded Hacker", label: "Active challenge", text: "Approved to receive an experiment fund for this specific challenge." },
  { title: "Impact Hacker", label: "Completed the program", text: "Completes the challenge under its rules and submits acceptable information showing the work." },
  { title: "Core Builder", label: "Program trust role", text: "Demonstrates useful work, judgment, reliability, communication, and responsible collaboration over time." },
] as const;
