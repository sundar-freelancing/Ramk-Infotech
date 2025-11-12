"use client";

import { CollegeIntro } from "./components/CollegeIntro";
import { CareerCounselling } from "./components/CareerCounselling";
import { CareerRoadmap } from "./components/CareerRoadmap";
import { MentorConnect } from "./components/MentorConnect";
import { GrowthStories } from "./components/GrowthStories";
import { ContactFormSection } from "@/components/common/ContactFormSection";

export default function CollegeStudents() {
  return (
    <>
      <CollegeIntro />
      <CareerCounselling />
      <CareerRoadmap />
      <MentorConnect />
      <GrowthStories />
      <ContactFormSection isFromCollegeStudents={true} />;
    </>
  );
}
