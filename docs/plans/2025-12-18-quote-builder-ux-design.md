# Quote Builder UX Design

**Date:** 2025-12-18
**Status:** Validated
**Goal:** Optimize quote builder for premium duct cleaning customers using research-backed UX patterns

---

## Research Foundation

This design is based on industry research showing:

- **Multi-step forms convert 86% higher** than single-page for complex services (HubSpot)
- **3 package tiers** is optimal; more options reduce acceptance by 27% (Harvard Business School)
- **Premium customers are validation-shopping**, not price-shopping—they want transparency and personalized guidance
- **1-2 decisions per step** prevents drop-off (ServiceTitan)

---

## Flow Overview

| Step | Name | Purpose |
|------|------|---------|
| 1 | Your Home | Collect home details to calculate base price |
| 2 | Choose Package | Select service tier with comparison |
| 3 | Add-Ons | Personalized recommendations + optional extras |
| 4 | Review & Submit | Summary, timeframe, contact info |

### Global Elements

- **Progress bar** at top: "Step 1 of 4" with step names
- **Live price** in sticky header, updates as selections change
- **Back button** on each step (except Step 1)
- **Brand styling**: Oswald headings, Source Sans body, orange/navy/cream palette

---

## Step 1: Your Home

**Heading:** "Tell Us About Your Home"

### Inputs

#### House Type (Visual Selector Cards)
3 cards, horizontal on desktop, stacked on mobile:

| Icon | Label | Default Vents |
|------|-------|---------------|
| Building | Apartment/Condo | 8 |
| Townhouse | Townhome/Duplex | 12 |
| House | Detached House | 15 |

Selecting a house type auto-sets smart default for vents (editable).

#### Number of Vents
Stepper control (−/+) with current value displayed.
- Min: 1, Max: 50
- Helper text: "10 included in base price, $X.XX per additional"

#### Number of Furnaces
Tappable cards (1, 2, 3) in horizontal row.
- Default: 1

#### Home Features
Toggle cards with icons (multi-select):
- High-efficiency furnace
- Central A/C
- HRV (Heat Recovery Ventilator)

Each has a small "?" tooltip explaining what it is.

**Button:** "Continue" (primary orange)

---

## Step 2: Choose Package

**Heading:** "Choose Your Package"

### Layout
3 cards side-by-side (desktop), stacked (mobile).

### Package Cards

| | Basic | Pro | Full Service |
|---|-------|-----|--------------|
| Badge | — | "Most Popular" | — |
| Header BG | Gray | Navy | Orange |
| Tagline | Routine Maintenance | Pets, Allergies & Renos | Complete Care |
| Price | $159.95 | $219.95 | $349.95 |
| Per extra vent | $9.95 | $13.95 | $14.95 |

### Card Content
Each card shows:
1. Package name + tagline
2. Base price (large) + "+ GST"
3. Per-vent pricing note
4. Feature checklist with checkmarks
5. Expandable "Learn more" section (collapsed by default)

### Visual Differentiation
- Pro card slightly elevated/scaled (1.02x) with orange border
- "Most Popular" badge in orange at top of Pro card
- Selected state: orange border + "Selected" indicator
- Features unique to higher tiers highlighted in bold

### Behavior
- Clicking card selects it
- Price in header updates based on selection + Step 1 inputs

**Buttons:** "← Back" (text link) | "Continue" (primary)

---

## Step 3: Add-Ons

**Heading:** "Enhance Your Service"

### Section A: Recommended For You
Shown only if relevant based on Step 1 inputs.

**Recommendation Logic:**
- Has pets/allergies context → Recommend Sanitizing
- Full Service selected → Note dryer vent (ground) included

**Card Design:**
```
┌─────────────────────────────────────────────┐
│ ⭐ RECOMMENDED FOR YOUR HOME                │
├─────────────────────────────────────────────┤
│ Duct Sanitizing                    +$79.95  │
│ Kills bacteria, mold & odors                │
│ [Learn more]                      [+ Add]   │
└─────────────────────────────────────────────┘
```

### Section B: Additional Services
Always visible, toggle cards.

**Dryer Vent Cleaning** (expandable selector):
- None (default)
- Ground Level — $59.95 (or "Included" if Full Service)
- 2nd Floor — $129.95
- Rooftop — $199.95

