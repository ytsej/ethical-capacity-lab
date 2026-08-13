export const participationLayers = [
  { title: "Public learning", text: "Explore resources and the network’s purpose without applying, joining, or disclosing personal information." },
  { title: "Interest or trusted referral", text: "Share only the minimum information needed for a human review." },
  { title: "Initial one-on-one conversation", text: "Use an approximately 30-minute conversation with a clear purpose to discuss questions and a possible small step." },
  { title: "Small voluntary next step", text: "A resource, no further step, follow-up, introduction, learning action, or clearly defined collaboration may be appropriate." },
  { title: "Trusted relationship or collaboration", text: "Trust grows through responsible behavior, care, permission, shared interest, and enough time and support." },
  { title: "Deeper participation", text: "Deeper access may develop when mutually appropriate. It is not a rank, moral status, or guaranteed destination." },
] as const;

export const possibleContributions = ["Time and attentive conversation", "Skills or advice", "A useful introduction", "Research or learning", "A clearly defined collaboration", "A voluntary resource or purchase when appropriate"] as const;
export const possibleReceipts = ["Public learning", "Advice or a perspective", "An introduction", "Professional help", "A possible collaboration", "Possible work, equipment, or other practical support when reviewed separately"] as const;

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
  "Continue only when everyone is interested, trust has grown, and enough time and support are available",
] as const;

export const conversationDetails = {
  purpose: "Understand what brings someone to the Network, explain the limits, see whether everyone is interested, and identify the smallest responsible next step.",
  forWhom: "People who have reviewed the public information and want a conversation with a clear purpose—or who arrive through an introduction from someone trusted.",
  prepare: "Bring one or two questions, what you hope to understand, and any practical time or access needs for the conversation.",
  avoid: "Do not share passwords, financial-account information, legal case files, diagnoses, trauma histories, private political records, intimate values, or information you are not authorized to disclose.",
  privacy: "We keep conversation notes to a minimum when notes are needed. Privacy has limits when safety, the law, preventing abuse, or another person’s rights require action.",
  notProvided: "This is not therapy, crisis counseling, legal advice, financial advice, guaranteed referrals, guaranteed work, or automatic membership.",
  nextSteps: "A public resource, no further step, a follow-up, an introduction, a learning action, a small voluntary collaboration, or a DoGoodie option reviewed separately.",
} as const;

export const networkIsNot = ["A list of workers or a way to get a job", "A sales or referral club", "A therapy or crisis service", "A guaranteed source of money or work", "A test of political or moral beliefs", "A ranking that gives some people greater rights"] as const;
