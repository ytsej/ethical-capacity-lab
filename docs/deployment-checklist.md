# Preview and deployment checklist

## Before any preview

- [ ] Run install, lint, type-check, unit tests, Playwright route/journey/form tests, axe checks, and production build.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the exact preview origin.
- [ ] Set `SITE_ENV=preview` and verify pages return `noindex` metadata plus an `X-Robots-Tag` header. Preview `robots.txt` intentionally allows crawling so crawlers can read `noindex`.
- [ ] Configure only reviewed Formspree endpoints; keep a form unavailable until its endpoint and destination inbox are verified.
- [ ] If forms are enabled, verify all six accepted submissions and error/unavailable paths with dummy data only.
- [ ] Confirm no `.env`, historical `.data`, test output, or internal source deliverable is included in the public artifact.
- [ ] Review 320px, 768px, and desktop layouts; 200% zoom; keyboard navigation; reduced motion; screen-reader landmarks; and focus return.
- [ ] Confirm every canonical route, legacy redirect, sitemap entry, footer link, breadcrumb, and journey link.
- [ ] Confirm program dates/status against `content/programs.ts` and the official PHT source.

## Before publishing a production update (not authorized in this task)

- [ ] Confirm that the published operator identity, terms, retention statements, rights language, processors, and concern-handling descriptions remain factually accurate.
- [ ] Assign form, privacy, accessibility, partnership, program, and concern-review owners.
- [ ] Configure `FORMSPREE_ENDPOINT_CONCERN_REPORT` as a separate form restricted to authorized concern reviewers and test with dummy data only.
- [ ] Review Formspree access, retention, deletion, export, spam, and escalation settings for every form, with stricter handling for concern reports.
- [ ] Configure and verify the Formspree destination inboxes and endpoint values in a non-production environment.
- [ ] Replace the in-memory limiter with a shared production control if multiple instances are used.
- [ ] Complete an independent accessibility review and remediate findings.
- [ ] Confirm public team roles, work evidence, partner display permissions, participant permissions, and any regulated-resource qualifications.
- [ ] Set the production canonical URL and intentionally change `SITE_ENV` only after checking metadata and robots.
- [ ] Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` only after the GA4 property settings in `docs/analytics-and-consent.md` are complete; otherwise leave it empty.
- [ ] Verify no Google script or `_ga` cookie appears before consent, and verify accept, decline, and changed-preference states.
- [ ] Verify security headers on the actual host, including HTTPS/HSTS behavior controlled by the platform.
- [ ] Recheck external Impact Hack forms, dates, and program status.
- [ ] Prepare rollback, monitoring, incident, privacy-request, and content-correction procedures.

## Explicit boundary

This task does not authorize production deployment, DNS changes, deletion of the current DoGoodie site, external announcements, or outreach.
