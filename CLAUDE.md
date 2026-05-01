# essere — Claude Agent Skills

## Project Overview

**essere** is a wellness/yoga studio web app called "The Elevated Sanctuary." It is a React 19 + TypeScript SPA powered by Vite, backed by a Directus headless CMS, and styled with a bespoke design system (CSS custom properties + inline styles). The package manager is **pnpm**.

## Tech Stack

| Tool         | Version             |
| ------------ | ------------------- |
| React        | 19                  |
| TypeScript   | 6                   |
| Vite         | 8                   |
| Directus SDK | 21                  |
| pnpm         | (lock file present) |

**No CSS framework** — styling is done with CSS custom properties (defined in `src/index.css`) and React inline styles that reference those variables.

## Architecture

```
src/
├── App.tsx                        ← Root component; wires pages together
├── main.tsx                       ← Entry point; mounts providers
├── index.css                      ← Global CSS variables (design tokens)
├── assets/                        ← Static images
├── components/                    ← Shared layout components (Navbar, etc.)
├── home/                          ← Home page feature
├── events/                        ← Events page feature
├── schedule/                      ← Schedule page feature
├── contact/                       ← Contact page feature
└── share/
    ├── config/                    ← App config (env vars)
    │   ├── core/config.ts
    │   ├── core/use-config.ts
    │   └── ui/{ConfigContext,ConfigProvider}.tsx
    └── directus/                  ← Directus CMS integration
        ├── core/directus.ts       ← Client factory + typed queries
        ├── core/nav-link.ts       ← NavLink type
        ├── core/home-page.ts      ← HomePage type
        ├── core/use-directus.ts   ← Hook: useDirectus()
        └── ui/{DirectusContext,DirectusProvider}.tsx
```

### Patterns to follow

- **Feature folder**: every page lives in its own folder (e.g. `src/home/`). Keep `core/` (types, data queries) separate from `ui/` (React components) inside each feature if the feature grows beyond one file.
- **Directus data**: add new collection types in `share/directus/core/` and expose them through the `Directus` factory and `useDirectus` hook. Never call the Directus SDK directly from a component.
- **Inline styles only** — do not introduce Tailwind, CSS modules, or styled-components. Use `var(--token-name)` CSS custom properties that mirror the design tokens defined in `index.css`.
- **No CSS borders for sectioning** — use background color transitions instead (design rule: "No-Line Rule").

---

## Design System: "The Elevated Sanctuary"

Reference designs live in `design/<page>/code.html` (full HTML mockups) and `design/<page>/DESIGN.md` (shared design philosophy).

### Color Tokens (`src/index.css` `:root`)

```css
--primary: #4c644b /* Deep Sage — focus/grounding */ --primary-dim: #405840
  /* Darker sage — hover states */ --secondary: #6a5d51 /* Warm Taupe — secondary text/depth */
  --background: #fafaf5 /* Warm Cream — page canvas */ --surface: #fafaf5
  --surface-container-lowest: #ffffff /* "Lit from within" cards */ --surface-container-low: #f3f4ee
  --surface-container: #ecefe7 --surface-container-high: #e5eae0
  --surface-container-highest: #dee4da --surface-bright: #fafaf5 --on-background: #2e342d
  --on-surface: #2e342d --on-surface-variant: #5b6159 --on-primary: #e5ffe0 --on-secondary: #fff7f4
  --primary-container: #ceeaca --on-primary-container: #40583f --secondary-container: #f2dfd0
  --outline-variant: #aeb4aa --outline: #767c74 --radius-xl: 1.5rem /* Large containers */
  --radius-md: 0.75rem /* Interactive elements */;
```

### Typography

- **Headlines / Display** → `font-family: 'Noto Serif', serif` — "Editorial Voice"
  - Letter-spacing: `-0.02em`
  - Use italic weight for emphasis / accents
- **Body / Labels** → `font-family: 'Manrope', sans-serif` — "Functional Voice"
- Fonts are imported via Google Fonts in `src/index.css`

### Key Design Rules

