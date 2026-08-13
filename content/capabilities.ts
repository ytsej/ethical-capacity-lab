export const capabilityFamilies = [
  { title: "Challenge discovery and clarification", text: "Turn a broad concern into a defined problem, decision, or safe next question." },
  { title: "Research and documentation", text: "Gather sources, structure findings, create working documentation, and make limitations visible." },
  { title: "Lightweight websites and internal systems", text: "Build focused public pages, small operational tools, and maintainable information systems." },
  { title: "Workflow and automation support", text: "Reduce repetitive work using proportionate, reviewable automation without removing human accountability." },
  { title: "Content, design, and digital coordination", text: "Clarify messages, journeys, visual systems, campaigns, and coordination around a bounded objective." },
  { title: "Builder-supported pilots", text: "Use supervised, carefully scoped contributions when responsibilities and protections are clear." },
  { title: "Proof-of-work experiments", text: "Test a small intervention, document the result honestly, and distinguish evidence from aspiration." },
  { title: "Capacity-building and scoped consultation", text: "Help a responsible owner understand options, constraints, and a practical next step." },
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
    bring: "Information, intake, or internal work that needs a clearer digital home.",
    flow: ["Need", "Website, form, or tool"],
    outputs: ["Website", "Landing page", "Intake form", "Resource hub or internal tool"],
  },
  {
    id: "improve",
    marker: "Improve",
    title: "Automate and improve repetitive work",
    description: "We can simplify repetitive processes using clearer workflows, documentation, automation, and AI support while keeping important decisions human-reviewed.",
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
    outputs: ["Small pilot", "Prototype", "Limited experiment", "Evidence and next-step review"],
  },
] as const;

export const outOfScope = [
  "Emergency or crisis response",
  "Clinical, legal, financial, or other regulated advice",
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
  "Scope recommendation",
  "Accept, refer, hold, decline, or propose a limited pilot",
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
  "A bounded automation prototype with human review",
  "A content, design, or digital-coordination sprint",
  "A supervised proof-of-work experiment",
] as const;
