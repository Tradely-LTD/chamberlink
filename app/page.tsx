"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  CircleCheck,
  FileCheck2,
  FileText,
  Globe2,
  GraduationCap,
  Landmark,
  LockKeyhole,
  Menu,
  Network,
  PlayCircle,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import "./naccima-auth.css";

const steps = [
  { number: "01", title: "Create your account", text: "Register on the platform in minutes. Your platform account is separate from chamber membership." },
  { number: "02", title: "Submit your application", text: "Complete the four-step form, upload your supporting documents and review your calculated fee." },
  { number: "03", title: "Receive & verify", text: "Track review progress, download your issued certificate and share its verification code." },
];

const requirements = ["CAC registration document", "NEPC export licence or evidence", "Commercial invoice", "Applicant signature", "Mining licence, where applicable", "Chamber membership ID, where applicable"];

const chamberlinkServices = [
  { icon: ShieldCheck, title: "e-Certificate of Origin", text: "Apply for a traceable Solid Minerals Certificate of Origin, monitor review and share a public verification link." },
  { icon: FileText, title: "Trade documentation", text: "Generate branded commercial invoices, packing lists and export-ready records from one digital workspace." },
  { icon: UsersRound, title: "Exporter profile visibility", text: "Build an export profile that helps qualified buyers, chambers and partners discover your business." },
  { icon: GraduationCap, title: "Chamber e-learning", text: "Access practical courses, compliance guidance and learning content published by your chamber." },
  { icon: Network, title: "Multi-chamber membership", text: "Connect multiple chamber memberships, manage IDs and use the services attached to each relationship." },
  { icon: Globe2, title: "Trade fairs and missions", text: "Discover trade fairs, exhibitions and missions that connect Nigerian exporters to new markets." },
  { icon: Route, title: "Trade corridors", text: "Follow priority trade corridors and understand the documents, partners and opportunities along the route." },
  { icon: Landmark, title: "Market and policy intelligence", text: "Find business intelligence, investment pathways and structured representation for legitimate trade." },
  { icon: Sparkles, title: "Business networking", text: "Connect with buyers, suppliers, processors and value-chain partners across the mineral economy." },
];

const partners = ["Federal Ministry of Solid Minerals Development", "Nigerian Export Promotion Council", "Mining Cadastre Office", "Nigeria Customs Service", "Licensed mining companies", "Mineral processors"];

