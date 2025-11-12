"use client";

import { distributeEvenly, getInitials } from "@/constant/helperFunction";
import { Testimonial } from "@/constant/staticInternship";
import { useWindowSize } from "@/hooks/useWindowSize";
import { motion } from "framer-motion";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface TestimonialsColumnsProps {
  testimonials?: Testimonial[];
}

export const TestimonialsColumns = ({
  testimonials = [],
}: TestimonialsColumnsProps) => {
  const { isDesktop, isTablet } = useWindowSize();
  const numColumns = !isDesktop ? 3 : !isTablet ? 2 : 1;
  const splitedTestimonials = distributeEvenly(testimonials || [], numColumns);
  const durationData = {
    [0]: isTablet ? 30 : 15,
    [1]: 19,
    [2]: 17,
  };
  return (
    <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
      {testimonials?.length > 0 ? (
        splitedTestimonials?.map((testimonials, index) => (
          <div key={index} data-aos="fade">
            <motion.div
              animate={{
                translateY: "-50%",
              }}
              transition={{
                duration: durationData?.[index as keyof typeof durationData],
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              className="flex flex-col gap-6 pb-6 bg-background"
            >
              {[
                ...new Array(2).fill(0).map((_, index) => (
                  <React.Fragment key={index}>
                    {testimonials?.length > 0 &&
                      testimonials?.map(
                        ({ testimonial, image, name, role }, i) => (
                          <div
                            className="p-10 rounded-3xl bg-card shadow shadow-primary/10 w-full"
                            key={i}
                          >
                            <div>{testimonial}</div>
                            <div className="flex items-center gap-2 mt-5">
                              <Avatar>
                                <AvatarImage src={image} alt={name} />
                                <AvatarFallback>
                                  {getInitials(name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <div className="font-medium tracking-tight leading-5">
                                  {name}
                                </div>
                                <div className="leading-5 opacity-60 tracking-tight">
                                  {role}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </React.Fragment>
                )),
              ]}
            </motion.div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No testimonials found</p>
        </div>
      )}
    </div>
  );
};
