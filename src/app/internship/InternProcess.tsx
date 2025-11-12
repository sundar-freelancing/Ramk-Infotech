"use client";

import { Roadmap, RoadmapStep } from "@/components/common/Roadmap";
import { processSteps } from "@/constant/staticInternship";

// Color mapping for internship process steps
const stepColors: Array<{
  color: string;
  bgColor: string;
  hex: string;
}> = [
  {
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    hex: "37 99 235", // blue-600
  },
  {
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    hex: "147 51 234", // purple-600
  },
  {
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    hex: "22 163 74", // green-600
  },
  {
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    hex: "234 88 12", // orange-600
  },
  {
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    hex: "219 39 119", // pink-600
  },
];

export function InternProcess() {
  // Map processSteps to RoadmapStep format
  const roadmapSteps: RoadmapStep[] = processSteps.map((step, index) => ({
    ...step,
    ...stepColors[index % stepColors.length],
  }));

  return (
    <Roadmap
      title="How It Works"
      subtitle="Internship Process"
      description="Internship Process / Steps - Follow our streamlined process from application to onboarding"
      steps={roadmapSteps}
    />
  );
}
