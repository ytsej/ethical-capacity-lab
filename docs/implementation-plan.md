# Implementation map

## Audit outcome

- The workspace initially contained seven project-source files and no Git repository, package manifest, lockfile, framework, application code, tests, assets directory, environment file, or deployment configuration.
- The authoritative filenames in the master prompt include copy suffixes that are absent from the supplied files. The present same-titled files are treated as the authoritative copies.
- No existing user code or uncommitted Git work was available to overwrite.
- The public DoGoodie site is a static Vercel site. Its sitemap contains `/`, `/impact-hack`, `/community`, `/join`, `/proof-of-work`, `/manifesto`, `/faq`, `/contact`, `/submit-a-challenge`, `/ethical-capacity-lab`, `/privacy`, `/terms`, and `/community-standards`.
- Reusable legacy assets and content include the DoGoodie wordmark, Flickie mascot, Impact Hack campaign image, social image, program configuration, proof-over-promises framing, safe-to-fail experimentation, program-specific builder roles, consent/ownership safeguards, and honest proof-of-work empty state.

## Technical decision

Create a Next.js App Router application with strict TypeScript, server-rendered content, CSS design tokens, small client islands for navigation and forms, a server-only submission API, Vitest unit tests, and Playwright/axe browser checks. npm is the package manager because no lockfile or prior package-manager convention exists.

## Implementation sequence

1. Establish global layout, metadata, security headers, design tokens, navigation, footer, and responsive primitives.
2. Add typed content for navigation, ecosystem, capabilities, builders, Liberation, programs, work, resources, partners, policies, and response targets.
3. Implement all approved canonical pages and the semantic ecosystem/value/journey diagrams.
4. Implement the Impact Hack route and redirect every moved legacy route.
5. Add the shared accessible form system, validation, duplicate/rate controls, and server-validated Formspree delivery without a website database.
6. Add sitemap, robots, manifest/icons, 404, global error recovery, analytics interface, documentation, and migrations.
7. Run and fix lint, strict type-checking, unit tests, Playwright journey/route/form tests, axe checks, and production build.

## Content and claim decisions

- Keep the published Impact Hack dates in Asia/Manila and derive its current status from a single typed configuration.
- Treat the program’s Community/Funded Hacker/Impact Hacker/Core Builder roles as program-specific; keep Emerging/Proven/Core on the general builder pathway.
- Show no named partners, participant projects, outcomes, or open paid roles without evidence and permission.
- Use role-only team cards for Skyler, Destine, and John Mark.
- The public policy copy describes the implemented Formspree processing, separate Operations Hub consultation pathway, hosting logs, and disabled analytics.

## Preview readiness

The initial build remained local and deployable. The site was subsequently deployed and connected to `ethicalcapacitylab.org`; further deployment and DNS changes remain explicitly outside the current production-finalization scope. Preview indexing is controlled by `SITE_ENV=preview`; production indexing requires an intentional canonical URL and environment setting.

## Phase 2 implementation map — 7 August 2026

1. Reduce `/start` to its five audience choices plus the existing QR entry.
2. Rebuild `/builders`, `/liberation`, `/liberation/how-it-works`, and `/partners` around one clear audience action, fewer sections, grouped content, and one consolidated safeguards explanation per journey.
3. Keep `/resources` expandable, group the existing guides by plain-language audience, and give each disclosure a descriptive accessible name.
4. Shorten builder, Liberation, and partnership first-contact forms while retaining shared client/server validation, consent, honeypot, duplicate protection, persistence-first handling, notification status, and honest partial-success behavior.
5. Continue excluding concern reports from the ordinary review-inbox notification channel.
6. Add focused unit, Playwright, axe, responsive-overflow, and screenshot coverage for the six Phase 2 routes. Preserve the approved Homepage, Organizations, and challenge-flow structure.

## Production finalization map — 13 August 2026

1. Replace provisional Privacy and Terms copy with production language that matches the deployed Vercel, Formspree, and separate Operational Hub architecture.
2. Add `/cookies`, a persistent Cookie settings control, accessible consent choices, local `ecl_consent_v1` preference storage, and Consent Mode v2 defaults.
3. Add optional GA4 loading through `NEXT_PUBLIC_GA_MEASUREMENT_ID`, with no script before consent, advertising permissions always denied, and no form or concern data in analytics.
4. Finalize metadata, canonical behavior, social cards, sitemap, robots host, structured data, manifest, favicon, Apple icon, footer links, and CSP allowances required by consented GA4.
5. Remove production-inappropriate draft language and placeholder social links while preserving honest early-stage program and evidence limitations.
6. Run lint, strict type-checking, unit tests, consent/route/form/journey Playwright tests, axe accessibility tests, and a production build. Do not deploy.
