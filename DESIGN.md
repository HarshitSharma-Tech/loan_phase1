---
name: Loan Aasra
description: Your Dreams, Our Support. — Modern Indian Lending & Financial Advisory Design System
colors:
  primary: "#0052FF"
  primary-deep: "#003FB3"
  primary-soft: "#EFF6FF"
  accent: "#F59E0B"
  accent-dark: "#D97706"
  accent-soft: "#FEF3C7"
  navy-dark: "#0A1C3E"
  neutral-bg: "#FFFFFF"
  neutral-surface: "#F8FAFC"
  text-primary: "#0A1C3E"
  text-secondary: "#475569"
  border-subtle: "#E2E8F0"
typography:
  display:
    fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif"
    fontWeight: 800
    lineHeight: 1.15
  body:
    fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    fontWeight: 400
    lineHeight: 1.62
  hindi:
    fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif"
    lineHeight: 1.6
  punjabi:
    fontFamily: "'Mukta Mahee', 'Noto Sans Gurmukhi', sans-serif"
    lineHeight: 1.65
  luxury:
    fontFamily: "'Syne', 'Outfit', sans-serif"
    fontWeight: 700
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "26px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  card:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.xl}"
    padding: "32px"
---

# Design System: Loan Aasra

## Overview

**Creative North Star: "The Empowered Vault & Pillar of Support"**

Loan Aasra combines the reassuring authority of tier-one institutional banking with the tactile fluidity and transparency of modern consumer fintech. Clean porcelain surfaces give immediate prominence to high-contrast typography and interactive financial calculators. Visual clutter and predatory marketing badges are strictly rejected in favor of generous whitespace, precise data tables, and dynamic visual clarity.

**Key Characteristics:**
- Deep Navy and Radiant Amber-Gold hierarchy that mirrors the official Loan Aasra insignia (growth chart + supportive hands).
- Tactile real-time interactive calculators that provide instant visual feedback.
- Generous vertical rhythm and clean layered card elevations without harsh artificial stripes.
- Fluid Indian financial terminology across English, Hindi, and Punjabi (Lakhs, Crores, RBI repo rate, Sec 24/80C tax rebates).

## Colors

The Loan Aasra palette pairs an authoritative Deep Navy (`#0A1C3E` / `#0A2540`) and energetic Cobalt (`#0052FF`) with radiant Golden-Yellow accents (`#F59E0B` / `#DCA035`).

### Primary
- **Electric Cobalt** (`#0052FF`): Primary interactive brand color used for action buttons, slider progress tracks, and primary links.
- **Deep Cobalt** (`#003FB3`): Active and hover state for primary interactive elements.
- **Cobalt Mist** (`#EFF6FF`): Background tint for informative callouts and active tab pills.

### Accent
- **Amber Gold** (`#F59E0B`): Used for value badges, rating stars, and key economic callouts.
- **Amber Glow** (`#FEF3C7`): Soft background tint for promotional tags and trust chips.

### Neutral
- **Deep Navy** (`#0A1C3E`): Main heading color, footer background, and deep contrast anchor.
- **Slate Text** (`#475569`): Readable body text and descriptive subtitles.
- **Porcelain Surface** (`#F8FAFC`): Background canvas for alternating sections and table strips.
- **Crisp Border** (`#E2E8F0`): Clean 1px structural container and divider borders.

### Named Rules
**The Rarity of Gold Rule.** Amber Gold (`#F59E0B`) is strictly an accent; it occupies less than 5% of any screen viewport to highlight critical financial milestones and value tags.

## Typography

**Display Font:** `Outfit` (fallback: `-apple-system, sans-serif`)  
**Body Font:** `Plus Jakarta Sans` (fallback: `-apple-system, sans-serif`)  
**Luxury Accent:** `Syne` (used for signature brand headings)

### Hierarchy
- **Display** (800 weight, 3.4rem, 1.15 line-height): Hero headline and primary value proposition.
- **Headline** (700 weight, 2.4rem, 1.25 line-height): Section titles.
- **Title** (700 weight, 1.35rem, 1.35 line-height): Card headers and calculator summaries.
- **Body** (400 weight, 1rem, 1.62 line-height, max-width 70ch): Descriptive copy and educational content.
- **Label** (800 weight, 0.72rem, letter-spacing 0.08em, uppercase): Category chips, pill badges, and table headers.

### Named Rules
**The Tabular Data Rule.** All financial amounts, EMI outputs, percentages, and interest rates must use `font-variant-numeric: tabular-nums` to eliminate layout jitter during interactive slider dragging.

## Layout

- **Container Max-Width**: `1240px` with responsive horizontal gutters (`24px` on desktop, `16px` on mobile).
- **Section Spacing**: Generous `96px` vertical padding between sections on desktop, collapsing smoothly to `56px` on mobile.
- **Grid Layout**: 12-column flexible grid with `30px` gutters; cards adjust from 3-up on desktop to 2-up on tablet and 1-up on mobile.

## Elevation & Depth

Surfaces rely on ambient multi-layer box shadows rather than harsh zero-blur borders.

### Shadow Vocabulary
- **Card Rest** (`box-shadow: 0 10px 30px -10px rgba(8, 40, 95, 0.08)`): Subtle grounding shadow for cards at rest.
- **Card Hover** (`box-shadow: 0 24px 54px -12px rgba(8, 40, 95, 0.16)`): Lifted interactive elevation accompanied by a `-4px` vertical transform.
- **Hero Calculator** (`box-shadow: 0 28px 64px -12px rgba(8, 40, 95, 0.16)`): Prominent foreground elevation anchoring the page.

## Shapes

- **Card Radius**: `24px` to `26px` for major cards and calculator panels.
- **Input & Pill Radius**: `12px` for form inputs; `9999px` (full pill) for buttons and amount presets.
- **Hairline Framing**: 1px subtle borders (`#E2E8F0` or `rgba(0, 82, 255, 0.12)`) maintain structural clarity across light surfaces.

## Components

### Buttons
- **Primary**: Full pill radius (`9999px`), Electric Cobalt background (`#0052FF`), white text, `14px 28px` padding, smooth active scale (`scale(0.98)`).
- **Secondary**: Pill radius, transparent background with 1.5px border or soft porcelain fill, subtle hover lift.

### Sliders
- Custom range thumb with `#0052FF` fill and subtle drop shadow; active track displays dynamic gradient fill.

### Cards
- White background with `24px` rounded corners, subtle 1px border framing, and smooth hover elevation. Artificial left-side or top block stripes are strictly forbidden.

## Do's and Don'ts

### Do:
- **Do** format all currency in Indian Lakhs/Crores notation with `₹` symbol.
- **Do** provide instant interactive calculation before asking users to apply.
- **Do** maintain high contrast (minimum 4.5:1) for all readable text.
- **Do** use `font-variant-numeric: tabular-nums` for numerical data displays.

### Don't:
- **Don't** add artificial colored 4px block stripes to cards or containers.
- **Don't** use amber gold for body text on white backgrounds.
- **Don't** obscure true annualized percentage rates (APR) or bury fee terms.
