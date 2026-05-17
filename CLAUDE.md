# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**essere** is a pilates/yoga studio web app called "Fusion pilates yoga." It is a React 19 + TypeScript SPA powered by Vite, backed by a Directus headless CMS, and styled with MUI (Material UI) themed to a bespoke design system. The codebase follows **Clean Code** principles. The package manager is **pnpm**.

## Language Rules

- **Website content** (UI text, labels, copy, CMS data) → **French**
- **Development code** (variable names, function names, comments, type names, file names) → **English**

## Tech Stack

| Tool         | Version             |
| ------------ | ------------------- |
| React        | 19                  |
| TypeScript   | 6                   |
| Vite         | 8                   |
| MUI          | 6                   |
| Directus SDK | 21                  |
| pnpm         | (lock file present) |

**MUI with a custom theme** — all styling goes through the MUI theme (`src/theme.ts`). Do not use raw CSS files, inline styles, or CSS modules.

## Architecture

```
src/
├── App.tsx                        ← Root component; routes + shared layout
├── main.tsx                       ← Entry point; mounts providers
├── index.css                      ← Global CSS variables (design tokens)
├── assets/                        ← Static images
├── home/                          ← Home page feature
│   ├── core/                      ← home-page.ts, use-home-page.ts
│   └── ui/                        ← HomePage, PhilosophySection, PhilosophyCard
├── events/                        ← Events page feature
│   ├── core/                      ← event.ts, events-page.ts, use-events.ts, use-events-page.ts, format-event-date.ts
│   └── ui/                        ← EventsPage, EventsBentoGrid, EventCard*, EventTeaserCard, EventsNewsletterSection
├── schedule/                      ← Schedule page feature
│   ├── core/                      ← schedule-class.ts, classes-page.ts, use-schedule-classes.ts, use-classes-page.ts, schedule-utils.ts
│   └── ui/                        ← SchedulePage, ScheduleFilterBar, ScheduleWeekGrid, ScheduleDayColumn, ScheduleClassCard, SchedulePullQuote, ScheduleMembershipCta
├── contact/                       ← Contact page feature
│   └── ui/ContactPage.tsx
└── shared/
    ├── config/                    ← App config (env vars)
    │   ├── core/{config.ts, use-config.ts}
    │   └── ui/{ConfigContext, ConfigProvider}.tsx
    ├── directus/                  ← Directus CMS integration
    │   ├── core/directus.ts       ← Client factory + all typed queries
    │   ├── core/*-schema.ts       ← One schema file per collection
    │   ├── core/use-directus.ts
    │   └── ui/{DirectusContext, DirectusProvider}.tsx
    ├── labels/
    │   └── core/use-labels.ts     ← useLabels() hook
    ├── navbar/
    │   ├── core/{nav-link.ts, use-nav-links.ts}
    │   └── ui/Navbar.tsx
    └── ui/
        ├── Hero.tsx               ← Shared hero component (all pages)
        ├── Footer.tsx             ← Shared footer component (all pages)
        ├── DynamicMuiIcon.tsx     ← Registry-based MUI icon renderer
        └── LoadingFallback.tsx
```

### Routes

| Path          | Component       |
| ------------- | --------------- |
| `/accueil`    | `HomePage`      |
| `/evenements` | `EventsPage`    |
| `/cours`      | `SchedulePage`  |
| `/contact`    | `ContactPage`   |

### Patterns to follow

- **Clean Code** — small, single-responsibility functions and components; meaningful names; no dead code.
- **Feature folder**: every page lives in its own folder (e.g. `src/home/`). Keep `core/` (types, data) separate from `ui/` (components).
- **Directus data**: add new collection types in `shared/directus/core/` and expose them through the `Directus` factory. Never call the Directus SDK directly from a component.
- **One hook per collection**: follow the pattern in `use-labels.ts` — call `useDirectus()`, cache the promise in a `WeakMap<Directus, Promise<T>>`, return `use(promise)` (React 19 Suspense).
- **Schema files**: one `*-schema.ts` per Directus collection. Export a type (`FooSchema`) and a namespace with the converter (`FooSchema.toFoo`). The factory in `directus.ts` calls `resolveAssetUrl()` on any image file IDs before passing to the converter.
- **MUI + theme only** — use MUI components (`Box`, `Typography`, `Button`, `Stack`, …) and `sx` props with CSS variable tokens. No raw CSS, inline styles, CSS modules, Tailwind, or styled-components.
- **No CSS borders for sectioning** — use background color transitions (design rule: "No-Line Rule").
- **External links** — always use `component="a"` + `target="_blank"` + `rel="noopener noreferrer"` on MUI `Button` for external URLs.

---

## Design System: "The Elevated Sanctuary"

Reference designs live in `design/<page>/code.html` (full HTML/CSS mockups) and `design/<page>/DESIGN.md`. Use them as source of truth for layout, spacing, colors, and typography. **Translate intent into MUI + theme tokens — do not copy HTML/CSS directly.**

### Color Tokens (`src/index.css` `:root`)

