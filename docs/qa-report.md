# QA report

Status: The production-finalization code pass is complete as of 13 August 2026. The changes have not been deployed.

## Current architecture

- The public site remains an informational Next.js website with no submission database or local persistence layer.
- Six public forms retain client and server validation before delivery to configured Formspree endpoints. Concern reports remain separately routed.
- Thirty-minute consultation requests continue to the separate Operational Hub at `https://hub.ethicalcapacitylab.org/request-consultation`.
- Optional GA4 loads only after analytics consent and only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is valid. Advertising consent remains denied.
- The consent preference stores only version, analytics choice, and timestamp in `ecl_consent_v1`.

## Automated results

| Check | Command | Result |
|---|---|---|
| Lint | `npm.cmd run lint` | Pass: 0 errors and 0 warnings. |
| Type-check | `npm.cmd run typecheck` | Pass: strict TypeScript emitted no errors. |
| Unit tests | `npm.cmd run test` | Pass: 7 files, 42 tests. |
| Full browser suite | `npm.cmd run test:e2e` | Pass: 161 tests covering routes, journeys, forms, responsive layouts, consent, metadata, structured data, and screenshots. |
| Focused consent suite | `npm.cmd run test:e2e -- tests/e2e/consent.spec.ts` | Pass: 2 tests covering default denial, no pre-consent tag, accept, decline, cookie removal, persistence, keyboard operation, and focus return. |
| Accessibility | `npm.cmd run test:a11y` | Pass: 27 axe, form-state, reduced-motion, and reflow tests; no serious or critical axe violations in tested states. |
| Production build | `scripts/build-production.ps1` | Pass: 32 static/system routes generated; `/api/submissions` remains dynamic. |

## Production-mode response verification

- Homepage and `/cookies` returned HTTP 200.
- No production `X-Robots-Tag: noindex` header was present.
- Canonical metadata used `https://ethicalcapacitylab.org`.
- `robots.txt` contained the production host and sitemap.
- `sitemap.xml` contained `/cookies` and all canonical public routes.
- The manifest parsed with the ECL name, browser display mode, root start URL, and two icon entries.
- `favicon.ico`, `apple-icon.png`, and the 1200×630 Open Graph image returned HTTP 200 with the expected image content types.
- CSP retained framing, object, and origin restrictions while allowing only the Google endpoints needed after consent.

## Visual and accessibility review

- Reviewed the desktop consent banner, mobile preferences dialog, Privacy Policy layout, footer legal links, and generated ECL Apple icon.
- Accept and decline use equal-size controls; preferences are keyboard operable; Escape closes the dialog and restores focus.
- Desktop and mobile screenshot artifacts are stored in `review-artifacts/production-finalization-consent-desktop.png` and `review-artifacts/production-finalization-consent-mobile.png`.

## Operational steps before enabling analytics

- Create or select the approved GA4 web property and complete the privacy settings in `docs/analytics-and-consent.md`.
- Confirm advertising personalization is disabled, Google Signals is off, Google Ads is not linked, data sharing is reviewed, and user/event retention is set to the approved value (recommended starting point: 2 months).
- Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the production environment only after those settings are confirmed.
- Verify Realtime and DebugView with anonymous test navigation and confirm no duplicate Enhanced Measurement events.

## Boundary

No deployment, DNS change, external account mutation, production GA4 property change, external announcement, public database, or legacy backend was created during this pass.
