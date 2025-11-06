"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AppIcon } from "@/components/ui/Icon";
import { CourseInterface } from "@/store/interfaces";

interface InstructorCardProps {
  course: CourseInterface;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <AppIcon
      name="star"
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300 dark:text-gray-600"
      }`}
    />
  ));
};

export function InstructorCard({ course }: InstructorCardProps) {
  return (
    <Card
      className="border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
      data-aos="fade-up"
    >
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <AppIcon name="user" className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            About Instructor
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-800">
          <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg ring-2 ring-offset-2 ring-offset-background ring-purple-200 dark:ring-purple-900">
            <AvatarImage
              src={course.instructor.avatar}
              alt={course.instructor.name}
            />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              {course.instructor.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {course.instructor.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Expert instructor with years of experience in {course.category}.
                Dedicated to helping students achieve their learning goals
                through practical, hands-on training and real-world examples.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                {renderStars(5)}
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                  5.0
                </span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
              <span className="text-sm text-muted-foreground">
                Instructor Rating
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