1. **No-Line Rule** — never use `1px solid border` for sectioning; separate sections by background-color changes.
2. **No pure black** — always use `var(--on-background)` (`#2e342d`) for text.
3. **No sharp corners** — minimum `var(--radius-md)` (0.75rem) on interactive elements, `var(--radius-xl)` (1.5rem) on containers.
4. **Glassmorphism nav** — `background: rgba(250,250,245,0.80); backdrop-filter: blur(20px)`.
5. **Gradient CTAs** — primary buttons use `linear-gradient(135deg, var(--primary), var(--primary-dim))`.
6. **Slow hover transitions** — `transition: all 300ms ease-out` to mimic mindful movement.
7. **Ambient shadows** — `box-shadow: 0px 12px 32px rgba(46, 52, 45, 0.06)` (sage-tinted, never black).
8. **Whitespace as luxury** — add 20% more whitespace than feels sufficient.

---

## Features (Pages)

Each page is an independent feature in its own `src/<page>/` folder. The reference HTML for each is in `design/<page>/code.html`.

---

### 1. Home (`src/home/`)

**Directus collection**: `home_page` (singleton)

**Existing type** (`share/directus/core/home-page.ts`):

```ts
type HomePage = {
  est_year: string
  hero_headline_line1: string
  hero_headline_line2: string
  hero_subheading: string
  hero_cta_primary_label: string
  hero_cta_secondary_label: string
  philosophy_section_label: string
  philosophy_card_1_icon: string
  philosophy_card_1_title: string
  philosophy_card_1_body: string
  philosophy_card_2_icon: string
  philosophy_card_2_title: string
  philosophy_card_2_body: string
}
```

**Sections** (top to bottom):

1. **Hero** — 12-column grid, text left (col 6), image right (col 6). Oversized serif headline (`clamp(3rem,6vw,5rem)`), italic accent in primary color, eyebrow label ("Est. 20XX"), two CTAs (primary pill button + text link with arrow icon). Decorative blurred circle behind the image.
2. **Philosophy** — `background: var(--surface-container)`. Two-column flex: title left ("Our Philosophy"), two icon cards right. No dividers; 24px gap between cards. Use Material Symbols icons for `spa` and `self_improvement`.
3. **Meet Instructor** — `background: var(--background)`. Full-bleed card (`surface-container-lowest`) with image left, bio right. Floating "Founder" label on the image. Stats grid (years, certification). Secondary button.
4. **Seasonal Workshops** — `background: var(--surface-container-low)`. 3-column asymmetric grid; middle card offset upward (`margin-top: -3rem`). Each card: image (md radius), date badge (glassmorphism), title, excerpt. Hover: image scale + title color shift to primary.
5. **Footer** — 3-column: brand/tagline, Connect links, Legal links.

---

### 2. Events (`src/events/`)

**Directus collection**: `events` (list) + possibly `featured_event` (singleton)

**Suggested type**:

```ts
type Event = {
  id: string
  title: string
  date_start: string
  date_end?: string
  category: 'Intensive' | 'Workshop' | 'Guest Event' | 'Retreat'
  description: string
  location?: string
  image?: string // Directus file ID
  featured: boolean
  booking_url?: string
}
```

**Sections** (top to bottom):

1. **Hero** — Two-column: editorial headline left ("Gatherings / for the Soul." — italic serif accent), hero image right (4:5 aspect ratio, xl radius, heavy shadow). Floating teaser card bottom-left over the image (glassmorphism, "Upcoming Signature Retreat").
2. **Events Bento Grid** — 12-column CSS Grid:
   - Large card (col 8): horizontal image + text; category badge (pill, `primary-container` bg); "Learn More" text link with arrow icon.
   - Small card (col 4): square image, event metadata, "Reserve Spot" pill button.
   - Small card (col 4): square image, "Learn More" primary pill button.
   - Wide feature card (col 8): full `var(--primary)` background with texture overlay, centered text, location + date pills (glassmorphism), inverted CTA button.
3. **Newsletter signup** — centered, max-width 4xl. Italic serif heading. Email input (pill, `surface-container-high` fill, no border, primary focus ring) + Subscribe button (secondary).
4. **Footer** — same 3-column structure as Home.

---

### 3. Schedule (`src/schedule/`)

**Directus collection**: `schedule_classes` (list)

**Suggested type**:

