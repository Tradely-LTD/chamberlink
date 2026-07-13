/**
 * Chamberlink product marketing site — single source of truth for homepage copy.
 * Positioning: Chamberlink onboards Nigeria's STATE chambers of commerce onto one
 * platform, in partnership with NACCIMA — the national body mandated to issue
 * Certificates of Origin recognized by the international community. Once onboarded,
 * a state chamber runs its own instance with full autonomy over its members and
 * modules. KACCIMA is the first chamber onboarded, not the brand.
 *
 * SEO targets woven into this copy:
 * primary   — "chamber of commerce software Nigeria", "state chamber of commerce onboarding"
 * secondary — "NACCIMA certificate of origin platform", "chamber management platform"
 * long-tail — "digital platform for Nigerian chambers of commerce", "affiliate chamber
 *              onboarding platform", "membership management software for chambers"
 */

export const seo = {
  title: "Chamberlink | Onboard Your State Chamber of Commerce",
  description:
    "Chamberlink, built with NACCIMA, brings Nigeria's state chambers of commerce online — internationally recognized Certificates of Origin, membership, trade fairs and real member value, with full autonomy after onboarding.",
  keywords: [
    "chamber of commerce software Nigeria",
    "state chamber of commerce onboarding",
    "NACCIMA certificate of origin platform",
    "chamber management platform",
    "digital platform for Nigerian chambers of commerce",
    "affiliate chamber onboarding platform",
    "membership management software for chambers",
    "eCO platform Nigeria",
  ],
  siteName: "Chamberlink",
};

export const nav = {
  wordmark: "Chamberlink",
  links: [
    { label: "Platform", href: "#platform" },
    { label: "NACCIMA Mandate", href: "#mandate" },
    { label: "Proof", href: "#proof" },
    { label: "Contact", href: "/contact" },
  ],
  ctaSecondary: { label: "Chamber Login", href: process.env.NEXT_PUBLIC_PORTAL_URL ?? "http://localhost:3000" },
  ctaPrimary: { label: "Request Onboarding", href: "/contact" },
};

type HeroStat = { label: string; value: string; prefix?: string; suffix?: string };

export const hero = {
  eyebrow: "A NACCIMA-PARTNERED PLATFORM FOR STATE CHAMBERS",
  headline: "Every State Chamber of Commerce, Fully Digital.",
  subhead:
    "Chamberlink carries Nigeria's state chambers of commerce into the digital economy — built in partnership with NACCIMA, the national body mandated to issue Certificates of Origin recognized by the international community. Once onboarded, your chamber runs independently: manage your own members, generate new revenue, and give them real value from day one.",
  ctaPrimary: { label: "Request Onboarding", href: "/contact" },
  ctaSecondary: { label: "Explore the Platform", href: "#platform" },
  scrollCue: "Scroll to explore the platform",
  stats: [
    { label: "Chamber modules", value: "5" },
    { label: "Payment gateways", value: "3", suffix: "+" },
    { label: "API latency", value: "200", prefix: "<", suffix: "ms" },
    { label: "Revenue to chamber", value: "90", suffix: "%" },
  ] as HeroStat[],
};

export const problem = {
  eyebrow: "THE STATUS QUO",
  headline: "Most chambers still run on spreadsheets, WhatsApp groups, and paper receipts.",
  body:
    "Dues collected in cash with no reconciliation. Certificates of Origin issued by hand and easy to forge. No way to prove to government or funders what the chamber actually does. Chamberlink replaces the filing cabinet with infrastructure a modern institution deserves.",
  points: [
    { label: "No digital trail", detail: "Cash dues and manual receipts leave no audit trail for the chamber or its members." },
    { label: "Forgeable paperwork", detail: "Hand-issued Certificates of Origin can't be verified by customs or buyers in real time." },
    { label: "Invisible impact", detail: "Chambers can't show funders or government hard numbers on trade facilitated." },
  ],
};

