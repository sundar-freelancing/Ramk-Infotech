"use client";

import { Roadmap, RoadmapStep } from "@/components/common/Roadmap";

const roadmapSteps: RoadmapStep[] = [
  {
    id: "1",
    step: 1,
    title: "Attend Career Talk",
    description:
      "Join our informative sessions to understand career opportunities",
    icon: "message-square",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    hex: "37 99 235", // blue-600
  },
  {
    id: "2",
    step: 2,
    title: "Choose Skill Track",
    description: "Select the path that aligns with your interests and goals",
    icon: "route",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    hex: "147 51 234", // purple-600
  },
  {
    id: "3",
    step: 3,
    title: "Learn Basics → Internship",
    description:
      "Master fundamentals and gain hands-on experience through internships",
    icon: "book-open",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    hex: "22 163 74", // green-600
  },
  {
    id: "4",
    step: 4,
    title: "Work on Real Projects",
    description: "Build portfolio with industry-relevant projects",
    icon: "briefcase",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    hex: "234 88 12", // orange-600
  },
  {
    id: "5",
    step: 5,
    title: "Build Resume",
    description:
      "Craft a professional resume showcasing your skills and projects",
    icon: "file-text",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    hex: "219 39 119", // pink-600
  },
  {
    id: "6",
    step: 6,
    title: "Get Placement or Freelance Start",
    description: "Land your dream job or start your freelance journey",
    icon: "rocket",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    hex: "202 138 4", // yellow-600
  },
];

export const CareerRoadmap = () => {
  return (
    <Roadmap
      title="Your Career Growth Roadmap"
      subtitle="Follow this proven path from learning to landing your first opportunity"
      steps={roadmapSteps}
    />
  );
};
