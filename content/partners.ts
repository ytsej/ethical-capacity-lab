export const partnershipTypes = [
  "Nonprofit or advocacy partner",
  "Ethical business",
  "Research partner",
  "Technical or infrastructure partner",
  "Professional-service resource",
  "Funder or material resource provider",
  "Community organization",
  "Project collaborator",
] as const;

export const partnershipGroups = [
  { title: "Expertise and services", examples: ["Research or professional expertise", "Technical help or design", "Qualified legal or accounting support"] },
  { title: "Tools and practical resources", examples: ["Software, workspace, or equipment", "Operational support", "Relevant data or resources shared with permission"] },
  { title: "Funding and material support", examples: ["Project funding or sponsorship", "Grants", "Carefully scoped financial or material support"] },
  { title: "Introductions and collaboration", examples: ["Trusted introductions", "Partner referrals", "Joint projects or access to relevant expertise"] },
] as const;

export const partnershipStandards = [
  "A clear, mutual purpose and responsible contact",
  "Written scope, responsibilities, data handling, and closure",
  "No hidden obligation, misleading endorsement, or exploitative labor",
  "Explicit consent before public names, logos, testimonials, or relationship descriptions",
  "Qualification and jurisdiction review before any regulated professional resource is listed",
  "A practical concern route and a safe way to end the relationship",
] as const;
