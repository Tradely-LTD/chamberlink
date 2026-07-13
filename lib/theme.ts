/**
 * Chamberlink brand tokens (product marketing site).
 * All-green system — deliberately no gold/brass and no true black, per brand
 * direction. Distinct from the KACCIMA tenant green so the two never collide.
 */

export const brand = {
  ink: "#0a1f16", // cinematic background — deep forest night, not black
  inkDeep: "#06140d",
  emerald: "#145c42", // primary — mid forest green
  emeraldBright: "#34c28d", // glow / accent green on dark (replaces gold everywhere)
  paper: "#f2f6f0", // light section background — cool pale green-white
  paperDeep: "#e7f0e3",
  stone: "#6e7a6f", // muted green-grey
  line: "rgba(255,255,255,0.08)",
  lineOnPaper: "#d9e5d3",
  textOnDark: "#f2f6f0",
  textOnDarkMuted: "rgba(242,246,240,0.66)",
  textOnPaper: "#0f2318",
  textOnPaperMuted: "#4c5c4e",
} as const;

// Five distinct green tones — one per module act. No gold, no black, no browns.
export const colorways = {
  emerald: { base: "#12503f", bright: "#34c28d" }, // classic forest emerald
  jade: { base: "#0f4a45", bright: "#2dd9c4" }, // teal-leaning jade
  fern: { base: "#2f5233", bright: "#7bc86c" }, // fresh fern green
  moss: { base: "#33421f", bright: "#a3c25f" }, // olive moss
  pine: { base: "#0b2a1e", bright: "#2e8b57" }, // dark pine / sea green
} as const;

export type ColorwayName = keyof typeof colorways;
