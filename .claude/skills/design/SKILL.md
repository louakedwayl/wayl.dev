---
name: design
description: Apply wayl.dev's "Lithos" visual design system when building or restyling any section/component of this portfolio (home, portfolio, contact, new sections). Covers the cursor-spotlight hero language — clay-orange accent, Playfair + Inter type, glassy nav, entrance animations, scoped CSS (no Tailwind), i18n copy. Use whenever creating UI for this repo so it matches the home page.
---

# wayl.dev — "Lithos" design system

The home hero (`src/components/HomePage.jsx` + `src/components/HomeHero.css`) is the
reference implementation. Read both before designing a new section, then reuse the
tokens and patterns below so the whole site stays coherent.

## Hard rules (this repo's conventions)

- **No Tailwind / no CSS-in-JS libraries.** Each section gets a hand-written, scoped
  CSS file (e.g. `PortfolioPage.css`) with class names prefixed per section
  (`.hero-*`, `.portfolio-*`, …), imported only by that component. Inline `style={}`
  is for *dynamic* values only (cursor position, animation delays).
- **All copy goes through i18n.** `const tx = useT();` then `tx.<section>.<key>`.
  Never hardcode user-facing strings. When you add a key, add it to **all 5 locales**
  in `src/i18n/index.js` (en, fr, ru, ar, zh). Proper nouns (the name "Wayl Louaked")
  are the only exception.
- **Keep language switching + RTL.** The app wraps everything in
  `dir={LANGS[lang].dir}` (`src/App.jsx`); Arabic is RTL. Avoid hard physical
  left/right for text-bearing elements where it would break RTL.
- **No dark-mode toggle in new sections.** The legacy light/dark theme system
  (`src/context/theme.js`, `useTheme()`) is being retired. New sections use the fixed
  palette below — do **not** import `useTheme()`.
- **Honor `prefers-reduced-motion`** (disable entrance/zoom animations).

## Design tokens

```
COLOR
  accent (clay)        #e8702a      hover #d2611f      glow rgba(232,112,42,0.32)
  warm bloom gradient  radial: rgba(255,247,237,0.16) → rgba(232,112,42,0.12) → transparent
  immersive stage      #000  (full-bleed hero/section background)
  light surface        #f5f5f0  (legacy cream — rest of site)
  text on dark         #fff · body rgba(255,255,255,0.8) · muted label rgba(255,255,255,0.55)
  glass control        bg rgba(255,255,255,0.14–0.22) · border rgba(255,255,255,0.28–0.30) · blur 12px
  dark popover         bg rgba(16,16,16,0.92) · border rgba(255,255,255,0.12) · blur 16px

TYPE
  display / wordmark   'Playfair Display', serif  — italic for emphasis lines
  body / UI            'Inter', sans-serif         — global letter-spacing -0.02em
  (both loaded in index.html)
  hero title           clamp(3rem, 9vw, 6rem), line-height 0.95, tight tracking
  eyebrow / label      11px, letter-spacing 0.22em, UPPERCASE, muted
  body copy            13–14px, line-height 1.6
  UI text              13px / weight 500 / letter-spacing 0.04em

SHAPE
  pills & buttons      border-radius 9999px
  popovers / menus     14–16px ; menu items 9–10px

MOTION
  easing               cubic-bezier(0.16, 1, 0.3, 1)
  entrance             heroReveal (1.1s: blur+rise) · heroFadeUp (1s) · heroZoom (1.8s Ken Burns)
  popover              heroDrop (0.18s)
  stagger              delays ~0.25s → 0.85s down the page
```

## Signature patterns

- **Cursor spotlight** (the hero's identity): two stacked full-bleed images; the top
  one is exposed only through a soft `radial-gradient` mask centred on an eased
  (`EASE 0.18`, rAF loop) cursor position, radius ~260px. A warm bloom div
  (`mix-blend-mode: screen`) trails the same point. See `RevealLayer` in `HomePage.jsx`.
- **Fixed nav overlay**: logo/wordmark left · glassy blurred pill (centre, desktop ≥768px)
  · language switcher + hamburger right (mobile <768px). Transparent over the stage.
- **Corner copy**: short description bottom-left (desktop only), role + CTAs bottom-right.
- **CTAs**: primary = solid `#e8702a` pill (hover `scale(1.03)` + glow); secondary =
  translucent white-outline pill; both `active: scale(0.96)`.
- **Breakpoints**: `sm` 640px, `md` 768px (match the hero's media queries).

## Applying it to a new section

1. Create `src/components/<Section>.jsx` + `src/components/<Section>.css`; prefix classes,
   import the CSS in the component.
2. Source every string from `useT()`; add any new keys to all 5 locales in `src/i18n/index.js`.
3. Style with the tokens above — clay accent, Playfair display headings, Inter body,
   glass surfaces, the shared easing + entrance animations.
4. Choose the stage: immersive black (like the hero) or a light section on cream — keep
   the accent and typography identical either way.
5. To slot the section into `src/App.jsx`, follow the existing page pattern
   (`page === "<NAME>"` conditional). Full-bleed immersive sections that use a fixed
   nav must render **outside** `PageTransition` (its `transform` breaks `position: fixed`),
   exactly like `HOME`.
