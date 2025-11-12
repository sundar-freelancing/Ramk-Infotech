"use client";

import { Container } from "@/components/ui/Container";
import { TestimonialsColumns } from "@/components/common/TestimonialsColumns";
import { studentsTestimonials } from "@/constant/staticInternship";
import { Title1, Title2 } from "@/components/helper/Titles";

export const GrowthStories = () => {
  return (
    <Container>
      <div className="text-center space-y-4 mb-12">
        <Title1>Growth Stories</Title1>
        <Title2>
          See how Ramk Infotech students turned learning into real
          opportunities.
        </Title2>
      </div>
      <TestimonialsColumns testimonials={studentsTestimonials} />
    </Container>
  );
};