**Humidifier Service** — $69.95
- Toggle card with description: "Clean & inspect your humidifier"

Each has expandable "Learn more" section.

### Behavior
- Selected add-ons show checkmark + navy background
- Price in header updates live
- Can proceed without selecting any

**Buttons:** "← Back" | "Skip Add-Ons" (text) | "Continue" (primary)

---

## Step 4: Review & Submit

**Heading:** "Review Your Quote"

### Section A: Quote Summary
Card with itemized breakdown:

```
┌─────────────────────────────────────────────┐
│ YOUR QUOTE                                  │
├─────────────────────────────────────────────┤
│ Pro Package                        $219.95  │
│   └ 15 vents (5 extra × $13.95)    +$69.75  │
│   └ High-efficiency bypass          +$49.95  │
│ Duct Sanitizing                     +$79.95  │
│ Dryer Vent (Ground)                 +$59.95  │
├─────────────────────────────────────────────┤
│ Subtotal                           $479.55  │
│ GST (5%)                            $23.98  │
│ TOTAL                              $503.53  │
└─────────────────────────────────────────────┘
         [Edit selections]
```

"Edit selections" returns to Step 1 with all data preserved.

### Section B: Timeframe
**Heading:** "When works for you?"

Tappable cards (single select):
- ASAP — "Within 1-2 days"
- This Week — "Within 3-7 days"
- Next Week or Two — "1-2 weeks out"
- I'm Flexible — "Whenever works"

### Section C: Contact Info
**Heading:** "Your Information"

Form fields:
- Name (required)
- Phone (required)
- Email (required)
- Service Address (required)

Helper text: "We'll reach out to confirm your appointment"

### Section D: Submit
Trust reinforcement above button:
- "Video verification included"
- "No payment required today"
- "Price confirmed after inspection"

**Button:** "Submit Quote Request" (primary orange, full width)

**Back:** "← Back" (text link)

---

## Component Patterns

### Visual Selector Cards
- Large tap targets (min 48px height)
- Icon + label + optional description
- Selected state: orange border, slight scale (1.02x)
- Unselected state: gray border, hover shows orange border hint

### Toggle Cards
- Full-width on mobile
- Title + price on same row
- Optional description below
- Selected state: navy background, white text, checkmark

### Stepper Control
- −/+ buttons on either side of value
- Value displayed large and centered
- Helper text below showing pricing impact

### Expandable Sections
- "Learn more" link/button
- Expands inline (accordion pattern)
- Contains detailed description, may include images/video later
- Collapse button at bottom of expanded content

### Progress Bar
- 4 segments with step names
- Current step highlighted in orange
- Completed steps show checkmark
- Clickable to navigate back (not forward)

---

## Responsive Behavior

### Desktop (≥768px)
- Package cards: 3 columns side-by-side
- House type cards: 3 columns
- Form fields: 2 columns where appropriate
- Progress bar: horizontal with labels

### Mobile (<768px)
- Package cards: stacked vertically, swipeable optional
- House type cards: stacked vertically
- Form fields: single column
- Progress bar: compact with current step name only

---

## Data Flow

### State Management
All quote data stored in single state object:

```typescript
interface QuoteData {
  // Step 1
  houseType: 'apartment' | 'townhome' | 'detached';
  vents: number;
  furnaces: number;
  hasHighEfficiency: boolean;
  hasAC: boolean;
  hasHRV: boolean;

  // Step 2
  package: 'basic' | 'pro' | 'fullservice';

  // Step 3
  dryerVent: 'none' | 'ground' | 'second-floor' | 'rooftop';
  sanitizing: boolean;
  humidifierService: boolean;

  // Step 4
  timeframe: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}
```

### Price Calculation
Runs on every state change, displayed in sticky header.

---

## Success Metrics

Track after launch:
- Quote completion rate (% who reach Step 4)
- Drop-off by step (identify friction points)
- Package distribution (Basic/Pro/Full Service)
- Add-on attachment rate
- Time to complete quote

---

## Future Enhancements

Consider for V2:
- Exit-intent email capture ("Save this quote for later")
- Address autocomplete (Google Places API)
- Real-time availability display
- SMS option for contact preference
- A/B test package order (anchoring)
