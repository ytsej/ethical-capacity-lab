import "server-only";
import { formConfigs } from "./forms";
import type { SubmissionType } from "./types";

const endpointVariables: Record<SubmissionType, string> = {
  challenge: "FORMSPREE_ENDPOINT_CHALLENGE",
  builder_interest: "FORMSPREE_ENDPOINT_BUILDER_INTEREST",
  liberation_interest: "FORMSPREE_ENDPOINT_LIBERATION_INTEREST",
  partnership_inquiry: "FORMSPREE_ENDPOINT_PARTNERSHIP_INQUIRY",
  general_contact: "FORMSPREE_ENDPOINT_GENERAL_CONTACT",
  concern_report: "FORMSPREE_ENDPOINT_CONCERN_REPORT",
};

export const formspreeSubjects: Record<SubmissionType, string> = {
  challenge: "Organization Challenges",
  builder_interest: "Builder Interest",
  liberation_interest: "Liberation Network Interest",
  partnership_inquiry: "Partnership Inquiries",
  general_contact: "General Contact",
  concern_report: "Concern Reports",
};

const fieldLabelOverrides: Record<string, string> = {
  additional_note: "Additional Notes",
  affected_people: "People Affected",
  confidentiality_limits: "Confidentiality Acknowledgment",
  consent: "Privacy Consent",
  desired_followup: "Desired Follow-Up",
  desired_outcome: "Desired Outcome",
  display_permission: "Public Display Permission",
  found_via: "How They Found the Network",
  full_name: "Full Name",
  immediate_safety: "Immediate Safety Concern",
  intended_purpose: "Intended Purpose",
  interest_or_referral: "Interest or Referral",
  no_guarantee: "No-Guarantee Acknowledgment",
  organization_name: "Organization Name",
  partnership_type: "Partnership Type",
  people_or_project: "People or Project Involved",
  permission_to_contact: "Permission to Contact",
  preferred_next_step: "Preferred Next Step",
  primary_skills: "Primary Skills",
  problem: "Organization Challenge",
  sensitive_confirmation: "Sensitive Information Confirmation",
  short_note: "Short Note",
  timezone: "Time Zone",
  vision_interest: "Network Interest",
  work_example: "Work Example",
  work_interest: "Work Interest",
};

function formalFieldName(name: string) {
  if (name === "email") return name;
  return fieldLabelOverrides[name] || name.split("_").map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ");
}

function formspreeValue(value: string | boolean) {
  return typeof value === "boolean" ? (value ? "Yes" : "No") : value.trim();
}

export function buildFormspreePayload(type: SubmissionType, data: Record<string, string | boolean>) {
  const payload: Record<string, string> = { subject: `[ECL] ${formspreeSubjects[type]}` };
  for (const field of formConfigs[type].fields) {
    if (!(field.name in data)) continue;
    const value = formspreeValue(data[field.name]);
    if (!value) continue;
    payload[formalFieldName(field.name)] = value;
  }
  payload["Form Type"] = formspreeSubjects[type];
  payload["Source Page"] = formConfigs[type].sourcePage;
  payload["Consent Version"] = "2026-08-10";
  return payload;
}

function isTestMode() {
  return process.env.NODE_ENV !== "production" && process.env.FORMSPREE_TEST_MODE === "accept";
}

export function isValidFormspreeEndpoint(value: string | undefined) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "formspree.io" && /^\/f\/[a-zA-Z0-9]+\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}

export function getFormspreeEndpoint(type: SubmissionType) {
  const specific = process.env[endpointVariables[type]];
  if (isValidFormspreeEndpoint(specific)) return specific!;
  if (type !== "concern_report" && isValidFormspreeEndpoint(process.env.FORMSPREE_ENDPOINT)) return process.env.FORMSPREE_ENDPOINT!;
  return null;
}

export function isFormspreeConfigured(type: SubmissionType) {
  return isTestMode() || Boolean(getFormspreeEndpoint(type));
}

export class FormspreeSubmissionError extends Error {
  constructor(public readonly status: number, public readonly fieldErrors: Record<string, string> = {}) {
    super("Formspree rejected the submission");
    this.name = "FormspreeSubmissionError";
  }
}

type FormspreeErrorBody = { errors?: Array<{ field?: string; message?: string }> };

export async function submitToFormspree(type: SubmissionType, data: Record<string, string | boolean>) {
  if (isTestMode()) return;
  const endpoint = getFormspreeEndpoint(type);
  if (!endpoint) throw new FormspreeSubmissionError(503);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(buildFormspreePayload(type, data)),
    cache: "no-store",
  });

  if (response.ok) return;
  const body = await response.json().catch(() => null) as FormspreeErrorBody | null;
  const fieldErrors = Object.fromEntries(
    (body?.errors || [])
      .filter((error) => error.field && error.message)
      .map((error) => {
        const rawName = formConfigs[type].fields.find((field) => formalFieldName(field.name) === error.field)?.name || error.field!;
        return [rawName, error.message!];
      }),
  );
  throw new FormspreeSubmissionError(response.status, fieldErrors);
}