```css
--primary: #4c644b                  /* Deep Sage */
--primary-dim: #405840              /* Hover states */
--secondary: #6a5d51                /* Warm Taupe */
--background: #fafaf5               /* Warm Cream */
--surface-container-lowest: #ffffff
--surface-container-low: #f3f4ee
--surface-container: #ecefe7
--surface-container-high: #e5eae0
--surface-container-highest: #dee4da
--on-background: #2e342d
--on-surface: #2e342d
--on-surface-variant: #5b6159
--on-primary: #e5ffe0
--primary-container: #ceeaca
--on-primary-container: #40583f
--secondary-container: #f2dfd0
--outline-variant: #aeb4aa
--outline: #767c74
--radius-xl: 1.5rem
--radius-md: 0.75rem
```

### Typography

- **Headlines / Display** → `'Noto Serif', serif` — letter-spacing `-0.02em`; use italic for accents
- **Body / Labels** → `'Manrope', sans-serif`

### Key Design Rules

1. **No-Line Rule** — never use `1px solid border` for sectioning; use background-color changes.
2. **No pure black** — always use `var(--on-background)` / `var(--on-surface)` for text.
3. **No sharp corners** — minimum `var(--radius-md)` on interactive elements, `var(--radius-xl)` on containers.
4. **Glassmorphism** — `background: rgba(250,250,245,0.80); backdrop-filter: blur(20px)`.
5. **Gradient CTAs** — `linear-gradient(135deg, var(--primary), var(--primary-dim))`.
6. **Slow hover transitions** — `transition: all 300ms ease-out`.
7. **Ambient shadows** — `box-shadow: 0px 12px 32px rgba(46, 52, 45, 0.06)`.
8. **Whitespace as luxury** — add 20% more whitespace than feels sufficient.

---

## Features (Pages)

Each page is an independent feature in its own `src/<page>/` folder. Reference HTML lives in `design/<page>/code.html`.

---

### 1. Home (`src/home/`)

**Directus collections**: `home_page` (singleton)

**Domain type** (`home/core/home-page.ts`):

```ts
type HomePage = {
  estYear: string
  heroImage: string          // pre-resolved asset URL
  heroImageText: string
  heroHeadline: string
  heroHeadlineAccent: string
  heroSubheading: string
  heroCtaPrimaryLabel: string
  heroCtaSecondaryLabel: string
  philosophySectionLabel: string
  philosophyCard1Icon: string  // MUI icon name (e.g. "Spa", "SelfImprovement")
  philosophyCard1Title: string
  philosophyCard1Body: string
  philosophyCard2Icon: string
  philosophyCard2Title: string
  philosophyCard2Body: string
}
```

**Sections** (top to bottom):

1. **Hero** — 2-col grid: oversized serif headline + italic accent, eyebrow label, two CTAs (gradient pill button + text arrow link), hero image right (4:5 ratio).
2. **Philosophy** — `var(--surface-container)` bg. Flex row: title left (1/3), two icon cards right (2/3). `DynamicMuiIcon` renders icon by name string.
3. **Meet Instructor** — `var(--background)` bg. *(not yet implemented)*
4. **Seasonal Workshops** — `var(--surface-container-low)` bg. *(not yet implemented)*
5. **Footer** — shared `<Footer />` component.

---

### 2. Events (`src/events/`)

**Directus collections**: `events_page` (singleton), `events` (list)

**Domain type** (`events/core/events-page.ts`):

```ts
type EventsPage = {
  heroEyebrow: string
  heroHeadline: string
  heroHeadlineAccent: string
  heroSubheading: string
  eventFeaturedHeadline: string
}
```

**Domain type** (`events/core/event.ts`):

```ts
type Event = {
  id: string
  title: string
  dateStart: string
  dateEnd?: string
  category: 'Intensive' | 'Workshop' | 'Guest Event' | 'Retreat'
  description: string
  location?: string
  imageUrl: string       // pre-resolved asset URL
  featured: boolean
  bookingUrl?: string
}
```

**Sections** (top to bottom):

1. **Hero** — shared `<Hero>` with `EventTeaserCard` floating card (glassmorphism, shows the `featured: true` event).
2. **Events Bento Grid** — 12-col CSS grid. Featured event → `EventCardFeature` (full width). Others alternate `EventCardLarge` (span 8) / `EventCardSmall` (span 4) via `isLargeCard(index)`.
3. **Newsletter signup** — centered email input + subscribe button.
4. **Footer** — shared `<Footer />`.

---

### 3. Schedule (`src/schedule/`)

**Directus collections**: `classes_page` (singleton), `classes` (list)

**Domain type** (`schedule/core/classes-page.ts`):

```ts
type ClassesPage = {
  heroEyebrow: string
  heroImage: string          // pre-resolved asset URL
  heroHeadline: string
  heroHeadlineAccent: string
  heroSubheading: string
  classesFeaturedHeadline: string
}
```

**Domain type** (`schedule/core/schedule-class.ts`):