export type ModuleAct = {
  index: string;
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
  colorway: "emerald" | "jade" | "fern" | "moss" | "pine";
};

export const modules: ModuleAct[] = [
  {
    index: "01",
    eyebrow: "REVENUE & GOVERNANCE CORE",
    title: "Every member, verified and paying.",
    tagline: "Membership · Certificates of Origin · Trade Fairs",
    body: "The chamber's core revenue engine, digitized end-to-end. Tiered dues, digital membership cards with QR verification, and eCO issuance all route through one split-settlement checkout — funds land in the chamber's and Tradely's accounts automatically, in real time. No manual reconciliation, no cash handling, no back door to mark something 'paid.'",
    bullets: [
      "Self-service member profiles, renewals, and digital ID cards",
      "Certificates of Origin: draft to issued, QR-verified for customs",
      "Trade fair booth reservations with automatic revenue-share splits",
    ],
    colorway: "emerald",
  },
  {
    index: "02",
    eyebrow: "TRADE FACILITATION & FINANCE",
    title: "Export paperwork, generated in minutes.",
    tagline: "Commercial Invoices · Packing Lists · Trade Documentation",
    body: "What used to take a staff member an afternoon — drafting a commercial invoice, packing list, or bundled export document set — now takes minutes. Exporters generate compliant paperwork themselves; chambers keep full visibility and control over every document that leaves the building.",
    bullets: [
      "Self-service document generator with instant PDF output",
      "Admin queue for chamber-issued documentation",
      "Foundation for trade finance enablement as chambers scale",
    ],
    colorway: "jade",
  },
  {
    index: "03",
    eyebrow: "BUSINESS INTELLIGENCE",
    title: "Turn transaction data into evidence.",
    tagline: "Trade Intelligence · Verified Business Data",
    body: "Every membership, certificate, and trade fair booking Chamberlink processes becomes structured data — not paperwork. Chamber leadership gets a real-time view of dues collected, certificates issued, and trade facilitated, the kind of evidence that wins funding conversations and government partnerships.",
    bullets: [
      "Live dashboards for chamber executives, not just admins",
      "Immutable audit trail on every financial and document action",
      "A data layer built to support verified business data APIs",
    ],
    colorway: "fern",
  },
  {
    index: "04",
    eyebrow: "TRADE PROMOTION & MARKET ACCESS",
    title: "Put your exporters in front of the world.",
    tagline: "Exporter Directory · Sponsored Trade Corridors",
    body: "A verified, searchable exporter directory turns chamber membership into market access — buyers and institutional partners can find and vet exporters directly. Sponsored trade corridors let embassies and foreign chambers back specific trade routes, connecting local businesses to demand on the other side.",
    bullets: [
      "Public, searchable exporter profiles with premium tiers",
      "Sponsored corridor pages backed by embassies and partner chambers",
      "Automatic corridor matching from certificate destination data",
    ],
    colorway: "moss",
  },
  {
    index: "05",
    eyebrow: "CAPACITY BUILDING & REPLICATION",
    title: "One platform. Every chamber, on its own terms.",
    tagline: "Academy · White-Label Provisioning",
    body: "An in-platform Academy delivers trade-certification courses so chamber staff and members build capability alongside the tools. And because Chamberlink is white-label from day one, Tradely can stand up a fully-branded, independently-operated chamber platform — data isolated, modules configured to that chamber's needs — in weeks, not years.",
    bullets: [
      "Course catalog with enrollment tied to active membership",
      "Fully white-label: branding, domain, and enabled-module set per chamber",
      "Logical data isolation — no chamber ever sees another's records",
    ],
    colorway: "pine",
  },
];

