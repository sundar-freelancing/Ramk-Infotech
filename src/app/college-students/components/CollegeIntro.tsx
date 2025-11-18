"use client";

import { Text1, Text2, Title1, Title3 } from "@/components/helper/Titles";
import { PrimaryButton } from "@/components/ui/button";
import { ContainerFluid } from "@/components/ui/Container";
import { images } from "@/constant/images";
import { GraduationCap, Target, TrendingUp, BookOpen } from "lucide-react";
import Image from "next/image";

const pathSteps = [
  {
    icon: BookOpen,
    label: "Learn",
    color: "text-blue-500",
    hex: "59 59 230",
  },
  {
    icon: Target,
    label: "Practice",
    color: "text-green-500",
    hex: "22 163 74",
  },
  {
    icon: TrendingUp,
    label: "Project",
    color: "text-red-500",
    hex: "190 38 95",
  },
  {
    icon: GraduationCap,
    label: "Job",
    color: "text-yellow-500",
    hex: "234 179 8",
  },
];

export const CollegeIntro = () => {
  return (
    <ContainerFluid>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 justify-between items-center">
        <Image
          src={images.collegeIntroImg}
          alt="College Intro"
          className="object-cover w-full lg:col-span-6"
          data-aos="fade-right"
          data-aos-delay={100}
        />
        <div className="space-y-6 w-full lg:col-span-5">
          <Title1>Direction Matters – Not Just Degrees</Title1>
          <Title3>
            Success comes from direction, not just degrees. We guide you from
            classroom to career.
          </Title3>
          <Text2>
            Learn, practice, build projects, and land your dream job with
            industry-focused training.
          </Text2>
          <div className="space-y-4">
            {pathSteps.map((step, index) => (
              <div
                key={step.label}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex items-center gap-3 p-3 px-6 rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgb(${step.hex} / 0.14), rgb(${step.hex} / 0))`,
                }}
              >
                <step.icon className={`w-6 h-6 ${step.color}`} />
                <Text1>{step.label}</Text1>
              </div>
            ))}
          </div>
          <PrimaryButton data-aos="fade-up" href="#contact-form">Get Started</PrimaryButton>
        </div>
      </div>
    </ContainerFluid>
  );
};
