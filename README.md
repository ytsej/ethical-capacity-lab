# Ethical Capacity Lab website

One public front door for The Ethical Capacity Lab (institutional trust layer), DoGoodie (practical arm), and the Liberation from Suffering Network (relationship network). The site routes five public audiences to distinct, bounded pathways while keeping public learning available without pressure.

The public website is deployed at `https://ethicalcapacitylab.org`. Repository changes still require review and an explicitly authorized production deployment.

## Architecture

- Next.js App Router with strict TypeScript
- Server-rendered public pages and small client islands for navigation and forms
- CSS design tokens based on the approved warm ECL, muted-navy DoGoodie, and forest-green Liberation palette
- Typed content in `content/`
- Shared accessible components in `components/`
- POST-only server validation at `/api/submissions`, followed by Formspree delivery
- No website submission database or local persistence layer
- Separate Operations Hub pathway for 30-minute consultation requests
- Consent-controlled Google Analytics 4 support with advertising permissions kept denied
- Vitest for validation/unit coverage and Playwright + axe for route, journey, form, interaction, and accessibility checks

No CMS, accounts, directory, automated matching, payments, or public user content are included. Optional analytics loads only after consent and only when a GA4 measurement ID is configured.

## Requirements and installation

- Node.js 20.9 or newer (the implementation was verified with the version recorded in `docs/qa-report.md`)
- npm

```powershell
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

Open `http://localhost:3000`. The canonical URL and QR code use `NEXT_PUBLIC_SITE_URL`.

## Quality commands

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test
npm.cmd run test:e2e
npm.cmd run test:a11y
npm.cmd run build
npm.cmd run start
```

Install the Playwright Chromium runtime once after installing dependencies:

```powershell
npx.cmd playwright install chromium
```

## Environment variables

See `.env.example`.

- `NEXT_PUBLIC_SITE_URL`: canonical base used by metadata, sitemap, and the generated `/start` QR code.
- `SITE_ENV`: keep `preview` (or leave unset) to return `noindex` metadata and an `X-Robots-Tag` header. Search indexing turns on only when this is exactly `production` and `NEXT_PUBLIC_SITE_URL` is a valid non-local HTTPS URL.
- `NEXT_TELEMETRY_DISABLED`: set to `1` in build and hosting environments to disable framework telemetry.
- `FORMSPREE_ENDPOINT`: optional shared Formspree endpoint for normal forms.
- `FORMSPREE_ENDPOINT_CHALLENGE`, `FORMSPREE_ENDPOINT_BUILDER_INTEREST`, `FORMSPREE_ENDPOINT_LIBERATION_INTEREST`, `FORMSPREE_ENDPOINT_PARTNERSHIP_INQUIRY`, and `FORMSPREE_ENDPOINT_GENERAL_CONTACT`: optional per-form overrides.
- `FORMSPREE_ENDPOINT_CONCERN_REPORT`: required separate concern endpoint; it never falls back to the normal shared endpoint.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional GA4 measurement ID in the form `G-...`. Leave it empty to load no analytics script. Consent and property settings are documented in `docs/analytics-and-consent.md`.

Forms without a valid Formspree endpoint show an honest “submission is temporarily unavailable” state. They never report success unless Formspree accepts the server-validated request.

## Forms and submissions

Six typed forms share client and server validation, inline errors, focusable error summaries, required consent, a honeypot, loading/disabled states, request-size limits, same-origin checks, in-memory rate limiting, recent duplicate detection, and Formspree delivery:

- organization challenge
- builder interest
- Liberation interest/referral
- partnership inquiry
- general contact
- concern report

The API logs only the form type and provider outcome, never the submitted body. The website does not keep a submission copy. Formspree processes and stores accepted form data according to the configured Formspree account. Concern reports require a separate endpoint. See `docs/forms-and-submissions.md`.

## Content updates

Public content is reviewed in:

- `content/site.ts`: names, stage statement, boundaries, team roles, support systems
- `content/navigation.ts`: header, footer, and Start Here routing
- `content/ecosystem.ts`: branch descriptions and value flow
- `content/capabilities.ts`: DoGoodie capability and organization process
- `content/builder-pathways.ts`: general and program-specific builder pathways
- `content/liberation.ts`: participation and conversation model
- `content/programs.ts`: Impact Hack dates and derived status
- `content/work.ts`: evidence records
- `content/resources.ts`: public guides and FAQ
- `content/partners.ts`: partnership types and standards
- `content/policies.ts`: privacy and terms source text
- `content/response-times.ts`: one source of truth for public response targets

### Program status

Update the ISO timestamps and display facts in `content/programs.ts`. `getProgramStatus()` derives upcoming, applications-open, reviewing, active, judging, or archived status. All dates include the published UTC+08:00 offset and the program states Asia/Manila / PHT explicitly.

## Routes and legacy redirects

All approved canonical routes are implemented, plus `/impact-hack`. Permanent redirects in `next.config.ts` preserve moved live DoGoodie routes:

- `/community` → `/builders`
- `/join` → `/builders#expression-of-interest`
- `/faq` → `/resources#faq`
- `/proof-of-work` → `/work`
- `/manifesto` → `/ethical-work`
- `/submit-a-challenge` → `/challenges`
- `/ethical-capacity-lab` → `/about`
- `/liberation-network` → `/liberation`

Canonical policy and contact routes remain live at their original URLs.

## Preview and production behavior

1. Set `NEXT_PUBLIC_SITE_URL` to the preview origin.
2. Set `SITE_ENV=preview` to prevent accidental indexing.
3. Leave Formspree endpoints empty unless the preview is intentionally connected to reviewed dummy-data forms.
4. Run all quality commands and build.
5. Start with `npm.cmd run start` or deploy the build to a reversible preview environment.

For production, configure and test the Formspree endpoints, review Formspree retention and account access, set the canonical URL, configure the optional GA4 property before adding its measurement ID, and follow `docs/deployment-checklist.md`.

The technical search checklist is in `docs/seo-launch-checklist.md`. Completing it does not authorize deployment, DNS changes, or Search Console changes.

## Known limitations and required real-world work

- No Formspree endpoint IDs are committed; enabled environments receive them through deployment configuration.
- No legal entity type, registration, physical address, governing jurisdiction, tax status, or exact infrastructure-retention schedule was supplied, so the public policies deliberately make none of those claims.
- No independent accessibility audit has been completed; automated and documented manual checks do not establish full WCAG conformance.
- Partner listings, participant projects, results, metrics, testimonials, open paid opportunities, and biographies beyond approved roles remain intentionally absent.
- The current Impact Hack continues to link to its verified external Google application/submission forms; those services have their own accessibility and privacy behavior.
- No trained safeguarding staff, emergency response, mature governance, global scale, certification, auditing, or regulated-professional endorsement is claimed.
- Formspree and the Operations Hub are third-party processors/pathways whose account access, retention, and privacy settings require operational review.

## Source traceability

See `docs/content-source-map.md`. The implementation follows the precedence in `CODEX_MASTER_PROMPT_ECL_WEBSITE.md` and uses the supplied Deliverables 1–6 as approved requirements.
