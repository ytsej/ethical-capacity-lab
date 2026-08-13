export const participationLayers = [
  { title: "Public learning", text: "Explore resources and the network’s purpose without applying, joining, or disclosing personal information." },
  { title: "Interest or trusted referral", text: "Share only the minimum information needed for a human review." },
  { title: "Initial one-on-one conversation", text: "Use an approximately 30-minute bounded conversation to clarify fit, questions, and a possible small step." },
  { title: "Small voluntary next step", text: "A resource, no further step, follow-up, introduction, learning action, or carefully scoped collaboration may be appropriate." },
  { title: "Trusted relationship or collaboration", text: "Trust develops through conduct, demonstrated care, consent, mutual fit, and current capacity." },
  { title: "Deeper participation", text: "Deeper access may develop when mutually appropriate. It is not a rank, moral status, or guaranteed destination." },
] as const;

export const possibleContributions = ["Time and attentive conversation", "Skills or advice", "A useful introduction", "Research or learning", "A carefully scoped collaboration", "A voluntary resource or purchase when appropriate"] as const;
export const possibleReceipts = ["Public learning", "Advice or a perspective", "An introduction", "A professional resource", "A collaboration possibility", "Possible work or material support when independently appropriate"] as const;

export const networkActivities = [
  "Have a useful one-on-one conversation",
  "Share knowledge or advice",
  "Learn from other people",
  "Make or receive a trusted introduction",
  "Share a professional resource",
  "Collaborate on something small",
  "Refer or purchase from someone voluntarily",
  "Support another person when appropriate",
] as const;

export const networkTrustSteps = [
  "Learn publicly",
  "Express interest or receive a referral",
  "Have a short introductory conversation",
  "Choose a small voluntary next step",
  "Continue only with mutual interest, trust, and capacity",
] as const;

export const conversationDetails = {
  purpose: "Clarify what brings someone to the Network, explain boundaries, explore mutual fit, and identify the smallest responsible next step.",
  forWhom: "People who have reviewed the public information and want a bounded, human conversation—or who arrive through a trusted referral.",
  prepare: "Bring one or two questions, what you hope to understand, and any practical time or access needs for the conversation.",
  avoid: "Do not share passwords, financial-account information, legal case files, diagnoses, trauma histories, private political records, intimate values, or information you are not authorized to disclose.",
  privacy: "Conversation notes, if needed, should be minimal. Confidentiality has limits where safety, law, abuse prevention, or another person’s rights require action.",
  notProvided: "This is not therapy, crisis counseling, legal advice, financial advice, guaranteed referrals, guaranteed work, or automatic membership.",
  nextSteps: "A public resource, no further step, a follow-up, an introduction, a learning action, a small voluntary collaboration, or an independently reviewed DoGoodie pathway.",
} as const;

export const networkIsNot = ["A staffing pool or job funnel", "A sales or referral club", "A therapy or crisis service", "A guaranteed economic network", "An ideological purity test", "A moral ranking or entitlement ladder"] as const;
