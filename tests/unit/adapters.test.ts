import { afterEach, describe, expect, it, vi } from "vitest";
import { buildFormspreePayload, getFormspreeEndpoint, isFormspreeConfigured, isValidFormspreeEndpoint, submitToFormspree } from "@/lib/submissions/formspree";

vi.mock("server-only", () => ({}));

describe("Formspree delivery", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("accepts only standard HTTPS Formspree form endpoints", () => {
    expect(isValidFormspreeEndpoint("https://formspree.io/f/abc123")).toBe(true);
    expect(isValidFormspreeEndpoint("http://formspree.io/f/abc123")).toBe(false);
    expect(isValidFormspreeEndpoint("https://example.org/f/abc123")).toBe(false);
    expect(isValidFormspreeEndpoint("javascript:alert(1)")).toBe(false);
  });

  it("uses a per-form endpoint before the shared normal endpoint", () => {
    vi.stubEnv("FORMSPREE_ENDPOINT", "https://formspree.io/f/shared123");
    vi.stubEnv("FORMSPREE_ENDPOINT_GENERAL_CONTACT", "https://formspree.io/f/contact123");
    expect(getFormspreeEndpoint("general_contact")).toBe("https://formspree.io/f/contact123");
    expect(getFormspreeEndpoint("builder_interest")).toBe("https://formspree.io/f/shared123");
  });

  it("requires a separate endpoint for concern reports", () => {
    vi.stubEnv("FORMSPREE_ENDPOINT", "https://formspree.io/f/shared123");
    expect(getFormspreeEndpoint("concern_report")).toBeNull();
    expect(isFormspreeConfigured("concern_report")).toBe(false);
    vi.stubEnv("FORMSPREE_ENDPOINT_CONCERN_REPORT", "https://formspree.io/f/concern123");
    expect(isFormspreeConfigured("concern_report")).toBe(true);
  });

  it("posts validated fields and controlled metadata to Formspree", async () => {
    vi.stubEnv("FORMSPREE_ENDPOINT_GENERAL_CONTACT", "https://formspree.io/f/contact123");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await submitToFormspree("general_contact", { name: "Test Person", email: "person@example.org", consent: true });
    expect(fetchMock).toHaveBeenCalledWith("https://formspree.io/f/contact123", expect.objectContaining({ method: "POST", cache: "no-store" }));
    const body = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body));
    expect(body).toMatchObject({ email: "person@example.org", Name: "Test Person", "Privacy Consent": "Yes", "Form Type": "General Contact", "Source Page": "/contact", subject: "[ECL] General Contact" });
    expect(body).not.toHaveProperty("id");
  });

  it("uses formal challenge labels, Yes/No values, and omits blank optional answers", () => {
    expect(buildFormspreePayload("challenge", {
      full_name: "A Client",
      email: "client@example.org",
      organization_name: "Example Organization",
      problem: "We need a clearer intake process.",
      additional_note: "   ",
      sensitive_confirmation: true,
      permission_to_contact: true,
      consent: true,
    })).toMatchObject({
      subject: "[ECL] Organization Challenges",
      "Full Name": "A Client",
      email: "client@example.org",
      "Organization Name": "Example Organization",
      "Organization Challenge": "We need a clearer intake process.",
      "Sensitive Information Confirmation": "Yes",
      "Permission to Contact": "Yes",
      "Privacy Consent": "Yes",
    });
    expect(buildFormspreePayload("challenge", { additional_note: "" })).not.toHaveProperty("Additional Notes");
  });
});
