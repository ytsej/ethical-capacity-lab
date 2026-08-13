export const capabilityFamilies = [
  { title: "Challenge discovery and clarification", text: "Turn a broad concern into a defined problem, decision, or safe next question." },
  { title: "Research and documentation", text: "Gather sources, structure findings, create working documentation, and make limitations visible." },
  { title: "Simple websites and internal tools", text: "Build focused public pages, small tools for day-to-day work, and information systems that are easy to maintain." },
  { title: "Simpler workflows and automation", text: "Reduce repetitive work with automation that people can check, while keeping people responsible for important decisions." },
  { title: "Content, design, and online coordination", text: "Make messages, page journeys, visual design, campaigns, and teamwork clearer around one defined goal." },
  { title: "Small projects supported by builders", text: "Test an idea through supervised work when responsibilities and protections are clear." },
  { title: "Small tests with honest results", text: "Try a small action, record what happened honestly, and separate evidence from hopes or claims." },
  { title: "Practical guidance and skill-building", text: "Help the person responsible understand the options, limits, and a useful next step." },
] as const;

export const serviceGroups = [
  {
    id: "research",
    marker: "Research",
    title: "Research and clarify what you need",
    description: "We can help turn a messy question or unclear problem into useful research, options, and a practical next step.",
    bring: "An unclear question, decision, opportunity, or problem.",
    flow: ["Question", "Brief + options"],
    outputs: ["Research brief", "Options comparison", "Challenge brief", "Process or decision map"],
  },
  {
    id: "build",
    marker: "Build",
    title: "Build a website or useful digital tool",
    description: "We can build focused digital tools that make information easier to share, collect, organize, or use.",
    bring: "Information, forms, or internal work that needs a clearer digital home.",
    flow: ["Need", "Website, form, or tool"],
    outputs: ["Website", "Landing page", "Contact or request form", "Resource hub or internal tool"],
  },
  {
    id: "improve",
    marker: "Improve",
    title: "Automate and improve repetitive work",
    description: "We can simplify repetitive processes using clearer steps, documentation, automation, and AI support while keeping important decisions with people.",
    bring: "A repeated process that is slow, unclear, or difficult to review.",
    flow: ["Manual steps", "Automation + human check"],
    outputs: ["Workflow map", "Automation prototype", "Process guide", "Reviewed AI-assisted workflow"],
  },
  {
    id: "test",
    marker: "Test",
    title: "Test an idea with a small project",
    description: "We can help test a clearly defined idea through a small project before anyone commits to something much larger.",
    bring: "An idea that needs evidence before a larger commitment.",
    flow: ["Idea", "Small test + review"],
    outputs: ["Small test", "Early working version", "Limited experiment", "Results and next-step review"],
  },
] as const;

export const outOfScope = [
  "Emergency or crisis response",
  "Medical, mental-health, legal, financial, or other licensed professional advice",
  "Invasive surveillance or deceptive campaigns",
  "Unsafe, illegal, exploitative, or platform-breaking work",
  "Open-ended free labor or work without a responsible owner",
  "Requests that require passwords, private keys, financial-account data, protected health information, legal case files, or private political records in the initial form",
] as const;

export const organizationProcess = [
  "Submit a challenge or request a conversation",
  "Initial human review",
  "Clarification when needed",
  "Approximately 30-minute introductory conversation when suitable",
  "Recommended next step",
  "Accept, refer, hold, decline, or propose a limited test",
  "Written terms before productive work",
] as const;

export const giveFirstModel = [
  "One clearly defined problem",
  "One fixed output",
  "One responsible organization contact",
  "One short timeline",
  "One review checkpoint",
  "Explicit boundaries and required feedback",
  "No automatic continuation",
] as const;

export const projectFormats = [
  "A short research or discovery brief",
  "A lightweight landing page or information tool",
  "A workflow map or small internal system",
  "An early automation tool checked by a person",
  "A content, design, or digital-coordination sprint",
  "A supervised test that shows what was made and learned",
] as const;
