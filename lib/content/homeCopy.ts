/**
 * Chamberlink corporate site — homepage copy.
 *
 * POSITIONING (locked after two rounds of review — do not drift from this):
 * This homepage is the public face of NACCIMA's official Certificate of
 * Origin platform for Nigeria's SOLID MINERALS sector only — licensed mining
 * companies, mineral processors, and mineral exporters. It is NOT a
 * general-purpose multi-sector export tool, and it is explicitly NOT called
 * "NACCIMA e-Certify" (that name was rejected). The audience is narrow and
 * sector-specific "for now" — it may expand later, but copy should not imply
 * a broader scope today.
 *
 * The separate pitch to chambers of commerce considering onboarding onto the
 * wider Chamberlink platform lives at /for-chambers (lib/content/forChambersCopy.ts)
 * — a different audience, deliberately not mixed into this file. See
 * CLAUDE.md "Repository layout" / "For Chambers" note.
 *
 * COMPLIANCE — read before editing: no chamber, government body, or industry
 * association may be described anywhere on this site as a signed, contracted,
 * or committed partner. As of this writing every relationship referenced here
 * is prospective / in discussion, not an executed agreement. Use "in
 * discussion with" — never "partnered with" or past-tense onboarding claims.
 */

// Real, live member-portal URLs. The backend
// (chamberlinkbackend-production.up.railway.app) is API-only — never link it
// from user-facing copy except as a fetch target (see API_BASE_URL below).
export const PORTAL_URL = "https://chamberlinkadmin.netlify.app";
export const PORTAL_LOGIN_URL = `${PORTAL_URL}/login`; // confirmed real route: chamberlink_frontend/src/app/router.tsx
export const PORTAL_REGISTER_URL = `${PORTAL_URL}/register`; // confirmed real route

// SSO handoff after a successful /login or /register on this site: the refresh
// token travels in the URL fragment (never sent to any server, unlike a query
// string) so chamberlink_frontend/src/pages/SsoHandoffPage.tsx can pick it up
// client-side, store it, and land the user signed in on their dashboard.
export const PORTAL_SSO_URL = `${PORTAL_URL}/sso`;

// Public, unauthenticated backend endpoint used by /verify. Confirmed against
// chamberlink_backend/src/modules/e-certificate/{route,controller,service}.ts:
// GET /api/eco/verify/:certNumber -> { success, data: { certificateNumber,
// companyName, destinationCountry, solidMineralName, hsCode, issuedAt,
// status, isValid } }
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://chamberlinkbackend-production.up.railway.app";

export const ONBOARDING_EMAIL = "partnerships@chamberlink.ng";

export const seo = {
  title: "NACCIMA Solid Minerals Certificate of Origin | Chamberlink",
  description:
    "The official Certificate of Origin platform for Nigeria's Solid Minerals sector — licensed mining companies, mineral processors, and exporters apply, pay, and get certified by NACCIMA online.",
  keywords: [
    "NACCIMA Certificate of Origin",
    "Solid Minerals Certificate of Origin Nigeria",
    "mining export certificate Nigeria",
    "mineral exporter certification",
    "NACCIMA solid minerals",
    "verify certificate of origin Nigeria",
    "Nigeria mineral export documentation",
  ],
  siteName: "Chamberlink",
};

export const nav = {
  wordmark: "Chamberlink",
  links: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Verify", href: "/verify" },
    { label: "For Chambers", href: "/for-chambers" },
  ],
  register: {
    label: "Register",
    href: PORTAL_REGISTER_URL,
    detail:
      "Create your free ChamberLink ID — this isn't chamber membership, just enough to apply for your Solid Minerals Certificate of Origin and track it.",
  },
  login: {
    label: "Login",
    href: PORTAL_LOGIN_URL,
    options: [
      {
        label: "Apply for a Certificate of Origin",
        detail: "Log in to start or continue your Solid Minerals eCO application.",
        href: PORTAL_LOGIN_URL,
      },
      {
        label: "Become a Member of a Chamber",
        detail: "Log in and join a chamber to unlock membership benefits.",
        href: PORTAL_LOGIN_URL,
      },
      {
        label: "Connect an Existing Membership ID",
        detail: "Already a member elsewhere? Link your existing ChamberLink ID.",
        href: PORTAL_LOGIN_URL,
      },
    ],
  },
  ctaPrimary: { label: "Apply for a Certificate", href: "/apply" },
};

export const hero = {
  eyebrow: "NACCIMA SOLID MINERALS COO",
  headline: "Nigeria's minerals, certified by NACCIMA.",
  subhead:
    "The official Certificate of Origin platform for Nigeria's Solid Minerals sector — from licensed mining companies to processors and exporters.",
  ctaPrimary: { label: "Apply for a Certificate", href: "/apply" },
  ctaSecondary: { label: "Verify a Certificate", href: "/verify" },
  scrollCue: "Scroll to see how it works",
  stats: [
    { label: "Certifying authority", value: "NACCIMA" },
    { label: "Sector coverage", value: "Solid Minerals" },
    { label: "Certificate delivery", value: "Digital", suffix: "" },
    { label: "Verification", value: "24", suffix: "/7" },
  ] as { label: string; value: string; prefix?: string; suffix?: string }[],
};

export type Step = { index: string; title: string; body: string; items?: string[] };

