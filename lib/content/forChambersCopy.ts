/**
 * /for-chambers — the pitch to chambers of commerce considering onboarding
 * onto the wider Chamberlink platform. Deliberately a SEPARATE page and a
 * separate audience from the Solid Minerals CoO homepage (lib/content/homeCopy.ts)
 * — do not merge the two. See CLAUDE.md "Repository layout" for why.
 *
 * Some of this copy carries forward language from this branch's earlier
 * (reverted) homepage draft — that draft was actually written for roughly
 * this audience, just misplaced as the homepage. Two things from that draft
 * were explicitly wrong and are NOT carried over here:
 *   1. Claiming NACCIMA (or any chamber) as an already-onboarded/signed
 *      partner — no agreement is signed with any chamber as of this writing.
 *   2. The fabricated `naccima.chamberlink.ng` tenant URL — this file only
 *      ever links to the real, live member portal (PORTAL_URL below).
 *
 * COMPLIANCE — same rule as homeCopy.ts: no chamber may be described as
 * signed/contracted/onboarded. Use "in discussion with", never "partnered with".
 */

import type { ColorwayName } from "@/lib/theme";
import { PORTAL_LOGIN_URL } from "./homeCopy";

export const PORTAL_URL = "https://chamberlinkadmin.netlify.app";

export const seo = {
  title: "For Chambers | Chamberlink",
  description:
    "Chamberlink brings your chamber of commerce online — exporter visibility, NACCIMA-recognized Certificates of Origin, e-learning, trade fairs, trade corridors, and export document generation, on a platform your chamber runs independently.",
  keywords: [
    "chamber of commerce software Nigeria",
    "chamber onboarding platform",
    "NACCIMA certificate of origin platform",
    "chamber management platform",
    "exporter directory Nigeria",
  ],
};

export const forChambersHero = {
  eyebrow: "FOR CHAMBERS OF COMMERCE",
  headline: "Bring your chamber onto the Chamberlink platform.",
  body: "Chamberlink gives any chamber of commerce the same digital infrastructure NACCIMA's Solid Minerals Certificate of Origin platform runs on — membership, certification, trade facilitation, and member value, live in weeks, run independently after onboarding.",
  ctaPrimary: { label: "Request Onboarding", href: "/contact" },
};

export const intro = {
  eyebrow: "THE STATUS QUO",
  headline: "Most chambers still run on spreadsheets, WhatsApp groups, and paper receipts.",
  body: "Dues collected in cash with no reconciliation. Certificates issued by hand and easy to forge. No way to prove to government or funders what the chamber actually does. Chamberlink replaces the filing cabinet with infrastructure a modern institution deserves.",
  points: [
    { label: "No digital trail", detail: "Cash dues and manual receipts leave no audit trail for the chamber or its members." },
    { label: "Forgeable paperwork", detail: "Hand-issued certificates can't be verified by customs or buyers in real time." },
    { label: "Invisible impact", detail: "Chambers can't show funders or government hard numbers on trade facilitated." },
  ],
};

export const mandate = {
  eyebrow: "WHY THIS IS POSSIBLE",
  headline: "Designed around NACCIMA, the national body with the mandate.",
  body: "A chamber can't simply decide to issue Certificates of Origin the world will honor — that authority sits with NACCIMA, the national body mandated to issue Certificates of Origin recognized by the international community. Chamberlink exists to carry that mandate to onboarded chambers digitally: your chamber would issue NACCIMA-recognized eCOs, backed by customs and buyers abroad, without needing your own international accreditation.",
  pillars: [
    {
      label: "National mandate, local execution",
      detail: "NACCIMA's recognition is designed to flow through the platform to every onboarded chamber's members.",
    },
    {
      label: "Onboarded, not built from scratch",
      detail: "Your chamber requests onboarding — Tradely leads accreditation and setup, aligned with NACCIMA's national mandate.",
    },
    {
      label: "Full autonomy after onboarding",
      detail: "Once live, your chamber manages its own members and modules independently, on its own branded instance.",
    },
  ],
};

export type ValueProp = {
  index: string;
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
  colorway: ColorwayName;
};

