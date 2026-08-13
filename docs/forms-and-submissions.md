# Forms and submissions

## Architecture

All six website forms use `components/SubmissionForm.tsx` and the shared schemas in `lib/submissions/forms.ts`. Validation runs in the browser for fast feedback and again in `POST /api/submissions` before the server forwards an accepted payload to Formspree.

The website does not store submissions in a local file or database. Formspree is the processor and operational record for enabled forms. A 30-minute consultation is a separate Operations Hub pathway at `https://hub.ethicalcapacitylab.org/request-consultation`; consultation data is not sent through the website forms.

Controls include accessible labels, inline errors, a focusable error summary, required consent, a honeypot, loading and disabled states, request-size and same-origin checks, in-memory rate limiting, recent duplicate rejection, and body-free application logs. A success state appears only after Formspree returns an accepted response.

## Formspree configuration

Create the required forms in Formspree and copy their full endpoints in the form `https://formspree.io/f/{form_id}` into the deployment environment.

- `FORMSPREE_ENDPOINT` may be used as one shared endpoint for normal forms.
- The per-form values override the shared endpoint: `FORMSPREE_ENDPOINT_CHALLENGE`, `FORMSPREE_ENDPOINT_BUILDER_INTEREST`, `FORMSPREE_ENDPOINT_LIBERATION_INTEREST`, `FORMSPREE_ENDPOINT_PARTNERSHIP_INQUIRY`, and `FORMSPREE_ENDPOINT_GENERAL_CONTACT`.
- `FORMSPREE_ENDPOINT_CONCERN_REPORT` is required separately and never falls back to the shared endpoint.

If an endpoint is missing or invalid, that form shows an unavailable state and the API does not claim receipt. Endpoint values stay server-side.

## Formspree account setup

For every form, confirm the destination inbox, spam settings, retention/deletion settings, account access, and any autoresponse text. Use dummy data to test each form before production. Restrict the concern form and destination to authorized reviewers, and confirm its access and retention separately.

Formspree recognizes `email` for reply handling and `subject` for notification subjects. The server supplies a controlled subject, form type, source page, and consent version along with the validated fields.

The server converts internal field keys to formal notification labels, omits blank optional values, and converts booleans to `Yes` or `No`. See `docs/formspree-notification-template.md` for the optional bold Formspree email template.

## Privacy and retention

The public Privacy Policy identifies Formspree as a processor and the Operations Hub as a separate third-party pathway. No final retention period is invented. Destine or the assigned operations owner must configure and periodically review Formspree retention by form category, especially concern reports.

The included in-memory rate limiter is a baseline, not a globally consistent multi-instance control. Review host-level or Formspree spam controls before higher-volume production use.
