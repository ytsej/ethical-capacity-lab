# V1 clarity, UX, service presentation, and forms audit

> Historical audit: the Supabase, filesystem-storage, Resend, and scheduling recommendations below were superseded on 10 August 2026. The implemented site now uses server-validated Formspree delivery with no website database, plus a separate Operations Hub consultation pathway. See `docs/forms-and-submissions.md` and `docs/qa-report.md` for the current architecture.

Audit date: 7 August 2026  
Scope: current local V1 implementation only  
Audit posture: audit-first; no website code, content, deployment, DNS, or form data was changed

## Evidence and limitations

This audit reviewed the master implementation brief, `AGENTS.md`, README and project documentation, Deliverables 1–6, the detailed ecosystem architecture artifact, the journey-diagram image, every public page and typed content file, shared components, styles, submission code, tests, environment template, Supabase migration, and Vercel project metadata. All 20 implemented routes returned HTTP 200 from the running local server during the audit.

The workspace is not a Git repository, so there is no `git status` or history from which to distinguish committed and uncommitted files. Existing files were treated as user work and preserved.

An interactive browser session was unavailable in the audit environment. Visual findings therefore use the current source, current rendered HTML, existing current screenshots, and the repository's most recent Playwright/axe evidence. No new live click-through, screen-reader session, or real form submission was performed. Approximate word counts below cover each route's `<main>` content, including collapsed guide content and visible form labels, but exclude the global header and footer.

## A. Executive Summary

The V1 is structurally disciplined and unusually honest for an early-stage site. It has complete routes, careful safeguards, accessible form foundations, clear ecosystem boundaries, and no fabricated evidence. Its main problem is translation: it presents the internal operating model before it presents the practical client value.

The five biggest issues are:

1. **The practical offer is buried.** The homepage first explains the three-part architecture, then audience routing, and only then shows services. A first-time organization sees the ecosystem model before seeing what DoGoodie can actually do.
2. **Service language is still internal and abstract.** Labels such as “challenge discovery and clarification,” “builder-supported pilots,” “proof-of-work experiments,” and “capacity-building and scoped consultation” are accurate internally but do not let a client picture a deliverable. The organization page also repeats the first three capability cards before showing all eight, creating 11 service-like cards before process and examples.
3. **There is no organization scheduling action.** The site offers “Submit a challenge” and lets a visitor request an introductory conversation inside a 16-field form, but there is no direct “Schedule a meeting” destination or configured booking URL. This misses Skyler's requested early client action.
4. **Forms do not meet the new official-inbox requirement.** The six forms have real client/server validation and honest storage behavior, but no email notification adapter is implemented. `RESEND_API_KEY` and `SUBMISSION_NOTIFICATION_TO` are placeholders only. Production storage is optional Supabase; without configuration, forms correctly become unavailable. No current form can demonstrate delivery to an official review inbox.
5. **The site is too long and equally weighted.** Home has about 1,137 words, 9 major sections, 17 card-like blocks, and 20 in-page links. Organizations has about 880 words, 11 sections, and 23 card-like blocks. On mobile, responsive stacking prevents overflow but turns every grid into a long sequence of similarly weighted cards. Trust content is strong, but repetition makes it feel like friction instead of reassurance.

### Audit scores

| Area | Score | Reason |
|---|---:|---|
| Homepage clarity | 5/10 | Identity and ecosystem are clear; practical client value appears too late. |
| Service clarity | 3/10 | Most titles describe internal methods rather than recognizable client outcomes or deliverables. |
| Client relevance | 5/10 | Organizations are named early, but concrete help and proof are not. |
| Visual hierarchy | 6/10 | Typography, color system, navigation, and section separation are solid; too many cards share equal emphasis. |
| Content scannability | 4/10 | Headings and lists help, but section count, repeated caveats, and abstract labels demand too much reading. |
| Navigation clarity | 7/10 | Audience routes and Start Here are clear; the ecosystem labels still assume prior understanding. |
| CTA clarity | 6/10 | Many actions are specific and routes work, but there are competing CTAs, repeated “Explore,” and no schedule action. |
| Trust clarity | 8/10 | Scope, consent, privacy, human review, safe exit, limitations, and concerns are visible; some are over-repeated. |
| Mobile clarity | 4/10 | Layouts stack safely, but long pages and card/form sequences create excessive scrolling. |
| Form usability | 5/10 | Accessible mechanics are strong; challenge, builder, Liberation, and partner forms ask too much at first contact. |
| Form operational readiness | 3/10 | Storage architecture exists, but production credentials and inbox delivery are not configured or implemented. |
| Overall review readiness | 4/10 | Technically preview-ready, but not yet meeting-ready for a client who needs immediate service clarity and a meeting action. |

## B. Current Website Inventory

All routes are technically implemented. “Complete” below means the intended page exists with substantive content; it does not mean the service, evidence, scheduling, or production form workflow is operationally complete.

### Implementation snapshot

| Area | Current implementation | Audit finding |
|---|---|---|
| Framework | Next.js 15.5, React 19, strict TypeScript | Appropriate for the current V1; public pages are server-rendered through the App Router. |
| Routing | Next.js App Router under `app/`, with 20 public pages, one submission API route, generated sitemap/robots/manifest, custom 404/error states, and legacy redirects in `next.config.ts` | Canonical routes are present and all returned HTTP 200 locally. Redirect coverage is listed below. |
| Package manager | npm with `package-lock.json` and `npm.cmd` scripts for develop, lint, type-check, unit tests, browser tests, accessibility tests, build, and start | Tooling is coherent and documented. |
| Global layout | `app/layout.tsx` supplies shared metadata, fonts, skip link, Header, Footer, and main landmark; `app/globals.css` provides the design and responsive system | One consistent shell is used across public routes. |
| Navigation | Typed navigation data plus shared desktop/mobile Header, dropdowns, Start Here CTA, Footer, and Breadcrumbs | Structure is consistent and keyboard support is tested; current-page indication is missing from primary/mobile navigation. |
| Homepage | `app/page.tsx` composes typed content with shared cards, sections, notices, and journey components | Content is modular enough to reorder later without changing the content-source model. |
| Shared components | Audience cards, breadcrumbs, ecosystem/value-flow diagrams, footer/header, journey and participation flows, notices, page/policy layouts, program status, QR/resource cards, sections, and the shared submission form | Reuse is strong, but common card treatment contributes to equal visual weight across many pages. |
| Content/data | Typed modules in `content/` are the public-content source of truth for capabilities, pathways, ecosystem, Home, Liberation, navigation, partners, policies, programs, resources, response times, site copy, and work | This correctly follows the project rules; future copy changes should remain centralized here. |
| Forms/endpoints | Six native forms use the shared `SubmissionForm` and post JSON to `POST /api/submissions`; Impact Hack links to a separate Google Form | Native forms share validation and delivery behavior. The external program form is outside the local submission system. |
| Submission backends | Server-only development NDJSON adapter or optional Supabase adapter; production can deliberately render forms unavailable | Persistence is real when configured, but official-inbox notification is not implemented. |
| Environment variables | `NEXT_PUBLIC_SITE_URL`, `SITE_ENV`, `SUBMISSION_BACKEND`, `SUBMISSION_DATA_DIR`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, reserved `RESEND_API_KEY` and `SUBMISSION_NOTIFICATION_TO`, and disabled analytics provider | Secrets are server-side. There is no scheduling variable or configured `DOGOODIE_REVIEW_EMAIL`; the two email variables are currently unused. |
| Database | One Supabase migration for the submissions store, accessed with the service-role key on the server | Suitable as a base for normal inquiries; concern reports need stricter operational separation/access controls before production. |
| Email | No package, server adapter, template, delivery-status handling, or webhook exists | All six native forms are only partially operational under the new official-inbox requirement. |
| Analytics | Privacy-conscious analytics interface exists but remains disabled unless an approved provider is configured | No active analytics or surveillance behavior was found. |
| Tests | Vitest unit tests plus Playwright route, journey, navigation, form, visual, and axe suites; the repository documents 53 browser tests in the latest completed QA run | Good baseline, but successful end-to-end delivery is only exercised for general contact, not all six native form types or email delivery. Tests were inspected, not rerun, because this audit was required to leave application/test data and site artifacts unchanged. |
| Deployment | Vercel project metadata and ignore configuration exist; no deployment or DNS action was taken | The project is linked for hosting, but this audit does not establish production environment readiness. |
| Assets | Local ECL social graphic plus four legacy DoGoodie image assets; fonts are packaged dependencies; source deliverables and the journey-diagram image remain at repository root | Asset coverage is modest and appropriate; future visuals should explain services/process rather than decorate empty space. |
| Git state | No `.git` directory is present in this workspace | `git status` and change history are unavailable. Existing files were preserved. |

