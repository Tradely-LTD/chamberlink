import CorporateNavbar from "@/components/cinematic/CorporateNavbar";
import DarkJourney from "@/components/cinematic/DarkJourney";
import HowItWorksSection from "@/components/cinematic/HowItWorksSection";
import ServicesSection from "@/components/cinematic/ServicesSection";
import TrustSection from "@/components/cinematic/TrustSection";
import PartnersSection from "@/components/cinematic/PartnersSection";
import FinalCtaSection from "@/components/cinematic/FinalCtaSection";
import CorporateFooter from "@/components/cinematic/CorporateFooter";

export default function Home() {
  return (
    <>
      <CorporateNavbar />
      <main>
        {/* Dark section 1/1 — hero, three.js trade network. Everything below
            is light-mode, per the site's "Trust & Authority" system. */}
        <DarkJourney />
        <HowItWorksSection />
        <ServicesSection />
        <TrustSection />
        <PartnersSection />
        <FinalCtaSection />
      </main>
      <CorporateFooter />
    </>
  );
}
