
# MASTER CODEX IMPLEMENTATION TASK
## Build the complete Ethical Capacity Lab ecosystem website

You are the lead product engineer, UX engineer, content implementer, accessibility reviewer, and QA owner for this task.

Your job is not to produce another plan, wireframe, mockup, or partial scaffold. Audit the repository, preserve valid existing work, and implement a complete production-ready website that follows the approved Deliverables 1–6 and the decisions in this prompt.

Do not stop after planning. Plan briefly, then execute the entire build, run all available checks, fix failures, and return a verifiable implementation report.

---

# 1. AUTHORITATIVE PROJECT FILES

Read these files before changing code:

1. `Liberation_Ecosystem_Benchmark_Research_Final(2).docx`
2. `Liberation_Ecosystem_Audience_and_Trust_Map(2).docx`
3. `Deliverable 3a - Ecosystem Architecture (Detailed Working Artifact).html`
4. `Liberation_Ecosystem_Deliverables_4_5_Final(1).docx`
5. `Liberation_Ecosystem_Deliverable_6_User_Journey_Diagrams(1).docx`
6. `image(297).png` if present as an additional visual reference
7. The existing repository and its current content/assets
8. The current public DoGoodie website at `https://dogoodiebuilders.com/` if network access is available

Treat the attached deliverables as approved requirements, not optional inspiration.

## Source precedence when information conflicts

Use this order:

1. The explicit approved decisions in this prompt
2. Deliverables 4 and 5 for routes, navigation, sections, content requirements, risks, and cross-links
3. Deliverable 6 for journey order, decision points, trust checkpoints, and successful endpoints
4. Deliverable 3 for ecosystem hierarchy, branch boundaries, visual language, and relationship wording
5. Deliverable 2 for audience needs, fears, trust evidence, and primary actions
6. Deliverable 1 for benchmark rationale and design principles
7. Existing repository and current public DoGoodie website for reusable content, assets, program details, and legacy routes

Do not silently choose a conflicting lower-priority source.

---

# 2. APPROVED DECISIONS

These questions are no longer blockers.

## Names and authority

- Public parent organization name: **The Ethical Capacity Lab**
- Short logo/mark: **ECL**
- Practical branch: **DoGoodie**
- Relationship network: **Liberation from Suffering Network**
- Short navigation label: **Liberation Network**
- John Mark has authority to make implementation, content-structure, route, response-time, network-framing, and launch-scope decisions for this project.
- Build the best complete website that responsibly fits the approved information architecture.
- Do not wait for more wireframes.

## Launch scope

Launch all approved routes in Deliverables 4 and 5, including the previously conditional pages, provided they contain honest content, clear boundaries, working navigation, and either functional forms or a transparent setup-required state.

Launch `/partners` as a complete standalone page.

Launch `/resources` with a useful minimum content set derived from the approved materials; do not launch an empty library.

The website may be globally accessible, but do not claim mature global scale or begin active international outreach through the site.

## Current-stage statement

Use this meaning consistently:

> We are building and testing this ecosystem through a small number of real projects, trusted relationships, and carefully scoped collaborations. The public website explains the model and current pathways; it does not claim global scale, guaranteed opportunities, or a mature member platform.

You may polish the sentence for readability, but do not weaken the limitations.

## Network selectivity

Use this model:

- Public learning is open.
- People may express interest or arrive through a trusted referral.
- An initial conversation is a bounded, human-reviewed step.
- Deeper participation develops gradually through mutual fit, trust, conduct, demonstrated care, and current capacity.
- Deeper access is not a moral ranking and is not guaranteed.
- The Network is not a staffing pool, job funnel, sales club, therapy service, crisis service, or guaranteed economic network.

## One-on-one conversation

Use a working model of approximately **30 minutes**.

The page must state:

- its purpose;
- who it is for;
- what to prepare;
- what information not to share;
- privacy limits;
- what it does not provide;
- possible next steps;
- that no next step is also a valid outcome.

It must not imply therapy, crisis counseling, legal advice, financial advice, guaranteed referrals, guaranteed work, or automatic membership.

## Public response targets

Use conservative target language, not absolute guarantees:

- General contact: target response within **5 business days**
- Organization challenge or consultation request: target initial review within **7 business days**
- Builder expression of interest: target review within **10 business days**
- Liberation Network interest or referral: target review within **10 business days**
- Partnership inquiry: target initial review within **7 business days**
- Report a Concern: target acknowledgment within **2 business days** and initial review within **5 business days**

Use “we aim to” or “target,” and state that complex or sensitive matters may take longer.

---

# 3. CORE PRODUCT OUTCOME

Build one unified public website that makes the three parts understandable as distinct but interconnected:

## The Ethical Capacity Lab

Institutional parent and shared trust layer:

- governance;
- methodology;
- research standards;
- intellectual property stewardship;
- ethical safeguards;
- strategic relationships;
- shared ecosystem direction.

Do not describe ECL as a certifier, auditor, regulator, employer of record, clinical provider, legal representative, or independent standards authority.

## DoGoodie

Practical arm:

- structured challenge discovery;
- consulting and capacity-building;
- builder coordination;
- project scoping and delivery;
- research and documentation;
- lightweight websites and internal systems;
- ethical AI and automation;
- supervised or carefully scoped collaboration.