| Route | Page title; intended audience | Main purpose and concepts | Current primary CTA | Size | Form | Status |
|---|---|---|---|---:|---|---|
| `/` | Turning ethical intentions…; all audiences | Introduce ECL, DoGoodie, Liberation, audience paths, capabilities, process, trust, work, and stage | Find your path | 9 sections; ~1,137 words | None | Complete but too dense and wrongly ordered for client clarity |
| `/start` | Start Here; all five audiences/QR visitors | Route visitors without collecting data; explain low-pressure next steps and QR use | Choose a pathway | 5; ~341 | None | Complete; duplicates much of the homepage audience block |
| `/ecosystem` | Ecosystem Overview; analytical visitors, partners, all audiences | Explain the three parts, architecture, value flow, support systems, separation, and stage | Choose your path | 12; ~940 | None | Complete; appropriate as deep content but highly abstract and repetitive |
| `/about` | About & Governance; partners, organizations, researchers, trust-seeking visitors | Mission, team roles, governance, method, IP, conflicts, safeguarding | Explore the ecosystem | 10; ~514 | None | Complete; detail level mostly appropriate for a trust page |
| `/organizations` | For Organizations; prospective clients | Capabilities, exclusions, give-first model, process, expectations, formats, proof, conversation | Submit a challenge | 11; ~880 | None | Complete but highest-priority clarity problem; 23 card-like blocks |
| `/challenges` | Submit a Challenge; qualified organizations | Explain suitable requests, prohibited data, collect and route a challenge | Submit challenge for review | 5; ~495 | Challenge, 16 fields | Content complete; operationally partial |
| `/builders` | For Builders; potential contributors | Builder activities, pathways, terms, proof, conduct, opportunities, Network relationship | Express interest | 10; ~748 | Builder interest, 13 fields | Complete but long and application-like |
| `/ethical-work` | Ethical Work & Collaboration; organizations, builders, partners | Power/labor risks, principles, process, responsibilities, project terms, safe exit | Organization path / Builder path | 10; ~612 | None | Complete; detailed trust content is justified but visually repetitive |
| `/liberation` | Liberation from Suffering Network; potential participants/referrals | Vision, audiences, exchange, participation layers, conversation, boundaries | Explore how it works | 11; ~606 | None | Complete but abstract and vertically long |
| `/liberation/how-it-works` | How the Liberation Network Works; interested/referred people | Full participation journey, conversation details, privacy, consent, FAQs, interest | Submit for human review | 12; ~948 | Liberation interest, 12 fields | Complete but too demanding for an initial-interest journey |
| `/work` | Work & Case Studies; organizations, partners, builders | Current program, two evidence records, support systems, honest empty state | Submit a challenge | 7; ~492 | None | Complete, but public client evidence is thin |
| `/partners` | Partnerships & Resources; prospective partners/providers | Partnership types, standards, display permission, inquiry | Propose collaboration | 9; ~619 | Partnership inquiry, 12 fields | Complete but repetitive and operationally partial |
| `/resources` | Resources; learners and all audiences | Seven guides, metadata, FAQs, future-resource boundary | Browse guides | 8; ~1,191 | None | Complete and useful; highest word count because guide bodies/metadata are included |
| `/contact` | Contact; uncertain visitors/admin inquiries | Route to specialized paths and provide general fallback | Send message | 4; ~285 | General contact, 5 fields | Clear content; operationally partial |
| `/privacy` | Privacy Policy; all form users | Data inventory, use, storage, retention, security, analytics, rights | Contact route in body | 11; ~556 | None | Complete working policy; needs legal/operational approval |
| `/terms` | Terms of Use; all visitors | Scope, advice limits, submissions, IP, use, third parties, guarantees | Contact with a question | 10; ~331 | None | Complete working terms; legal review pending |
| `/accessibility` | Accessibility; all visitors | Current measures, limitations, alternative formats, feedback | Send accessibility feedback | 6; ~242 | None | Complete and appropriately concise |
| `/community-standards` | Community Standards; builders, Network participants, partners | Conduct, consent, privacy, reporting, consequences, reconsideration | Report a concern | 7; ~373 | None | Complete and proportionate |
| `/report-a-concern` | Report a Concern; anyone affected | Emergency boundary, reportable categories, confidentiality, intake, next steps | Submit concern | 6; ~581 | Concern report, 10 fields | Content complete; operational/security concern before production |
| `/impact-hack` | The $5 Impact Hack; program applicants/builders | Current dates, eligibility, fund, rules, proof, roles, consent, results state | Open application form | 10; ~774 | External Google Form | Complete current program record; external form needs separate review |

Supporting system routes also exist: an accessible custom 404, a recoverable global error state, `sitemap.xml`, `robots.txt`, manifest, and `/api/submissions`.

### Legacy DoGoodie routes

| Legacy route | Current destination | Status |
|---|---|---|
| `/community` | `/builders` | Permanent redirect |
| `/join` | `/builders#expression-of-interest` | Permanent redirect |
| `/faq` | `/resources#faq` | Permanent redirect |
| `/proof-of-work` | `/work` | Permanent redirect |
| `/manifesto` | `/ethical-work` | Permanent redirect |
| `/submit-a-challenge` | `/challenges` | Permanent redirect |
| `/ethical-capacity-lab` | `/about` | Permanent redirect |
| `/liberation-network` | `/liberation` | Permanent redirect |

## C. Homepage Clarity Scorecard

| First-time visitor question | Rating | Why |
|---|---|---|
| What organization am I looking at? | **Clear** | The eyebrow, logo, and supporting text identify The Ethical Capacity Lab. |
| What does it actually do? | **Partially Clear** | The hero says it connects standards, practical support, and relationships, but does not show recognizable services or outputs. |
| Is this relevant to me? | **Partially Clear** | Organizations, builders, and values-aligned people are named, but a client must interpret “ethical intentions,” “capacity,” and “scoped work.” |
| Can I immediately see something useful? | **Unclear** | The first viewport gives a model and two routing CTAs, not a practical service, example, result, or meeting option. |
| Is there a clear action I can take? | **Partially Clear** | “Find your path” is visually clear but generic. A client cannot schedule or request a call directly. |
| After about 60 seconds, can I explain ECL, DoGoodie, Liberation, who is helped, what help is available, the next action, and why to trust it? | **Partially Clear** | The three entities and safeguards become understandable, but only after architecture and routing. Services remain abstract, proof is thin, and the action set is broad. |

### Sixty-second sub-findings

- **ECL:** Clear as parent/shared standards, but “institutional trust layer” and “ethical capacity” remain internal language.
- **DoGoodie:** Partially clear. It supports projects, research, systems, and automation, but client outcomes are not vivid.
- **Liberation Network:** Partially clear. Its relationship purpose is explained carefully, but requires substantial reading.
- **Who is helped:** Clear after the audience cards.
- **Practical help:** Partially clear and too late.
- **What to do next:** Partially clear; multiple route CTAs compete and scheduling is absent.
- **Why trust the process:** Clear; safeguards are one of the strongest parts of the site.

## D. Homepage Section Audit

| Order/current section | Current load | Purpose | Issue | Classification | Recommendation |
|---|---:|---|---|---|---|
| 1. Hero | ~111 words; 2 CTAs | Introduce the ecosystem | Headline is values-led but abstract; no tangible help or meeting action | **SIMPLIFY / RENAME** | State who DoGoodie helps and 3–4 concrete outcomes in the support line. Keep ECL identity but make client value visible in the first viewport. |
| 2. Three parts, one ecosystem | ~167 words; 3 cards; 3 links | Explain ECL/DoGoodie/Liberation | Architecture precedes value; asks clients to understand the organization before the offer | **MOVE DEEPER / SIMPLIFY** | Move after services and audience routing. Reduce each part to one role sentence and one link. |
| 3. What brings you here? | ~193 words; 5 large linked cards | Route five audiences | Useful but duplicates `/start`; every card is wordy and equally prominent | **KEEP / SIMPLIFY** | Keep after services/scheduling. Shorten each card to one sentence and a specific action. |
| 4. Practical ways we may help | ~162 words; 6 cards; 1 CTA | Show capabilities | Arrives too late; several titles still describe process; no “what you get” examples | **PROMOTE / RENAME / VISUALIZE** | Make this section #2. Use 4–5 outcome groups with output examples and a client-only call CTA directly after it. |
| 5. How a useful collaboration can begin | ~158 words; 5 steps | Explain routing/process | The first three steps remain ecosystem abstractions; five equal cards require full reading | **SIMPLIFY / VISUALIZE** | Use a 3-step client process on Home: tell us the challenge → clarify fit → agree a small next step. Keep cross-ecosystem flow on `/ecosystem`. |
| 6. A process designed around clarity and care | ~149 words; 6 trust cards; 4 links | Establish safeguards | Strong content, but six same-weight cards plus four links create a dense policy block | **KEEP / GROUP** | Show 3 trust promises with short examples; link once to the full safeguards hub and keep Report a Concern visible. |
| 7. See the work behind the idea | ~117 words; 2 cards; 3 links | Provide proof | One record is the website architecture itself; neither is a client outcome | **KEEP / SIMPLIFY** | Keep honest labels, but use one compact evidence strip until publishable client work exists. Do not overstate the current proof base. |
| 8. We are building carefully | ~46 words | Set current-stage expectations | Necessary but repeats the footer and deeper pages | **KEEP / SHORTEN** | Keep a concise stage badge/notice near proof, not a full separate visual section if space is tight. |
| 9. What are you trying to accomplish? | ~34 words; 2 CTAs | Final routing | Generic question repeats Start Here rather than converting specific intent | **RENAME** | Use “Need help with a project?” for organizations plus a separate “Not sure? Choose a path” action. |

