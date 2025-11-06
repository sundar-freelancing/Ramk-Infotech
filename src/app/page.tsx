"use client";
import { DigitalAcademy } from "@/components/sections/DigitalAcademy";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";

export default function Home() {
  return (
    <>
      <DigitalAcademy />
      <CategoriesSection />
      <FeaturesSection />
      <CoursesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
    </>
  );
}
