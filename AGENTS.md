# essere — Agent Onboarding Guide

**essere** is a React 19 + TypeScript SPA (Vite) powered by Directus CMS, styled with MUI components and CSS custom properties. This guide explains patterns that require reading multiple files to understand.

## Architecture: Data Flow & Integration

### The Request Chain
```
App renders page → Feature hook (useHomePage) → Directus factory (directus.ts)
  → Directus SDK → Convert schema via adapter (home-page-schema.ts) → Use camelCase model
```

- **Feature hooks** (e.g., `src/home/core/use-home-page.ts`) use React 19's `use()` with Suspense, caching results in a `WeakMap<Directus>` to deduplicate requests.
- **Schema adapters** (e.g., `src/shared/directus/core/home-page-schema.ts`) convert Directus snake_case fields to camelCase TypeScript models. This pattern decouples CMS schema from component code.
- **Directus factory** (`directus.ts`) exposes methods like `getHomePage()`, `getNavLinks()`, never called directly from components.
- **Asset resolution** handles Directus file IDs: converts to full asset URLs with fallback SVG for missing images.

### Provider Stack (src/main.tsx)
```
ThemeProvider (MUI) → CssBaseline → BrowserRouter 
  → ConfigProvider (loads /config.json) → DirectusProvider (Directus instance)
```
The Directus instance is created from Config at app startup via `Directus(config)` factory.

## Critical Patterns

### Adding a New Data Source (e.g., Events)
1. Create **Directus schema type** in `src/shared/directus/core/events-schema.ts` (snake_case fields from CMS)
2. Create **model type** in `src/events/core/events.ts` (camelCase, what components use)
3. Add **schema adapter** in same file with `toEvent()` transformer function
4. Add **Directus factory method** in `directus.ts`: update `Schema` type + add `getEvents()` method
5. Create **feature hook** `src/events/core/use-events.ts` with WeakMap caching + `use()`
6. Wire into `App.tsx` router

### Styling: CSS Custom Properties + MUI sx Prop
- **Never use className** or CSS modules. Use MUI `sx={{}}` with inline styles.
- **Custom properties** defined in `src/index.css` (--primary, --radius-md, etc.)
- **Variable reference** in sx: `sx={{ color: 'var(--primary)', borderRadius: 'var(--radius-xl)' }}`
- **MUI theme colors** (primary.main, text.primary, secondary.main) map to CSS vars via `theme/material-theme.ts`
- **Gradients hardcoded**: `'linear-gradient(135deg, #4c664b, #405840)'` replicated where needed (consider extracting to theme later)

### Development Server: Config Injection
- `vite.config.ts` has custom middleware serving `/config.json` on dev
- Proxies `/directus/*` requests to `https://essere.ca` (production server)
- Locally, Directus URL set to `http://localhost:5173/directus/` to keep same-origin
- Build uses `/env/prod/config.json` as the static config fallback

### Project-Specific Routing
- Routes use **French path names**: `/accueil` (home), `/cours` (schedule), `/evenements` (events), `/contact`
- `HomePage` imports custom Hero component + uses `useHomePage()` hook
- Each page folder: `ui/` has React components, `core/` has types + hooks

### Component Reuse Strategy
- **Shared components** in `src/shared/ui/` (Hero.tsx, LoadingFallback.tsx)
- **Navbar** is global, fetches nav_links + labels from Directus
- **Footer** currently inlined in each page (consider extracting to `src/shared/components/Footer.tsx`)
- **Labels collection** (`src/shared/labels/core/use-labels.ts`) holds translated/reused strings

## Build & Deployment

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Vite + custom config middleware; proxy Directus |
| `pnpm build` | Run `tsc -b` type check, then `vite build` (outputs dist/) |
| `pnpm lint` | ESLint on all .ts/.tsx files |
| `docker build` | Creates `essere-app` image (see Dockerfile + nginx.conf) |

Docker build:
- Expects `/config.json` at runtime (injected or mounted)
- nginx serves `dist/` with proxy to Directus CMS
- Image uses Linux amd64 platform

## Key Files to Search When...

| Task | Search Files |
|------|--------------|
| Add a page | `src/App.tsx` (routes), `src/<page>/core/use-<page>.ts`, `design/<page>/code.html` |
| Add Directus collection | `src/shared/directus/core/directus.ts` (Schema + factory) |
| Change colors/tokens | `src/index.css` (CSS vars), `src/theme/material-theme.ts` (MUI theme) |
| Fix styling | Search `sx={{` in page component; check MUI Typography/Box/Button props |
| Debug data flow | Add console.log in schema adapter or feature hook's `use()` call |
| Update config | `env/prod/config.json` (production), `vite.config.ts` middleware (dev) |

## Why This Architecture?

- **Schema adapters**: CMS schema evolves independently; components see stable TypeScript interfaces
- **WeakMap request caching**: Deduplicates identical requests in the same render pass (React 19 Suspense)
- **Feature folders**: Each page is self-contained; scales to many pages without coupling
- **MUI sx + CSS vars**: Hybrid approach balances styled-components expressiveness with lightweight custom properties
- **Directus factory pattern**: Single typed instance passed through context; avoids SDK calls scattered in components
- **French routes**: Intentional for multilingual/international audience (easy to add i18n later)

## Design System: "The Elevated Sanctuary"

Sage-and-cream wellness aesthetic:
- **Primary colors**: Deep Sage (#4c644b), Warm Taupe, Warm Cream
- **Typography**: Serif headlines (Noto Serif) + Sans body (Manrope)
- **No hard borders**: Section separation via background-color layers only
- **Glassmorphic elements**: Navbar, teaser cards, date badges (`backdrop-filter: blur(20px)`)
- **Shadows**: Ambient sage-tinted, never black: `0px 12px 32px rgba(46, 52, 45, 0.06)`
- **Motion**: Slow transitions (300ms ease-out) to evoke mindfulness

Reference: `design/<page>/DESIGN.md` for philosophy, `design/<page>/code.html` for markup structure.

## Common Integration Points

- **Directus collections** required: nav_links, home_page, events, schedule_classes, studio_info (labels too)
- **Environment**: Set `DIRECTUS_URL` in `/config.json` (dev uses Vite middleware override)
- **Asset CDN**: Directus file IDs → resolved to full URLs in `directus.ts` resolver
- **Styling tokens**: All colors/spacing/radius in `index.css` `:root` scope
- **Routing**: React Router v7 wraps entire app; Routes in App.tsx

---

*Last updated: May 2, 2026. Reference: .github/copilot-instructions.md, CLAUDE.md*

