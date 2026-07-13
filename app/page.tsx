import CorporateNavbar from "@/components/cinematic/CorporateNavbar";
import DarkJourney from "@/components/cinematic/DarkJourney";
import TrustSection from "@/components/cinematic/TrustSection";
import PartnersSection from "@/components/cinematic/PartnersSection";
import ProofSection from "@/components/cinematic/ProofSection";
import FinalCtaSection from "@/components/cinematic/FinalCtaSection";
import CorporateFooter from "@/components/cinematic/CorporateFooter";

export default function Home() {
  return (
    <>
      <CorporateNavbar />
      <main id="platform">
        <DarkJourney />
        <TrustSection />
        <PartnersSection />
        <ProofSection />
        <FinalCtaSection />
      </main>
      <CorporateFooter />
    </>
  );
}
