import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { formConfigs, validateSubmission } from "@/lib/submissions/forms";
import { FormspreeSubmissionError, isFormspreeConfigured, submitToFormspree } from "@/lib/submissions/formspree";
import { submissionTypes, type SubmissionType } from "@/lib/submissions/types";

export const runtime = "nodejs";

const attempts = new Map<string, number[]>();
const duplicates = new Map<string, number>();
const WINDOW = 10 * 60 * 1000;

function digest(value: string) { return createHash("sha256").update(value).digest("hex"); }

function acceptedCopy(type: SubmissionType) {
  if (type === "challenge") return { title: "Organization request received", message: formConfigs[type].success };
  if (type === "general_contact") return { title: "Message received", message: formConfigs[type].success };
  if (type === "builder_interest") return { title: "Builder interest received", message: formConfigs[type].success };
  if (type === "liberation_interest") return { title: "Network interest received", message: formConfigs[type].success };
  if (type === "partnership_inquiry") return { title: "Partnership proposal received", message: formConfigs[type].success };
  return { title: "Concern received", message: formConfigs[type].success };
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "Use application/json." }, { status: 415 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 40_000) return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return NextResponse.json({ error: "Origin not allowed." }, { status: 403 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  const envelope = body as Record<string, unknown>;
  const type = envelope.type as SubmissionType;
  if (!submissionTypes.includes(type)) return NextResponse.json({ error: "Unknown submission type." }, { status: 400 });
  if (envelope.companyFax) return NextResponse.json({ error: "Spam check failed." }, { status: 400 });
  if (!isFormspreeConfigured(type)) return NextResponse.json({ error: "Submission is temporarily unavailable while the Formspree connection is configured." }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const rateKey = digest(`${ip}|${type}`);
  const now = Date.now();
  const recent = (attempts.get(rateKey) || []).filter((time) => now - time < WINDOW);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many recent attempts. Please wait and try again." }, { status: 429 });
  recent.push(now); attempts.set(rateKey, recent);

  const validation = validateSubmission(type, envelope.data);
  if (!validation.valid) return NextResponse.json({ error: "Review the highlighted fields.", fields: validation.errors }, { status: 422 });
  const duplicateKey = digest(`${type}|${JSON.stringify(validation.data)}`);
  const duplicateAt = duplicates.get(duplicateKey);
  if (duplicateAt && now - duplicateAt < WINDOW) return NextResponse.json({ error: "This exact submission was already accepted recently." }, { status: 409 });

  try {
    await submitToFormspree(type, validation.data);
  } catch (error) {
    const fieldErrors = error instanceof FormspreeSubmissionError ? error.fieldErrors : {};
    console.error(`[submission] formspree_error type=${type} name=${error instanceof Error ? error.name : "unknown"}`);
    return NextResponse.json({ error: "Formspree could not accept the submission. Nothing was reported as received. Please try later or use the alternate contact route.", fields: fieldErrors }, { status: 503 });
  }

  duplicates.set(duplicateKey, now);
  console.info(`[submission] formspree_accepted type=${type}`);
  return NextResponse.json({ ...acceptedCopy(type), provider: "formspree" }, { status: 201 });
}