// "Value Proposition to Chambers" — reuses the scroll-act pattern from
// components/cinematic/ModuleAct.tsx (colorways cycle across the 3
// contrast-verified pairings defined in lib/theme.ts).
export const valueProps: ValueProp[] = [
  {
    index: "01",
    eyebrow: "GET STARTED",
    title: "Request Onboarding",
    tagline: "Bring your chamber onto the platform",
    body: "Tell us about your chamber and we'll walk you through onboarding — from NACCIMA-mandate accreditation to your first live member. Your chamber launches on its own branded instance and runs independently from day one.",
    bullets: ["Guided onboarding with the Tradely team", "Your own branded, independently-run instance", "No agreement required to start the conversation"],
    colorway: "mandate",
  },
  {
    index: "02",
    eyebrow: "MARKET ACCESS",
    title: "Explore Exporter Visibility",
    tagline: "A public, searchable exporter directory",
    body: "Give your members a storefront the world can find. A verified, searchable exporter directory puts your chamber's members in front of buyers and institutional partners actively looking for vetted trade contacts.",
    bullets: ["Public, searchable exporter profiles", "Premium visibility tiers as a revenue line", "Buyers can find and vet exporters directly"],
    colorway: "corridor",
  },
  {
    index: "03",
    eyebrow: "CERTIFICATION",
    title: "Generate Certificates of Origin",
    tagline: "NACCIMA-recognized eCOs for your members",
    body: "Issue Certificates of Origin your members' buyers and customs offices will honor. Draft-to-issued workflow, QR-verified certificates, and payment routed through split-settlement checkout — no manual reconciliation, no cash handling.",
    bullets: ["Draft to issued, fully digital", "QR-verified for customs and buyers", "Revenue-share splits automatically at checkout"],
    colorway: "ledger",
  },
  {
    index: "04",
    eyebrow: "CAPACITY BUILDING",
    title: "E-Learning",
    tagline: "Trade-certification courses, built in",
    body: "An in-platform Academy delivers trade-certification courses so your chamber's staff and members build capability alongside the tools — enrollment tied to active membership, no separate LMS to manage.",
    bullets: ["Course catalog tied to active membership", "Staff and member training in one place", "No separate learning platform to procure"],
    colorway: "mandate",
  },
  {
    index: "05",
    eyebrow: "EVENTS",
    title: "Trade Fair",
    tagline: "Booth reservations and event management",
    body: "Run trade fairs and exhibitions without a spreadsheet. Members reserve and pay for booths online, with automatic revenue-share splits — your chamber keeps full visibility into occupancy and revenue in real time.",
    bullets: ["Self-service booth reservation and payment", "Automatic revenue-share splits at checkout", "Real-time occupancy and revenue visibility"],
    colorway: "corridor",
  },
  {
    index: "06",
    eyebrow: "TRADE PROMOTION",
    title: "Trade Missions & Corridors",
    tagline: "Sponsor and track trade routes",
    body: "Sponsor and track trade corridors tied to your members' exports. Embassies and partner chambers can back specific routes, connecting your local businesses to demand on the other side — with certificate destination data feeding corridor matching automatically.",
    bullets: ["Sponsored corridor pages backed by partners", "Automatic matching from certificate destination data", "Visibility into which routes your members actually trade"],
    colorway: "ledger",
  },
  {
    index: "07",
    eyebrow: "TRADE FACILITATION",
    title: "Generate Export Documents",
    tagline: "Commercial Invoices and Packing Lists, self-service",
    body: "What used to take a staff member an afternoon — drafting a commercial invoice or packing list — now takes minutes. Exporters generate compliant paperwork themselves; your chamber keeps full visibility and control over every document that leaves the building.",
    bullets: ["Self-service document generator, instant PDF", "Admin queue for chamber-issued documentation", "Foundation for trade finance enablement as you scale"],
    colorway: "mandate",
  },
];

export const proof = {
  eyebrow: "WHERE WE ARE TODAY",
  headline: "Built and working end-to-end — onboarding is open.",
  body: "Chamberlink's modules are built and running today: dues collection, digital membership IDs, Certificate of Origin issuance, trade fair bookings, export documentation, and the member portal you can log into right now. No chamber has been onboarded as a live tenant yet — we're in active discussion with prospective chambers, and every one of those conversations starts from a platform that already works, not a slide deck.",
  cta: { label: "See the member portal", href: PORTAL_LOGIN_URL },
};

export const forChambersFinalCta = {
  eyebrow: "READY WHEN YOU ARE",
  headline: "Bring your chamber onboard.",
  body: "Tell us about your chamber and we'll walk you through onboarding — NACCIMA-recognized certificates, new revenue streams, and real value for your members, on a platform your chamber runs independently.",
  ctaPrimary: { label: "Request Onboarding", href: "/contact" },
  ctaSecondary: { label: "Talk to Our Team", href: "mailto:partnerships@chamberlink.ng" },
};
