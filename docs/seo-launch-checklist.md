# SEO launch checklist

This checklist covers search-readiness only. It does not authorize deployment, DNS changes, or external account changes.

## Already implemented

- Unique titles and descriptions for all 21 canonical public routes.
- Self-referencing canonical URLs generated from `NEXT_PUBLIC_SITE_URL`.
- Open Graph and Twitter card metadata with a generated 1200 × 630 PNG image.
- Organization and WebSite JSON-LD on the home page, using verified public fields only.
- BreadcrumbList JSON-LD on pages with visible breadcrumbs.
- Generated `/sitemap.xml`, `/robots.txt`, browser-identity manifest, favicon, Apple touch icon, ECL social image, and permanent legacy redirects.
- Preview-safe `noindex` page metadata and `X-Robots-Tag` response headers.
- Indexing stays disabled unless `SITE_ENV=production` and the public URL is HTTPS and non-local.

## Before an authorized production launch

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://ethicalcapacitylab.org` in the production environment, using the final preferred hostname.
- [ ] Set `SITE_ENV=production` only after the production URL is final and publicly reachable.
- [ ] Run `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run test`, `npm.cmd run test:e2e`, and `npm.cmd run build`.
- [ ] Inspect the production HTML for the canonical, title, description, robots, Open Graph, and Twitter tags.
- [ ] Verify that `/robots.txt` allows public pages, disallows `/api/`, and lists the production sitemap.
- [ ] Verify that all URLs in `/sitemap.xml` use the preferred HTTPS hostname and return HTTP 200.
- [ ] Test the home-page structured data and one breadcrumb page with Google Rich Results Test or Schema Markup Validator.
- [ ] Check the generated social image on at least one Open Graph and one Twitter/X card validator.
- [ ] Confirm that legal, privacy, accessibility, current-program status, and public contact details are still accurate.

## Production search status and ongoing checks

- [x] Verify the `ethicalcapacitylab.org` Domain Property through DNS in Google Search Console.
- [x] Submit `https://ethicalcapacitylab.org/sitemap.xml`.
- [x] Request homepage indexing after a successful live URL test.
- [ ] Inspect `/organizations`, `/builders`, `/liberation`, and `/impact-hack` as Google processes the sitemap.
- [ ] Monitor Page Indexing, Core Web Vitals, structured-data reports, and query/page performance. Optional site analytics must remain consent-controlled.
- [ ] Update each sitemap `lastModified` value only after a meaningful content change.

Search engines decide whether and how pages appear. Correct metadata and structured data improve clarity but do not guarantee ranking, rich results, or indexing.
