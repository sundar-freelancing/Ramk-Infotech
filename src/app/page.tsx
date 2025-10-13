"use client";

import Image from "next/image";
import { images } from "@/constant/images";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef } from "react";
import Typewriter, { TypewriterClass } from "typewriter-effect";
import { DigitalAcademy } from "@/components/sections/DigitalAcademy";
import { PrimaryButton } from "@/components/ui/button";
import { pageLink } from "@/constant/pageURL";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { Container } from "@/components/ui/Container";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  const { isTablet } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && !isTablet) {
      ref.current.style.transform = `translateY(-${ref.current.offsetTop}px)`;
    } else if (ref.current && isTablet) {
      ref.current.style.transform = `translateY(-70px)`;
    }
  }, [isTablet]);

  const handleInit = (typewriter: TypewriterClass) => {
    typewriter
      .typeString("Online")
      .pauseFor(1500)
      .deleteAll()
      .typeString("Offline")
      .pauseFor(1500)
      .deleteAll()
      .typeString("Everywhere")
      .pauseFor(1500)
      .deleteAll()
      .start();
  };

  return (
    <>
      <div
        ref={ref}
        className="min-h-[600px] dark:bg-gray-900 h-screen flex items-center lg:items-end justify-center main-hero relative !max-h-[800px]"
      >
        <Container>
          <div
            className="grid lg:grid-cols-2 gap-12 items-center pt-20"
            data-aos="fade-up"
          >
            {/* Left Side - Content */}
            <div className="text-left space-y-8">
              {/* Decorative Plus Signs */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Best{" "}
                <div className="bg-yellow-400  px-3 py-1 rounded-lg inline-block">
                  <Typewriter
                    onInit={handleInit}
                    options={{
                      delay: 50,
                      loop: true,
                      wrapperClassName: "bg-transparent",
                    }}
                  />
                </div>{" "}
                <br />
                Platform to Learn Everything
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                Excedteur sint occaecat cupidatat non proident sunt in culpa qui
                officia deserunt mollit.
              </p>

              {/* Call-to-Action Button */}
              <PrimaryButton href={pageLink.courses}>
                Find Courses
              </PrimaryButton>
            </div>

            {/* Right Side - Image Placeholder */}
            {!isTablet && (
              <div className="flex justify-center lg:justify-end hero-image relative overflow-hidden">
                <Image
                  src={images.heroimg}
                  alt="Hero Image"
                  width={500}
                  height={500}
                  className="z-2 relative"
                />
              </div>
            )}
          </div>
        </Container>
      </div>

      <DigitalAcademy />
      <CategoriesSection />
      <FeaturesSection />
      <CoursesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FooterSection />
    </>
  );
}