export default function Home() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [certInput, setCertInput] = useState("");

  // Subtle parallax on the mineral-operation photo as it scrolls through view.
  useEffect(() => {
    const band = document.querySelector<HTMLElement>(".mineral-visual-band");
    const image = band?.querySelector<HTMLImageElement>("img");
    if (!band || !image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = band.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (progress - 0.5) * 24;
      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  const runVerify = () => {
    const value = certInput.trim();
    if (!value) return;
    setVerifyOpen(false);
    router.push(`/verify/${encodeURIComponent(value)}`);
  };

  return (
    <div className="naccima-shell overflow-x-hidden">
      <header className="site-header">
        <div className="container flex h-[78px] items-center justify-between">
          <a href="#top" className="brand-mark" aria-label="NACCIMA Chamberlink home">
            <span className="brand-symbol"><img className="brand-logo" src="/naccima-seal.png" alt="NACCIMA" /></span>
            <span><strong>NACCIMA</strong><em>Chamberlink</em></span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#chambers" className="nav-link">For chambers</a>
            <a href="#partners" className="nav-link">Partners</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => setVerifyOpen(true)} className="ghost-link">Verify a certificate</button>
            <Link href="/register" className="ghost-link">Register</Link>
            <Link href="/login" className="nav-cta">Sign in <ArrowRight size={16} /></Link>
          </div>
          <button className="mobile-menu-button lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="mobile-nav lg:hidden">
            <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How it works</a>
            <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
            <a href="#chambers" onClick={() => setMobileOpen(false)}>For chambers</a>
            <button onClick={() => setVerifyOpen(true)}>Verify a certificate</button>
            <Link href="/register">Register</Link>
            <Link href="/login" className="mobile-nav-cta">Sign in <ArrowRight size={16} /></Link>
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid container">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" />NACCIMA digital trade infrastructure</div>
              <h1 className="hero-headline">Streamline your solid minerals export with <span>NACCIMA Chamberlink</span></h1>
              <p className="hero-lede">One digital trade platform for Nigerian exporters and chambers: create export documents, build visibility, manage memberships, learn, join opportunities and obtain a Solid Minerals Certificate of Origin buyers can verify.</p>
              <div className="hero-actions">
                <Link href="/register" className="primary-button">Apply for a Certificate <ArrowRight size={17} /></Link>
                <button onClick={() => setVerifyOpen(true)} className="secondary-button"><PlayCircle size={18} /> Verify a certificate</button>
              </div>
              <div className="hero-trust">
                <div className="avatar-stack"><span>FM</span><span>NE</span><span>MC</span><span>+</span></div>
                <p>Built for legitimate mineral trade<br /><strong>with NACCIMA and industry partners</strong></p>
              </div>
            </div>
            <div className="hero-visual" aria-label="Certificate workflow preview">
              <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
              <div className="certificate-card">
                <div className="certificate-top"><span className="mini-seal"><ShieldCheck size={16} /></span><div><small>NIGERIAN ASSOCIATION OF</small><b>CHAMBERS OF COMMERCE</b></div><span className="verified-chip"><CircleCheck size={13} /> Verified</span></div>
                <div className="certificate-title">Certificate of Origin</div><div className="certificate-rule" />
                <div className="certificate-lines"><div><small>Certificate number</small><strong>NAC-2026-004821</strong></div><div><small>Mineral</small><strong>Lithium ore concentrate</strong></div><div className="two-col"><div><small>Declared origin</small><strong>Nigeria</strong></div><div><small>Destination</small><strong>Germany</strong></div></div></div>
                <div className="certificate-footer"><span><LockKeyhole size={13} /> Secure digital record</span><span className="qr-placeholder">▦</span></div>
              </div>
              <div className="floating-note note-top"><span className="note-icon green"><Check size={14} /></span><span><strong>Documents verified</strong><small>Application is review-ready</small></span></div>
              <div className="floating-note note-bottom"><span className="note-icon gold"><FileCheck2 size={14} /></span><span><strong>Export-ready records</strong><small>Clear, traceable and shareable</small></span></div>
            </div>
          </div>
          <div className="hero-glow" />
        </section>

        <section className="trust-strip"><div className="container trust-strip-inner"><span>One platform for</span><div><ShieldCheck size={18} /> Exporters</div><div><Building2 size={18} /> Chambers</div><div><ShieldCheck size={18} /> Public verification</div><div><Globe2 size={18} /> Global trade</div></div></section>

        <section className="section container problem-section">
          <div className="section-kicker">A clearer route to export</div>
          <div className="split-heading">
            <h2>When every document matters, <em>confidence matters too.</em></h2>
            <p>Mineral exporters deserve more than a certificate form. Chamberlink brings documents, exporter visibility, chamber services, learning, opportunities and certificate verification into one considered digital trade experience.</p>
          </div>
          <div className="mineral-visual-band">
            <img className="mineral-visual-image" src="/naccima-mineral-operation.webp" alt="Mineral processing machinery crushing and screening solid minerals at an open-pit operation" />
            <div className="mineral-visual-caption">
              <span>Solid minerals in motion</span>
              <strong>From responsible processing to export-ready records.</strong>
            </div>
          </div>
          <div className="problem-grid">
            <Card className="problem-card muted-card"><CardContent><span className="problem-number">01</span><h3>Disconnected paperwork</h3><p>Repeated submissions and scattered documents create avoidable delays for exporters and reviewers.</p></CardContent></Card>
            <Card className="problem-card accent-card"><CardContent><span className="problem-number">02</span><h3>One trusted workflow</h3><p>Complete structured information, upload evidence and track your application from one secure workspace.</p></CardContent></Card>
            <Card className="problem-card dark-card"><CardContent><span className="problem-number">03</span><h3>Proof that travels</h3><p>Issued certificates carry a verification reference that buyers and authorised stakeholders can check.</p></CardContent></Card>
          </div>
        </section>

        <section id="how-it-works" className="section cream-section">
          <div className="container">
            <div className="center-heading">
              <div className="section-kicker">The simple way through</div>
              <h2>From application to certificate<br /><em>in three considered steps.</em></h2>
              <p>Designed to make the right information easy to provide and the next action easy to understand.</p>
            </div>
            <div className="steps-grid">
              {steps.map((step) => (
                <div className="step-item" key={step.number}>
                  <div className="step-number">{step.number}</div>
                  <div className="step-connector" />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <div className="requirements-panel">
              <div>
                <div className="section-kicker">Before you begin</div>
                <h3>Keep these requirements close.</h3>
                <p>Have your core company, export and commercial documents ready for a smoother submission.</p>
              </div>
              <div className="requirement-list">
                {requirements.map((item) => <div key={item}><Check size={15} />{item}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section container services-section">
          <div className="services-heading">
            <div><div className="section-kicker">Chamberlink digital trade services</div><h2>More than a certificate.<br /><em>A platform for export growth.</em></h2></div>
            <p>Chamberlink connects exporters and chambers to practical digital trade services—from branded documentation and exporter visibility to learning, memberships, trade fairs, missions and corridors—within the NACCIMA ecosystem.</p>
          </div>
          <div className="services-grid">
            {chamberlinkServices.map(({ icon: Icon, title, text }) => (
              <div className="service-tile" key={title}>
                <span className="service-icon"><Icon size={21} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="tile-arrow"><ArrowRight size={16} /></span>
              </div>
            ))}
          </div>
        </section>

        <section className="section container material-story">
          <div className="material-story-heading">
            <div><div className="section-kicker">The material behind the record</div><h2>Quality you can<br /><em>trace and trade.</em></h2></div>
            <p>From graded mineral lots to orderly loading, better records help legitimate Nigerian exports move with clarity.</p>
          </div>
          <div className="material-story-grid">
            <figure>
              <img src="/naccima-graded-minerals.webp" alt="Graded solid mineral stones prepared for export" />
              <figcaption><span>01</span><strong>Graded mineral lots</strong></figcaption>
            </figure>
            <figure>
              <img src="/naccima-ready-for-journey.jpg" alt="Orderly mineral logistics and loading area prepared for export" />
              <figcaption><span>02</span><strong>Ready for the journey</strong></figcaption>
            </figure>
          </div>
        </section>

        <section id="partners" className="partner-section">
          <div className="container partner-layout">
            <div>
              <div className="section-kicker light">Built with the ecosystem</div>
              <h2>Trust grows when<br /><em>the network connects.</em></h2>
              <p>We bring public institutions, chambers, operators and technology partners into a clearer shared process for legitimate mineral trade.</p>
              <Button className="light-button" onClick={() => setVerifyOpen(true)}>Explore verification <ChevronRight size={17} /></Button>
            </div>
            <div className="partner-list">
              {partners.map((partner, i) => <div key={partner}><span>0{i + 1}</span><strong>{partner}</strong><ArrowRight size={17} /></div>)}
            </div>
          </div>
        </section>

        <section id="chambers" className="section container chamber-section">
          <div className="chamber-card">
            <div className="chamber-content">
              <div className="section-kicker">For Chambers of Commerce</div>
              <h2>Turn your chamber<br /><em>into a gateway.</em></h2>
              <p>Onboard your chamber, improve exporter visibility, connect membership IDs and help businesses access certificates, learning and trade opportunities.</p>
              <div className="chamber-actions">
                <Link href="/for-chambers" className="primary-button">Request onboarding <ArrowRight size={17} /></Link>
                <a href="#services" className="text-link">See chamber services <ChevronRight size={16} /></a>
              </div>
            </div>
            <div className="chamber-graphic">
              <div className="graphic-ring ring-a" /><div className="graphic-ring ring-b" />
              <div className="graphic-core"><Building2 size={38} /><span>Chamber<br />network</span></div>
              <div className="graphic-tag tag-a">Exporter visibility</div>
              <div className="graphic-tag tag-b">Member verification</div>
              <div className="graphic-tag tag-c">Trade access</div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div><div className="section-kicker light">Your next export begins here</div><h2>Make the paperwork<br /><em>work harder for you.</em></h2></div>
            <div>
              <p>Register on the platform, prepare your requirements and take the first step toward a clearer certificate process.</p>
              <Link href="/register" className="light-button">Create your account <ArrowRight size={17} /></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <a href="#top" className="brand-mark footer-brand">
            <span className="brand-symbol"><img className="brand-logo" src="/naccima-seal.png" alt="NACCIMA" /></span>
            <span><strong>NACCIMA</strong><em>Chamberlink</em></span>
          </a>
          <div className="footer-links">
            <a href="#how-it-works">How it works</a>
            <a href="#services">Services</a>
            <a href="#chambers">For chambers</a>
            <button onClick={() => setVerifyOpen(true)}>Verify certificate</button>
          </div>
          <div className="footer-secure"><LockKeyhole size={15} /> Secure digital trade records</div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 NACCIMA Chamberlink. A digital trade initiative | Powered by Tradely LTD</span>
          <span>Built for Nigeria&apos;s export future.</span>
        </div>
      </footer>

      <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
        {/*
          Radix Dialog portals to document.body, OUTSIDE the .naccima-shell
          wrapper this whole page renders inside — so the descendant selector
          this used to rely on (.naccima-shell .verify-dialog, .naccima-shell
          .primary-button, and even .naccima-shell's own font-family) never
          matched here at all. That's why this modal looked like a bare
          shadcn default instead of the rest of the page: it was one. Styled
          directly with the landing page's actual palette/fonts below instead
          of depending on an ancestor class that can't reach it.
        */}
        <DialogContent className="w-full sm:max-w-md rounded-3xl border border-white/60 bg-white/70 p-0 shadow-[0_35px_90px_-25px_rgba(2,103,191,0.45)] overflow-hidden font-[Manrope] backdrop-blur-2xl">
          {/* Soft color glow blobs — clipped by overflow-hidden above, purely decorative */}
          <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-[#028853]/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#0267bf]/20 blur-3xl" aria-hidden="true" />

          <div className="relative p-7">
            <DialogHeader>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0267bf] to-[#028853] text-white flex items-center justify-center shadow-[0_10px_25px_-8px_rgba(2,103,191,0.6)]">
                <SearchCheck size={22} />
              </div>
              <DialogTitle className="font-['Playfair_Display'] italic text-2xl text-[#132238] mt-4">
                Verify an e-Certificate
              </DialogTitle>
              <DialogDescription className="text-[#627085] text-sm leading-relaxed">
                Enter a certificate number or verification code to check an issued certificate.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-2.5 mt-6">
              <input
                placeholder="e.g. NAC-2026-004821"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runVerify()}
                className="flex-1 min-w-0 rounded-xl border border-[#dfe6ee] bg-white/80 px-4 py-3 text-sm text-[#132238] placeholder:text-[#94a3b8] outline-none focus:border-[#0267bf] focus:ring-2 focus:ring-[#0267bf]/15 transition"
              />
              <Button
                onClick={runVerify}
                className="rounded-xl bg-gradient-to-br from-[#0267bf] to-[#028853] text-white font-bold px-5 shadow-[0_10px_25px_-8px_rgba(2,103,191,0.5)] hover:shadow-[0_14px_30px_-8px_rgba(2,103,191,0.6)] hover:-translate-y-0.5 transition-all"
              >
                Search <SearchCheck size={16} />
              </Button>
            </div>

            <p className="flex items-center gap-1.5 mt-5 text-[11px] text-[#627085]">
              <LockKeyhole size={13} className="text-[#00711F]" />
              Public verification only displays approved certificate fields.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
