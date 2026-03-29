# The Vent Men Website — CLAUDE.md

## Project Overview
The Vent Men is a furnace and duct cleaning company based in Calgary, AB. This is the company website — a Next.js marketing site with an interactive quote builder. The site competes on quality, transparency (video-verified cleaning), and honest pricing.

- **Domain:** theventmen.ca
- **Founders:** Dan Zentner (Co-Founder & Technical Lead, Siksika Nation member, 15yr HVAC) and Charlie Power (Co-Founder & Operations, ex-CFL Calgary Stampeders)
- **Service Area:** Calgary + Okotoks, Chestermere, Cochrane, High River, Black Diamond, Langdon
- **Differentiators:** Video verification, transparent pricing, indigenous-owned, no bait-and-switch

## Tech Stack
- Next.js 16.0.10 with App Router (NO Pages Router)
- React 19.2.1
- TypeScript 5 (strict mode)
- Tailwind CSS 4 with `@theme inline` in globals.css
- Zod 4 for validation
- Playwright for E2E testing
- Vercel for hosting

## Architecture Rules
- **Server Components by default.** Only add `"use client"` when you need useState, useEffect, onClick, or browser APIs.
- Server Actions go in `src/app/[route]/actions.ts` files.
- Every page MUST export `metadata` (type `Metadata` from `next`).
- Use `@/*` path alias (maps to `./src/*`).
- Fonts: Oswald (`--font-display`, headings) and Source Sans 3 (`--font-source-sans`, body). Both loaded via `next/font/google` in layout.tsx.
- All headings are uppercase via CSS (`text-transform: uppercase`, `letter-spacing: 0.02em`).
- No rounded corners on cards/buttons — brand style is sharp/angular (`border-radius: 0`).

## Brand Design System

### Colors
| Name | Hex | CSS Var | Tailwind Class | Usage |
|------|-----|---------|---------------|-------|
| Orange | #E8612C | --orange | text-orange / bg-orange | Primary CTA, accents |
| Orange Dark | #D55525 | --orange-dark | — | Hover states |
| Navy | #1E2A4A | --navy | text-navy / bg-navy | Headings, dark sections |
| Navy Light | #2A3A5A | --navy-light | — | Hover states |
| Cream | #F5F1EB | --cream | bg-cream | Page backgrounds |
| Cream Dark | #E8E2D9 | --cream-dark | bg-cream-dark | Borders, alt backgrounds |
| Charcoal | #3D3D3D | --charcoal | text-charcoal | Body text |
| White | #FFFFFF | --white | — | Cards, inputs |

### CSS Components
- `.btn` — base button (Oswald font, uppercase, no border-radius)
- `.btn-primary` — orange bg, white text
- `.btn-secondary` — navy bg, white text
- `.btn-outline` — navy border, transparent bg
- `.btn-outline-light` — cream border, transparent bg (for dark backgrounds)
- `.card` — white bg, cream-dark border, 2rem padding, no border-radius
- `.divider` — 80px wide, 4px tall, orange

### Page Layout Pattern
Every page follows this structure:
1. Navy hero section (`bg-navy`, white text, centered, H1 + subtitle + `.divider`)
2. Content sections alternating white / cream / cream-dark backgrounds
3. Navy CTA section at bottom with link to `/quote`
4. Max content width: `max-w-4xl` or `max-w-5xl` with `mx-auto`
5. Section padding: `py-16 px-6`

## Brand Voice
- Direct and confident, never salesy or corporate
- "We" not "our team." "You" not "the customer."
- Blue-collar professional: competent but approachable
- Key phrases: "video-verified," "transparent pricing," "no bait-and-switch," "proof, not promises"
- NEVER use: "state-of-the-art," "industry-leading," "synergy," "cutting-edge," "revolutionize," "passionate about ducts"
- Calgary-specific references when relevant (chinooks, neighborhoods, local context)

## Existing Pages (DO NOT rebuild)
| Route | Description | Key Feature |
|-------|-------------|-------------|
| `/` | Homepage (v2) | Scroll-reveal hero ("dirty water/dirty air"), credential bar, differentiators, before/after slider, social proof, retro footer |
| `/v1` | Old Homepage (backup) | Previous hero design with video placeholder, noindex |
| `/v2` | Redirect | Redirects to `/` |
| `/services` | Services & Pricing | Package comparison, add-ons, links to individual service pages |
| `/services/furnace-cleaning` | Furnace Cleaning | Answer-first content, Service + FAQPage schema |
| `/services/duct-cleaning` | Duct Cleaning | Answer-first content, Service + FAQPage schema |
| `/services/dryer-vent-cleaning` | Dryer Vent Cleaning | Answer-first content, Service + FAQPage schema |
| `/services/full-system-cleaning` | Full System Cleaning | Answer-first content, Service + FAQPage schema |
| `/about` | About Us | Team bios, values, indigenous ownership, Person schema, credentials section |
| `/faq` | FAQ | 19 questions (5 AI-targeted), FAQPage JSON-LD schema |
| `/service-area` | Service Areas | 7 communities listed, links to individual area pages |
| `/service-area/[city]` | Area Pages | Calgary, Okotoks, Chestermere, Cochrane, High River, Black Diamond, Langdon |
| `/contact` | Contact | Form + contact info |
| `/work` | Gallery | Before/after placeholder |
| `/quote` | Quote Builder | 5-step wizard with decoy pricing psychology |

## Quote Builder (5 Steps)
The quote builder at `/quote` is a 5-step wizard with decoy pricing (Deep Clean pre-selected, includes extras that Standard charges for):

