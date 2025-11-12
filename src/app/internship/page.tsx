"use client";

import { OurSponserSection } from "@/components/sections/OurSponserSection";
import { InternAboutProgram } from "./InternAboutProgram";
import { InternBenefits } from "./InternBenefits";
import { InternRoles } from "./InternRoles";
import { InternProcess } from "./InternProcess";
import { InternTestimonials } from "./InternTestimonials";
import { InternFAQ } from "./InternFAQ";
import { InternCTA } from "./InternCTA";

export default function Internship() {
  return (
    <>
      <InternAboutProgram />
      <OurSponserSection wrapperClassName="py-25 bg-green-50 dark:bg-card relative" isCustomBg={true} />
      <InternBenefits />
      <InternRoles />
      <InternProcess />
      <InternTestimonials />
      <InternCTA />
      <InternFAQ />
    </>
  );
}
