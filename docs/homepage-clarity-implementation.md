# Homepage clarity implementation

Status: complete for the 6 August 2026 review pass, with the ECL-first brand-hierarchy correction completed on 7 August 2026.

## 7 August 2026 brand-hierarchy correction

- Reframed the hero around the Ethical Capacity Lab as the ecosystem identity and shared foundation.
- Replaced the DoGoodie-only hero summary with a calm ECL foundation plus distinct DoGoodie and Liberation branches, without arrows or implied progression.
- Kept the four DoGoodie service groups directly after the hero and the organization CTA directly after services.
- Moved the three-role ecosystem explanation immediately after the organization CTA so the Liberation Network has a clear, visible relationship role.
- Preserved the Phase 1 plain-English service language, client process, forms, safeguards, and all unrelated routes.
- Responsive overflow checks passed at 320, 390, 768, 1024, and 1440 px. Review images are stored in `test-results/homepage-brand-hierarchy/`.

## Current homepage weaknesses

- The hero uses a different promise from the approved clarity brief and does not name all three parts in its main supporting copy.
- Audience routing appears before the three-part ecosystem explanation, which makes the public structure harder to understand quickly.
- The ecosystem section uses an architecture component designed for deeper explanation rather than the required three concise, visibly distinct cards.
- The existing seven-stage value-flow and support-system sections do not satisfy the required five-step collaboration flow.
- Homepage capabilities use eight broader capability families instead of the six approved plain-language examples.
- Trust commitments are compressed into a general checklist and do not include the four required supporting policy links.
- Work evidence is credible but its homepage presentation does not use the approved public status labels or the requested section framing.
- The current-stage statement is nested inside a broader commitments section instead of receiving its own visible section.
- Existing automated tests cover routes and navigation but do not assert the approved homepage order, five audience actions, ecosystem-card destinations, or trust links.

## Files to change

- `app/page.tsx`: implement the approved nine-section homepage order and copy.
- `app/globals.css`: add responsive homepage-specific layouts while preserving existing tokens and inner-page styles.
- `content/home.ts`: add typed homepage-only ecosystem, capability, collaboration, and trust content.
- `content/navigation.ts`: make the five shared audience paths use the approved descriptions and explicit CTA labels.
- `components/AudiencePathCard.tsx`: render the explicit CTA label from typed content.
- `content/work.ts`: add honest public display statuses for the two repository-supported evidence records.
- `tests/e2e/homepage.spec.ts`: add homepage structure, link, status, and responsive-overflow coverage.
- `tests/e2e/visual.spec.ts`: update the homepage expectation and capture the requested desktop, mobile, open-dropdown, and open-mobile-navigation review frames.
- `docs/qa-report.md`: record this pass's actual command and review results after verification.

## Components to reuse

- `Section` for section landmarks and consistent spacing.
- `AudiencePathCard` for the five public routes.
- `JourneyFlow` for a semantic ordered collaboration sequence.
- `BoundaryNotice` for concise no-guarantee and separation notices.
- `Header` and `Footer` without structural redesign; the mobile drawer placement received one viewport-coverage fix found during screenshot review.

## Components to add

- No new generic component is required. The homepage-specific card and panel markup will remain in `app/page.tsx` and draw from typed `content/home.ts` data.

## Routes used

- Primary routes: `/start`, `/ecosystem`, `/about`, `/organizations`, `/builders`, `/liberation`, `/partners`, `/resources`, and `/work`.
- Trust routes: `/ethical-work`, `/privacy`, `/community-standards`, and `/report-a-concern`.
- All destinations already exist; legacy redirects remain in `next.config.ts`.

## Testing plan

1. Run lint, strict TypeScript type-checking, unit tests, homepage/browser tests, accessibility tests, and a production build.
2. Verify every homepage destination returns a successful response.
3. Check the homepage at 320 px, 390 px, 768 px, and 1440 px widths for overflow and readable ordering.
4. Exercise desktop dropdown and mobile drawer keyboard behavior, including Escape and focus return.
5. Run axe on the homepage and inspect desktop/mobile screenshots plus open navigation states.

## Known content limitations

- The $5 Impact Hack is a pilot in progress; no participant result, winner, completion count, or impact outcome is available.
- The ecosystem architecture is implementation evidence under review, not proof of social impact or mature governance.
- No partner names, logos, testimonials, or participant projects are publishable without explicit review and consent.
- Production submission credentials and formal legal/privacy review remain outside this homepage pass.
- The workspace contains no Git repository metadata, so file preservation is based on the inspected working files rather than Git history.

## Final verification

- Install: pass; 438 packages audited, 0 vulnerabilities.
- Lint: pass; 0 errors and 0 warnings.
- Strict TypeScript: pass; no emitted errors.
- Unit tests: pass; 16 of 16.
- Full Playwright suite: pass; 53 of 53.
- Standalone accessibility suite: pass; 7 of 7, with no serious or critical axe violations on the tested routes.
- Production build: pass; 28 static/system routes generated and `/api/submissions` remains dynamic.
- Manual screenshot review: pass at 1440 px desktop and 320 px mobile, including open desktop and mobile navigation states.