1. **Step 1 - Home Type:** House type cards (detached/townhome/condo) with auto-advance
2. **Step 2 - Details:** Vent count stepper, furnace count (1-3)
3. **Step 3 - Features:** Toggle switches for AC, HRV, dryer vent location, humidifier, central vac. Pre-seeds `wants*` flags.
4. **Step 4 - Your Quote:** Toggle bar (Deep Clean/Standard with live prices), feature highlights, all add-ons with included/toggleable states, expandable price breakdown, trust signals
5. **Step 5 - Book:** Timeframe selection, contact form, sticky quote summary, submit via server action

Key pricing logic in `src/lib/utils/pricing.ts`:
- `calculatePriceForPackage(data, pkg)` — core engine, respects `wants*` flags and package-specific inclusions
- `calculateDecoySavings(data)` — computes value of Deep Clean inclusions vs Standard a la carte
- Deep Clean includes: sanitizing, HRV cleaning, main-floor dryer vent at no extra cost
- Selected package shows live price (updates with add-on toggles), unselected shows base price

## Pricing (from src/lib/constants/pricing.ts)
- **The Standard:** $199 base, $11.95/extra vent (10 included)
- **The Deep Clean:** $299 base, $13.95/extra vent (10 included) — RECOMMENDED, pre-selected
- **Add-ons:** AC surcharge $29.95, additional furnace $99.95, dryer vent $69.95-$199.99 (by location), sanitizing $79.95, HRV $59.95, humidifier $34.95, central vac $65.00

## Component Library (src/components/)
- **Layout:** Header (mobile menu), Footer
- **UI:** ProgressBar, Stepper, ToggleSwitch, ToggleCard, VisualSelector, ExpandableSection, TrustBadges
- **Quote:** QuoteBuilder (orchestrator), QuoteSummary, Step1Home, Step2HomeDetails, Step3HomeFeatures, Step4Quote, Step5Book
- **V2 Homepage:** HeroSetup, HeroPunchline, CredentialBar, DifferentiatorCards, BeforeAfterSlider, QuoteCTA, SocialProof, AboutMini, RetroFooter, StickyMobileCTA
- **SEO:** JsonLd (server component for Schema.org JSON-LD injection)
- **Services:** ServicePage (shared component for all 4 service pages)
- **Service Area:** AreaPage (shared component for all 7 area pages)
- **Hooks:** `useScrollReveal` (IntersectionObserver-based scroll reveal with reduced-motion support)

## AI Optimization (merged to master)
- **Schema.org JSON-LD:** HVACBusiness in root layout, Service + FAQPage on service pages, HVACBusiness on area pages, Person on about, WebPage on homepage
- **AI crawler access:** robots.txt allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, ChatGPT-User, cohere-ai
- **llms.txt:** AI-readable site guide at `public/llms.txt`
- **Answer-first content:** First 40-60 words on every service/area page directly answer likely AI queries
- **Constants:** `schema.ts` (business data source of truth), `content.ts` (service + area page content)
- **Change map:** `docs/change-map.md` tracks where every business data point is hardcoded vs centralized

## Tests (tests/*.spec.ts)
- `smoke.spec.ts` — basic page load tests for all routes
- `quote-builder.spec.ts` — 5-step navigation, pricing display, form interaction
- `v2-homepage.spec.ts` — hero sections, scroll reveal, credentials, slider, CTAs
- **Note:** Playwright is a devDependency. `playwright.config.ts` and `tests/` are excluded from tsconfig to avoid Vercel build failures.

## What's Missing (Agent Task Targets)
- Blog/content system
- Privacy Policy and Terms of Service pages
- Real customer reviews (currently placeholder)
- Real gallery content (currently placeholder)
- Backend integrations (Supabase, Resend, Twilio)
- Analytics integration
- Replace placeholder phone number (403) 555-1234 with real number
- Add real business address and postal code
- Claim directory profiles (Foursquare, Bing Places, BBB, HomeStars) and add to sameAs array

## File Conventions
- Pages: `src/app/[route]/page.tsx`
- Server actions: `src/app/[route]/actions.ts`
- Components: PascalCase (`QuoteBuilder.tsx`)
- Utils/libs: camelCase (`pricing.ts`)
- Constants: camelCase files, UPPER_SNAKE exports (`PACKAGES`, `ADDONS`)
- Tests: `tests/*.spec.ts`
- **When changing business data:** Consult `docs/change-map.md` for every file that needs updating
- **Business data sources of truth:** `src/lib/constants/schema.ts` (NAP, hours, areas, founders), `src/lib/constants/pricing.ts` (packages, add-ons), `src/lib/constants/content.ts` (service + area page content)

## Git Conventions
- Commit format: `feat(scope): description` / `fix(scope): description` / `docs: description`
- Always work on a feature branch, never commit directly to master
- Run `npm run build` before committing to verify no TypeScript errors
- Run `npx playwright test` before creating a PR

## Safety Rules for Autonomous Agents
- NEVER force push (`git push --force`)
- NEVER modify `.env` or `.env.local` files
- NEVER delete existing pages or components without explicit instruction
- NEVER change pricing constants without explicit approval
- NEVER remove metadata exports from pages
- NEVER modify `CLAUDE.md`, `ralph.sh`, or files in `/agents/` without human instruction
- Always create a feature branch: `agent/[phase]/[task-description]`
- Always run `npm run build` after changes — must pass before committing
- If build fails, fix it before moving to next task
- If stuck for more than 3 iterations on same issue, document blocker in `backlog/blockers.md` and move to next task

## Important: Auto-Commit Hooks
The `.claude/settings.local.json` has PostToolUse hooks that auto-commit every Edit and Write operation. When running agents, be aware that changes are automatically committed. For clean PRs, squash commits on the agent branch before merging.
