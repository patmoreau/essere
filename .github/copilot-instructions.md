# essere — Copilot Instructions

## Project Overview

**essere** is a wellness/yoga studio web app called "The Elevated Sanctuary." It is a React 19 + TypeScript SPA powered by Vite, backed by a Directus headless CMS, and styled with a bespoke design system (CSS custom properties + inline styles). The package manager is **pnpm**.

## Tech Stack

| Tool | Version |
|------|---------|
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| Directus SDK | 21 |
| pnpm | (lock file present) |

**No CSS framework** — styling is done with CSS custom properties (defined in `src/index.css`) and React inline styles that reference those variables. Do not suggest Tailwind, CSS modules, or styled-components.

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

- **Feature folder**: every page lives in its own folder (e.g. `src/home/`). Keep `core/` (types, data queries) separate from `ui/` (React components) inside each feature if it grows beyond one file.
- **Directus data**: add new collection types in `share/directus/core/` and expose them through the `Directus` factory and `useDirectus` hook. Never call the Directus SDK directly from a component.
- **Inline styles only** — use `style={{ color: 'var(--token-name)' }}` React inline styles referencing CSS custom properties from `src/index.css`. No className-based styling.
- **No CSS borders for sectioning** — use background color transitions between sections ("No-Line Rule").

---

## Design System: "The Elevated Sanctuary"

Reference designs: `design/<page>/code.html` (full HTML mockups), `design/<page>/DESIGN.md` (design philosophy).

### Color Tokens (`src/index.css` `:root`)

```css
--primary:                  #4c644b   /* Deep Sage */
--primary-dim:              #405840   /* Hover states */
--secondary:                #6a5d51   /* Warm Taupe */
--background:               #fafaf5   /* Warm Cream */
--surface:                  #fafaf5
--surface-container-lowest: #ffffff
--surface-container-low:    #f3f4ee
--surface-container:        #ecefe7
--surface-container-high:   #e5eae0
--surface-container-highest:#dee4da
--on-background:            #2e342d
--on-surface:               #2e342d
--on-surface-variant:       #5b6159
--on-primary:               #e5ffe0
--on-secondary:             #fff7f4
--primary-container:        #ceeaca
--on-primary-container:     #40583f
--secondary-container:      #f2dfd0
--outline-variant:          #aeb4aa
--outline:                  #767c74
--radius-xl:                1.5rem
--radius-md:                0.75rem
```

### Typography

- **Headlines** → `font-family: 'Noto Serif', serif` with `letter-spacing: -0.02em`; use italic for accents
- **Body / Labels** → `font-family: 'Manrope', sans-serif`

### Key Design Rules

1. Never use `1px solid border` for sectioning — change background colors instead.
2. Never use pure black `#000000` — always `var(--on-background)`.
3. Minimum `var(--radius-md)` on buttons, `var(--radius-xl)` on containers. No 90° corners.
4. Nav glassmorphism: `background: rgba(250,250,245,0.80); backdrop-filter: blur(20px)`.
5. Primary buttons: `linear-gradient(135deg, var(--primary), var(--primary-dim))`.
6. All hover transitions: `transition: all 300ms ease-out`.
7. Shadows: `box-shadow: 0px 12px 32px rgba(46, 52, 45, 0.06)` — sage-tinted, never black.
8. Add more whitespace than feels necessary.

---

## Features (Pages)

### 1. Home (`src/home/`)

Directus singleton: `home_page`

Type (`share/directus/core/home-page.ts`):
```ts
type HomePage = {
  est_year: string
  hero_headline_line1: string
  hero_headline_line2: string
  hero_subheading: string
  hero_cta_primary_label: string
  hero_cta_secondary_label: string
  philosophy_section_label: string
  philosophy_card_1_icon: string; philosophy_card_1_title: string; philosophy_card_1_body: string
  philosophy_card_2_icon: string; philosophy_card_2_title: string; philosophy_card_2_body: string
}
```

Sections: Hero (12-col grid, serif headline, 2 CTAs) → Philosophy (surface-container bg, 2 icon cards) → Meet Instructor (surface-container-lowest card, image + bio + stats) → Seasonal Workshops (surface-container-low bg, 3-col asymmetric grid, middle card offset −3rem) → Footer.

### 2. Events (`src/events/`)

Directus list: `events`

```ts
type Event = {
  id: string; title: string; date_start: string; date_end?: string
  category: 'Intensive' | 'Workshop' | 'Guest Event' | 'Retreat'
  description: string; location?: string; image?: string
  featured: boolean; booking_url?: string
}
```

Sections: Hero (2-col, editorial headline + 4:5 image with floating teaser card) → Bento Grid (12-col: large card col-8, two small cards col-4, wide feature card col-8 with primary bg) → Newsletter signup → Footer.

### 3. Schedule (`src/schedule/`)

Directus list: `schedule_classes`

```ts
type ScheduleClass = {
  id: string; title: string
  category: 'Yoga' | 'Pilates' | 'Meditation' | 'Workshop'
  instructor_name: string; level: 'Beginner' | 'Intermediate' | 'Advanced'
  day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  time: string; booking_url?: string
}
```

Sections: Hero (12-col, serif headline + 4:5 image) → Filter chips + week navigator → 7-column weekly grid (class cards alternating surface-container-lowest / surface-container-low, no dividers) → Membership CTA card → Footer.

### 4. Contact (`src/contact/`)

Directus singleton: `studio_info`

```ts
type StudioInfo = {
  instructor_name: string; instructor_bio_p1: string; instructor_bio_p2: string
  instructor_photo?: string
  stat_1_value: string; stat_1_label: string; stat_2_value: string; stat_2_label: string
  address_line1: string; address_line2: string; phone: string; email: string
  map_image?: string
}
```

Sections: About/Hero (2-col flex: image with decorative circle + floating quote, bio + stats) → Contact Bento (surface-container-low bg, 12-col: form col-7 in surface-container-lowest card, sidebar col-5 with primary-bg details card + map card) → Footer.

---

## Directus CMS Schema

| Collection | Type | Used by |
|---|---|---|
| `nav_links` | list | Navbar |
| `home_page` | singleton | Home |
| `events` | list | Events |
| `schedule_classes` | list | Schedule |
| `studio_info` | singleton | Contact |

---

## Adding a New Page

1. Add type to `src/share/directus/core/<collection>.ts`
2. Add query to `src/share/directus/core/directus.ts` (Schema + factory)
3. Expose via `useDirectus` hook
4. Create component in `src/<page>/`
5. Wire into `src/App.tsx`
6. Reference `design/<page>/code.html` for layout

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # TypeScript check + Vite build
pnpm lint       # ESLint
pnpm preview    # Preview production build
```