## E. Service/Capability Audit

### 1. Challenge discovery and clarification

- **Current description:** “Turn a broad concern into a defined problem, decision, or safe next question.”
- **Underlying capability:** facilitated problem definition, stakeholder/context clarification, constraint mapping, and next-step scoping.
- **Problem solved / possible output:** a vague or oversized request becomes a short challenge brief, decision map, or agreed next question.
- **Clarity:** the title is consulting language and is not self-explanatory to many clients; the description is still conceptual.
- **Overlap/grouping:** overlaps “capacity-building and scoped consultation” and is the front end of every other service. It should be a primary “Understand the problem” service, not duplicated as both a service and engagement method.
- **Plain-English naming direction:** “Define the problem and next step” or “Turn a rough idea into a clear brief.”
- **Visual direction:** before/after example: “broad concern → one-page challenge brief.”
- **Evidence:** organization process, challenge form, ECL research/architecture work. No public external-client result is shown.

### 2. Research and documentation

- **Current description:** “Gather sources, structure findings, create working documentation, and make limitations visible.”
- **Underlying capability:** desk research, synthesis, process documentation, resource guides, operating notes, and decision support.
- **Problem solved / possible output:** a client lacks organized evidence or repeatable documentation; outputs may be a research brief, options memo, resource guide, process document, or decision record.
- **Clarity:** “research” is understandable; “documentation” is broad and does not show why the client benefits.
- **Overlap/grouping:** overlaps challenge clarification and content coordination. Keep as a primary research/decision-support group with concrete output examples.
- **Plain-English naming direction:** “Research a decision or opportunity” and “Create clear working documentation.” Do not promise market/competitor intelligence until scope and evidence confirm it.
- **Visual direction:** sample deliverables labeled “brief,” “options map,” and “process guide.”
- **Evidence:** Deliverables 1–6, resource modules, content source map, and this website's documented architecture. Public client evidence is absent.

### 3. Lightweight websites and internal systems

- **Current description:** “Build focused public pages, small operational tools, and maintainable information systems.”
- **Underlying capability:** small websites, landing pages, forms, content structures, lightweight internal tools, and information systems.
- **Problem solved / possible output:** scattered information or a manual intake has no usable public/internal interface; outputs may be a landing page, resource hub, intake form, small tracker, or internal information tool.
- **Clarity:** the clearest current service title, though “lightweight” may sound low quality and “internal systems” is vague.
- **Overlap/grouping:** overlaps content/design and automation. Keep as a primary “Build a website or practical tool” group.
- **Plain-English naming direction:** “Build a focused website or internal tool.”
- **Visual direction:** three output tiles: website, form/intake, internal tool.
- **Evidence:** the current ECL website, typed content system, forms/API, QR route, and legacy DoGoodie web assets. External client evidence is not public.

### 4. Workflow and automation support

- **Current description:** “Reduce repetitive work using proportionate, reviewable automation without removing human accountability.”
- **Underlying capability:** workflow mapping, repetitive-task automation, AI-assisted processing, human review checkpoints, and small operational integrations.
- **Problem solved / possible output:** repeated manual work is slow or inconsistent; outputs may be a workflow map, automation prototype, documented review step, or small internal integration.
- **Clarity:** “workflow” is business jargon; “automation” is understood but the result is not pictured.
- **Overlap/grouping:** overlaps internal systems and process documentation. Keep as a primary group only if delivery capacity is current; otherwise make it a sub-service.
- **Plain-English naming direction:** “Automate repetitive work—without removing human review.”
- **Visual direction:** a simple “before: repeated manual steps / after: automated steps + human check” diagram.
- **Evidence:** current submission workflow and automation principles demonstrate internal capability; no public client automation case is available.

### 5. Content, design, and digital coordination

- **Current description:** “Clarify messages, journeys, visual systems, campaigns, and coordination around a bounded objective.”
- **Underlying capability:** message and content structure, information architecture, visual systems, campaign assets, and digital coordination.
- **Problem solved / possible output:** a project communicates inconsistently or lacks a usable journey; outputs may be a messaging brief, page structure, campaign kit, visual system, or coordination plan.
- **Clarity:** combines three broad disciplines and reads like an agency department list. It is not clear whether social growth, brand work, content production, or project coordination is actually offered.
- **Overlap/grouping:** overlaps websites, research, and project coordination. Group under “Communicate clearly” only after confirming current delivery capacity.
- **Plain-English naming direction:** “Clarify your message and digital experience.” “Improve branding” or “grow social media” should not be used without real service scope and evidence.
- **Visual direction:** message → page/campaign assets → coordinated launch, with example deliverables.
- **Evidence:** ECL information architecture, visual system, journey diagrams, and Impact Hack artwork. No public client brand or social-growth result exists.

### 6. Builder-supported pilots

- **Current description:** “Use supervised, carefully scoped contributions when responsibilities and protections are clear.”
- **Underlying capability:** coordinate a small project with selected contributors, supervision, written scope, protection, review, and closure.
- **Problem solved / possible output:** a client wants to test a bounded project without committing to a larger engagement; output is the agreed artifact plus review and closure notes.
- **Clarity:** describes staffing/process, not a client outcome. “Builder” is an internal role a client should not need to decode.
- **Overlap/grouping:** overlaps proof-of-work experiments and the give-first model. Treat as a delivery method beneath “Run a small supervised test,” not a top-level public service.
- **Plain-English naming direction:** “Run a small, supervised pilot.”
- **Visual direction:** a pilot card showing scope, owner, output, review, and stop/continue decision.
- **Evidence:** the Impact Hack program design and ethical-work model; completed client pilot evidence is not public.

### 7. Proof-of-work experiments

- **Current description:** “Test a small intervention, document the result honestly, and distinguish evidence from aspiration.”
- **Underlying capability:** small safe-to-fail experiments, defined evidence, documentation, learning, and limitations.
- **Problem solved / possible output:** a client has an untested idea; output is a small experiment, evidence record, and recommendation about what to do next.
- **Clarity:** “proof of work” is familiar to builders but may sound like cryptocurrency, employment vetting, or internal methodology to clients.
- **Overlap/grouping:** substantially overlaps builder-supported pilots. Merge under “Test a small idea” with proof/documentation as the method.
- **Plain-English naming direction:** “Test a small idea and learn from the result.”
- **Visual direction:** hypothesis → small test → evidence → next decision.
- **Evidence:** Impact Hack structure and work-record template. The program has no verified participant results yet.

### 8. Capacity-building and scoped consultation

- **Current description:** “Help a responsible owner understand options, constraints, and a practical next step.”
- **Underlying capability:** advisory conversation, options clarification, capability transfer, and limited consultation.
- **Problem solved / possible output:** an owner needs informed direction before buying/building; output may be a consultation note, options map, prioritized next-step plan, or referral/decline.
- **Clarity:** both title terms are consulting jargon. The description is clearer than the title.
- **Overlap/grouping:** overlaps challenge clarification and is partly an engagement format rather than a distinct service. Present consultation as a way to start, not another equal service card.
- **Plain-English naming direction:** “Understand your options and choose a next step.”
- **Visual direction:** 30-minute call → options/constraints → written next step.
- **Evidence:** documented organization and Network conversation models. There is no public consultation case study.

### Service audit conclusion

Only “Research and documentation” and “Websites and internal systems” are close to instantly understandable, and even they need outcome examples. The eight-card set mixes services, delivery methods, safeguards, and engagement formats. That is why clients must read every description to infer what is actually offered.

## F. Suggested Service Information Architecture

Recommended future structure: **four outcome groups**, each with 2–3 concrete output examples. Keep builder coordination, give-first, supervision, proof methodology, and ethical safeguards outside the service taxonomy as delivery/process information.

1. **Understand the problem**
   - Clarify the challenge and affected people.
   - Research a decision, opportunity, or set of options.
   - Possible outputs: challenge brief, research brief, options/cost map, next-step recommendation.
2. **Build a practical tool**
   - Focused website, landing page, intake form, information hub, or small internal tool.
   - Possible outputs should be named, not hidden under “systems.”
3. **Improve how the work gets done**
   - Map a workflow, document a process, automate repetitive steps, and preserve human review.
   - Possible outputs: workflow map, process guide, automation prototype, operating checklist.
4. **Test a small idea**
   - Run a bounded pilot or experiment with a responsible owner, fixed output, evidence, review, and stop/continue decision.

“Clarify your message and digital experience” may be a fifth group only after the team confirms exactly which branding, content, campaign, design, or social-media work is currently deliverable. Career development belongs to the builder/learning pathway, not the organization service list. Market, competitor, cost, social-growth, and branding language should be used only when the matching scope and evidence are approved.

