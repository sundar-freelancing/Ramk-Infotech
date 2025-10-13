import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { BookOpen, User, Star, GraduationCap } from "lucide-react";
import { courses } from "@/constant/staticCourse";
import { Container } from "../ui/Container";
import { Title1, Title2 } from "../helper/Titles";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { pageLink } from "@/constant/pageURL";

export const CoursesSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Container className="pt-28">
      <div className="text-center space-y-4 mb-12">
        <Title1>ONLINE COURSES</Title1>
        <Title2>Get Your Course With Us</Title2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, index) => {
          return (
            <Link
              href={`${pageLink.courses}/${course.name}`}
              key={course.name}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
              data-aos-anchor-placement="center-bottom"
            >
              <Card className="!p-0 overflow-hidden shadow-xs rounded-md gap-0 group/course h-full">
                {/* Course Image */}
                <div className="relative md:h-50 xl:h-70 h-60 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
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
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
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
                      <GraduationCap className="w-4 h-4" />
                      <span>{course.students} Students</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};
