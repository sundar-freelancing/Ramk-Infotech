"use client";

import { ContainerFluid } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Text1,
  Text2,
  Title1,
  Title2,
  Title4,
} from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";
import Image from "next/image";
import { images } from "@/constant/images";
import { CustomBg } from "@/hooks/useCustomBg";

const careerPaths = [
  {
    icon: "monitor",
    title: "Web Development",
    description: "Love building things? Start with HTML to React.",
    color: "text-blue-600 dark:text-blue-400",
    hex: "37 99 235", // blue-600
  },
  {
    icon: "brain",
    title: "AI / ML",
    description: "Into logic & math? Let's explore machine intelligence.",
    color: "text-purple-600 dark:text-purple-400",
    hex: "147 51 234", // purple-600
  },
  {
    icon: "palette",
    title: "Design & Branding",
    description: "Creative? Learn UI/UX and design tools.",
    color: "text-pink-600 dark:text-pink-400",
    hex: "219 39 119", // pink-600
  },
  {
    icon: "cloud",
    title: "Cloud & Networking",
    description: "Like systems? Build strong backend knowledge.",
    color: "text-green-600 dark:text-green-400",
    hex: "22 163 74", // green-600
  },
];

export const CareerCounselling = () => {
  return (
    <ContainerFluid wrapperClassName="bg-green-50 dark:bg-card py-20 relative">
      <CustomBg />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0">
          <Image
            src={images.shape3}
            alt="shape1"
            width={50}
            className="animate-shape-1 z-10"
          />
        </div>
        <div className="absolute bottom-0 right-0 rotate-90">
          <Image src={images.shape3} alt="shape1" width={50} className="z-10" />
        </div>
        <div className="space-y-6">
          <Title1>Career Counselling</Title1>
          <Title2>Still Confused Which Field Fits You?</Title2>
          <Text2>
            We&apos;ll help you find the right skill path based on your interest
            and background.
          </Text2>
          <PrimaryButton data-aos="fade-up">
            Book a Free Counselling Call
          </PrimaryButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(() => {
            const midpoint = Math.ceil(careerPaths.length / 2);
            const leftColumn = careerPaths.slice(0, midpoint);
            const rightColumn = careerPaths.slice(midpoint);

            return (
              <>
                <div className="flex flex-col gap-6 md:mt-10">
                  {leftColumn.map((path, index) => (
                    <div
                      key={path.title}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="space-y-2 p-8 shadow dark:border h-72 flex flex-col transition-all duration-300 group rounded bg-white/30 backdrop-blur-xs"
                      style={{
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `rgb(${path.hex})`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <AppIcon
                        name={path.icon}
                        className={cn(
                          "w-10 h-10 group-hover:text-white! transition-colors duration-300",
                          path.color
                        )}
                      />
                      <div className="space-y-2 mt-auto">
                        <Title4
                          aos={false}
                          className="group-hover:text-white transition-colors duration-300"
                        >
                          {path.title}
                        </Title4>
                        <Text1
                          aos={false}
                          className="group-hover:text-white transition-colors duration-300"
                        >
                          {path.description}
                        </Text1>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-6">
                  {rightColumn.map((path, index) => (
                    <div
                      key={path.title}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="space-y-2 p-8 shadow bg-white/30 backdrop-blur-xs dark:border h-72 flex flex-col transition-all duration-300 group rounded"
                      style={{
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `rgb(${path.hex})`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <AppIcon
                        name={path.icon}
                        className={cn(
                          "w-10 h-10 group-hover:text-white! transition-colors duration-300",
                          path.color
                        )}
                      />
                      <div className="space-y-2 mt-auto">
                        <Title4
                          aos={false}
                          className="group-hover:text-white transition-colors duration-300"
                        >
                          {path.title}
                        </Title4>
                        <Text1
                          aos={false}
                          className="group-hover:text-white transition-colors duration-300"
                        >
                          {path.description}
                        </Text1>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </ContainerFluid>
  );
};