Preferred visual pattern: four unequal groups rather than eight equal cards. Give the first two primary visual emphasis. Each group should show one recognizable problem, 2–3 possible outputs, and one “Discuss this kind of work” action. A short “How we work safely” link should follow the whole service set rather than repeating a caveat on every card.

## G. Jargon Register

| Current wording | Where | What it appears to mean | Immediately clear? | Plain-English direction |
|---|---|---|---|---|
| Ethical capacity | Home, Ecosystem, brand language | Ability, systems, judgment, and relationships needed for responsible action | No | Explain the concrete conditions; reserve the term for the organization name/context |
| Institutional parent / institutional trust layer | Ecosystem, About, Resources | ECL sets shared direction, standards, methods, and safeguards | No | “The parent organization that sets shared standards and safeguards” |
| Challenge discovery and clarification | Organizations, Ecosystem | Define the problem before proposing a solution | Partial | “Define the problem and next step” |
| Capacity-building | Capabilities, About, Ecosystem | Help an owner/team improve understanding or ability | No | Name the actual skill, decision, system, or output being improved |
| Scoped consultation | Organizations, Capabilities | Limited advisory help with explicit boundaries | No | “A focused consultation with a clear question and next step” |
| Builder-supported pilot | Organizations/Home capability source | A supervised small project using contributors | No | “A small supervised pilot” |
| Proof-of-work experiment | Organizations, Builders, Resources | A small test documented with evidence and limits | Partial/ambiguous | “Test a small idea and document what happened” |
| Practical leverage | Organizations | A useful intervention that improves a decision or workflow | No | State the result directly |
| Current capability families | Organizations/meta language | Categories of work currently considered deliverable | No | “Ways we may be able to help” |
| Content, design, and digital coordination | Organizations | Messaging, UX/content, campaign assets, and delivery coordination | Partial | Split or name the concrete output |
| Workflow and automation support | Organizations | Map and automate repeated tasks | Partial | “Automate repetitive work with human review” |
| Ecosystem value flow / How value moves | Home, Ecosystem | How requests/resources may become work, learning, and relationships | No for first-time clients | Keep on Ecosystem; use a 3-step client process on Home |
| Enabling/support systems | Home/Ecosystem/Work | People, documentation, tools, review, and relationships behind output | No | “What makes the work possible” |
| Strategic relationships | About/Ecosystem | Important partner and adviser relationships | Partial | “Partnerships and trusted working relationships” |
| Mutual-support pathway | Liberation | Voluntary advice, introductions, resources, or collaboration | No | Name each possible action; avoid a collective abstraction |
| Values-aligned people | Home/Liberation | People broadly compatible with the Network's purpose and conduct | Partial and potentially ideological | Explain behavior/fit without requiring identity language |
| Mutual fit | Liberation | Both sides decide whether a next step is appropriate | Partial | “A good fit for both sides” |
| Bounded conversation / bounded next step | Liberation, Resources, forms | A time- and purpose-limited interaction | Partial | “A 30-minute introductory conversation with a clear purpose” |
| Human-reviewed | Across routes/forms | A person, not automation, makes consequential decisions | Mostly clear but overused | Use once near the relevant decision; name the review function when known |
| Separate decisions | Across ecosystem/builder/Network pages | One pathway does not grant another status or benefit | Clear only after explanation | Use one short contextual sentence; link to the full boundary explanation |

## H. Content Density Findings

| Route | Sections / words / card-like blocks | Finding | Primary action |
|---|---:|---|---|
| `/` | 9 / ~1,137 / 17 | Too much for a front door; services are fourth and architecture is second | Reduce/reorder before review |
| `/start` | 5 / ~341 / 10 | Reasonable, but repeats the same five full cards from Home | Shorten shared path cards |
| `/ecosystem` | 12 / ~940 / 4 | Long but acceptable as deep orientation; repeated definitions/boundaries can be consolidated | Simplify, not remove |
| `/about` | 10 / ~514 / 11 | Detailed but appropriate for trust; several “what is not claimed” blocks can be linked/combined | Light simplification |
| `/organizations` | 11 / ~880 / 23 | Severe card and concept overload; first 3 capabilities are repeated inside the 8-card set | P0 restructure |
| `/challenges` | 5 / ~495 / 4 plus 16 fields | Too much reading and data entry before first human contact | P0 form reduction |
| `/builders` | 10 / ~748 / 11 plus 13 fields | Reads like a combined pathway, policy, opportunity page, and application | P1 progressive disclosure |
| `/ethical-work` | 10 / ~612 / 16 | Dense but justified; identical risk cards make every risk look equally important | Group risks and preserve detail |
| `/liberation` | 11 / ~606 / 3 | Fewer cards, but many abstract sections create a long conceptual journey | Reduce sections and use examples |
| `/liberation/how-it-works` | 12 / ~948 / 8 plus 12 fields | Highest-friction audience journey; conversation explanation is thorough but duplicated | P1 consolidate and shorten form |
| `/work` | 7 / ~492 / 3 | Scannable; evidence set is honest but weak for client persuasion | Keep concise; add real proof later |
| `/partners` | 9 / ~619 / 9 plus 12 fields | Eight partner-type cards repeat the same text; form is long | Group partner types; shorten inquiry |
| `/resources` | 8 / ~1,191 / 7 | Long in DOM but details are collapsed; repeated metadata on every guide adds visual weight | Improve filters/labels later |
| `/contact` | 4 / ~285 / 6 plus 5 fields | One of the clearest pages; repeated “Open pathway” links are vague | Rename links |
| `/privacy` | 11 / ~556 / 0 | Appropriate depth for policy | Keep; legal review |
| `/terms` | 10 / ~331 / 0 | Concise for terms | Keep; legal review |
| `/accessibility` | 6 / ~242 / 0 | Clear and proportionate | Keep |
| `/community-standards` | 7 / ~373 / 8 | Appropriate; card layout is still uniform | Minor polish |
| `/report-a-concern` | 6 / ~581 / 7 plus 10 fields | Important detail, but category cards repeat; secure handling is not production-ready | P0 operations/privacy |
| `/impact-hack` | 10 / ~774 / 24 | Dense, but program rules justify more detail; card volume remains high | P2 visual grouping |

## I. Visual/UI Density Findings

- **Home:** polished typography and branch colors establish identity, but 3 ecosystem cards, 5 path cards, 6 capability cards, 5 process steps, 6 trust cards, and 2 evidence cards create a sequence of equal-weight modules. The eye is not told which three ideas matter most.
- **Organizations:** the first three capability cards are immediately followed by all eight capability cards. Six project-format cards later repeat similar promise/qualification text. This is the strongest example of redundant card UI.
- **Builders:** six “what builders do” cards all repeat the same safeguard sentence. The pathway cards, notice, term checklist, opportunity state, Network explanation, and long form make the page feel like several pages combined.
- **Liberation:** section spacing is visually calm but very large. Existing full-page evidence shows substantial blank vertical zones between relatively small content blocks, producing a long scroll and fragmented story.
- **Liberation How It Works:** the journey, seven conversation cards, repeated participation layers, value-exchange section, FAQ, and form force users to reprocess the same boundaries several times.
- **Ecosystem:** semantic diagram and lists are appropriate here, but the page should be treated as reference material rather than the default client onboarding sequence.
- **About:** large section spacing and many cards make governance feel larger than the actual operating evidence. Keep honesty, reduce visual ceremony around limitations.
- **Work:** clear and restrained; the weakness is not density but evidence relevance. The site itself is not a substitute for an external client case study.
- **Partners:** eight partner cards share identical explanatory copy. A grouped list would communicate the same information faster.
- **Resources:** expandable guides are the correct pattern. Repeated author/source/limitation metadata inside every open guide is useful for trust but could be visually compressed.
- **Forms:** the max width and labels are readable, but long forms are presented as one uninterrupted column. There is no progress signal, step grouping, or “save/continue later”; mobile users face especially long scrolls.
- **Global:** alternating warm/surface sections and large padding create separation, but `clamp(4rem, 9vw, 7.5rem)` on most sections makes short content look disconnected and multiplies page length. Cards use very similar borders/backgrounds, limiting priority cues.

Recommended visuals must improve comprehension: output examples, a before/after workflow, a 3-step client process, and grouped service categories. Decorative illustrations or stock imagery would not solve the clarity problem.

## J. CTA Audit

All internal destinations currently resolve. The external Impact Hack Google Form URL is present, but its live interaction and third-party accessibility/privacy were not revalidated in this audit. Repeated global navigation is inventoried once; each page also has a `Home` breadcrumb, and nested pages add the appropriate parent breadcrumb. Submit buttons post to `/api/submissions` rather than navigate.