Do not create SaaS as a branch, headline product, or central business model.

## Liberation from Suffering Network

Relationship-based network:

- trusted relationships and introductions;
- skills and advice;
- collaboration;
- professional resources;
- referrals and purchasing when voluntary and appropriate;
- possible paid work;
- possible material or economic support;
- gradual trust and deeper participation.

Do not guarantee any benefit.

## Relationship between DoGoodie and the Network

Display this meaning prominently:

> Possible introductions, relationships, scoped collaborations, and opportunities may move between DoGoodie and the Liberation Network. Collaboration is possible but not automatic. Builder status, paid project work, confidential access, and Liberation Network participation remain separate decisions.

## Ecosystem value flow

Show this on Home and Ecosystem Overview:

> Need, capability, resource, or relationship  
> → clarification and routing  
> → shared standards, people, relationships, tools, and support systems  
> → appropriate consultation, supervised work, introduction, or collaboration  
> → useful output, evidence, feedback, and learning  
> → stronger trust and relationships  
> → possible future referrals, resources, paid opportunities, purchases, introductions, or deeper participation

Add a clear boundary:

> This is a possible ecosystem value flow, not a guaranteed funnel, employment path, membership ladder, or promise of financial, professional, emotional, or material benefit.

---

# 4. FIRST ACTION: REPOSITORY AND LEGACY-SITE AUDIT

Before modifying code:

1. Inspect the repository root, `package.json`, lockfiles, framework, build scripts, routing, component system, styles, public assets, environment files, tests, deployment config, and git status.
2. Read every applicable `AGENTS.md`.
3. Preserve user changes and uncommitted work.
4. Do not run destructive resets, mass deletions, or migrations without a reversible plan.
5. Identify reusable DoGoodie assets, including logos, Flickie mascot artwork, challenge graphics, social images, policy content, forms, and proof-of-work content.
6. Identify all current public routes and backlinks.
7. If network access exists, audit `https://dogoodiebuilders.com/` and compare it with repository content.
8. Write a concise implementation map in `docs/implementation-plan.md`, then continue coding without waiting for approval.
9. Create or update a concise `AGENTS.md` containing stable project rules, commands, route principles, claims to avoid, and links to the detailed source documents. Do not stuff all deliverable content into `AGENTS.md`.

## Framework decision

Prefer the existing healthy stack.

- If the repository already contains a functional React/Vite, Next.js, Astro, or comparable app, improve it in place rather than rewriting it only for preference.
- If no usable web app exists, create a production-ready Next.js App Router application with TypeScript and a maintainable styling system.
- Use the existing package manager indicated by the lockfile.
- Keep TypeScript strict.
- Do not introduce a CMS for the first version.
- Do not introduce a new state-management library unless clearly needed.
- Avoid unnecessary dependencies.

Document the final technical decision in the README.

---

# 5. CURRENT DOGOODIE CONTENT TO PRESERVE AND REPOSITION

The current DoGoodie site is a useful source, but the new site is an ECL ecosystem website, not a larger copy of the old DoGoodie homepage.

Preserve and responsibly reuse these verified DoGoodie concepts where accurate:

- builder community;
- early-stage social-impact technology venture;
- proof-of-work ecosystem;
- technology, AI, content, research, design, and organizing as leverage;
- building real projects;
- honest proof and documentation;
- earning trust through useful, consistent contribution;
- “proof over promises”;
- safe-to-fail experimentation;
- current $5 Impact Hack program information;
- builder protections, ownership, consent, privacy, disclosure, and no-guarantee language;
- higher-trust collaboration as a possible future opportunity, not a promise;
- Flickie as a DoGoodie mascot, not the ECL parent mascot.

## Preserve legacy URLs

Do not break existing links.

Keep or redirect these routes:

- `/impact-hack`: preserve as a DoGoodie program page or archived/current-program page
- `/community`: redirect to the most relevant DoGoodie builder/community section, normally `/builders`
- `/faq`: redirect to `/resources#faq`
- `/proof-of-work`: redirect to `/work`
- `/terms`: retain canonical page
- `/privacy`: retain canonical page
- `/community-standards`: retain canonical page
- `/contact`: retain canonical page

Use permanent redirects only when content has genuinely moved.

## Program dates and status

Do not hardcode stale “applications open” banners.

Create a typed program-status configuration that can derive or display:

- application open date;
- application close date;
- challenge start;
- submission deadline;
- review status;
- archive status;
- official timezone.

For the $5 Impact Hack, preserve known published dates and PHT context from the existing site, but make the current label date-aware and easy to update from one configuration file.

Do not invent winners, impact metrics, participant counts, or completion results.

## Builder-role reconciliation

The approved broader builder pathway uses Emerging, Proven, and Core Builder concepts.

The existing $5 Impact Hack contains program/community-specific roles such as Community, Funded Hacker, Impact Hacker, and Core Builder.

Do not collapse these into one confusing system.

- Use the approved general pathway on `/builders`.
- Preserve program-specific roles only within legacy/current program content.
- Explain that program roles and broader builder pathways are not automatic employment or membership levels.
- Avoid gamification, XP, karma points, or moral-status framing.

---

# 6. FINAL ROUTES

Implement all of these canonical routes:

- `/`
- `/start`
- `/ecosystem`
- `/about`
- `/organizations`
- `/challenges`
- `/builders`
- `/ethical-work`
- `/liberation`
- `/liberation/how-it-works`
- `/work`
- `/partners`
- `/resources`
- `/contact`
- `/privacy`
- `/terms`
- `/accessibility`
- `/community-standards`
- `/report-a-concern`

Also preserve required legacy routes and redirects described above.

Add a custom accessible 404 page and a recoverable global error state.

Generate an actual sitemap file and robots configuration suitable for the environment. Do not block the preview environment incorrectly; production indexing should be configurable.

---

# 7. GLOBAL NAVIGATION

## Desktop header

Use:

- ECL logo/wordmark → `/`
- Our Ecosystem
- For Organizations
- For Builders
- Liberation Network
- Work & Partners
- Resources
- Start Here

`Start Here` is the primary button.

## Our Ecosystem dropdown

- Ecosystem Overview → `/ecosystem`
- Ethical Capacity Lab → `/about`
- DoGoodie → `/ecosystem#dogoodie`
- Liberation Network → `/liberation`
- Principles and Safeguards → `/ethical-work`

## Work & Partners dropdown

- Work and Case Studies → `/work`
- Partnerships and Resources → `/partners`

## Mobile navigation

- Same logical order as desktop
- Fully keyboard accessible
- Correct focus management
- Escape closes it
- Focus returns to trigger
- Start Here remains visible and prominent
- Do not overload primary navigation with Discord, Facebook, or every social channel

## Footer groups

### Ecosystem

- About & Governance
- Ecosystem Overview
- DoGoodie
- Liberation Network
- Team
- Contact

### Work With Us

- For Organizations
- For Builders
- Partnerships
- Submit a Challenge
- Start Here

### Trust & Governance

- Ethical Work
- Community Standards
- Privacy
- Terms
- Accessibility
- Report a Concern

### Resources

- Guides and Articles
- Opportunities
- Community Resources
- Frequently Asked Questions

No live page may be orphaned.

---

# 8. VISUAL AND BRAND SYSTEM

Use the approved architecture artifact as the primary visual reference.

## Overall personality

The site should feel:

- thoughtful;
- ethical;
- credible;
- human;
- calm;
- institutional but approachable;
- community-oriented;
- practical rather than performative.

It must not look like a generic AI-generated startup template.

Avoid:

- excessive gradients;
- glowing futuristic visuals;
- random abstract blobs;
- generic stock photography;
- fake dashboards;
- fake stats;
- oversized decorative quotation marks;
- dozens of identical cards;
- overuse of pill-shaped containers;
- visual clutter;
- tiny body text;
- motion that competes with comprehension.

## Core palette

Use these as design tokens, adjusting contrast only when necessary:

- Warm background: `#F6F1E7`
- Surface: `#FFFDF8`
- Primary text: `#2A2823`
- Secondary text: `#5B564A`
- Muted neutral: `#948C7B`
- Border: `#C9C2B0`

### ECL / parent

- Gold/ochre: `#A9762F`
- Soft gold: `#F5E9D3`
- Border gold: `#D8B876`

### DoGoodie

- Muted navy: `#33506B`
- Soft blue: `#E7EDF1`
- Border blue: `#9AB0BF`

### Liberation Network

- Forest green: `#4B5D3E`
- Soft green: `#E9ECE1`
- Border green: `#A3B291`

Use the existing DoGoodie brand colors and mascot inside DoGoodie-specific or Impact Hack content when appropriate, but do not let the old DoGoodie visual identity overpower the ECL parent website.

## Typography

Use a refined serif for major headings and a highly legible sans serif for body and interface text.

The architecture artifact uses Fraunces and Inter. Use these or close existing equivalents, preferably through the framework’s optimized font system or self-hosted packages.

## Layout

- Responsive from 320px upward
- Comfortable max-width around 1180–1280px
- Clear vertical rhythm
- Left-aligned body copy
- Short readable line lengths
- Obvious heading hierarchy
- Visible focus states
- Sticky header only if it remains unobtrusive
- Do not hide critical text inside hover-only interactions

## ECL logo

Create a simple, accessible text-based mark using “ECL” and “The Ethical Capacity Lab.”

Do not invent a complex icon that could be mistaken for an approved final trademark.

## Diagrams

Rebuild the ecosystem architecture and relevant journey flows as responsive HTML/CSS/SVG components with real text, not as unreadable screenshot images.

Provide:

- accessible text alternative;
- mobile stacked layout;
- meaningful headings;
- correct branch colors;
- explicit boundaries.

Use the detailed architecture HTML as source.

---

# 9. WORKING PUBLIC COPY

Use the following as the default public copy unless the repository contains a clearly superior approved equivalent.

## Home hero

Eyebrow:

> The Ethical Capacity Lab

Headline:

> Build the capacity behind meaningful work.

Supporting copy:

> The Ethical Capacity Lab connects ethical standards, practical delivery, and trusted relationships so organizations and people can reduce suffering more responsibly.

Primary CTA:

> Find your path

Secondary CTA:

> Explore the ecosystem

## Short ecosystem descriptions

### The Ethical Capacity Lab

> The institutional parent for shared governance, methodology, research standards, ethical safeguards, intellectual property stewardship, and strategic relationships.

### DoGoodie

