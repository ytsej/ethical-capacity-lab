"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { formConfigs, validateSubmission, type FieldConfig } from "@/lib/submissions/forms";
import type { SubmissionType } from "@/lib/submissions/types";

function Field({ field, value, error, onChange }: { field: FieldConfig; value: string | boolean; error?: string; onChange: (value: string | boolean) => void }) {
  const id = `field-${field.name}`;
  const describedBy = [field.hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  if (field.type === "checkbox") return (
    <div className={`form-field checkbox-field ${error ? "field-error" : ""}`}>
      <label htmlFor={id}><input id={id} name={field.name} type="checkbox" required={field.required} checked={value === true} onChange={(event) => onChange(event.target.checked)} aria-invalid={Boolean(error)} aria-describedby={describedBy} /> <span>{field.label} <strong>(required)</strong></span></label>
      {error && <p id={`${id}-error`} className="inline-error">{error}</p>}
    </div>
  );
  return (
    <div className={`form-field ${error ? "field-error" : ""}`}>
      <label htmlFor={id}>{field.label} {field.required ? <strong>(required)</strong> : <span>({field.optionalLabel || "optional"})</span>}</label>
      {field.hint && <p id={`${id}-hint`} className="field-hint">{field.hint}</p>}
      {field.type === "textarea" ? <textarea id={id} name={field.name} value={String(value || "")} onChange={(event) => onChange(event.target.value)} required={field.required} maxLength={field.maxLength} rows={5} aria-invalid={Boolean(error)} aria-describedby={describedBy} /> : field.type === "select" ? <select id={id} name={field.name} value={String(value || "")} onChange={(event) => onChange(event.target.value)} required={field.required} aria-invalid={Boolean(error)} aria-describedby={describedBy}><option value="">Choose an option</option>{field.options?.map((option) => { const value = typeof option === "string" ? option : option.value; const label = typeof option === "string" ? option : option.label; return <option key={value} value={value}>{label}</option>; })}</select> : <input id={id} name={field.name} type={field.type} value={String(value || "")} onChange={(event) => onChange(event.target.value)} required={field.required} maxLength={field.maxLength} aria-invalid={Boolean(error)} aria-describedby={describedBy} />}
      {error && <p id={`${id}-error`} className="inline-error">{error}</p>}
    </div>
  );
}

export function SubmissionForm({ type, submissionAvailable }: { type: SubmissionType; submissionAvailable: boolean }) {
  const config = formConfigs[type];
  const initial = Object.fromEntries(config.fields.map((field) => [field.name, field.defaultValue ?? (field.type === "checkbox" ? false : "")]));
  const [values, setValues] = useState<Record<string, string | boolean>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [resultTitle, setResultTitle] = useState("Request received");
  const [honeypot, setHoneypot] = useState("");
  const errorSummary = useRef<HTMLDivElement>(null);
  const resultSummary = useRef<HTMLElement>(null);

  function updateField(name: string, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => { const next = { ...current }; delete next[name]; return next; });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submissionAvailable || status === "loading") return;
    const validation = validateSubmission(type, values);
    if (!validation.valid) {
      setErrors(validation.errors); setStatus("error"); setMessage("Review the highlighted fields before submitting.");
      requestAnimationFrame(() => errorSummary.current?.focus()); return;
    }
    setErrors({}); setStatus("loading"); setMessage("");
    try {
      const response = await fetch("/api/submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, data: validation.data, companyFax: honeypot }) });
      const result = await response.json() as { title?: string; message?: string; error?: string; fields?: Record<string, string> };
      if (!response.ok) {
        setErrors(result.fields || {}); setStatus("error"); setMessage(result.error || "Submission failed. Nothing was reported as received.");
        requestAnimationFrame(() => errorSummary.current?.focus()); return;
      }
      setStatus("success");
      setResultTitle(result.title || "Request received");
      setMessage(result.message || config.success); setValues(initial);
      requestAnimationFrame(() => resultSummary.current?.focus());
    } catch {
      setStatus("error"); setMessage("The submission service could not be reached. Nothing was reported as received. Please try again later.");
      requestAnimationFrame(() => errorSummary.current?.focus());
    }
  }

  if (!submissionAvailable) return <aside className="form-unavailable" role="status"><h2>Online submission is temporarily unavailable</h2><p>We cannot receive this form right now. Please use another contact option, and do not send sensitive information by email.</p><p><Link className="text-link" href="/contact">Review the contact options</Link> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p></aside>;
  if (status === "success") return <aside className="form-success" role="status" tabIndex={-1} ref={resultSummary}><h2>{resultTitle}</h2><p>{message}</p></aside>;

  const renderField = (field: FieldConfig) => <Field key={field.name} field={field} value={values[field.name] ?? (field.type === "checkbox" ? false : "")} error={errors[field.name]} onChange={(value) => updateField(field.name, value)} />;

  return (
    <form className="submission-form" onSubmit={submit} noValidate>
      <div className="form-heading"><p className="eyebrow">Online submission</p><h2>{config.title}</h2>{config.timeEstimate && <p className="form-time">{config.timeEstimate}</p>}<p>Required and optional fields are identified. Do not include sensitive information beyond what the form explicitly requests.</p></div>
      {(status === "error" || Object.keys(errors).length > 0) && <div className="error-summary" role="alert" tabIndex={-1} ref={errorSummary}><h3>There is a problem</h3><p>{message}</p>{Object.keys(errors).length > 0 && <ul>{Object.entries(errors).map(([name, error]) => <li key={name}><a href={`#field-${name}`}>{error}</a></li>)}</ul>}</div>}
      <div className="honeypot" aria-hidden="true"><label htmlFor="company-fax">Company fax</label><input id="company-fax" name="company-fax" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} /></div>
      {config.groups ? config.groups.map((group) => (
        <fieldset className="form-group" key={group.legend}>
          <legend>{group.legend}</legend>
          {group.description && <p className="form-group-description">{group.description}</p>}
          {group.fields.map((name) => renderField(config.fields.find((field) => field.name === name)!))}
        </fieldset>
      )) : config.fields.map(renderField)}
      <div className="form-submit"><p>By submitting, you confirm the information is accurate and may be reviewed for this pathway. Read the <Link href="/privacy">Privacy Policy</Link>.</p><button className="button" type="submit" disabled={status === "loading"}>{status === "loading" ? "Submitting…" : config.submitLabel}</button></div>
    </form>
  );
}