| Page / audience | Current content CTAs and exact destination | Purpose, competition, and intent fit |
|---|---|---|
| Global; all audiences | `Our Ecosystem` → `/ecosystem`, `/about`, `/ethical-work`; `For Organizations` → `/organizations`, `/challenges`; `For Builders` → `/builders`, `/work`, `/impact-hack`; `Liberation Network` → `/liberation`; `Work & Partners` → `/work`, `/partners`; `Resources` → `/resources`; `Start Here` → `/start`; Footer adds `/contact`, `/privacy`, `/terms`, `/accessibility`, `/community-standards`, `/report-a-concern` | Complete, working route coverage. Start Here is the strongest universal action. Many global options are appropriate but compete with page-level actions; current-page emphasis is missing. |
| `/`; all audiences, especially new organizations | `Find your path` → `/start`; `See how the ecosystem works` → `/ecosystem`; `About the Lab` → `/about`; `Explore DoGoodie` → `/organizations`; `Explore the Network` → `/liberation`; five whole-card audience links → `/organizations`, `/builders`, `/liberation`, `/partners`, `/resources`; `Discuss an organizational challenge` → `/organizations`; `Ethical Work` → `/ethical-work`; `Privacy` → `/privacy`; `Community Standards` → `/community-standards`; `Report a Concern` → `/report-a-concern`; two `Review this work` links → `/impact-hack` and `/ecosystem`; `View work and case studies` → `/work`; `Start here` → `/start`; `Browse public resources first` → `/resources` | All work, but 20 content links create competition. “Discuss” does not lead to a discussion. Repeated Explore/Review labels obscure destination, and audience cards duplicate `/start`. |
| `/start`; all audiences/QR visitors | Five whole-card audience links → `/organizations`, `/builders`, `/liberation`, `/partners`, `/resources`; displayed/QR Start URL → `/start`; `Browse resources` → `/resources`; `Contact us` → `/contact` | Clear intent routing. This should remain the canonical full audience chooser; repetition on Home can be reduced. |
| `/ecosystem`; orientation/trust visitors | `Choose your path` and `Choose a path` → `/start`; `About governance` and `Explore The Ethical Capacity Lab` → `/about`; two organization branch links → `/organizations`; two Liberation branch links → `/liberation`; `Review safeguards` → `/ethical-work` | Destinations work and match a deep explanatory page, but repeated branch actions can be consolidated. |
| `/about`; trust-seeking organizations/partners | `Explore the ecosystem` → `/ecosystem`; `Report a concern` and `Concern route` → `/report-a-concern`; `Review ethical work` → `/ethical-work`; `General contact` → `/contact` | All match intent. Concern action is duplicated, while the primary action is not tailored to client or partner next steps. |
| `/organizations`; prospective clients | `Submit a challenge` and `Open secure intake` → `/challenges`; `Review how we work` and `Read the full ethical-work model` → `/ethical-work`; `Review work and limitations` → `/work`; `General contact` → `/contact` | All work, but two pairs duplicate intent. No booking action exists; the page asks visitors to choose intake or general contact. |
| `/challenges`; qualified organizations | `Privacy Policy` and `Read privacy details` → `/privacy`; `Return to organization pathway` → `/organizations`; `Submit challenge for review` → `POST /api/submissions` | Labels are specific and destinations fit. The form itself is the conversion friction; privacy is linked twice. |
| `/builders`; prospective builders | `Express interest` → `#expression-of-interest`; `Review ethical work first` and `Ethical Work` → `/ethical-work`; `Explore current proof and honest empty states` → `/work`; `Community Standards` → `/community-standards`; `Report a concern` → `/report-a-concern`; `Review the current $5 Impact Hack program` → `/impact-hack`; `Understand the Network` → `/liberation`; `Privacy Policy` → `/privacy`; `Submit expression of interest` → `POST /api/submissions` | Primary intent is clear, but policy/path links compete and the form follows a long page. Ethical Work is duplicated. |
| `/ethical-work`; organizations/builders/partners | `Organization path` → `/organizations`; `Builder path` → `/builders`; `Report a concern` → `/report-a-concern`; `Community Standards` → `/community-standards`; `Review current work` → `/work`; `See builder opportunities` → `/builders#opportunities` | All fit. Six actions dilute the audience-return choices; keep escalation visible but reduce repeated route prompts. |
| `/liberation`; prospective participants/referrals | `Explore how it works` → `/liberation/how-it-works`; `Learn publicly` and `Browse the resource library` → `/resources`; `Prepare for a conversation` → `/liberation/how-it-works#conversation`; `Review builder pathway` → `/builders`; `See the full ecosystem` → `/ecosystem`; `How it works and interest form` → `/liberation/how-it-works#interest`; `Community Standards` → `/community-standards` | Actions work but repeat the same two destinations. The route should offer one learn action, one interest action, and supporting safeguards. |
| `/liberation/how-it-works`; interested/referred people | `Report a concern` → `/report-a-concern`; `Review standards` → `/community-standards`; `Privacy Policy` → `/privacy`; `Submit for human review` → `POST /api/submissions` | Form action is specific. Supporting actions fit, but no back-to-overview action sits near the form. A direct meeting scheduler is intentionally not recommended for this audience. |
| `/work`; organizations/partners/builders | `Submit a challenge` → `/challenges`; external `Open the application form` → Google Forms; two `Read the evidence record` actions → page detail anchors; two `Follow the related path` actions → `/impact-hack`, `/ecosystem`; `Builder pathway` → `/builders`; `Partnership pathway` → `/partners` | Anchors and routes work; external interaction was not revalidated. “Follow the related path” is vague and repeated. Audience actions compete modestly but are reasonable after evidence. |
| `/partners`; prospective partners/providers | `Propose collaboration` → `#partnership-inquiry`; `Review current work` → `/work`; `About governance` → `/about`; `Ethical Work` → `/ethical-work`; `Privacy Policy` → `/privacy`; form `Propose collaboration` → `POST /api/submissions` | Anchor and submit share a label even though one scrolls and one sends. Use distinct “Open inquiry” and “Send proposal” directions later. |
| `/resources`; learners/all audiences | `Browse guides` → `#guides`; `Optional Start Here path` → `/start`; seven guide next-step links → `/organizations`, `/ethical-work`, `/work`, `/challenges`, `/builders`, `/liberation/how-it-works`, `/ecosystem`; supporting links → `/ethical-work`, `/builders`, `/liberation/how-it-works`, `/community-standards`, `/impact-hack`, `/work` | Contextual destinations work, but the volume is high. “Optional Start Here path” sounds internal; resource-specific next actions are otherwise useful. |
| `/contact`; uncertain visitors | Five `Open pathway` links → `/challenges`, `/builders#expression-of-interest`, `/liberation/how-it-works#interest`, `/partners#partnership-inquiry`, `/report-a-concern`; `Privacy Policy` → `/privacy`; fallback email → `mailto:ethicalcapacitylab@gmail.com`; `Send message` → `POST /api/submissions` | Destinations fit, but identical labels are poor for scanning and screen-reader link lists. Replace directionally with the name of each action. Email is not an appropriate sensitive-data path. |
| `/privacy`; all form users | No content CTA beyond the global shell and `Home` breadcrumb | Appropriate for a policy page; no competing conversion action. |
| `/terms`; all visitors | `contact page` → `/contact`; `Report a Concern` → `/report-a-concern` | Both are contextual and clear; no competition problem. |
| `/accessibility`; all visitors | `Send accessibility feedback` → `/contact`; `Report a related concern` → `/report-a-concern` | Clear distinction between feedback and concern. General Contact still lacks inbox delivery. |
| `/community-standards`; builders/participants/partners | `Report a concern` → `/report-a-concern`; `Ethical Work` → `/ethical-work`; `Privacy Policy` → `/privacy` | Clear and proportionate escalation/context actions. |
| `/report-a-concern`; anyone affected | `Privacy Policy` appears twice → `/privacy`; fallback email → `mailto:ethicalcapacitylab@gmail.com`; `Community Standards` → `/community-standards`; `Submit concern` → `POST /api/submissions` | Submit intent is clear. Duplicate Privacy link is minor; public email is explicitly less secure and should not become the main concern route. |
| `/impact-hack`; program applicants/builders | `Open the application form` appears twice → external Google Forms; `General builder pathway` → `/builders`; `Return to Work and Case Studies` → `/work` | Application duplication is acceptable on a long page and date-aware behavior is useful. External privacy/accessibility and live form state require separate verification. |

Vague labels worth changing selectively: “Find your path,” “Explore,” “Open pathway,” “Follow the related path,” “Optional Start Here path,” and “Discuss an organizational challenge” when it does not lead directly to a discussion.

## K. Scheduling CTA Recommendation

The scheduling action should be **organization/client-only**, not a new global navigation item.

- **Homepage placement:** immediately after the early service section, before the five-audience router. Use one compact client panel rather than another large section.
- **Organizations placement:** primary hero action and again after the short process explanation. The challenge form remains an alternative for people who prefer a written review.
- **Recommended label before a real booking provider exists:** “Request a 30-minute introductory call.” This truthfully describes a reviewed request.
- **Recommended label after a direct booking provider is connected:** “Schedule a 30-minute introductory call.” Do not use “Schedule” if the destination is only a long intake form.
- **Qualification text:** “For organizations with a specific challenge and a responsible contact. The call is for clarification and fit—not open-ended consulting or a promise of work.”
- **Future behavior:** read the URL from one server/public configuration value such as `NEXT_PUBLIC_ORGANIZATION_SCHEDULING_URL`; validate it as HTTPS; show the provider name and privacy notice; open predictably; preserve a `/challenges` fallback when unavailable. Do not hardcode a Calendly or Google Calendar URL before selection.
- **After booking:** show the call purpose, 30-minute duration, preparation, sensitive-information warning, timezone, cancellation route, and what happens next. A booking must not bypass suitability or safeguarding review.

