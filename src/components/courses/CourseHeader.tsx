"use client";

import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AppIcon } from "@/components/ui/Icon";
import { CourseInterface } from "@/store/interfaces";
import { cn } from "@/lib/utils";
import { Title2 } from "../helper/Titles";

interface CourseHeaderProps {
  course: CourseInterface;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <AppIcon
      name="star"
      key={i}
      className={cn(
        "w-5 h-5 transition-colors",
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300 dark:text-gray-600"
      )}
    />
  ));
};

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Course Image */}
      <div className="lg:w-1/3 flex-shrink-0">
        <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 group" data-aos="fade-up">
          <Image
            src={course.image}
            alt={course.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Course Info */}
      <div className="flex-1 space-y-6">
        {/* Badges and Rating */}
        <div className="flex flex-wrap items-center gap-3" data-aos="fade-up">
          <span className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow">
            {course.category}
          </span>
          <span
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
            data-aos="fade-up"
          >
            {course.level}
          </span>
          <div
            className="flex items-center gap-1 ml-auto bg-white dark:bg-card px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm"
            data-aos="fade-up"
          >
            {renderStars(course.rating)}
            <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {course.rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              ({course.reviews})
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <Title2 data-aos="fade-up" className="mb-6">
            {course.name}
          </Title2>

          {/* Instructor Info */}
          <div
            className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-gray-50 dark:bg-card/50 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-card transition-colors"
            data-aos="fade-up"
          >
            <Avatar className="w-14 h-14 border-2 border-gray-200 dark:border-gray-700 ring-2 ring-offset-2 ring-offset-background ring-gray-200 dark:ring-gray-700">
              <AvatarImage
                src={course.instructor.avatar}
                alt={course.instructor.name}
              />
              <AvatarFallback className="text-lg font-semibold">
                {course.instructor.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Instructor
              </p>
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {course.instructor.name}
              </p>
            </div>
          </div>

          {/* Course Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            {(
              [
                {
                  icon: "book-open" as const,
                  label: "Lessons",
                  value: course.lessons,
                  color: "blue" as const,
                },
                {
                  icon: "clock" as const,
                  label: "Duration",
                  value: course.duration,
                  color: "purple" as const,
                },
                {
                  icon: "target" as const,
                  label: "Level",
                  value: course.level,
                  color: "orange" as const,
                },
                {
                  icon: "graduation-cap" as const,
                  label: "Students",
                  value: course.students.toLocaleString(),
                  color: "green" as const,
                },
              ] as const
            ).map((stat, index) => (
              <div
                data-aos="fade-up"
                key={index}
                className="group p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-card/50 dark:to-card/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      stat.color === "blue" &&
                        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                      stat.color === "purple" &&
                        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                      stat.color === "orange" &&
                        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
                      stat.color === "green" &&
                        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    )}
                  >
                    <AppIcon name={stat.icon} className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
