import CorporateNavbar from "@/components/cinematic/CorporateNavbar";
import DarkJourney from "@/components/cinematic/DarkJourney";
import ProblemAct from "@/components/cinematic/ProblemAct";
import ModuleAct from "@/components/cinematic/ModuleAct";
import MandateAct from "@/components/cinematic/MandateAct";
import TrustSection from "@/components/cinematic/TrustSection";
import PartnersSection from "@/components/cinematic/PartnersSection";
import ProofSection from "@/components/cinematic/ProofSection";
import FinalCtaSection from "@/components/cinematic/FinalCtaSection";
import CorporateFooter from "@/components/cinematic/CorporateFooter";
import { modules } from "@/lib/content/homeCopy";

export default function Home() {
  return (
    <>
      <CorporateNavbar />
      <main id="platform">
        {/* Dark section 1/2 — hero, three.js trade network */}
        <DarkJourney />
        {/* Light-mode from here down, with dark section 2/2 (mandate) as a
            deliberate interruption for institutional weight. */}
        <ProblemAct />
        {modules.map((mod, i) => (
          <ModuleAct key={mod.index} module={mod} position={i} />
        ))}
        <MandateAct />
        <TrustSection />
        <PartnersSection />
        <ProofSection />
        <FinalCtaSection />
      </main>
      <CorporateFooter />
    </>
  );
}
