import { describe, expect, it } from "vitest";
import { formConfigs, validateSubmission } from "@/lib/submissions/forms";
import { getOrganizationSchedulingState } from "@/lib/scheduling";
import type { SubmissionType } from "@/lib/submissions/types";

function complete(type: SubmissionType) {
  return Object.fromEntries(formConfigs[type].fields.map((field) => {
    if (field.type === "checkbox") return [field.name, true];
    if (field.options) return [field.name, typeof field.options[0] === "string" ? field.options[0] : field.options[0].value];
    if (field.type === "email") return [field.name, "person@example.org"];
    if (field.type === "url") return [field.name, "https://example.org"];
    return [field.name, "A sufficiently detailed response for responsible human review and routing."];
  }));
}

describe("submission validation", () => {
  it.each(Object.keys(formConfigs) as SubmissionType[])("accepts a complete %s payload", (type) => {
    expect(validateSubmission(type, complete(type))).toMatchObject({ valid: true, errors: {} });
  });

  it("returns required-field and invalid-email errors", () => {
    const payload = complete("general_contact");
    payload.name = "";
    payload.email = "not-an-email";
    payload.consent = false;
    const result = validateSubmission("general_contact", payload);
    expect(result.valid).toBe(false);
    expect(result.errors.name).toContain("required");
    expect(result.errors.email).toContain("valid email");
    expect(result.errors.consent).toContain("required");
  });

  it("requires sensitive-information confirmation on challenges", () => {
    const payload = complete("challenge");
    payload.sensitive_confirmation = false;
    expect(validateSubmission("challenge", payload).errors.sensitive_confirmation).toBeTruthy();
  });

  it("keeps the first-contact challenge form short and separate from consultation requests", () => {
    const fields = formConfigs.challenge.fields.map((field) => field.name);
    expect(fields).toHaveLength(10);
    expect(fields).not.toEqual(expect.arrayContaining(["role", "website", "timeline", "budget", "current_attempts", "preferred_response"]));
  });

  it("keeps builder interest short and the portfolio optional", () => {
    const fields = formConfigs.builder_interest.fields;
    expect(fields).toHaveLength(11);
    expect(fields.find((field) => field.name === "portfolio")?.type).toBe("url");
    expect(fields.find((field) => field.name === "portfolio")?.required).toBeUndefined();
    expect(fields.map((field) => field.name)).not.toEqual(expect.arrayContaining(["supporting_skills", "experience", "engagement", "access_needs"]));
  });

  it("keeps Network interest minimal for both own interest and referrals", () => {
    const fields = formConfigs.liberation_interest.fields;
    expect(fields).toHaveLength(10);
    expect(fields.map((field) => field.name)).not.toContain("referrer");
    const payload = complete("liberation_interest");
    payload.interest_or_referral = "A referral made with permission";
    expect(validateSubmission("liberation_interest", payload)).toMatchObject({ valid: true, data: { interest_or_referral: "A referral made with permission" } });
  });

  it("defaults partnership public display permission to no and keeps organization optional", () => {
    const fields = formConfigs.partnership_inquiry.fields;
    expect(fields).toHaveLength(11);
    expect(fields.find((field) => field.name === "organization")?.required).toBeUndefined();
    expect(fields.find((field) => field.name === "display_permission")?.defaultValue).toBe("No public display permission");
    expect(fields.map((field) => field.name)).not.toEqual(expect.arrayContaining(["role", "mutual_value", "existing_relationship"]));
  });

  it("requires email when concern follow-up is requested", () => {
    const payload = complete("concern_report");
    payload.email = "";
    payload.desired_followup = "Email follow-up requested";
    expect(validateSubmission("concern_report", payload).errors.email).toContain("required");
  });

});

describe("organization scheduling", () => {
  it("routes consultation requests to the Operations Hub", () => {
    expect(getOrganizationSchedulingState()).toMatchObject({
      configured: true,
      external: true,
      href: "https://hub.ethicalcapacitylab.org/request-consultation",
      label: "Request a 30-minute consultation",
    });
  });
});
