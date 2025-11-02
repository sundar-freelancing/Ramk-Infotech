import { HeroBanner } from "@/components/common/HeroBanner";
import { CompanySection } from "@/components/sections/CompanySection";
import { DigitalAcademy } from "@/components/sections/DigitalAcademy";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { OurSponserSection } from "@/components/sections/OurSponserSection";
export default function About() {
  return (
    <>
      <HeroBanner />
      <DigitalAcademy />
      <FeaturesSection />
      <OurSponserSection />
      <CompanySection />
    </>
  );
}
