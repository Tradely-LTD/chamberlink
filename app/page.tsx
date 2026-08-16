"use client";

import { useState } from "react";
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
  Globe2,
  Landmark,
  LockKeyhole,
  Menu,
  Network,
  PlayCircle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import "./naccima-auth.css";

const steps = [
  { number: "01", title: "Create your account", text: "Register on the platform in minutes. Your platform account is separate from chamber membership." },
  { number: "02", title: "Submit your application", text: "Complete the four-step form, upload your supporting documents and review your calculated fee." },
  { number: "03", title: "Receive & verify", text: "Track review progress, download your issued certificate and share its verification code." },
];

const requirements = ["CAC registration document", "NEPC export licence or evidence", "Commercial invoice", "Applicant signature", "Mining licence, where applicable", "Chamber membership ID, where applicable"];

const services = [
  { icon: Network, title: "Business networking", text: "Find credible buyers, suppliers, investors and value-chain partners." },
  { icon: Globe2, title: "Trade missions & exhibitions", text: "Access curated trade events, missions and export corridors." },
  { icon: Landmark, title: "Financing opportunities", text: "Discover investment-readiness and business-development pathways." },
  { icon: Building2, title: "Policy representation", text: "Connect private-sector priorities to structured public–private dialogue." },
  { icon: Sparkles, title: "Capacity building", text: "Build practical expertise in export readiness, compliance and documentation." },
  { icon: SearchCheck, title: "Market intelligence", text: "Use sector insights and trade intelligence to make better decisions." },
];

const partners = ["Federal Ministry of Solid Minerals Development", "Nigerian Export Promotion Council", "Mining Cadastre Office", "Nigeria Customs Service", "Licensed mining companies", "Mineral processors"];

export default function Home() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [certInput, setCertInput] = useState("");

  const runVerify = () => {
    const value = certInput.trim();
    if (!value) return;
    setVerifyOpen(false);
    router.push(`/verify/${encodeURIComponent(value)}`);
  };

  return (
    <div className="naccima-shell overflow-hidden">
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
              <h1>Streamline your export with <span>Chamberlink</span></h1>
              <p className="hero-lede">A trusted digital path to your Solid Minerals Certificate of Origin. Submit with clarity, move through review with confidence and give buyers a certificate they can verify.</p>
              <div className="hero-actions">
                <Link href="/register" className="primary-button">Start an application <ArrowRight size={17} /></Link>
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
            <p>Mineral exporters deserve a process that feels as credible as the products they take to market. NACCIMA Chamberlink brings application, review, issuance and verification into one considered digital experience.</p>
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
            <div><div className="section-kicker">Beyond certification</div><h2>A stronger network<br /><em>for ambitious exporters.</em></h2></div>
            <p>Chamberlink connects exporters and chambers to practical digital services that support the full journey from compliance to commercial opportunity, within the NACCIMA ecosystem.</p>
          </div>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, text }) => (
              <div className="service-tile" key={title}>
                <span className="service-icon"><Icon size={21} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="tile-arrow"><ArrowRight size={16} /></span>
              </div>
            ))}
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
          <span>© 2026 NACCIMA Chamberlink. A digital trade initiative.</span>
          <span>Built for Nigeria&apos;s export future.</span>
        </div>
      </footer>

      <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
        <DialogContent className="verify-dialog">
          <DialogHeader>
            <div className="dialog-icon"><SearchCheck size={22} /></div>
            <DialogTitle>Verify an e-Certificate</DialogTitle>
            <DialogDescription>Enter a certificate number or verification code to check an issued certificate.</DialogDescription>
          </DialogHeader>
          <div className="verify-field">
            <input
              placeholder="e.g. NAC-2026-004821"
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runVerify()}
            />
            <Button onClick={runVerify} className="primary-button">Search <SearchCheck size={16} /></Button>
          </div>
          <p className="dialog-note"><LockKeyhole size={13} /> Public verification only displays approved certificate fields.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