## L. Forms Inventory

All six native forms post JSON to `/api/submissions`. The shared UI performs client validation; the endpoint repeats validation, checks content type/size/origin, applies a honeypot, limits to 5 attempts per IP/form type per 10 minutes in memory, rejects exact duplicates for 10 minutes, and logs only type/reference/adapter or provider error type. Data is not placed in URLs. Secrets remain server-only.

| Page / form | Fields (required) | Client + server validation | Storage / email | Submit result and failure behavior | Current classification |
|---|---:|---|---|---|---|
| `/challenges` organization challenge | 16 (13) | Yes; email/URL/options/length, consent, contact and sensitive-data confirmations | Dev NDJSON or optional Supabase; **no email** | Success only after adapter accepts; errors visible | **PARTIALLY FUNCTIONAL** |
| `/builders` builder interest | 13 (10) | Yes; proof links are textarea content, not individually URL-validated | Same; **no email** | Honest adapter success/failure | **PARTIALLY FUNCTIONAL** |
| `/liberation/how-it-works` interest/referral | 12 (8) | Yes; permission reminder for referrer is copy, not a separate confirmation | Same; **no email** | Honest adapter success/failure | **PARTIALLY FUNCTIONAL** |
| `/partners` partnership inquiry | 12 (10) | Yes; display permission defaults to no public display | Same; **no email** | Honest adapter success/failure | **PARTIALLY FUNCTIONAL** |
| `/contact` general contact | 5 (5) | Yes | Same; **no email** | Honest adapter success/failure | **PARTIALLY FUNCTIONAL** |
| `/report-a-concern` concern report | 10 (6; email conditional) | Yes; email required only when follow-up requested | Same shared store; **no separate restricted concern workflow and no email** | Honest adapter success/failure | **PARTIALLY FUNCTIONAL + SECURITY/PRIVACY CONCERN** |

### Field-level inventory

Required fields are marked **R**; optional fields are marked **O**.

- **Organization challenge:** full name **R**; email **R**; organization name **R**; role/title **R**; website **O**; short problem title **R**; problem description **R**; affected people **R**; desired outcome **R**; current tools/attempts **O**; urgency/timeline **R**; budget range **O**; preferred next step **R**; sensitive-data confirmation **R**; permission to contact **R**; privacy/review consent **R**.
- **Builder interest:** name/professional name **R**; email **R**; country/timezone **O**; primary skills **R**; supporting skills **O**; experience summary **R**; portfolio/proof links **R**; work interest **R**; preferred engagement **R**; realistic availability **R**; access/collaboration needs **O**; no-guarantee acknowledgment **R**; privacy/review consent **R**.
- **Liberation interest/referral:** name/alias **R**; email **R**; discovery source **R**; own interest/referral type **R**; referrer contact **O**; vision interest **R**; possible contribution **O**; hope to learn/explore **O**; preferred next step **R**; timezone **O**; no-guarantee acknowledgment **R**; privacy/review consent **R**.
- **Partnership inquiry:** name **R**; email **R**; organization **R**; role **R**; website **O**; partnership type **R**; proposal **R**; mutual value **R**; timeline **R**; existing relationship/referral **O**; public display permission **R**; privacy/review consent **R**.
- **General contact:** name **R**; email **R**; topic **R**; message **R**; privacy/review consent **R**.
- **Concern report:** name **O**; email **O**, but required when email follow-up is selected; relationship **R**; category **R**; description **R**; people/project involved **O**; immediate-safety answer **R**; desired follow-up **O**; confidentiality-limits acknowledgment **R**; privacy/review consent **R**.

### Shared behavior, privacy, and security

- **Client behavior:** native labels and controls, required/optional markers, length limits, select validation, inline errors, focusable error summary, disabled loading button, visible failure copy, and a reference on success. Inputs reset only after success.
- **Server behavior:** the route repeats schema validation and rejects invalid type, non-JSON requests, bodies over 40 KB, disallowed origins, filled honeypots, excessive attempts, and exact recent duplicates before invoking storage.
- **Spam controls:** hidden honeypot, origin enforcement, per-IP/per-form in-memory limit of five attempts in ten minutes, and ten-minute duplicate detection. The controls are useful locally but not sufficient for multi-instance production.
- **Warnings:** the shared heading says not to include sensitive information beyond what is requested. Challenge and Contact add explicit sensitive-data lists; Concern adds an emergency boundary and minimum-information instruction; Builder warns not to provide diagnoses in the access-needs field; Liberation warns about privacy limits and permission for referrals; Partner defaults public-display permission to no.
- **Privacy and consent:** every form requires the same consent to the privacy notice and review for the stated purpose, and the submit area links to `/privacy`. Concern additionally requires acknowledgment that confidentiality and anonymity have limits. The consent is explicit but not versioned in the stored schema.
- **Response expectations:** each audience page prints a centralized response target and caveat. Success copy states human review and explicitly denies automatic acceptance, work, membership, partnership, or guaranteed outcome as appropriate.
- **Secrets and transport:** only public field data is sent as JSON to the same-origin server route. Supabase's service-role key and any future mail key remain server-side; no secret is referenced by client components.
- **URLs and logs:** form values are not placed in query strings. Application logs contain submission type, generated reference, adapter, and provider error type—not the submitted answers. Development persistence writes the full record to a local NDJSON file by design.

There is no fake success state in the current code: a 201 response is returned only after the selected persistence adapter completes. However, “accepted by the configured adapter” does **not** mean delivered to an official inbox. Relative to the new requirement, every form remains only partially functional.

The local running server currently renders the forms rather than the unavailable panel, but this audit deliberately did not submit test data. The repository contains no committed production credentials. The production-ready path depends on deploy-time Supabase configuration that cannot be inferred from source alone.

## M. Form Functionality Problems

1. **No inbox notification path.** `RESEND_API_KEY` and `SUBMISSION_NOTIFICATION_TO` are documented placeholders; no package, API call, template, or notification adapter uses them.
2. **Production forms can be unavailable.** This is honest and safer than fake success, but it means the desired operational workflow is not complete.
3. **The success message is technical.** “Submission received by the configured adapter” describes implementation, not what the visitor needs to know. It should say whether the request was securely stored, queued/notified, and what happens next.
4. **Test coverage is narrower than the QA summary suggests.** Unit tests validate complete payloads for all six forms. Browser tests exercise a successful persisted general-contact submission, general errors, challenge acknowledgment, server rejection, and duplicate prevention. They do not perform a successful end-to-end submission for all six forms or any real email delivery.
5. **Rate limiting and duplicate state are per-process.** The in-memory maps are not reliable across multi-instance/serverless production and reset on restart.
6. **No durable notification status.** The schema has no email message ID, queued/sent/delivered/failed status, attempt count, or last notification error.
7. **Concern reports share the general submission table/adapter.** The schema separates review notes but not access policy or notification content by sensitivity. The public Gmail fallback is not a secure concern workflow.
8. **Long forms create abandonment.** Organization, builder, Liberation, and partner forms request 12–16 fields at initial contact. Several could be collected after review.
9. **No scheduling integration.** The organization form's preferred-next-step select does not actually book a call.
10. **No operational owner is named.** Response targets exist, but the reviewer function, inbox owner, escalation coverage, and absence handling are not public or configured.

## N. Recommended Email Submission Architecture

### Primary recommendation: Supabase persistence plus a server-only Resend notification adapter

This fits the current Next.js/TypeScript stack and the environment scaffolding already present. Supabase remains the authoritative private record; Resend delivers a minimized review notification. Resend's official API supports server-side sends, `reply_to`, idempotency keys, delivery-status webhooks, and domain verification. Official references: [Send Email API](https://resend.com/docs/api-reference/emails/send-email), [idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys), [domain verification](https://resend.com/docs/dashboard/domains/introduction), and [delivery webhooks](https://resend.com/docs/webhooks/emails/delivered).

Required implementation:

1. Add a provider-neutral `NotificationAdapter` beside `SubmissionAdapter`; use Resend only server-side.
2. Configure environment variables: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `DOGOODIE_REVIEW_EMAIL`, the separate `CONCERN_REVIEW_EMAIL`, and `RESEND_WEBHOOK_SECRET` when webhook handling is implemented.
3. Extend persistence with notification status, provider message ID, attempt timestamps/count, and last non-sensitive error code. Prefer a transaction/outbox record so storage and notification state cannot silently diverge.
4. In `/api/submissions`, validate → persist → send/queue notification with idempotency key `website/{formType}/{submissionId}` → record provider result → return a visitor-safe status.
5. Do not claim “delivered to inbox” merely because an API request was accepted. Resend distinguishes `email.sent` from `email.delivered`; actual recipient-server delivery is asynchronous. The immediate UI should say “stored and notification accepted for delivery.” A signed webhook can update delivered/bounced/failed status.
6. If storage fails, return failure and send nothing. If storage succeeds but notification fails, return a clear partial state with the reference: “Your submission was stored, but reviewer notification is delayed. Do not resubmit.” Queue a retry. Do not lose or duplicate the record.
7. Set `Reply-To` to the submitter for ordinary inquiries when an email is provided and safe. Keep the verified ECL/DoGoodie address as `From`; never spoof the submitter as sender.
8. Use plain-text plus restrained HTML templates. Escape all submitted content. Never place sensitive details in the subject.
9. Retain current honeypot, size, origin, validation, and duplicate controls; move production rate/duplicate state into a shared store or database function. Add CAPTCHA only if real abuse justifies the privacy/accessibility tradeoff.
10. Test with a fake notification adapter and provider sandbox/test recipient. Automated tests must not email the real review inbox.

### Subject and content pattern

Use the requested subjects, with untrusted names sanitized and length-limited:

- `[Website] New Organization Challenge — {Organization Name}`
- `[Website] New Builder Interest — {Name}`
- `[Website] New Liberation Network Interest — {Name}`
- `[Website] New Partnership Inquiry — {Organization or Name}`
- `[Website] General Inquiry — {Topic or Name}`
- `[Website] Concern Report — Confidential Review`

Normal review emails should include form type, reference, timestamp, source page, name/email, organization where relevant, clearly labeled answers, consent status/version, and a secure record link if available. “Review notes” should mean routing metadata, not automated judgments.

For concern reports, email should contain only the reference, timestamp, category, immediate-safety flag, follow-up preference, and a restricted link to the secured record. Do **not** email the description, people named, allegations, or attachments. Email-only delivery is not appropriate for concern reports.

### Fallback recommendation: Postmark behind the same adapter

