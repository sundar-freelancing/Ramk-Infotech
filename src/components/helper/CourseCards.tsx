import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { pageLink } from "@/constant/pageURL";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { AppIcon } from "../ui/Icon";
import { CourseInterface } from "@/store/interfaces";
import { createCourseSlug } from "@/lib/courseUtils";
import { courses as allCourses } from "@/constant/staticCourse";

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <AppIcon
      name="star"
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300"
      }`}
    />
  ));
};

export const CourseCards = ({ courses }: { courses: CourseInterface[] }) => {
  const isCoursesAvailable = allCourses.length > 0;
  return (
    <>
      {isCoursesAvailable && courses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, index) => {
            return (
              <Link
                href={`${pageLink.courses}/${createCourseSlug(course.name)}`}
                key={index}
                data-aos="fade"
                data-aos-delay={(index % 3) * 100}
                aria-label={`Learn more about ${course.name} course`}
              >
                <Card className="!p-0 overflow-hidden shadow-xs rounded-md gap-0 group/course h-full">
                  {/* Course Image */}
                  <div className="relative md:h-50 xl:h-70 h-60 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover/course:scale-105 transition-all duration-300"
                    />
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-medium">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <CardContent className="py-8 px-6 flex-1 flex flex-col gap-4">
                    {/* Metadata Row */}
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 font-medium">
                      <div className="flex items-center gap-1">
                        <AppIcon name="book-open" className="w-4 h-4" />
                        <span>{course.lessons} Lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AppIcon name="user" className="w-4 h-4" />
                        <span>{course.instructor.name}</span>
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-xl font-bold line-clamp-2 group-hover/course:text-blue-500 transition-all duration-300">
                      {course.name}
                    </h3>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(course.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({course.reviews} Reviews)
                      </span>
                    </div>

                    <Separator
                      dir="horizontal"
                      className="!bg-gray-300 mt-auto"
                    />

                    {/* Price and Students */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${course.price}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <AppIcon name="graduation-cap" className="w-4 h-4" />
                        <span>{course.students} Students</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 px-4"
          data-aos="fade"
          key={isCoursesAvailable ? courses.length : 0}
        >
          <div className="flex flex-col items-center gap-4 max-w-md">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
              <AppIcon
                name={isCoursesAvailable ? "search" : "book-open"}
                className="w-10 h-10 text-gray-400 dark:text-gray-500"
              />
            </div>

            {/* Message */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                No courses found
              </h3>
              <p className="text-base text-gray-500 dark:text-gray-400">
                {isCoursesAvailable
                  ? "Try adjusting your search terms or browse all available courses"
                  : "No courses available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
