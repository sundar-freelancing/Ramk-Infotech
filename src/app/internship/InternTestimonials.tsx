"use client";

import { TestimonialsColumns } from "@/components/common/TestimonialsColumns";
import { Text3, Title1, Title2 } from "@/components/helper/Titles";
import { ContainerFluid } from "@/components/ui/Container";
import { testimonials } from "@/constant/staticInternship";
import { motion } from "framer-motion";
import React from "react";

export const InternTestimonials = () => {
  return (
    <ContainerFluid className="bg-background my-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center max-w-[540px] space-y-4 mx-auto"
      >
        <Title1>Testimonials</Title1>
        <Title2>What our users say</Title2>
        <Text3>See what our customers have to say about us.</Text3>
      </motion.div>

      <TestimonialsColumns testimonials={testimonials} />
    </ContainerFluid>
  );
};
