# Design System Strategy: The Elevated Sanctuary

## 1. Overview & Creative North Star
**Creative North Star: "The Tactile Breath"**

This design system rejects the clinical, rigid grids of traditional fitness apps. Instead, it draws inspiration from high-end editorial archives and architectural minimalism. We treat digital space as "physical breath"—utilizing expansive white space not as a void, but as a luxury.

To move beyond a "template" look, we employ **Intentional Asymmetry**. Hero sections should feature overlapping elements where imagery (organic shapes) breaks the container of the text. By layering high-contrast typography scales (the delicate `notoSerif` against the functional `manrope`), we create a rhythm that feels both grounded and aspirational. This is a digital sanctuary that prioritizes serenity over stimulus.

---

## 2. Colors & Tonal Depth
Our palette is a curated selection of botanical and mineral tones. The goal is a "low-arousal" interface that mirrors the transition from a busy street into a quiet studio.

### The Color Tokens
*   **Primary (`#4c644b`):** Deep Sage. Used for moments of focus and grounding.
*   **Secondary (`#6a5d51`):** Warm Taupe. Used for secondary actions and structural depth.
*   **Background/Surface (`#fafaf5`):** Warm Cream. Our primary canvas, chosen to reduce eye strain compared to pure white.

### Key Rules for Implementation
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To define boundaries, transition between background colors. For example, a class schedule section using `surface-container-low` should sit directly against a `background` page, separated only by space.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of fine handmade paper.
    *   *Base:* `background`
    *   *Secondary Sections:* `surface-container`
    *   *Floating Elements/Cards:* `surface-container-lowest` (pure white) to provide a "lit from within" glow.
*   **The "Glass & Gradient" Rule:** For navigation bars and floating action buttons, use Glassmorphism. Apply `surface` at 80% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** Use subtle linear gradients for primary CTAs, transitioning from `primary` to `primary_dim`. This adds a "silk-like" sheen that feels premium rather than flat.

---

## 3. Typography
We use a high-contrast pairing to balance authority with approachability.

*   **Display & Headlines (`notoSerif`):** These are our "Editorial Voice." Use `display-lg` for hero statements. Increase letter-spacing slightly (-0.02em) to maintain a refined, bespoke feel.
*   **Body & Labels (`manrope`):** Our "Functional Voice." Manrope provides a modern, geometric clarity that ensures accessibility in dense information like class descriptions.
*   **Typography Hierarchy:** 
    *   **The "Oversized Header" Technique:** Use `display-md` next to `body-sm` metadata. This extreme scale difference mimics luxury fashion magazines and immediately signals a "high-end" experience.

---

## 4. Elevation & Depth
In a wellness context, heavy shadows feel "dirty" and "heavy." We use light to create lift.

*   **The Layering Principle:** Avoid elevation shadows where possible. Achieve hierarchy by placing a `surface-container-lowest` card on a `surface-container-high` background. This "Tonal Layering" creates a soft, natural lift.
*   **Ambient Shadows:** If a card must float (e.g., a modal), use a shadow tinted with `on-surface` (Sage-Grey) rather than Black. 
    *   *Specs:* `0px 12px 32px rgba(46, 52, 45, 0.06)`.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` at 15% opacity. It should be felt, not seen.
*   **Corner Radii:** We use a "Soft-Humanist" scale. Use `xl` (1.5rem) for large containers and `md` (0.75rem) for interactive elements like buttons.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background, `on-primary` text. Use `xl` (full pill) rounding. 
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Interaction:** On hover, shift background to `primary_dim`. Transitions must be slow (`300ms ease-out`) to mimic mindful movement.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Implementation:** Separate list items (like a class schedule) using 24px of vertical whitespace or a subtle toggle between `surface` and `surface-container-low` backgrounds.
*   **Imagery:** All imagery within cards should have a `md` (0.75rem) border radius to maintain the organic feel.

### Input Fields
*   **Style:** Minimalist underline or soft-filled. 
*   *Fill:* `surface-container-high` with an `outline-variant` ghost border.
*   *Focus:* The border transitions to `primary` with a 2px weight.

### Specialized Components: "The Breath Meter"
*   **Progress Bars:** For meditation or class progress, use a thick `xl` rounded bar using `primary_container` as the track and `primary` as the indicator. It should feel like a smooth, continuous ritual.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. A hero image might be offset to the right while text sits left-aligned with 15% more padding than usual.
*   **Do** prioritize imagery of textures (linen, wood, stone) to complement the Sage and Taupe palette.
*   **Do** use "Motion as Mindfulness." Elements should fade and slide upward gently when the page loads.

### Don’t
*   **Don't** use pure black `#000000`. Use `on-background` for all text to keep the "soft" visual acoustic.
*   **Don't** use standard "heavy" grids. Let elements breathe; if you think there is enough whitespace, add 20% more.
*   **Don't** use sharp 90-degree corners. They represent tension, which contradicts the studio's mission of "balance."