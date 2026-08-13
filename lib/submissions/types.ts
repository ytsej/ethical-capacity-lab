export const submissionTypes = ["challenge", "builder_interest", "liberation_interest", "partnership_inquiry", "general_contact", "concern_report"] as const;
export type SubmissionType = (typeof submissionTypes)[number];
