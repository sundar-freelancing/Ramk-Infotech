import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { pageLink } from "@/constant/pageURL";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { AppIcon } from "../ui/Icon";
import { CourseInterface } from "@/store/interfaces";
import { createCourseSlug } from "@/lib/courseUtils";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye, MoreVertical, Trash2 } from "lucide-react";
import { DashboardDeleteDialog } from "@/app/dashboard/dashboardHelpers/DashboardDeleteDialog";
import { AlertDialogTrigger } from "../ui/alert-dialog";
import useAppConfigStore from "@/store/appConfigStore";

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

export const CourseCards = ({
  courses,
  animation = true,
  isFromDashboard = false,
}: {
  courses: CourseInterface[];
  animation?: boolean;
  isFromDashboard?: boolean;
}) => {
  const { courses: coursesObject } = useAppConfigStore();
  const allCourses = Object.values(coursesObject || {});
  const isCoursesAvailable = allCourses.length > 0;
  const Tag = isFromDashboard ? "div" : Link;
  return (
    <>
      {isCoursesAvailable && courses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, index) => {
            return (
              <Tag
                href={`${pageLink.courses}/${createCourseSlug(course.name)}`}
                key={index}
                {...(animation &&
                  !isFromDashboard && {
                    "data-aos": "fade-up",
                    "data-aos-delay": (index % 3) * 100,
                    "data-aos-duration": 600,
                  })}
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

                    {isFromDashboard && (
                      <>
                        <Badge
                          variant={course.isEnabled ? "success" : "destructive"}
                          className="absolute top-4 left-4"
                        >
                          {course.isEnabled ? "Active" : "Inactive"}
                        </Badge>
                        <DashboardDeleteDialog course={course}>
                          <Dropdown course={course} />
                        </DashboardDeleteDialog>
                      </>
                    )}
                    <div
                      className={cn(
                        "absolute left-4 ",
                        isFromDashboard ? "bottom-4" : "top-4"
                      )}
                    >
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-medium">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <CardContent className="py-8 px-6 flex-1 flex flex-col gap-4 w-full">
                    {/* Metadata Row */}
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 font-medium gap-2 min-w-0">
                      <div className="flex items-center gap-1 shrink-0">
                        <AppIcon name="book-open" className="w-4 h-4" />
                        <span>{course.lessons} Lessons</span>
                      </div>
                      <div className="flex flex-1 items-center gap-1 min-w-0">
                        <AppIcon name="user" className="w-4 h-4 shrink-0" />
                        <span
                          className="break-all"
                          title={course.instructor.name}
                        >
                          {course.instructor.name}
                        </span>
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-xl font-bold line-clamp-2 group-hover/course:text-blue-500 transition-all duration-300 break-all">
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
              </Tag>
            );
          })}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 px-4"
          {...(animation &&
            !isFromDashboard && {
              "data-aos": "fade-up",
              "data-aos-duration": 600,
            })}
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

const Dropdown = ({ course }: { course: CourseInterface }) => {
  return (
    <div className="absolute top-3 right-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
            <Link href={`${pageLink.dashboardCourses}/${course.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Link href={`${pageLink.dashboardCourses}/${course.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Course
            </Link>
          </DropdownMenuItem> */}
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Course
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
