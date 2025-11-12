"use client";

import { Text3, Title1, Title2 } from "@/components/helper/Titles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/Container";
import { faqs } from "@/constant/staticInternship";
import React from "react";

export const InternFAQ = () => {
  return (
    <Container>
      <div className="space-y-8">
        <div className="text-center space-y-4" data-aos="fade-up">
          <Title1>Got Questions?</Title1>
          <Title2>Frequently Asked Questions</Title2>
          <Text3>
            Find answers to common questions about our internship program.
          </Text3>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} data-aos="fade-up">
              <AccordionTrigger className="px-6 text-left cursor-pointer no-underline!">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};
