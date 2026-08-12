/**
 * Chamberlink brand tokens (NACCIMA Solid Minerals corporate site).
 *
 * SOURCE OF TRUTH: `chamberlink_frontend/tailwind.config.ts` (the live member
 * portal). These four hexes are the ONLY authoritative brand colors — do not
 * invent new ones. Everything else on this page (`primary-deep`, `gold-tint`)
 * is a mechanically-derived variant of these four, documented below.
 *
 *   primary : #023293 (hover #0267bf)
 *   gold    : #795900 (hover #5c4300)  -- deep, muted olive-gold, NOT bright
 *   border  : #bec9bf
 *   cream   : #fdf8f3
 *
 * `primary-deep` (#051937) is a hand-darkened primary used only as the
 * full-bleed background of the two dramatic dark sections (Hero canvas +
 * any dark full-bleed moment) — never used as a foreground/text color pulled
 * from thin air.
 *
 * `gold-tint` (#b5a473) exists because the brand gold is dark and muted
 * (#795900) — it reads fine as text on cream (6.14:1) but fails badly as
 * text on the dark navy sections (2.70:1, well under the 4.5:1 AA floor).
 * `gold-tint` is `gold` mixed 45% toward white — the minimum lightening
 * needed to clear AA on both `primary` (4.53:1) and `primary-deep` (7.10:1).
 * It is ONLY for gold-family text/icons on dark backgrounds; on light
 * (cream) backgrounds use `gold`/`gold-hover` directly, per the brief.
 *
 * Contrast notes (WCAG 2.1, computed programmatically — see
 * scratchpad/contrast.mjs used to derive these, not eyeballed):
 *
 *  LIGHT SURFACES (bg = cream #fdf8f3 unless noted)
 *  - foreground on cream:                 17.18:1
 *  - foreground on white:                 18.13:1
 *  - primary on cream:                    10.58:1
 *  - primary-hover on cream:                5.39:1  (ok for large/interactive text only)
 *  - gold on cream:                         6.14:1  (safe for body text directly — no separate "ink" color needed)
 *  - gold-hover on cream:                   8.81:1
 *  - muted-foreground on cream:             8.53:1
 *  - muted-foreground on muted:             7.48:1
 *  - destructive on cream:                  4.58:1
 *  - destructive on white:                  4.83:1
 *  - border on white/cream:                ~1.6-1.7:1 (decorative hairline only,
 *    never the sole means of conveying a boundary — matches the portal's own
 *    live value; not used as a text/icon color)
 *
 *  DARK SURFACES (bg = primary-deep #051937 unless noted)
 *  - white on primary-deep:               17.49:1
 *  - cream on primary-deep:                16.57:1
 *  - white on primary:                     11.17:1
 *  - gold (raw) on primary-deep:            2.70:1  FAILS — never use raw `gold` as
 *    text/icon color on a dark surface; use `gold-tint` instead.
 *  - gold-tint on primary-deep:             7.10:1
 *  - gold-tint on primary:                  4.53:1
 */

export const brand = {
  primary: "#023293", // NACCIMA blue — verified against chamberlink_frontend/tailwind.config.ts
  primaryHover: "#0267bf",
  primaryDeep: "#051937", // hand-darkened primary; dramatic dark-section background only
  gold: "#795900", // deep, muted olive-gold — safe as text directly on light (cream) surfaces
  goldHover: "#5c4300",
  goldTint: "#b5a473", // gold mixed 45% toward white; ONLY gold-family color safe as text on dark navy
  cream: "#fdf8f3",
  muted: "#f2e9db", // warm, slightly deeper cream for panel backgrounds
  foreground: "#0a1628", // near-black navy body text
  mutedForeground: "#3c4a5e",
  border: "#bec9bf", // matches the live member portal exactly
  destructive: "#dc2626",
  onPrimary: "#ffffff",
  line: "rgba(255,255,255,0.12)", // hairline dividers on dark sections
} as const;

// Icon-chip colorways for the reusable "scroll act" pattern (components/cinematic/ModuleAct.tsx),
// currently used on the /for-chambers value-proposition list. Every base/bright pairing below was
// checked as icon-on-chip contrast (WCAG 1.4.11 non-text, 3:1 floor) — pairings that failed (e.g.
// gold directly on primary-hover, 1.14:1) were discarded rather than used anyway. See contrast notes
// above for the underlying token math.
export const colorways = {
  mandate: { base: "#023293", bright: "#b5a473" }, // primary chip, gold-tint icon — 4.53:1
  ledger: { base: "#051937", bright: "#b5a473" }, // primary-deep chip, gold-tint icon — 7.10:1
  corridor: { base: "#0267bf", bright: "#ffffff" }, // primary-hover chip, white icon — 5.68:1
} as const;

export type ColorwayName = keyof typeof colorways;