export const howItWorks = {
  eyebrow: "HOW IT WORKS",
  headline: "Your Certificate of Origin, in three steps.",
  body: "A digital process built for the realities of the sector — no queueing at a chamber office, no paperwork lost in transit.",
  steps: [
    {
      index: "01",
      title: "Gather your documents",
      body: "Have these ready before you start: your CAC certificate, NEPC Export License, Mining License (where applicable), and Commercial Invoice.",
      items: ["CAC Certificate", "NEPC Export License", "Mining License (if applicable)", "Commercial Invoice"],
    },
    {
      index: "02",
      title: "Apply & pay",
      body: "Submit your application online and pay the applicable fee through the platform's secure checkout. You'll receive a Payment Receipt immediately.",
    },
    {
      index: "03",
      title: "Get verified & certified",
      body: "NACCIMA reviews your documents against the application. Once approved, your Certificate of Origin is issued instantly and digitally — ready to present or share for verification.",
    },
  ] as Step[],
};

export type ServiceItem = { title: string; detail: string };

export const services = {
  eyebrow: "BEYOND CERTIFICATION",
  headline: "Services of NACCIMA",
  intro: "Beyond certification, NACCIMA supports Nigeria's mineral sector with:",
  items: [
    {
      title: "Business Networking & Matchmaking",
      detail: "Structured introductions between Nigerian mineral businesses and buyers, processors, and investors seeking verified partners.",
    },
    {
      title: "Trade Missions & Exhibitions",
      detail: "Delegations and pavilion access at international trade events that put Nigerian solid minerals in front of global demand.",
    },
    {
      title: "Access to Financing & Investment Opportunities",
      detail: "Introductions to financiers and investment programs aligned with mining, processing, and export-scale capital needs.",
    },
    {
      title: "Policy Advocacy & Representation",
      detail: "A collective voice to government on regulation, taxation, and trade policy affecting the solid minerals value chain.",
    },
    {
      title: "Capacity Building & Training Programs",
      detail: "Practical training on compliance, export documentation, and international trade standards for operators and their staff.",
    },
    {
      title: "Research & Market Intelligence",
      detail: "Sector data and market analysis to help producers and exporters plan around demand, pricing, and destination markets.",
    },
  ] as ServiceItem[],
};

export const partners = {
  eyebrow: "IN DISCUSSION WITH",
  headline: "Aligned with the institutions and operators in the sector.",
  // Text-wordmark placeholders (no fabricated logo images). These are
  // collaboration / in-discussion relationships, not signed or contracted
  // partnerships — the "status" label is intentional and must not be removed
  // without a signed agreement to point to. Applies equally to government
  // and industry bodies, not just chambers — see CLAUDE.md compliance rules.
  logos: [
    { name: "Federal Ministry of Solid Minerals Development", abbr: "FMSMD", status: "In discussion" },
    { name: "Mineral Processors", abbr: "Processors", status: "In discussion" },
    { name: "Licensed Mining Companies", abbr: "Mining Cos.", status: "In discussion" },
  ],
};

export const trust = {
  eyebrow: "TRUST & VERIFICATION",
  headline: "A certificate that customs and buyers can trust — and check.",
  body: "Every fee routes through a real-time split-settlement checkout with multi-gateway failover. Every certificate issued and every document action writes to an immutable, append-only audit log — and any certificate can be independently verified in seconds.",
  badges: [
    { label: "Instant public verification", detail: "Any certificate number can be checked for validity, free, with no login required" },
    { label: "Multi-gateway failover", detail: "Paystack, Flutterwave and Remita with automatic failover" },
    { label: "Split-settlement checkout", detail: "Real-time fee routing — no cash, no off-platform payment path" },
    { label: "RBAC + mandatory MFA", detail: "Role and ownership checks on every protected route" },
    { label: "Immutable audit log", detail: "Timestamped, append-only record of every financial and document action" },
    { label: "NDPA compliant", detail: "Data stays in Nigeria-based regions, TLS 1.3 in transit, AES-256 at rest" },
  ],
};

export const finalCta = {
  eyebrow: "READY TO APPLY",
  headline: "Get your Solid Minerals Certificate of Origin.",
  body: "Register for your free ChamberLink ID, then apply for your Certificate of Origin — reviewed and issued by NACCIMA.",
  ctaPrimary: { label: "Apply for a Certificate", href: "/apply" },
  ctaSecondary: { label: "Verify a Certificate", href: "/verify" },
};

export const contactPage = {
  eyebrow: "REQUEST ONBOARDING",
  headline: "Tell us about your chamber.",
  body: "Fill this in and it opens a pre-filled email to our partnerships team — we'll follow up to walk through onboarding, from NACCIMA-mandate accreditation to your first live member.",
  fallbackNote: `Prefer to email directly? Reach us at ${ONBOARDING_EMAIL}`,
};

export const NIGERIA_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT (Abuja)", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara",
];

export const footer = {
  description:
    "The official Certificate of Origin platform for Nigeria's Solid Minerals sector, backed by NACCIMA. Operated by Tradely LTD.",
  columns: [
    {
      title: "Platform",
      links: [
        { label: "How It Works", href: "/#how-it-works" },
        { label: "Verify a Certificate", href: "/verify" },
        { label: "Apply for a Certificate", href: "/apply" },
        { label: "Register", href: PORTAL_REGISTER_URL },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "For Chambers", href: "/for-chambers" },
        { label: "Member Portal (Login)", href: PORTAL_LOGIN_URL },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Data Protection (NDPA)", href: "#" },
      ],
    },
  ],
  copyright: "Chamberlink, a Tradely LTD platform. All rights reserved.",
};
