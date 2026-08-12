/**
 * Chamberlink brand tokens (product marketing site).
 *
 * Palette verified against NACCIMA's own live brand blue (`#023293`) — this is
 * a "Trust & Authority" institutional system: navy + gold, light-mode primary,
 * with a small number of full-bleed dark moments for cinematic weight. See
 * app/globals.css for the CSS-side `@theme` tokens; keep the two in sync.
 *
 * Contrast notes (WCAG 2.1, checked against the exact hexes below):
 * - foreground on background:            17.35:1
 * - primary on background:               10.69:1
 * - white on primary / primary-deep:     11.17:1 / 17.49:1
 * - accent (raw gold) on primary-deep:    6.41:1  (safe for small text ON DARK ONLY)
 * - accent (raw gold) on background:      2.61:1  (FAILS — never use raw accent
 *   as text/icon color on a light surface; use `accentInk` instead, 6.33:1)
 * - mutedForeground on background:        8.61:1
 */

export const brand = {
  // Core institutional palette — locked to NACCIMA's verified brand blue.
  primary: "#023293", // NACCIMA blue
  primaryDeep: "#051937", // dramatic dark-section background, and text-on-light where extra depth reads better
  accent: "#C9932E", // refined gold — CTAs, dark-surface accents, decorative fills. NOT for text on light bg (2.6:1).
  accentInk: "#7A5619", // WCAG-safe gold-family text/icon color for LIGHT surfaces (6.33:1 on background)
  background: "#FAFAF8", // warm off-white
  foreground: "#0A1628", // near-black navy body text
  muted: "#EEF1F6",
  mutedForeground: "#3C4A5E", // secondary text on light surfaces (8.61:1)
  border: "#DFE4EC",
  destructive: "#DC2626",
  onPrimary: "#FFFFFF",
  line: "rgba(255,255,255,0.12)", // hairline dividers on dark sections
} as const;

// Five institutional variations along the navy → gold spectrum, one per module
// act — cohesive rather than a rainbow, so the "Trust & Authority" read holds
// even as the visual accent shifts module to module.
export const colorways = {
  mandate: { base: "#023293", bright: "#C9932E" }, // 01 — core navy + gold
  corridor: { base: "#0A3D82", bright: "#D4A544" }, // 02
  ledger: { base: "#123B6E", bright: "#C9932E" }, // 03
  network: { base: "#164B8C", bright: "#E0B25C" }, // 04
  academy: { base: "#051937", bright: "#C9932E" }, // 05 — deepest, closes the sequence
} as const;

export type ColorwayName = keyof typeof colorways;
