"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AppIcon } from "@/components/ui/Icon";
import { CourseInterface } from "@/store/interfaces";

interface ReviewsCardProps {
  course: CourseInterface;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <AppIcon
      name="star"
      key={i}
      className={`w-5 h-5 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300 dark:text-gray-600"
      }`}
    />
  ));
};

export function ReviewsCard({ course }: ReviewsCardProps) {
  return (
    <Card
      className="border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
      data-aos="fade-up"
    >
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <AppIcon name="star" className="w-5 h-5 text-white fill-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Student Reviews
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
            {renderStars(course.rating)}
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {course.rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({course.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-900/30">
          <p className="text-muted-foreground leading-relaxed text-base">
            This course has received excellent feedback from{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {course.students.toLocaleString()} students
            </span>
            . Join them and start your learning journey today! Our students
            consistently praise the practical approach, clear explanations, and
            real-world applications covered in this comprehensive program.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
