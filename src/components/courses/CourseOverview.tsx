"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppIcon } from "@/components/ui/Icon";
import { CourseInterface } from "@/store/interfaces";
import { cn } from "@/lib/utils";

interface CourseOverviewProps {
  course: CourseInterface;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  const stats = [
    {
      icon: "book-open" as const,
      label: "Lessons",
      value: `${course.lessons} Lessons`,
      color: "blue" as const,
    },
    {
      icon: "clock" as const,
      label: "Duration",
      value: course.duration,
      color: "purple" as const,
    },
    {
      icon: "graduation-cap" as const,
      label: "Students",
      value: `${course.students.toLocaleString()} Enrolled`,
      color: "green" as const,
    },
    {
      icon: "target" as const,
      label: "Level",
      value: course.level,
      color: "orange" as const,
    },
  ] as const;

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <AppIcon name="book-open" className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Course Overview
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors group"
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110",
                  stat.color === "blue" &&
                    "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                  stat.color === "purple" &&
                    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                  stat.color === "green" &&
                    "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                  stat.color === "orange" &&
                    "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                )}
              >
                <AppIcon name={stat.icon} className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-medium">
                  {stat.label}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              About This Course
            </h3>
          </div>
          <p className="text-muted-foreground leading-relaxed text-base pl-4">
            Master the fundamentals and advanced concepts of {course.category}.
            This comprehensive course is designed for{" "}
            {course.level.toLowerCase()} level students who want to build a
            strong foundation and advance their skills. With {course.lessons}{" "}
            engaging lessons over {course.duration}, you&apos;ll learn from
            industry experts and gain hands-on experience through practical
            projects.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

