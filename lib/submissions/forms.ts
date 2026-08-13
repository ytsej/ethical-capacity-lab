import type { SubmissionType } from "./types";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea" | "select" | "checkbox";
  required?: boolean;
  optionalLabel?: string;
  hint?: string;
  options?: readonly (string | { value: string; label: string })[];
  minLength?: number;
  maxLength?: number;
  defaultValue?: string | boolean;
};

export type FormGroup = {
  legend: string;
  description?: string;
  fields: readonly string[];
};

export type FormConfig = {
  title: string;
  submitLabel: string;
  fields: readonly FieldConfig[];
  groups?: readonly FormGroup[];
  success: string;
  sourcePage: string;
  timeEstimate?: string;
};

const consent: FieldConfig = { name: "consent", label: "I have read the privacy notice and consent to the review of this submission for the stated purpose.", type: "checkbox", required: true };

export const formConfigs: Record<SubmissionType, FormConfig> = {
  challenge: {
    title: "Tell us what you are trying to solve",
    submitLabel: "Send request for review",
    sourcePage: "/challenges",
    timeEstimate: "About 2–3 minutes",
    success: "We received your request. A human reviewer will look at it and we aim to respond within 7 business days.",
    fields: [
      { name: "full_name", label: "Full name", type: "text", required: true, minLength: 2, maxLength: 100 },
      { name: "email", label: "Email", type: "email", required: true, maxLength: 200 },
      { name: "organization_name", label: "Organization name", type: "text", required: true, maxLength: 160 },
      { name: "problem", label: "What are you trying to solve?", type: "textarea", required: true, minLength: 20, maxLength: 1800, hint: "A short plain-language description is enough. Do not include confidential or highly sensitive details." },
      { name: "affected_people", label: "Who is this for or who is affected?", type: "textarea", required: true, minLength: 5, maxLength: 700 },
      { name: "desired_outcome", label: "What would a useful outcome look like?", type: "textarea", required: true, minLength: 5, maxLength: 700 },
      { name: "additional_note", label: "Anything else we should know?", type: "textarea", optionalLabel: "optional", maxLength: 700 },
      { name: "sensitive_confirmation", label: "I confirm this request contains no passwords, private keys, financial-account information, protected health information, private legal files, or other highly sensitive or unnecessary confidential material.", type: "checkbox", required: true },
      { name: "permission_to_contact", label: "I give permission to contact me about this challenge.", type: "checkbox", required: true },
      consent,
    ],
    groups: [
      { legend: "About you", fields: ["full_name", "email", "organization_name"] },
      { legend: "What are you trying to solve?", description: "Keep this brief. Most people can complete this section in a few minutes.", fields: ["problem", "affected_people", "desired_outcome", "additional_note"] },
      { legend: "Permissions", fields: ["sensitive_confirmation", "permission_to_contact", "consent"] },
    ],
  },
  builder_interest: {
    title: "Builder interest",
    submitLabel: "Submit builder interest",
    sourcePage: "/builders",
    timeEstimate: "About 2–4 minutes",
    success: "We received your interest. A human reviewer will look at it and we aim to respond within the published review window when there is a relevant next step. This is not a job application or guarantee of paid work.",
    fields: [
      { name: "name", label: "Name or professional name", type: "text", required: true, minLength: 2, maxLength: 100 },
      { name: "email", label: "Email", type: "email", required: true, maxLength: 200 },
      { name: "timezone", label: "Timezone", type: "text", optionalLabel: "optional", maxLength: 100 },
      { name: "primary_skills", label: "Primary skills", type: "textarea", required: true, minLength: 10, maxLength: 700 },
      { name: "work_example", label: "One short example of something you have worked on", type: "textarea", required: true, minLength: 20, maxLength: 1000 },
      { name: "portfolio", label: "Portfolio or proof link", type: "url", optionalLabel: "optional", maxLength: 300, hint: "A polished portfolio is not required. Include only a public link you are authorized to share." },
      { name: "work_interest", label: "Type of work that interests you", type: "textarea", required: true, minLength: 10, maxLength: 1000 },
      { name: "availability", label: "Realistic availability", type: "text", required: true, maxLength: 200 },
      { name: "additional_note", label: "Anything else we should know?", type: "textarea", optionalLabel: "optional", maxLength: 700 },
      { name: "no_guarantee", label: "I understand that expressing interest is not a job application and does not guarantee paid work or future projects.", type: "checkbox", required: true },
      consent,
    ],
    groups: [
      { legend: "About you", fields: ["name", "email", "timezone"] },
      { legend: "What you can contribute", description: "A short, concrete answer is enough. You do not need a polished portfolio.", fields: ["primary_skills", "work_example", "portfolio", "work_interest", "availability", "additional_note"] },
      { legend: "Permissions", fields: ["no_guarantee", "consent"] },
    ],
  },
  liberation_interest: {
    title: "Liberation Network interest",
    submitLabel: "Submit Network interest",
    sourcePage: "/liberation/how-it-works",
    timeEstimate: "About 2–3 minutes",
    success: "We received your interest. A human reviewer will look at it and may contact you if there is an appropriate next step. Submitting this form does not create membership, guarantee a conversation, or promise any benefit.",
    fields: [
      { name: "name", label: "Name or alias", type: "text", required: true, minLength: 2, maxLength: 100 },
      { name: "email", label: "Email", type: "email", required: true, maxLength: 200 },
      { name: "found_via", label: "How did you hear about the Network?", type: "text", required: true, maxLength: 300 },
      { name: "interest_or_referral", label: "Are you expressing your own interest or referring someone?", type: "select", required: true, options: ["My own expression of interest", "A referral made with permission"] },
      { name: "vision_interest", label: "What interests you about the Network?", type: "textarea", required: true, minLength: 20, maxLength: 1000, hint: "Keep this short. Do not include another person’s private contact details." },
      { name: "preferred_next_step", label: "What would you prefer as a next step?", type: "select", required: true, options: ["Keep learning through public resources", "I would be open to an introductory conversation", "I am not sure yet", "Other"] },
      { name: "timezone", label: "Timezone", type: "text", optionalLabel: "optional", maxLength: 100 },
      { name: "short_note", label: "Short note", type: "textarea", optionalLabel: "optional", maxLength: 600, hint: "Please do not share another person’s contact details without permission." },
      { name: "no_guarantee", label: "I understand this form does not create membership or guarantee a conversation, work, introductions, support, or any other benefit.", type: "checkbox", required: true },
      consent,
    ],
    groups: [
      { legend: "About you", fields: ["name", "email"] },
      { legend: "Your interest", fields: ["found_via", "interest_or_referral", "vision_interest", "preferred_next_step", "timezone", "short_note"] },
      { legend: "Permissions", fields: ["no_guarantee", "consent"] },
    ],
  },
  partnership_inquiry: {
    title: "Partnership inquiry",
    submitLabel: "Propose a partnership",
    sourcePage: "/partners",
    timeEstimate: "About 3–4 minutes",
    success: "We received your proposal. A human reviewer will look at it and we aim to respond within the published review window when there is a suitable next step. Submitting a proposal does not create a partnership or public association.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, minLength: 2, maxLength: 100 },
      { name: "email", label: "Email", type: "email", required: true, maxLength: 200 },
      { name: "organization", label: "Organization", type: "text", optionalLabel: "optional", maxLength: 160 },
      { name: "website", label: "Website", type: "url", optionalLabel: "optional", maxLength: 300 },
      { name: "partnership_type", label: "Partnership or resource type", type: "select", required: true, options: ["Expertise and services", "Tools and practical resources", "Funding and material support", "Introductions and collaboration", "Other"] },
      { name: "proposal", label: "What are you offering or proposing?", type: "textarea", required: true, minLength: 20, maxLength: 1600 },
      { name: "intended_purpose", label: "What do you hope it could help accomplish?", type: "textarea", required: true, minLength: 20, maxLength: 1200 },
      { name: "timeline", label: "Preferred timeline", type: "text", optionalLabel: "optional", maxLength: 200 },
      { name: "additional_note", label: "Anything else we should know?", type: "textarea", optionalLabel: "optional", maxLength: 700 },
      { name: "display_permission", label: "Public name or logo display permission", type: "select", required: true, defaultValue: "No public display permission", options: ["No public display permission", "Permission may be discussed separately"] },
      consent,
    ],
    groups: [
      { legend: "About you", fields: ["name", "email", "organization", "website"] },
      { legend: "Proposal", fields: ["partnership_type", "proposal", "intended_purpose", "timeline", "additional_note"] },
      { legend: "Permissions", description: "Public display permission defaults to no.", fields: ["display_permission", "consent"] },
    ],
  },
  general_contact: {
    title: "General contact",
    submitLabel: "Send message",
    sourcePage: "/contact",
    success: "Formspree accepted your message for human review. A response or service outcome is not guaranteed.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, minLength: 2, maxLength: 100 },
      { name: "email", label: "Email", type: "email", required: true, maxLength: 200 },
      { name: "topic", label: "Topic", type: "select", required: true, options: ["General question", "Privacy request", "Accessibility feedback", "Media or research", "Unsure which path fits", "Other"] },
      { name: "message", label: "Message", type: "textarea", required: true, minLength: 20, maxLength: 2500, hint: "Do not include sensitive or confidential information." },
      consent,
    ],
  },
  concern_report: {
    title: "Report a concern",
    submitLabel: "Submit concern",
    sourcePage: "/report-a-concern",
    success: "Formspree accepted your concern for human review. Confidentiality has limits and a specific outcome cannot be promised.",
    fields: [
      { name: "name", label: "Name", type: "text", optionalLabel: "optional", maxLength: 100 },
      { name: "email", label: "Email", type: "email", optionalLabel: "required only if you request follow-up", maxLength: 200 },
      { name: "relationship", label: "Relationship to the ecosystem", type: "select", required: true, options: ["Visitor", "Builder or applicant", "Organization", "Network participant or referral", "Partner or provider", "Person affected by an activity", "Other"] },
      { name: "category", label: "Concern category", type: "select", required: true, options: ["Conduct or harassment", "Privacy or confidentiality", "Project treatment or labor", "Partner representation", "Community interaction", "Accessibility", "Safety", "Other"] },
      { name: "description", label: "Description", type: "textarea", required: true, minLength: 30, maxLength: 4000, hint: "Share only what is needed for review. This form is not an emergency service." },
      { name: "people_or_project", label: "People or project involved", type: "text", optionalLabel: "optional", maxLength: 500 },
      { name: "immediate_safety", label: "Is there an immediate safety concern?", type: "select", required: true, options: ["No", "Yes—I understand this service cannot provide emergency response"] },
      { name: "desired_followup", label: "Desired follow-up", type: "select", optionalLabel: "optional", options: ["No follow-up requested", "Email follow-up requested", "Acknowledge receipt if possible", "Not sure"] },
      { name: "confidentiality_limits", label: "I understand that confidentiality has limits and anonymity cannot be promised.", type: "checkbox", required: true },
      consent,
    ],
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSubmission(type: SubmissionType, input: unknown) {
  const errors: Record<string, string> = {};
  if (!input || typeof input !== "object" || Array.isArray(input)) return { valid: false, errors: { form: "Submission data is invalid." }, data: {} };
  const source = input as Record<string, unknown>;
  const clean: Record<string, string | boolean> = {};
  for (const field of formConfigs[type].fields) {
    const raw = source[field.name];
    if (field.type === "checkbox") {
      clean[field.name] = raw === true;
      if (field.required && raw !== true) errors[field.name] = "This acknowledgment is required.";
      continue;
    }
    const value = typeof raw === "string" ? raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim() : "";
    clean[field.name] = value;
    if (field.required && !value) errors[field.name] = `${field.label} is required.`;
    else if (value && field.minLength && value.length < field.minLength) errors[field.name] = `${field.label} must be at least ${field.minLength} characters.`;
    else if (value && field.maxLength && value.length > field.maxLength) errors[field.name] = `${field.label} must be ${field.maxLength} characters or fewer.`;
    else if (value && field.type === "email" && !emailPattern.test(value)) errors[field.name] = "Enter a valid email address.";
    else if (value && field.type === "url") {
      try { const url = new URL(value); if (!['http:', 'https:'].includes(url.protocol)) throw new Error(); } catch { errors[field.name] = "Enter a full http or https URL."; }
    } else if (value && field.options && !field.options.map((option) => typeof option === "string" ? option : option.value).includes(value)) errors[field.name] = "Choose an available option.";
  }
  if (type === "concern_report" && clean.desired_followup === "Email follow-up requested" && !clean.email) errors.email = "Email is required when follow-up is requested.";
  return { valid: Object.keys(errors).length === 0, errors, data: clean };
}
