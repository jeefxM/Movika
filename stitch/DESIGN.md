# Design System Strategy: Kinetic Fluidity

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Frame."** 

Unlike traditional real estate platforms that feel static and heavy, this system is designed to mimic the fluidity of a high-end video timeline. We are moving away from "The Template Look" by embracing intentional asymmetry and dynamic layering. The visual language captures the "high-energy" nature of video editing through high-contrast typography, glassmorphism, and a depth-first approach to UI. 

The goal is to provide real estate agents with a tool that feels as premium as a boutique agency, but with the velocity and technical edge of a modern dev-studio (inspired by the aesthetics of *21st dev* and *nanobanana*). We achieve this by breaking the rigid grid—allowing elements to overlap and breathe, creating a digital experience that feels "edited" rather than just "coded."

---

## 2. Colors: Tonal Depth & Soul
Our palette is anchored in deep blacks and high-velocity purples and blues. The application of color must follow a "light-source" logic to maintain the high-tech energy.

*   **Primary (`#c09cff`) & Secondary (`#00c1fd`):** These are your "Action Lights." Use these for core interactions.
*   **Tertiary (`#ff5dd7`):** This is the "Spark." Use it sparingly for error states or ultra-high-priority highlights to maintain its visual punch.

### The Rules of Engagement:
*   **The "No-Line" Rule:** 1px solid borders for sectioning are strictly prohibited. You must define boundaries through background shifts. For example, a `surface-container-low` section should sit directly on a `surface` background. Let the tonal shift do the heavy lifting.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of frosted glass. Use the `surface-container` tiers (Lowest to Highest) to create nested depth. An inner card should use a higher tier (e.g., `surface-container-high`) than its parent container to feel naturally "closer" to the user.
*   **The "Glass & Gradient" Rule:** Floating elements must use Glassmorphism. Combine semi-transparent surface colors with a `backdrop-blur`. 
*   **Signature Textures:** For Hero CTAs, move beyond flat fills. Use a subtle linear gradient transitioning from `primary` to `primary_container` at a 135-degree angle to provide "visual soul."

---

## 3. Typography: Editorial Authority
We use a high-contrast pairing to balance technical precision with modern friendliness.

*   **Display & Headlines (Space Grotesk):** This is our "Voice." It’s bold, wide, and modern. Use `display-lg` (3.5rem) with tight tracking to create an editorial, high-energy feel that mimics movie titles.
*   **Title & Body (Manrope):** This is our "Information." Manrope provides excellent legibility at smaller scales. Use `body-lg` (1rem) for descriptions to ensure real estate agents can quickly scan property details.
*   **Labels (Plus Jakarta Sans):** For micro-copy and metadata, we use Plus Jakarta Sans. Its slightly rounder forms prevent the UI from feeling too clinical.

**Hierarchy Tip:** Always lead with a massive Space Grotesk headline followed by a generous `spacing-6` (2rem) gap before the body text. This "breathing room" creates the premium feel.

---

## 4. Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** and **Atmospheric Perspective** rather than traditional drop shadows.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on a `surface-container-low` section. This creates a soft, natural lift that feels like high-end hardware design.
*   **Ambient Shadows:** For floating modals, use extra-diffused shadows. Set blur values high (24px+) and keep opacity between 4%-8%. The shadow color should be a tinted version of `on-surface` (a deep violet-black) rather than pure grey, mimicking the way light bleeds in a dark room.
*   **The "Ghost Border" Fallback:** If a container needs more definition, use a "Ghost Border." Apply the `outline-variant` token at 15% opacity. Never use 100% opaque borders.
*   **Kinetic Glows:** To emphasize the "high-energy" request, use subtle, blurred radial gradients of `primary_dim` or `secondary_dim` behind key components to create a "tech-glow" effect.

---

## 5. Components

### Buttons
*   **Primary:** High-energy gradient (`primary` to `primary_container`) with a `roundness-full` (pill shape). 
*   **Secondary:** Glassmorphic fill (transparent `surface_bright` with backdrop-blur) and a `Ghost Border`.
*   **Interaction:** On hover, buttons should "grow" slightly (1.02 scale) and the glow intensity should increase.

### Cards (Properties/Designs)
*   **Constraint:** Absolutely no divider lines. 
*   **Style:** Use `spacing-5` (1.7rem) for internal padding. Separate the "Price" from the "Address" using a `surface_container_highest` background shift for the footer of the card.
*   **Corner Radius:** Use `roundness-xl` (1.5rem) to maintain the sleek, modern feel.

### Input Fields
*   **State:** Default state is `surface_container_low`. 
*   **Focus State:** The border transitions to a 1px `primary` glow. The background remains dark to maintain the "high-tech" agency look.

### Video Timeline Scrubber (Niche Component)
*   A custom component for real estate agents to preview edits. Use a `secondary` color for the progress bar with a `tertiary` (pink) playhead to ensure high visibility against the dark UI.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. Let images bleed off the edge of the container to create a sense of motion.
*   **Do** use large typography scales. If a headline feels too big, it’s probably just right for this brand.
*   **Do** leverage `backdrop-blur` on all overlays to maintain the "21st dev" aesthetic.

### Don’t:
*   **Don’t** use pure white (#FFFFFF) for text. Use `on_surface` (#f9f5fd) to prevent "retina burn" against the dark background.
*   **Don’t** use standard 1px borders or grid lines. They kill the fluid energy of the system.
*   **Don’t** use "Drop Shadows" from a standard UI kit. All elevation must be tonal or high-blur ambient shadows.
*   **Don’t** crowd the interface. If the design feels busy, increase the spacing using `spacing-10` or `spacing-12`.