# Change Map: Where Business Data Lives

When any business fact changes, use this map to find every file that needs updating.
Files marked **AUTO** pull from a centralized constant -- they update automatically.
Files marked **MANUAL** have the data hardcoded and must be edited by hand.

---

## Phone Number

Currently: `(403) 555-1234` (PLACEHOLDER -- must replace before launch)

| File | Location | Type |
|------|----------|------|
| `src/lib/constants/schema.ts` | `BUSINESS.telephone` | **SOURCE** |
| `src/app/page.tsx` | Hero section, final CTA, mobile call bar (3 places) | MANUAL |
| `src/app/contact/page.tsx` | Contact info block | MANUAL |
| `public/llms.txt` | Business Details section | MANUAL |

**Future fix:** Import `BUSINESS.telephone` in page components instead of hardcoding.

---

## Email Address

Currently: `hello@theventmen.ca`

| File | Location | Type |
|------|----------|------|
| `src/lib/constants/schema.ts` | `BUSINESS.email` | **SOURCE** |
| `src/app/contact/page.tsx` | Contact info block | MANUAL |
| `src/components/layout/Footer.tsx` | Footer link | MANUAL |

---

## Pricing

Source of truth for numbers: `src/lib/constants/pricing.ts` (PACKAGES, ADDONS)

Pages that import from pricing.ts (auto-update):
- `src/app/page.tsx` -- pricing comparison section
- `src/app/quote/` -- quote builder steps

Pages/files with prices hardcoded in text (MANUAL update needed):

| File | What's hardcoded |
|------|-----------------|
| `src/app/page.tsx` | "from $159.95" in hero subtitle |
| `src/app/services/page.tsx` | Price strings in service link descriptions |
| `src/app/faq/page.tsx` | Prices in FAQ answers ($159.95, $219.95, $349.95, $99) |
| `src/lib/constants/content.ts` | Prices in ALL service FAQ answers and area FAQ answers |
| `src/components/service-area/AreaPage.tsx` | "From $159.95", "$349.95" in service cards |
| `public/llms.txt` | Pricing section (3 packages + per-vent prices) |

**If a price changes:** Update `pricing.ts` first, then search all files above for the old price string.

---

## Business Hours

Currently: Monday-Saturday 8am-6pm

| File | Location | Type |
|------|----------|------|
| `src/lib/constants/schema.ts` | `BUSINESS.hours` | **SOURCE** |
| `src/app/page.tsx` | Hero section, near phone number | MANUAL |
| `src/app/contact/page.tsx` | Contact info block | MANUAL |
| `public/llms.txt` | Business Details section | MANUAL |

---

## Service Areas

Currently: Calgary, Okotoks, Chestermere, Cochrane, High River, Black Diamond, Langdon

| File | Location | Type |
|------|----------|------|
| `src/lib/constants/schema.ts` | `SERVICE_AREAS` array | **SOURCE** |
| `src/lib/constants/content.ts` | `AREA_CONTENT` (one entry per area) | **SOURCE for area pages** |
| `src/app/contact/page.tsx` | Hardcoded service area tags | MANUAL |
| `public/llms.txt` | Service Areas section | MANUAL |

**If adding a new area:**
1. Add to `SERVICE_AREAS` in `schema.ts` (sitemap + schema auto-update)
2. Add to `AREA_CONTENT` in `content.ts` (page content)
3. Create `src/app/service-area/[new-slug]/page.tsx` (new route)
4. Update `contact/page.tsx` area tags
5. Update `public/llms.txt`

---

## Team / Founders

Currently: Dan Zentner (51%, Lead Tech) + Charlie Power (49%, Operations)

| File | Location | Type |
|------|----------|------|
| `src/lib/constants/schema.ts` | `FOUNDERS` array | **SOURCE** |
| `src/app/about/page.tsx` | Team section (separate hardcoded array) | MANUAL |
| `public/llms.txt` | "Indigenous-owned" mention | MANUAL |

**Future fix:** About page should import `FOUNDERS` instead of declaring its own array.

---

## Equipment

Currently: HyperVac H2 (vacuum), Ford Transit 350 (vehicle)

No centralized constant exists. All hardcoded.

| File | What mentions it |
|------|-----------------|
| `src/lib/constants/content.ts` | Service descriptions, process steps, equipment sections, FAQ answers (15+ mentions) |
| `src/app/faq/page.tsx` | FAQ answers (3+ mentions) |
| `src/app/about/page.tsx` | Credentials section |
| `src/app/page.tsx` | Hero subtitle |
| `public/llms.txt` | Multiple sections |

**If equipment changes:** Do a project-wide search for the old name and replace everywhere.

---

## FAQ Content

FAQs live in TWO places:

| File | What's there | Used by |
|------|-------------|---------|
| `src/app/faq/page.tsx` | 19 general FAQs (hardcoded array) | Main /faq page |
| `src/lib/constants/content.ts` | Service-specific FAQs (in SERVICE_CONTENT) | Individual service pages |
| `src/lib/constants/content.ts` | Area-specific FAQs (in AREA_CONTENT) | Individual area pages |

Some questions overlap (e.g., "How much does duct cleaning cost?"). If you change an answer in one place, check if it appears in the other.

---

## Directory Profiles (sameAs links)

When you create a listing on any platform, add the URL to:

| File | Location |
|------|----------|
| `src/lib/constants/schema.ts` | `BUSINESS.sameAs` array |

Platforms to add as claimed: Google Business Profile, Foursquare, Bing Places, BBB, HomeStars, Angi, Yelp, Apple Business Connect, Facebook, Instagram, LinkedIn, YouTube.

---

## Review Data (AggregateRating)

Once you have 10+ Google reviews:

| File | What to do |
|------|-----------|
| `src/lib/constants/schema.ts` | Use `buildAggregateRating(rating, count)` helper |
| `src/app/layout.tsx` | Add `aggregateRating` to the organization schema |

---

## Video Content (VideoObject)

Once before/after videos are hosted (Cloudinary or YouTube):

| File | What to do |
|------|-----------|
| `src/lib/constants/schema.ts` | Use `buildVideoSchema()` helper |
| Service pages / work page | Add `<JsonLd data={buildVideoSchema({...})} />` |

---

## Quick Reference: "I changed X, now what?"

| What Changed | Files to Update |
|-------------|----------------|
| **Phone number** | `schema.ts`, `page.tsx` (3 spots), `contact/page.tsx`, `llms.txt` |
| **Any price** | `pricing.ts`, then search for old price in: `content.ts`, `faq/page.tsx`, `page.tsx`, `services/page.tsx`, `AreaPage.tsx`, `llms.txt` |
| **Hours** | `schema.ts`, `page.tsx`, `contact/page.tsx`, `llms.txt` |
| **New service area** | `schema.ts`, `content.ts`, create new page, `contact/page.tsx`, `llms.txt` |
| **Equipment name** | Search entire project for old name -- it's everywhere |
| **FAQ answer** | Check both `faq/page.tsx` AND `content.ts` for duplicates |
| **Team member** | `schema.ts`, `about/page.tsx`, `llms.txt` |
| **New directory profile** | `schema.ts` sameAs array only |
| **Review count** | `schema.ts` (buildAggregateRating), `layout.tsx` |
