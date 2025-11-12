"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/Icon";
import { CourseInterface } from "@/store/interfaces";

interface CourseSidebarProps {
  course: CourseInterface;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const features = [
    "Lifetime access",
    "Certificate of completion",
    "30-day money-back guarantee",
    "Mobile and desktop access",
  ];

  const courseDetails = [
    { icon: "book-open" as const, label: "Lessons", value: course.lessons },
    { icon: "clock" as const, label: "Duration", value: course.duration },
    { icon: "user" as const, label: "Level", value: course.level },
    {
      icon: "graduation-cap" as const,
      label: "Students",
      value: course.students.toLocaleString(),
    },
  ] as const;

  return (
    <Card
      className="sticky top-[70px] border border-gray-200 dark:border-gray-800 shadow-xl"
      data-aos="fade-up"
    >
      <CardContent className="p-6">
        {/* Price Section */}
        <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${course.price}
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            One-time payment • Lifetime access
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            variant="yellow"
            size="lg"
          >
            <AppIcon name="shopping-bag" className="w-5 h-5" />
            Enroll Now
          </Button>

          <Button
            className="w-full h-12 text-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            variant="outline"
            size="lg"
          >
            <AppIcon name="bookmark" className="w-5 h-5" />
            Bookmark Course
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Course Details */}
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <AppIcon name="info" className="w-4 h-4" />
            Course Details
          </h3>
          {courseDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50 dark:bg-card/50 hover:bg-gray-100 dark:hover:bg-card transition-colors"
            >
              <span className="text-muted-foreground flex items-center gap-2 font-medium">
                <AppIcon name={detail.icon} className="w-4 h-4" />
                {detail.label}
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {detail.value}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        {/* What's Included */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <AppIcon name="check-circle" className="w-4 h-4 text-green-500" />
            What&apos;s Included
          </h3>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group"
            >
              <AppIcon
                name="check-circle"
                className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
