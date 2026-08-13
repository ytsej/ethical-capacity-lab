# Ethical Capacity Lab website rules

## Commands

- Install: `npm.cmd install`
- Develop: `npm.cmd run dev`
- Lint: `npm.cmd run lint`
- Type-check: `npm.cmd run typecheck`
- Unit tests: `npm.cmd run test`
- Browser tests: `npm.cmd run test:e2e`
- Production build: `npm.cmd run build`

## Stable implementation rules

- Use Next.js App Router with strict TypeScript and the typed files in `content/` as the public-content source of truth.
- Keep the Ethical Capacity Lab, DoGoodie, and the Liberation from Suffering Network distinct but visibly connected.
- Preserve every canonical route in `CODEX_MASTER_PROMPT_ECL_WEBSITE.md` and the legacy redirect map in `next.config.ts`.
- `/start` is the primary QR destination. Do not turn it into an intake form.
- Forms must validate on the client and server, minimize data, include consent and a honeypot, and never report success unless the server adapter accepts the submission.
- Planned work must be labeled planned, pilot, archived, or not yet active. Never fabricate partners, projects, testimonials, metrics, opportunities, or biographies.
- Do not claim certification, auditing, regulation, employment, clinical/legal/financial advice, guaranteed work, membership, referrals, purchases, income, or mature global scale.
- Do not add accounts, directories, matching, payments, ratings, surveillance analytics, or public user-generated content.
- Public forms use server-validated Formspree delivery and no website database. Keep concern reports on a separate Formspree endpoint.
- Optional GA4 must remain consent-controlled through `NEXT_PUBLIC_GA_MEASUREMENT_ID`; load no Google tag before consent, keep advertising permissions denied, and never send form, concern, free-text, identity, or sensitive query data.
- Public Privacy, Terms, and Cookie pages must describe current production behavior without draft labels or invented legal facts.
- No deployment or DNS changes without explicit authorization.

## Authoritative sources

Read `CODEX_MASTER_PROMPT_ECL_WEBSITE.md` first. Detailed supporting sources are:

- `Liberation_Ecosystem_Deliverables_4_5_Final.docx`
- `Liberation_Ecosystem_Deliverable_6_User_Journey_Diagrams.docx`
- `Deliverable 3a - Ecosystem Architecture (Detailed Working Artifact).html`
- `Liberation_Ecosystem_Audience_and_Trust_Map.docx`
- `Liberation_Ecosystem_Benchmark_Research_Final.docx`

See `docs/content-source-map.md` for route-level traceability.