```ts
type ScheduleClass = {
  id: string
  title: string
  category: 'Yoga' | 'Pilates' | 'Meditation' | 'Workshop'
  instructor_name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  time: string // "07:00 AM"
  booking_url?: string // external booking link
}
```

**Sections** (top to bottom):

1. **Hero** — 12-column grid: editorial serif headline left ("A Rhythm / for Your Practice"), descriptive body copy, image right (4:5 aspect ratio, xl radius). Floating pull-quote card bottom-left.
2. **Filter + Date Navigation** — sticky controls row. Filter chips (pill buttons: All Sessions, Yoga, Pilates, Meditation) + week navigator (Prev/Next with chevron icons, current week range centered). Separated from grid by thin `border-bottom: 1px solid rgba(var(--outline-variant), 0.2)`.
3. **Weekly Grid** — 7-column CSS grid (Mon–Sun). Each day column: day name + date number header. Class cards alternate between `surface-container-lowest` and `surface-container-low` backgrounds (no dividers). Card layout: category label + time (top row), serif class title, instructor + level, Register button (hover: fill to primary). Workshop-type cards use a `primary-container` tint.
4. **Membership CTA** — rounded `surface-container` card (`border-radius: 1.5rem`), text left + studio image right. Primary pill button "Explore Memberships."
5. **Footer** — same 3-column structure.

---

### 4. Contact (`src/contact/`)

**Directus collection**: `studio_info` (singleton) + form submission (client-side only or Directus flow)

**Suggested type**:

```ts
type StudioInfo = {
  instructor_name: string
  instructor_bio_p1: string
  instructor_bio_p2: string
  instructor_photo?: string // Directus file ID
  stat_1_value: string // "12k+"
  stat_1_label: string // "Guided Souls"
  stat_2_value: string
  stat_2_label: string
  address_line1: string
  address_line2: string
  phone: string
  email: string
  map_image?: string // Directus file ID
}
```

**Sections** (top to bottom):

1. **About / Hero** — Two-column flex: image left (4:5 ratio, xl radius, decorative circle overlay top-left, floating pull-quote card bottom-right), bio right. Oversized serif name as heading. Two paragraphs of body copy. Stats row (two figures separated by a thin `outline-variant` divider).
2. **Contact Bento** — `background: var(--surface-container-low)`. 12-column grid:
   - Contact Form (col 7): `surface-container-lowest` card with shadow. Grid of Full Name + Email inputs (`surface-container-high` fill, rounded-md, no border, primary focus ring). Textarea. Primary pill submit button.
   - Sidebar (col 5): Studio Details card (`primary` background, `on-primary` text) with location, phone, email + Material Symbol icons. Map card (`surface-container-highest`, image with tint overlay, "Get Directions" bar bottom glassmorphism).
3. **Footer** — same 3-column structure.

---

## Shared Components

### Navbar (`src/components/Navbar.tsx`) — already implemented

- Glassmorphism fixed header
- Nav links from Directus `nav_links` collection
- Active page link: `border-bottom: 2px solid var(--primary)`, full opacity
- "Book Now" gradient pill button

### Footer

- Not yet extracted as a component; each page currently inlines it.
- Consider extracting to `src/components/Footer.tsx` if pages share the exact same markup.

---

## Directus CMS Schema (to create)

| Collection         | Type      | Used by            |
| ------------------ | --------- | ------------------ |
| `nav_links`        | list      | Navbar (all pages) |
| `home_page`        | singleton | Home               |
| `events`           | list      | Events             |
| `schedule_classes` | list      | Schedule           |
| `studio_info`      | singleton | Contact            |

---

## Adding a New Page — Checklist

1. Add the Directus type to `src/share/directus/core/<collection>.ts`
2. Add the query to `src/share/directus/core/directus.ts` (both the `Schema` type and the `Directus` factory)
3. Expose via `useDirectus` hook
4. Create the page component in `src/<page>/`
5. Wire the page into `src/App.tsx` routing
6. Reference `design/<page>/code.html` for the exact layout and `design/<page>/DESIGN.md` for design rules

---

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # TypeScript check + Vite build
pnpm lint       # ESLint
pnpm preview    # Preview production build
```
