# Google Analytics 4 and consent setup

The public site uses a privacy-first basic consent approach. Google Analytics is optional, no Google tag is loaded before analytics consent, and the site continues to work when the measurement ID is absent.

## Deployment variable

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the production web data stream ID in the form `G-...`. Leave it empty until the property settings below are confirmed. Never put a Google Ads identifier, secret, form value, or email address in this variable.

## Required GA4 property review

- Disable advertising personalization.
- Do not link Google Ads unless separately approved.
- Keep Google Signals disabled unless separately approved.
- Set user and event retention to the minimum useful period; the recommended starting point is 2 months.
- Review Google data-sharing settings and disable options that are not needed.
- Review Enhanced Measurement to prevent duplicate events. This implementation sends sanitized `page_view`, `scroll`, `outbound_click`, and `file_download` events itself; site search is not tracked because the site has no search feature.
- Do not enable debug mode in production.

The public Privacy Policy intentionally does not claim that the 2-month retention setting is active until the production GA4 property has been checked.

## Consent behavior

- Before a choice: `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization` are denied; the Google tag is not loaded.
- Accept analytics: `analytics_storage` becomes granted and the configured GA4 tag loads. Advertising-related permissions remain denied.
- Decline analytics: all optional analytics storage remains denied.
- Change from accepted to declined: consent is updated and first-party `_ga` cookies visible to the site are removed.
- Preference storage: `ecl_consent_v1` contains only version, analytics choice, and timestamp.

## Event inventory

Standard public-site events:

- `page_view`
- `scroll`
- `outbound_click`
- `file_download`

Anonymous navigation events:

- `start_here_path_selected` with `path`: `organization`, `builder`, `liberation`, `partner`, or `learner`
- `resource_opened` with a public resource identifier
- `ecosystem_branch_viewed` with a public branch identifier
- `operational_hub_link_clicked` with sanitized destination domain and path
- `organization_support_clicked`
- `builder_path_clicked`
- `liberation_path_clicked`
- `partner_path_clicked`

The analytics layer must not receive names, email addresses, form values, free text, concern information, full query strings, internal admin identifiers, or other personally identifying or sensitive values. Form starts and submissions, including concern-report behavior, are not tracked.

## Verification

1. Open a fresh private browser session and confirm no Google tag request or `_ga` cookie exists before a choice.
2. Decline and confirm the tag remains unloaded.
3. Clear the consent preference, accept, and confirm a request to `www.googletagmanager.com/gtag/js` plus activity in GA4 Realtime.
4. Use navigation links and confirm only the documented anonymous parameters appear in DebugView.
5. Reopen Cookie settings, decline, and confirm consent changes to denied and `_ga` cookies are removed.
6. Confirm no `debug_mode` flag remains enabled in production.
