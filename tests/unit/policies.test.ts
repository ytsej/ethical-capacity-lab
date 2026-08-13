import { describe, expect, it } from "vitest";
import { cookieSections, policyUpdated, policyUpdatedIso, privacySections, termsSections } from "@/content/policies";

describe("production policies", () => {
  it("uses the production update date and contains no provisional labels", () => {
    expect(policyUpdated).toBe("13 August 2026");
    expect(policyUpdatedIso).toBe("2026-08-13");
    const copy = JSON.stringify([privacySections, termsSections, cookieSections]).toLowerCase();
    for (const phrase of ["working policy", "draft terms", "formal legal review", "not finalized", "placeholder", "production property", "production setting has been confirmed", "valid measurement id is configured"]) {
      expect(copy).not.toContain(phrase);
    }
  });

  it("names only verified public-site services and preserves no-database accuracy", () => {
    const privacy = JSON.stringify(privacySections);
    expect(privacy).toContain("Vercel");
    expect(privacy).toContain("Formspree");
    expect(privacy).toContain("Google Analytics");
    expect(privacy).toContain("does not maintain its own submissions database");
    expect(privacy).not.toContain("Supabase");
    expect(privacy).not.toContain("Resend");
  });

  it("uses plain-language public cookie descriptions without implementation identifiers", () => {
    const cookies = JSON.stringify(cookieSections);
    expect(cookies).toContain("Google Analytics");
    expect(cookies).toContain("up to two years");
    expect(cookies).not.toContain("ecl_consent_v1");
    expect(cookies).not.toContain("_ga");
    expect(cookies).not.toContain("Google Analytics 4");
  });
});