If Resend cannot be approved or meet deliverability/legal requirements, Postmark is the fallback. Its official Node/TypeScript SDK supports server-side transactional sends, templates, a returned MessageID, verified senders, test tokens, and delivery/bounce correlation. See [Postmark's official libraries](https://postmarkapp.com/developer/integration/official-libraries) and [Send Email API](https://postmarkapp.com/developer/user-guide/send-email-with-api). Keep provider choice out of form components so switching does not change visitor behavior.

## O. Form Simplification Recommendations

| Form | Keep in first step | Delay, merge, or make optional | Clarify |
|---|---|---|---|
| Challenge | Name, email, organization, short problem, who is affected, desired outcome, preferred response, sensitive-data confirmation, consent | Role, website, current attempts, detailed timeline, budget can be optional or collected after fit; merge title/description when possible | Explain that a meeting request is reviewed, not booked; show estimated completion time |
| Builder | Name, email, primary skills, one proof/example, work interest, realistic availability, acknowledgment, consent | Country/timezone, supporting skills, full experience summary, engagement taxonomy, access needs can follow; portfolio should not be mandatory for Emerging Builders | Say this is an interest note, not a job application; allow “I do not have a public portfolio yet” |
| Liberation | Name/alias, email, how found, self/referral, one short interest question, preferred next step, acknowledgment, consent | Possible contribution, hopes, timezone, and referrer contact can follow or remain optional; avoid collecting another person's contact in initial form | Make “public resource” and “no conversation yet” easy choices |
| Partnership | Name, email, organization if applicable, proposal type, short proposal, consent | Role, website, mutual-value essay, timeline, existing relationship, and display permission can be collected after initial fit; default remains no display | State the expected review owner and that public association is separate |
| General contact | Current five fields | Nothing material | Rename specialized links; keep it the model for short first contact |
| Concern | Category, short description, immediate danger check, relationship, follow-up preference, confidentiality acknowledgment, consent | Name/email optional as now; people/project detail can be requested securely later | Explain secure handling, access group, storage, and partial/anonymous limitations before production |

Across forms, group fields into “About you,” “What you need,” and “Permissions,” display an honest time estimate, and avoid one uninterrupted 12–16-field column. Do not add multi-step UI unless back/forward state, error focus, and data loss are handled accessibly.

## P. Mobile Findings

- The CSS correctly collapses multi-column cards to one column at 800px, switches to a mobile navigation drawer below 1180px, uses 44–48px controls, and reduces container gutters at 500px.
- The current automated suite reports no horizontal overflow at 320, 390, 768, and 1440px on Home. Existing navigation tests cover focus trapping, Escape, and focus return.
- Responsive safety does not equal mobile clarity. Home's 17 card-like blocks, Organizations' 23, and Impact Hack's 24 become long one-column sequences.
- Standard section padding remains large on small screens, so pages accumulate substantial empty vertical space. The existing full-page Liberation screenshot already demonstrates a fragmented, lengthy desktop rhythm; stacking magnifies it on mobile.
- Large serif headings can occupy several lines before useful content appears. The mobile hero should surface the service/result and primary action sooner.
- Forms remain one long column without grouping or progress context. The 16-field challenge form and 13-field builder form are especially intimidating on a phone keyboard.
- The mobile menu is accessible and Start Here is prominent, but it is long once both dropdown groups, direct links, Contact, and Report a Concern are expanded. Current-page indication is absent.
- Footer groups stack to one column below 500px, making the footer long. Accordions or a two-column compact layout could reduce nonessential scroll if implemented accessibly.
- Horizontal journey diagrams collapse to one column, which prevents overflow but removes the quick visual sense of progression. A compact numbered timeline with short labels would scan better.
- Service categories and “what you get” examples would materially improve mobile comprehension because users could decide from headings without reading every paragraph.

## Q. Accessibility Findings Relevant to Clarity

Strengths:

- Semantic landmarks, one H1 per route, skip link, visible focus, reduced-motion support, native controls, labeled forms, `aria-describedby`, inline errors, a focusable error summary, and keyboard-managed navigation are present.
- The most recent repository evidence reports no serious or critical axe issues on Home, Start, Organizations, Builders, Liberation How It Works, and Report a Concern, plus a reduced-motion check.
- Breadcrumbs use `aria-current="page"`; diagrams have semantic text and alternatives; critical meaning is not color-only.

Clarity/accessibility issues:

- Repeated link labels such as “Open pathway,” “Review this work,” and “Follow the related path” are weak in a screen-reader links list.
- Every Resource card uses the same summary label, “Open guide.” Include the guide title in the accessible name.
- Audience cards are whole-card links, producing very long accessible names that combine eyebrow, title, description, CTA, and arrow.
- Dense pages and repeated safeguards create cognitive load even when technically WCAG-friendly. Cognitive accessibility needs shorter language, fewer choices, and predictable placement.
- Success is announced with `role="status"`, but the success panel is not explicitly focused. Confirm behavior with screen readers after implementation.
- No independent accessibility review, representative screen-reader test, 200% zoom audit, or current mobile-browser audit is documented.
- Existing automated accessibility coverage samples six content routes, not all 20 and not every form state.

## R. Content Duplication Findings

| Repeated concept | Current locations | Recommended canonical pattern |
|---|---|---|
| ECL / DoGoodie / Liberation definitions | Home, Ecosystem, About, Resources, FAQ, metadata | Long version in `content/ecosystem.ts` and `/ecosystem`; one-sentence public version on Home/About; FAQ only answers the question asked |
| What remains separate | Home notices, Ecosystem, About, Builders, Liberation, How It Works, Resources | One canonical long boundary in `content/site.ts`; one page-specific sentence near actions; link to Ecosystem for detail |
| Current-stage statement | Home, Ecosystem, About, Footer, Work context | Full version once on Ecosystem/About; short badge near Home proof; concise footer version |
| No-guarantee language | Home, every audience page, forms, policies, FAQ | Keep one proportionate sentence beside each consequential action; move complete list to Terms/Ecosystem |
| Human review | Home, Start, audience pages, forms, FAQs | State once in each journey at the actual review point; name the review function when approved |
| Ethical safeguards | Home trust grid, Organizations, Builders, Ethical Work, Partners, Resources, Standards | Short three-promise summary on Home/audience pages; canonical operational detail on Ethical Work |
| Builder protections/project terms | Organizations, Builders, Ethical Work, Work, Partners | Canonical checklist on Ethical Work; audience-specific short links elsewhere |
| Participation layers / conversation boundaries | Liberation, How It Works, Resources | Overview version on Liberation; full version only on How It Works; Resources links without repeating the full model |
| Response times | Audience pages and forms | Keep centralized in `content/response-times.ts`; show once near form/action, not in multiple adjacent notices |

## S. Trust and Safeguard Findings

### Strong and correctly placed

- Sensitive-information warnings sit before challenge/contact/concern forms.
- Compensation, ownership, consent, confidentiality, feedback, closure, and safe exit are visible in builder and ethical-work journeys.
- Human review and no-guarantee language are placed near consequential paths.
- Work records distinguish output, result, evidence, limitations, what remains unproven, and publication consent.
- Report a Concern is globally discoverable and non-retaliation/confidentiality limits are explicit.
- Current-stage language avoids mature-scale claims.

### Missing or too late

- No named review function/inbox owner or operating coverage exists for any intake.
- Organizations cannot see a meeting option immediately after services because no scheduling route exists.
- Forms do not disclose the actual current delivery state: storage may work, but inbox notification does not.
- Concern-report access controls, encryption/operational handling, reviewer qualification, retention, and escalation ownership remain unresolved.
- Public proof is method/process-heavy; clients cannot yet see a reviewed example that demonstrates an external problem, output, and result.

### Repeated too often

- “Separate decisions,” “not guaranteed,” “human-reviewed,” “bounded,” and long lists of excluded outcomes recur on the same journeys.
- On high-intent pages, repeated warnings can make the organization feel defensive or inactive. Keep the safeguard at the decision point and link to the full policy.

### Can be shortened or moved deeper

- Full ecosystem relationship boundaries belong on `/ecosystem`; Home needs one sentence.
- Full compensation/ownership checklist belongs on `/ethical-work`; Organizations and Builders need a short summary before action.
- Full one-on-one privacy model belongs on How It Works; Liberation overview needs duration, purpose, and one boundary sentence.

## T. Client Perspective Walkthrough

Assumption: “I am an organization owner. Skyler sent me this website. I do not know what ECL, DoGoodie, or the Liberation Network are.”

1. **What can they actually do for me?** The current site first says ECL connects ethical standards, DoGoodie project support, and trusted relationships. After two more homepage sections, it lists challenge clarification, research/documentation, websites/internal systems, responsible automation, supervised small projects, and builder/collaboration support. The organization page expands this to eight capability families. Friction: the deliverable is not obvious from most titles.
2. **Can I see examples?** The Work page shows the $5 Impact Hack program and this ecosystem website architecture. Both are honest, but neither is a completed external client case with a concrete business/mission result. Friction: evidence proves process discipline more than client value.
3. **How do I contact them?** I can submit a challenge, use general contact, or email the public Gmail address. Friction: the specialized route is a long form and “Discuss an organizational challenge” does not lead directly to a discussion.
4. **Can I schedule a meeting?** No direct scheduling link exists. The challenge form lets me select an approximately 30-minute introductory conversation as the preferred next step. Friction: requesting a call requires completing a 16-field intake and does not book a time.
5. **What happens after I contact them?** The organization page explains initial review, clarification, possible conversation, scope recommendation, and accept/refer/hold/decline/pilot outcomes. This is clear once found.
6. **Why should I trust them?** The site provides ethical-work rules, human review, privacy, consent, ownership, limitations, honest evidence states, current-stage language, and a concern route. This is strong, although repeated.
7. **What should I avoid submitting?** Passwords, private keys, financial-account data, protected health information, legal files, private political records, confidential client files, and unauthorized information. This is clear.
8. **How long will review take?** The target is an initial review within 7 business days, with a caveat that complex/high-volume matters may take longer. Clear.
9. **Am I expected to understand the internal ecosystem first?** In practice, yes on Home: the three-part ecosystem appears before services. `/start` says otherwise, but Home's order contradicts that promise.

Primary friction sequence: abstract hero → architecture → audience routing → services → another process → trust → limited evidence → no schedule action.

## U. Five-Audience Walkthrough

| Audience | First obvious route and current understanding | Confusion / asks too much? | Primary CTA and trust sufficiency |
|---|---|---|---|
| Organization/client | Header “For Organizations” and Home path card. Understands there is reviewed project help. | Services are abstract/repeated; 16-field challenge form is too much for a first conversation; no direct booking. | Submit a challenge. Trust is strong, but proof and operational inbox are weak. |
| Potential builder | “For Builders.” Understands skills/proof, pathways, standards, and no guaranteed work. | Three pathway labels plus Impact Hack roles require explanation; page/form feel like a job application; public portfolio is required even for emerging builders. | Express interest. Compensation/ownership trust is strong; current opportunities are honestly empty. |
| Potential Liberation participant | “Liberation Network.” Understands public learning, gradual trust, conversation, and no guaranteed benefit. | Abstract values/relationship language, two long pages, repeated layers, and 12-field form create high cognitive load. | Explore How It Works, then submit interest. Boundaries are strong; active offering/capacity remains unclear. |
| Potential partner | Work & Partners dropdown or Start card. Understands several partnership types and permission boundaries. | Eight equal partner cards and long inquiry; no named review owner or operational email. | Propose collaboration. Governance/display trust is strong; evidence remains limited. |
| General learner | Resources or Start learner card. Understands learning is free/no pressure. | Resource metadata is heavy and internal terminology persists; Home is not the quickest learning route. | Browse guides. Trust is sufficient and no personal data is required. |

## V. Prioritized Correction Plan

### P0 — Required before the meeting/review-ready version

1. Reorder Home to: hero → practical services → organization meeting CTA → audience paths → short three-part explanation → simple process → trust → evidence/stage → final CTA.
2. Replace the eight mixed capability cards with four outcome-oriented service groups and tangible outputs. Preserve accurate scope; do not add unsupported social, branding, market, cost, or career services.
3. Add a centrally configured organization scheduling state. Until a provider is selected, use “Request a 30-minute introductory call,” not a fake scheduling link.
4. Remove the duplicated 3-card capability preview from `/organizations`; lead with the outcome groups and one short fit statement.
5. Implement and test official-inbox notifications behind a server-only provider adapter, while retaining Supabase as authoritative storage and honest failure states.
6. Add durable notification status/idempotency and clarify immediate send acceptance versus actual email delivery.
7. Create a separate, restricted concern-report handling model; send only minimized concern notification metadata by email.
8. Shorten the challenge form and make a low-friction conversation request possible without collecting 16 fields.
9. Update visitor-facing success/error messages to describe storage, notification, reference, and next steps without “configured adapter” jargon.
10. Run a current desktop/mobile/browser review after these changes; the interactive browser was unavailable for this audit.

### P1 — Important before Friday review

1. Shorten Home ecosystem cards, audience cards, trust cards, and collaboration flow.
2. Consolidate Liberation overview and How It Works to remove repeated participation/boundary explanations; shorten the interest form.
3. Simplify Builder and Partner initial forms; make public portfolio optional for Emerging Builders.
4. Replace repeated/vague link labels with descriptive actions.
5. Reduce large section padding on short sections and add stronger primary/secondary visual hierarchy.
6. Group risk/partner/project-format lists rather than rendering every item as an equal card.
7. Add one compact “what you get” example under each service group.
8. Publish reviewer-function language and operational response ownership once approved.
9. Expand automated successful form tests to all six types and add notification failure, partial state, retry/idempotency, and webhook tests.
10. Re-run axe on all routes and critical form states; perform keyboard, 200% zoom, and representative screen-reader checks.

### P2 — Weekend polish / production finalization

1. Add publishable external work examples only after evidence and consent review.
2. Improve resource-card accessible names and optional audience/category filtering without adding tracking.
3. Compact the mobile footer and long program/service card groups.
4. Add current-page state to primary/mobile navigation.
5. Review Impact Hack external form accessibility/privacy and current dates/status.
6. Complete legal/privacy review, retention decisions, processor disclosure, concern escalation, and reviewer access controls.
7. Replace in-memory production rate limiting with a shared reviewed control.
8. Verify sender domain, SPF/DKIM/DMARC strategy, inbox deliverability, bounce handling, and alerting.
9. Perform Lighthouse/performance measurements and report actual results.
10. Confirm preview/production environment settings before any deployment; production and DNS remain out of scope.

## W. Proposed Next Codex Implementation Pass

After JM reviews and approves this audit, the next implementation pass should:

1. Confirm the four-group service IA and identify which optional content/design/brand/social research capabilities are genuinely deliverable.
2. Confirm the booking provider and organization-only CTA wording; add a central configuration variable and safe unavailable fallback.
3. Rewrite/reorder Home and Organizations using approved plain-language directions, preserving all safeguards and claims boundaries.
4. Apply shared density improvements to Builders, Liberation, Partners, and Resources without broad visual redesign.
5. Approve the exact reduced field set for all six forms and the operational reviewers/inboxes.
6. Implement the notification adapter, Supabase notification/outbox fields, idempotency, delivery webhook, minimized templates, and separate concern handling.
7. Update privacy/forms documentation to match the actual provider, delivery status, retention, and access model.
8. Add complete unit/integration/e2e coverage for all form types, storage, notification, partial failure, duplicate retries, concern minimization, and backend-unavailable states.
9. Run lint, strict type-checking, unit tests, full Playwright, axe, production build, and manual desktop/mobile/accessibility review.
10. Produce review screenshots and a concise before/after implementation report. Do not deploy or change DNS without separate authorization.

## Final audit conclusion

The V1 should not be discarded or turned into a generic agency site. Its architecture, honesty, trust safeguards, and technical foundations are valuable. The next revision should expose the practical offer sooner, turn internal capability language into client-recognizable outcomes, reduce repeated cards and caveats, provide a real organization meeting path, and complete the operational intake-to-review-inbox workflow. Those changes preserve the approved ecosystem while making it understandable after one read.
