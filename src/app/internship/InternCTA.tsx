"use client";

import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/button";
import { Text3, Title1, Title2 } from "@/components/helper/Titles";
import { CustomBg } from "@/hooks/useCustomBg";

export function InternCTA() {
  return (
    <Container wrapperClassName="relative py-16 md:py-24 bg-green-50 dark:bg-card">
      <CustomBg isDarkOnly={true} />
      <div
        className="text-center space-y-6 max-w-3xl mx-auto"
        data-aos="fade-up"
      >
        <Title1>Get Started</Title1>
        <Title2>Ready to Start Your Journey?</Title2>
        <Text3>
          Take the first step towards building your career. Apply now and join
          our dynamic team of interns!
        </Text3>
        <div className="pt-4">
          <PrimaryButton href="#apply" dataAos="zoom-in" dataAosDelay="200">
            Apply Now
          </PrimaryButton>
        </div>
      </div>
    </Container>
  );
}