> The practical arm for challenge discovery, capacity-building, builder coordination, research, systems, ethical automation, and carefully scoped project delivery.

### Liberation from Suffering Network

> A relationship-based network where values-aligned people can build trust gradually and explore advice, introductions, collaboration, professional resources, and voluntary mutual support.

## What remains separate

> DoGoodie services, builder pathways, paid work, confidential project access, Liberation Network participation, partnerships, and public learning are separate decisions. Participation in one area does not automatically create access or entitlement in another.

## Start Here choices

- I represent an organization
- I want to build or contribute
- I want to explore the Liberation Network
- I want to partner or provide a resource
- I am here to learn or I am not sure yet

Use one short sentence under each option.

## Current-stage statement

Use the approved current-stage meaning from Section 2.

## General no-guarantee statement

Adapt by page:

> Submitting interest or a request does not guarantee acceptance, work, payment, partnership, referrals, membership, confidential access, or any other outcome. A human reviewer will consider the information provided and identify the most appropriate available next step.

Do not show this as one intimidating legal wall. Place concise page-specific versions near relevant actions.

---

# 10. PAGE-BY-PAGE IMPLEMENTATION

Deliverables 4 and 5 contain the authoritative section list, purpose, audience, CTA, trust signals, missing content, and risks for every page.

Implement every section in the approved order unless the existing framework requires a small presentational adjustment. Do not silently omit a required section.

Below are additional implementation decisions.

## 10.1 Home `/`

Must allow a new visitor to understand the site within approximately two minutes.

Required implementation:

1. Hero
2. Choose Your Path
3. Ecosystem snapshot
4. How Value Moves
5. People and Support Systems Behind the Work
6. What We Currently Do
7. Work and Partnerships
8. Our Commitments
9. Final Start Here CTA

For “People and Support Systems Behind the Work,” include:

- organizers and project managers;
- builders and specialists;
- reviewers and safeguards;
- partners and resource providers;
- systems and documentation;
- relationships and community infrastructure;
- public learning and communication.

Use truthful empty states when evidence is not ready.

## 10.2 Start Here `/start`

This is the primary QR destination.

Use a low-friction audience-choice page, not a form.

Requirements:

- no sensitive fields;
- five audience options;
- short preview of the next page;
- no claim that choosing a path means approval;
- prominent learner/unsure route;
- contact fallback;
- printable/shareable QR code component or QR asset generator based on the configured canonical URL;
- accessible text link beside the QR.

## 10.3 Ecosystem Overview `/ecosystem`

Required sections:

- why the ecosystem exists;
- ECL;
- DoGoodie;
- Liberation Network;
- people and support systems;
- how value moves;
- how the parts support one another;
- what remains separate;
- current stage and limitations;
- how to engage.

Use the architecture artifact as a live component.

## 10.4 About & Governance `/about`

Explain:

- mission and background;
- ecosystem structure;
- team roles;
- governance and decision-making;
- methodology and research standards;
- intellectual property approach;
- conflicts and limitations;
- safeguarding and accountability;
- contact and escalation.

Use names and roles already approved in deliverables where public disclosure is appropriate:

- Skyler: vision and final direction
- Destine: product and operations
- John Mark: project owner and executor

Do not invent legal registration, board members, advisers, addresses, financial claims, or certifications.

If a biography is not provided, use role-only cards rather than fabricated biographies.

## 10.5 For Organizations `/organizations`

Reference actual DoGoodie capabilities from the existing site and repository.

Present current capability families:

- challenge discovery and clarification;
- research and documentation;
- lightweight websites and internal systems;
- workflow and automation support;
- content, design, and digital coordination;
- builder-supported pilots;
- proof-of-work experiments;
- capacity-building and scoped consultation.

Add visible “May be out of scope” examples:

- emergencies;
- clinical, legal, or regulated advice;
- invasive surveillance;
- deceptive campaigns;
- unsafe or illegal work;
- open-ended free labor;
- projects without a responsible owner;
- requests requiring sensitive credentials in the initial form.

### Give-first model

Use a limited model:

- one clearly defined problem;
- one fixed output;
- one responsible organization contact;
- one short timeline;
- one review checkpoint;
- explicit boundaries;
- feedback required;
- no automatic continuation.

Describe give-first work as selective and capacity-dependent, not a standing free-service entitlement.

### Consultation process

Use:

1. Submit challenge or request conversation
2. Initial review
3. Clarification if needed
4. Introductory conversation when suitable
5. Scope recommendation
6. Accept, refer, hold, decline, or propose a limited pilot
7. Written terms before productive work

## 10.6 Submit a Challenge `/challenges`

Create a native accessible form.

Fields:

- full name;
- email;
- organization name;
- role/title;
- organization website, optional;
- short problem title;
- problem description;
- who is affected;
- desired outcome;
- current tools or attempts, optional;
- urgency/timeline;
- budget range, optional and clearly explained;
- preferred next step: written response or introductory conversation;
- confirmation that no passwords, private keys, financial-account data, protected health information, legal case files, private political records, or other highly sensitive information are included;
- permission to contact;
- privacy consent.

Show a target initial-review time of 7 business days.

Do not collect attachments in the first version unless secure storage and retention are implemented.

## 10.7 For Builders `/builders`

Use the approved broad pathway:

- Emerging Builder
- Proven Builder
- Core Builder

Explain these as capability and trust pathways, not personal worth or permanent status.

Include:

- what builders do;
- who can participate;
- pathway definitions;
- paid trial and micro-project principles;
- proof of work;
- expectations and conduct;
- available opportunities;
- relationship to Liberation Network;
- expression of interest.

If no active paid opportunity exists, say so plainly. Do not fabricate job cards.

### Builder expression-of-interest form

Fields:

- name or professional name;
- email;
- country/timezone, optional;
- primary skills;
- supporting skills;
- short experience summary;
- portfolio or proof links;
- type of work of interest;
- preferred engagement: paid project, supervised pilot, learning contribution, research, design, technical, operations, other;
- realistic availability;
- accessibility or collaboration needs, optional;
- consent to review;
- acknowledgment that interest is not employment, guaranteed work, payment, confidential access, or Network membership.

Target review: 10 business days.

## 10.8 Ethical Work `/ethical-work`

This is a major trust page, not footer boilerplate.

Include:

- why this page exists;
- acknowledged power and labor risks;
- core principles;
- supervised collaboration pathway;
- responsibilities of DoGoodie;
- responsibilities of the organization;
- responsibilities of the builder;
- responsibilities of the project manager;
- project terms and closure;
- feedback, attribution, confidentiality, consent, and safe exit;
- concern and escalation route;
- what the model is not.

Every productive project must separately define:

- scope;
- output;
- timeline;
- compensation or explicit non-compensated educational nature;
- ownership;
- attribution;
- access and equipment;
- confidentiality;
- review points;
- acceptance criteria;
- feedback;
- closure;
- safe exit.

Do not make employment-law conclusions.

## 10.9 Liberation Network `/liberation`

Use invitational, plain language.

Required sections:

- vision;
- who it may serve;
- what participants may contribute;
- what participants may receive;
- how trust develops;
- participation layers;
- one-on-one conversations;
- collaboration and mutual-support pathways;
- relationship to DoGoodie;
- public educational layer;
- what the Network is not;
- express interest.

### Participation layers

Use:

1. Public learning
2. Expression of interest or trusted referral
3. Initial one-on-one conversation
4. Small voluntary next step
5. Trusted relationship or collaboration
6. Deeper participation when mutually appropriate

Do not call these ranks.

## 10.10 How It Works `/liberation/how-it-works`

Build an accessible journey component based on Deliverable 6.

Possible next steps after a conversation may include:

- a relevant public resource;
- no further step;
- a follow-up conversation;
- an introduction;
- a small learning action;
- a carefully scoped voluntary collaboration;
- a separate DoGoodie builder or project pathway when independently appropriate.

### Liberation interest/referral form

Fields:

- name or alias;
- email;
- how they found the Network;
- whether this is self-interest or a referral;
- referrer name/contact, optional and only with permission;
- what part of the vision interests them;
- what they may be able to contribute, optional;
- what they hope to learn or explore, optional;
- preferred next step;
- timezone, optional;
- consent and privacy acknowledgment;
- acknowledgment that the form is not a membership, work, income, referral, purchase, therapy, or material-support guarantee.

Do not ask applicants to disclose private political beliefs, diagnoses, trauma histories, income, religion, or intimate values in the public form.

Target review: 10 business days.

## 10.11 Work `/work`

Use real evidence only.

Initial content may include:

- The $5 Impact Hack as a current or recent DoGoodie program;
- the proof-over-promises methodology;
- approved public artifacts already in the repository;
- honest “work in progress” cards;
- an empty state for verified participant projects until consent and review exist.

Every case study must use:

- problem;
- context;
- approved scope;
- contributors, only with permission;
- output;
- result;
- evidence;
- limitations;
- what remains unproven;
- publication consent status;
- related path.

Do not create fictional organizations, testimonials, statistics, time saved, funds raised, or impact.

## 10.12 Partners `/partners`

Launch as a full page even if no public partner list exists.

Include partnership types:

- nonprofit or advocacy partner;
- ethical business;
- research partner;
- technical or infrastructure partner;
- professional-service resource;
- funder or material resource provider;
- community organization;
- project collaborator.

Use an honest empty state:

> We publish partner names and logos only with explicit permission. Partnership pathways are open even when no public listing is shown.

### Partnership inquiry form

Fields:

- name;
- email;
- organization;
- role;
- website, optional;
- partnership type;
- resource, service, project, introduction, or collaboration proposed;
- mutual value;
- timeline;
- existing relationship or referral, optional;
- permission status for public name/logo display: default “No public display permission”;
- consent and privacy acknowledgment.

Target initial review: 7 business days.

Do not list therapists, medical providers, lawyers, financial professionals, or other regulated professionals as endorsed resources without qualification and jurisdiction review.

## 10.13 Resources `/resources`

Create a useful initial library using approved material.

Include at least these internally authored resource modules or expandable guides:

1. How to scope a small impact experiment
2. What ethical collaboration requires
3. How to document proof of work honestly
4. How organizations can prepare a useful challenge
5. How builders can prepare an expression of interest
6. How to prepare for a bounded one-on-one conversation
7. Understanding the Ethical Capacity Lab ecosystem
8. Frequently asked questions

Each resource must display:

- title;
- short description;
- audience;
- author or responsible team;
- updated date;
- source basis;
- limitations;
- relevant next path.

Do not present health, legal, financial, or therapeutic guidance.

## 10.14 Contact `/contact`

Route visitors toward specialized forms first.

General form fields:

- name;
- email;
- topic;
- message;
- consent.

Show:

- 5-business-day target;
- sensitive-information warning;
- Report a Concern alternative;
- emergency disclaimer;
- no guarantee of services or response outcome.

## 10.15 Privacy `/privacy`

Write a plain-language policy that matches the actual implementation.

Do not claim certifications or compliance that have not been verified.

Include:

- site/operator scope;
- data collected by each form;
- purpose;
- processors actually used;
- storage;
- retention;
- security limitations;
- cookies and analytics;
- rights and contact;
- third-party links;
- children/minors;
- cross-border processing if applicable;
- policy updates.

Do not include a legal entity or address that was not provided.

## 10.16 Terms `/terms`

Create a readable draft aligned with actual functionality.

Include:

- scope;
- informational nature;
- no professional advice;
- submissions and communications;
- intellectual property;
- acceptable use;
- third-party services;
- no automatic relationship;
- no guarantees;
- changes;
- contact.

Do not invent governing law if not known. Use neutral “subject to applicable law” language and flag formal legal review in documentation.

## 10.17 Accessibility `/accessibility`

State a commitment and current measures, not an unsupported claim of full compliance.

Include:

- accessible navigation;
- keyboard support;
- contrast;
- semantic structure;
- form labeling and errors;
- reduced motion;
- alternative formats;
- known limitations;
- feedback process;
- last reviewed date.

## 10.18 Community Standards `/community-standards`

Use positive shared commitments and enforceable boundaries.

Include:

- respect and dignity;
- consent and boundaries;
- privacy and confidentiality;
- no harassment, discrimination, exploitation, retaliation, doxxing, scams, or deception;
- appropriate requests and solicitation;
- conflicts and safe exit;
- reporting;
- review and consequences;
- appeals or reconsideration;
- updates.

Do not make the standards a political or ideological loyalty test.

## 10.19 Report a Concern `/report-a-concern`

Create a separate secure form.

Fields:

- name, optional;
- email, optional unless follow-up requested;
- relationship to the ecosystem;
- concern category;
- description;
- people or project involved, optional;
- whether there is an immediate safety concern;
- desired follow-up, optional;
- consent;
- acknowledgment of confidentiality limits.

Show:

- not an emergency service;
- do not use for immediate danger;
- target acknowledgment and review times;
- no promise of anonymity unless the implementation truly supports it;
- confidentiality limits;
- non-retaliation statement;
- alternative contact.

Do not claim trained safeguarding staff unless documented.

---

# 11. FORMS, DATA, AND SERVER IMPLEMENTATION

## General form requirements

Every form must have:

- client and server validation;
- accessible labels;
- clear optional/required markers;
- inline errors;
- error summary;
- disabled and loading states;
- duplicate-submission protection;
- honeypot anti-spam;
- reasonable rate limiting or an adapter ready for it;
- safe server-side logging without sensitive body dumps;
- success confirmation with realistic next steps;
- privacy notice beside the submit action;
- no fake success state;
- no sensitive data in URL parameters;
- no secret keys exposed to the browser.

## Submission architecture

Use the repository’s existing secure backend if present.

If no submission backend exists:

1. Create a typed submission adapter interface.
2. Prefer a server-side provider and persistence design compatible with the deployed environment.
3. Include `.env.example`.
4. Keep service secrets server-only.
5. Provide a development adapter for local testing.
6. In production, when required environment variables are missing, show a clear “submission is temporarily unavailable” state and an alternate contact route. Never pretend the submission was received.
7. Document setup in `docs/forms-and-submissions.md`.

A good default, when no backend exists, is a server-only Supabase persistence adapter plus optional Resend email notification, but only implement this if it fits the existing stack. Include migrations and row-level-security guidance. Do not expose a public write table.

## Suggested submission types

Use a shared schema envelope with a distinct form type:

- `challenge`
- `builder_interest`
- `liberation_interest`
- `partnership_inquiry`
- `general_contact`
- `concern_report`

Store:

- generated id;
- type;
- created timestamp;
- status;
- minimum submitted fields;
- consent timestamp/version;
- source page;
- optional referral metadata;
- internal review metadata in a separate protected model.

Do not store private reviewer judgments in public content files.

## Retention

Create configurable retention notes rather than inventing a final legal schedule.

Document recommended review points:

- general inquiries and applications;
- declined/closed submissions;
- active project records;
- concern reports.

The public privacy policy must match the actual configuration.

---

# 12. CONTENT ARCHITECTURE

Use typed content/data files rather than duplicating text throughout components.

Create a maintainable structure similar to:

- `content/site.ts`
- `content/navigation.ts`
- `content/ecosystem.ts`
- `content/capabilities.ts`
- `content/builder-pathways.ts`
- `content/liberation.ts`
- `content/programs.ts`
- `content/work.ts`
- `content/resources.ts`
- `content/partners.ts`
- `content/policies.ts`
- `content/response-times.ts`

Adapt paths to the framework.

Benefits:

- one source of truth;
- easy content review;
- status updates without code duplication;
- future migration to a CMS;
- safer rendering of current versus future items.

Add content status fields when useful:

- `current`
- `pilot`
- `planned`
- `archived`
- `not_yet_active`

Never present a planned item as active.

---

# 13. SHARED COMPONENTS

Create reusable accessible components as appropriate:

- Header
- DesktopDropdown
- MobileNavigation
- Footer
- SkipLink
- Breadcrumbs
- PageHero
- SectionIntro
- AudiencePathCard
- EcosystemArchitecture
- ValueFlow
- SupportSystems
- ParticipationLayers
- JourneyFlow
- TrustNotice
- BoundaryNotice
- CurrentStageNotice
- CaseStudyCard
- ResourceCard
- ProgramStatus
- EmptyState
- FormField
- FormErrorSummary
- FormStatus
- PolicyLayout
- LastUpdated
- CTASection
- ExternalLink
- QRCodeCard
- NotFound
- ErrorBoundary

Do not abstract trivial one-off content into unreadable component factories.

---

# 14. SEO AND DISCOVERABILITY

Implement:

- unique title and description for every page;
- canonical URL support through environment configuration;
- Open Graph and social metadata;
- favicon and ECL text-mark assets;
- `sitemap.xml`;
- `robots.txt`;
- structured data where accurate;
- breadcrumb structure on deep pages;
- meaningful page headings;
- stable URLs;
- redirect map for legacy routes;
- no duplicate title tags;
- no invented address, founding date, employee count, or social profile.

Use an `Organization` or suitable schema only with fields actually known.

For the preview environment, prevent accidental public indexing when the hosting platform supports it. Do not block production by default.

---

# 15. ACCESSIBILITY

Target WCAG 2.2 AA practices, but do not publicly claim conformance until tested.

Required:

- semantic landmarks;
- one logical H1 per page;
- skip link;
- full keyboard navigation;
- visible focus;
- no keyboard traps;
- accessible dropdowns and mobile menu;
- form labels and descriptions;
- programmatic error association;
- error summary;
- contrast-safe colors;
- information not conveyed by color alone;
- reduced-motion support;
- appropriate ARIA only when native elements are insufficient;
- descriptive alt text;
- decorative images ignored by assistive technology;
- diagrams with text alternatives;
- tap targets;
- responsive zoom;
- no text baked into required images.

Run automated accessibility checks where supported and document manual checks.

---

# 16. SECURITY AND PRIVACY

Required:

- sanitize and validate all input server-side;
- escape rendered user content;
- no secret exposure;
- security headers appropriate to the framework;
- strict transport configuration where hosting controls permit;
- safe external-link handling;
- no open redirect;
- no arbitrary file upload;
- no passwords, API keys, account credentials, medical records, legal case files, or financial-account information through public forms;
- no user-generated public content;
- no private directory;
- no automated matching;
- no payment processing;
- no member accounts in this version;
- no third-party trackers by default;
- no analytics that contradict the privacy policy.

Do not add surveillance, session recording, fingerprinting, or invasive analytics.

---

# 17. PERFORMANCE

Requirements:

- production build succeeds;
- no unnecessary client-side JavaScript;
- server-render static content when supported;
- responsive optimized images;
- lazy-load below-fold media;
- avoid cumulative layout shift;
- font loading optimized;
- no render-blocking decorative libraries;
- no heavy animation framework unless already present and justified;
- sensible code splitting;
- page transitions optional and minimal;
- no giant architecture image when semantic HTML/SVG can be used.

Aim for strong Lighthouse results, but report actual results rather than claiming a score that was not measured.

---

# 18. ANALYTICS AND MEASUREMENT

Do not install a third-party analytics provider without existing approval or configuration.

Create a provider-agnostic, privacy-conscious event interface that is disabled by default.

Prepare these event names:

- `start_path_selected`
- `challenge_form_started`
- `challenge_form_submitted`
- `builder_interest_started`
- `builder_interest_submitted`
- `liberation_interest_started`
- `liberation_interest_submitted`
- `partner_inquiry_started`
- `partner_inquiry_submitted`
- `resource_opened`
- `case_study_opened`
- `concern_form_started`
- `concern_form_submitted`

Do not send form content, names, emails, or sensitive data as analytics properties.

Document how analytics may be enabled later.

---

# 19. TESTING

Use the repository’s existing test system.

Add or improve tests for:

## Route coverage

Every canonical route renders successfully.

## Navigation

- header links;
- dropdowns;
- mobile menu;
- footer;
- breadcrumbs;
- legacy redirects;
- no broken internal links.

## User journeys

Automate smoke tests for:

### Journey A

`/start` → organizations → ethical process → work examples → challenge/consultation

### Journey B

public content/work → builders → ethical work → opportunities → expression of interest

### Journey C

resources/public content → liberation → participation layers → interest/referral → one-on-one explanation → small next step

### Journey D

work → partners → standards → partnership inquiry

### Journey E

public content → resources → learn without pressure → optional deeper path

## Forms

- valid submission;
- required fields;
- invalid email;
- sensitive-information confirmation;
- server validation;
- unavailable-backend state;
- error state;
- duplicate prevention where implemented;
- consent checkbox;
- success message;
- no sensitive content in URL or logs.

## Accessibility

At minimum:

- automated axe checks on key pages if compatible;
- keyboard navigation smoke test;
- focus behavior for menus/dialogs;
- form error association;
- reduced motion.

## Quality commands

Run all applicable commands:

- install
- lint
- typecheck
- unit tests
- integration/e2e tests
- production build

Fix issues caused by the work.

Do not hide failing tests by deleting them or weakening assertions without a documented reason.

---

# 20. README AND PROJECT DOCUMENTATION

Update the README with:

- project purpose;
- architecture;
- framework and requirements;
- install and development commands;
- build and test commands;
- environment variables;
- form backend setup;
- content update locations;
- program-status update process;
- legacy redirects;
- deployment steps;
- preview versus production behavior;
- known limitations;
- legal/privacy review notes;
- accessibility testing notes.

Create:

- `AGENTS.md`
- `docs/implementation-plan.md`
- `docs/content-source-map.md`
- `docs/forms-and-submissions.md`
- `docs/deployment-checklist.md`
- `docs/qa-report.md`

The content source map should say which approved deliverable supports each route and major section.

---

# 21. IMPLEMENTATION WORKFLOW

Execute in this order:

1. Audit repository and source files
2. Preserve or back up relevant current content
3. Create concise implementation map
4. Establish design tokens and global layout
5. Build navigation and footer
6. Build typed content model
7. Build Home, Start Here, and Ecosystem Overview
8. Build About and trust architecture
9. Build DoGoodie organization and builder pathways
10. Build Ethical Work
11. Build Liberation pages
12. Build Work, Partners, and Resources
13. Build utility and policy pages
14. Build forms and backend adapters
15. Preserve or redirect legacy routes
16. Add metadata, sitemap, robots, and error pages
17. Add tests
18. Run lint, typecheck, tests, and production build
19. Fix issues
20. Perform a final route, mobile, accessibility, content, and claims audit
21. Produce a detailed completion report

Do not stop at step 3.

---

# 22. NON-NEGOTIABLE CLAIMS AND BOUNDARIES

Never claim:

- ECL is a certifier, regulator, auditor, employer of record, legal representative, or clinical provider;
- DoGoodie guarantees acceptance, delivery, employment, payment, funding, placement, or continued work;
- Liberation Network guarantees referrals, purchases, clients, income, material support, emotional support, membership, or deeper access;
- every builder belongs to Liberation Network;
- every Network participant works for DoGoodie;
- a listed professional or partner is endorsed without approved criteria and permission;
- the ecosystem has mature global scale, proven impact, or formal governance beyond available evidence;
- a conversation is therapy, crisis support, or professional advice;
- an inquiry creates a client, employment, partnership, fiduciary, or confidential relationship;
- a current or future system is operational when it is not.

Do not add:

- SaaS as a separate branch;
- member accounts;
- private directory;
- automated matching;
- payment platform;
- job marketplace;
- therapist marketplace;
- public ratings;
- karma or scoring;
- automated international outreach;
- invasive analytics;
- fake partners;
- fake testimonials;
- fake case studies;
- fake impact metrics;
- fake team biographies.

---

# 23. HONEST EMPTY STATES

When required content does not exist, do not use lorem ipsum or invented examples.

Use clear states such as:

- “Verified projects will appear after review and publication consent.”
- “No public opportunity is currently listed. You may still review the builder pathway and submit general interest.”
- “We publish partner names and logos only with explicit permission.”
- “This pathway is being tested through a small number of reviewed conversations.”
- “Submission is temporarily unavailable while the secure intake connection is configured.”

Empty states must still offer a useful next action.

---

# 24. FINAL ACCEPTANCE CRITERIA

The task is complete only when:

- all canonical routes exist;
- legacy routes are preserved or redirected;
- all primary navigation and footer relationships work;
- all five required user journeys can be followed;
- Home and Ecosystem show how value moves;
- the less visible support systems are represented;
- ECL, DoGoodie, and Liberation are distinct but interconnected;
- Start Here is QR-ready;
- forms are validated, honest, and safe;
- safeguards are near relevant actions;
- page-specific no-guarantee language is present;
- mobile layouts are polished;
- keyboard navigation works;
- production build passes;
- lint and type checks pass;
- tests pass or any external blocker is explicitly documented;
- no fake evidence, partners, opportunities, or claims appear;
- current and future activities are visually distinguishable;
- the live DoGoodie program content is preserved responsibly;
- the site is ready for human review as a deployable preview.

---

# 25. FINAL RESPONSE FORMAT

At completion, return:

1. **Executive summary**
2. **Framework and architecture used**
3. **Routes implemented**
4. **Legacy routes preserved or redirected**
5. **Forms implemented and backend status**
6. **Content migrated from the current DoGoodie site**
7. **Important product decisions made**
8. **Files created and changed**
9. **Commands run**
10. **Lint, typecheck, test, accessibility, and build results**
11. **Environment variables still required**
12. **Known limitations or items requiring real-world credentials/content**
13. **Preview instructions or preview URL if available**
14. **Manual review checklist for JM**
15. **Confirmation that production/DNS was not changed unless explicitly authorized**

Do not claim success without evidence from the actual command output.

Do not deploy to production, change DNS, delete the current site, or publish external communications unless explicit authorization exists in the active task environment. A preview deployment is appropriate when available and reversible.