export const mandate = {
  eyebrow: "WHY THIS IS POSSIBLE",
  headline: "Built with NACCIMA, the national body with the mandate.",
  body:
    "A state chamber can't simply decide to issue Certificates of Origin the world will honor — that authority sits with NACCIMA, the national body mandated to issue Certificates of Origin recognized by the international community. Chamberlink exists to carry that mandate to every state chamber digitally: onboarded chambers issue NACCIMA-recognized eCOs, backed by customs and buyers abroad, without needing their own international accreditation.",
  pillars: [
    {
      label: "National mandate, local execution",
      detail: "NACCIMA's recognition flows through the platform to every onboarded state chamber's members.",
    },
    {
      label: "Onboarded, not built from scratch",
      detail: "Your chamber requests onboarding — Tradely and NACCIMA handle the accreditation and setup.",
    },
    {
      label: "Full autonomy after onboarding",
      detail: "Once live, your chamber manages its own members and modules independently, on its own branded instance.",
    },
  ],
};

export const trust = {
  eyebrow: "TRUST & COMPLIANCE",
  headline: "Bank-grade infrastructure, built for regulators as much as members.",
  body:
    "Every fee routes through a real-time split-settlement checkout with multi-gateway failover — there is no admin path to mark something paid off-platform. Every financial and document action writes to an immutable, append-only audit log.",
  badges: [
    { label: "Multi-gateway failover", detail: "Paystack, Flutterwave and Remita with automatic failover" },
    { label: "Split-settlement", detail: "Real-time fee routing to chamber and Tradely accounts" },
    { label: "RBAC + mandatory MFA", detail: "Role and ownership checks on every protected route" },
    { label: "Immutable audit log", detail: "Timestamped, append-only record of every financial action" },
    { label: "NDPA compliant", detail: "Data stays in Nigeria-based regions, encrypted at rest" },
    { label: "TLS 1.3 in transit", detail: "AES-256 at rest, HTTPS enforced everywhere" },
  ],
};

export const partners = {
  eyebrow: "IN PARTNERSHIP WITH",
  headline: "Backed by the bodies that make it official.",
  // Text-wordmark placeholders pending real logo files (SVG/PNG in
  // /public/partners/) — names below were verified via web search (current
  // as of this writing). Confirm before adding any further bodies.
  logos: [
    { name: "NACCIMA", abbr: "NACCIMA" },
    { name: "Federal Ministry of Industry, Trade and Investment", abbr: "FMITI" },
  ],
};

export const proof = {
  eyebrow: "LIVE IN PRODUCTION",
  headline: "KACCIMA was the first state chamber onboarded.",
  body:
    "The Kano Chamber of Commerce, Industry, Mines & Agriculture — established in 1921 — was the first chamber carried onto Chamberlink. Members renew dues, apply for NACCIMA-recognized Certificates of Origin, and reserve trade fair booths entirely online, while KACCIMA runs its own instance with full autonomy over its members and revenue.",
  partnerNote:
    "NACCIMA's national mandate is what makes every certificate issued through Chamberlink recognized internationally — the same mandate that's available to your state chamber once onboarded.",
  cta: { label: "See the KACCIMA tenant site", href: "https://kaccima.chamberlink.ng" },
};

export const finalCta = {
  eyebrow: "READY WHEN YOU ARE",
  headline: "Bring your state chamber onboard.",
  body: "Tell us about your chamber and we'll walk you through onboarding — NACCIMA-recognized certificates, new revenue streams, and real value for your members, on a platform your chamber runs independently.",
  ctaPrimary: { label: "Request Onboarding", href: "/contact" },
  ctaSecondary: { label: "Talk to Our Team", href: "mailto:partnerships@chamberlink.ng" },
};

export const footer = {
  description:
    "Chamberlink onboards Nigeria's state chambers of commerce onto one platform, in partnership with NACCIMA. Operated by Tradely LTD.",
  columns: [
    {
      title: "Platform",
      links: [
        { label: "Membership & Governance", href: "#platform" },
        { label: "Trade Facilitation", href: "#platform" },
        { label: "Business Intelligence", href: "#platform" },
        { label: "Market Access", href: "#platform" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "NACCIMA Mandate", href: "#mandate" },
        { label: "KACCIMA Tenant Site", href: "https://kaccima.chamberlink.ng" },
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
