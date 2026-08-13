import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { formConfigs } from "@/lib/submissions/forms";
import type { SubmissionType } from "@/lib/submissions/types";

const state = vi.hoisted(() => ({
  configured: true,
  submit: vi.fn(),
}));

vi.mock("@/lib/submissions/formspree", () => {
  class FormspreeSubmissionError extends Error {
    constructor(public readonly status: number, public readonly fieldErrors: Record<string, string> = {}) {
      super("Formspree rejected the submission");
      this.name = "FormspreeSubmissionError";
    }
  }
  return {
    FormspreeSubmissionError,
    isFormspreeConfigured: () => state.configured,
    submitToFormspree: state.submit,
  };
});

import { FormspreeSubmissionError } from "@/lib/submissions/formspree";
import { POST } from "@/app/api/submissions/route";

function complete(type: SubmissionType, marker: string) {
  return Object.fromEntries(formConfigs[type].fields.map((field) => {
    if (field.type === "checkbox") return [field.name, true];
    if (field.options) return [field.name, typeof field.options[0] === "string" ? field.options[0] : field.options[0].value];
    if (field.type === "email") return [field.name, `${marker}@example.org`];
    if (field.type === "url") return [field.name, "https://example.org"];
    return [field.name, `Dummy ${marker} response with enough detail for responsible review.`];
  }));
}

function request(type: SubmissionType, data: Record<string, string | boolean>, ip: string) {
  return new NextRequest("http://localhost/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Host: "localhost", Origin: "http://localhost", "X-Forwarded-For": ip },
    body: JSON.stringify({ type, data, companyFax: "" }),
  });
}

describe("Formspree submission route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.configured = true;
    state.submit.mockResolvedValue(undefined);
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("validates and forwards a complete submission without creating a local record", async () => {
    const data = complete("general_contact", "accepted");
    const response = await POST(request("general_contact", data, "192.0.2.11"));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toMatchObject({ title: "Message received", provider: "formspree" });
    expect(body).not.toHaveProperty("id");
    expect(body).not.toHaveProperty("publicReference");
    expect(state.submit).toHaveBeenCalledWith("general_contact", expect.objectContaining({ email: "accepted@example.org" }));
  });

  it("does not claim receipt when Formspree rejects the request", async () => {
    state.submit.mockRejectedValueOnce(new FormspreeSubmissionError(422, { email: "Email is not accepted" }));
    const response = await POST(request("general_contact", complete("general_contact", "provider-error"), "192.0.2.12"));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain("Nothing was reported as received");
    expect(body.fields.email).toBe("Email is not accepted");
  });

  it("keeps a form unavailable until its Formspree endpoint exists", async () => {
    state.configured = false;
    const response = await POST(request("builder_interest", complete("builder_interest", "unavailable"), "192.0.2.13"));
    expect(response.status).toBe(503);
    expect((await response.json()).error).toContain("Formspree connection");
    expect(state.submit).not.toHaveBeenCalled();
  });

  it("returns server field errors before contacting Formspree", async () => {
    const response = await POST(request("general_contact", { email: "bad" }, "192.0.2.14"));
    const body = await response.json();
    expect(response.status).toBe(422);
    expect(body.fields.consent).toBeTruthy();
    expect(state.submit).not.toHaveBeenCalled();
  });

  it("rejects a recently accepted exact duplicate", async () => {
    const data = complete("partnership_inquiry", "duplicate");
    expect((await POST(request("partnership_inquiry", data, "192.0.2.15"))).status).toBe(201);
    expect((await POST(request("partnership_inquiry", data, "192.0.2.15"))).status).toBe(409);
    expect(state.submit).toHaveBeenCalledTimes(1);
  });
});