```ts
type ScheduleClass = {
  id: string
  title: string
  category: 'Yoga' | 'Pilates' | 'Meditation'
  instructorName: string
  startDate: string   // "2024-04-20" — first occurrence; day-of-week is derived from this
  endDate: string     // "2024-04-27" — last occurrence
  startTime: string   // "HH:MM" (seconds stripped in converter)
  endTime: string     // "HH:MM"
  bookingUrl?: string
}
```

**Directus schema** (`schedule-class-schema.ts`): `category` is lowercase (`'yoga'|'pilates'|'meditation'`); `class_title` maps to `title`.

**Schedule logic** (`schedule/core/schedule-utils.ts`):
- `getDayOfWeek(dateStr)` — derives `DayOfWeek` from `startDate` using local-time parsing.
- `isActiveInWeek(cls, weekStart)` — checks if `[startDate, endDate]` overlaps the displayed week.
- Week grid filters by `isActiveInWeek`, then groups by `getDayOfWeek(startDate)`.

**Sections** (top to bottom):

1. **Hero** — shared `<Hero>` with `SchedulePullQuote` floating card (shows `classesFeaturedHeadline`).
2. **Filter bar** — sticky; 4 chips (Toutes, Yoga, Pilates, Méditation) + week Prev/Next navigator.
3. **Weekly Grid** — 7-col grid (Mon–Sun), `minWidth: 980px` + `overflowX: auto` for mobile. Cards tinted by category: Yoga = sage (`rgba(206,234,202,0.35)`), Pilates = taupe (`rgba(242,223,208,0.55)`), Meditation = neutral (`rgba(98,95,83,0.07)`).
4. **Membership CTA** — gradient headline + subscribe button.
5. **Footer** — shared `<Footer />`.

---

### 4. Contact (`src/contact/`)

**Directus collection**: `studio_info` (singleton) — *not yet implemented*

**Suggested type**:

```ts
type StudioInfo = {
  instructorName: string
  instructorBioP1: string
  instructorBioP2: string
  instructorPhoto?: string   // pre-resolved asset URL
  stat1Value: string
  stat1Label: string
  stat2Value: string
  stat2Label: string
  addressLine1: string
  addressLine2: string
  phone: string
  email: string
  mapImage?: string          // pre-resolved asset URL
  instagramUrl?: string
  facebookUrl?: string
}
```

---

## Shared Components

### `Hero` (`src/shared/ui/Hero.tsx`)

Used by all pages. Props:

```ts
type HeroProps = {
  eyebrow?: string
  headline: string
  headlineAccent?: string     // rendered italic in primary color
  subheading: string
  imageUrl: string
  imageAlt?: string
  actions?: ReactNode         // CTA buttons
  floatingCard?: ReactNode    // absolutely positioned over image column
  fullViewport?: boolean
}
```

### `Footer` (`src/shared/ui/Footer.tsx`)

Shared footer rendered in `App.tsx`. Uses `useLabels()` for link text. Three columns: brand/tagline, Connect links, Legal links.

### `DynamicMuiIcon` (`src/shared/ui/DynamicMuiIcon.tsx`)

Renders a MUI icon by name string. Uses an explicit curated registry of ~20 wellness icons to avoid bundle bloat. Supports both PascalCase (`"SelfImprovement"`) and snake_case (`"self_improvement"`) via `toPascalCase` fallback. To add an icon: import it explicitly and add to `REGISTRY`.

### `Navbar` (`src/shared/navbar/ui/Navbar.tsx`)

Glassmorphism fixed header. Nav links from `nav_links` collection. Responsive: hamburger + MUI `Drawer` on mobile. Active link: `border-bottom: 2px solid var(--primary)`. "Réserver" gradient pill CTA.

---

## Directus CMS Collections

| Collection    | Type      | Used by          |
| ------------- | --------- | ---------------- |
| `labels`      | list      | All pages        |
| `nav_links`   | list      | Navbar           |
| `home_page`   | singleton | Home             |
| `events_page` | singleton | Events           |
| `events`      | list      | Events           |
| `classes_page`| singleton | Schedule         |
| `classes`     | list      | Schedule         |
| `studio_info` | singleton | Contact          |

---

## Adding a New Page — Checklist

1. Create domain type in `src/<page>/core/<type>.ts`
2. Create schema + converter in `src/shared/directus/core/<collection>-schema.ts`
3. Add collection to `Schema` type and factory method in `src/shared/directus/core/directus.ts`
4. Create hook in `src/<page>/core/use-<collection>.ts` (WeakMap + `use()` pattern)
5. Build UI components in `src/<page>/ui/`
6. Wire route in `src/App.tsx`
7. Reference `design/<page>/code.html` for layout and `design/<page>/DESIGN.md` for design rules

---

## Commands

```bash
pnpm dev           # Start dev server
pnpm build         # TypeScript check + Vite build
pnpm lint          # ESLint
pnpm preview       # Preview production build
pnpm run deploy    # Build and push Docker image — use this when asked to deploy
```
