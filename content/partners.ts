export const partnershipTypes = [
  "Nonprofit or advocacy partner",
  "Ethical business",
  "Research partner",
  "Technology or systems partner",
  "Professional service provider",
  "Funding, equipment, or resource provider",
  "Community organization",
  "Project collaborator",
] as const;

export const partnershipGroups = [
  { title: "Expertise and services", examples: ["Research or professional expertise", "Technical help or design", "Qualified legal or accounting support"] },
  { title: "Tools and practical resources", examples: ["Software, workspace, or equipment", "Help with day-to-day work", "Relevant information or resources shared with permission"] },
  { title: "Funding and practical support", examples: ["Project funding or sponsorship", "Grants", "Clearly defined financial help, equipment, or other resources"] },
  { title: "Introductions and collaboration", examples: ["Trusted introductions", "Partner referrals", "Joint projects or access to relevant expertise"] },
] as const;

export const partnershipStandards = [
  "A clear, mutual purpose and responsible contact",
  "A written description of the work, responsibilities, information handling, and how the work ends",
  "No hidden obligation, misleading endorsement, or exploitative labor",
  "Explicit consent before public names, logos, testimonials, or relationship descriptions",
  "Check qualifications and local rules before listing any licensed professional service",
  "A practical concern route and a safe way to end the relationship",
] as const;
