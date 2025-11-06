"use client";

import { courses } from "@/constant/staticCourse";
import { CourseInterface } from "@/store/interfaces";
import { Container } from "@/components/ui/Container";
import { use, useEffect, useState } from "react";
import { findCourseBySlug } from "@/lib/courseUtils";
import { CourseHeader } from "@/components/courses/CourseHeader";
import { CourseOverview } from "@/components/courses/CourseOverview";
import { InstructorCard } from "@/components/courses/InstructorCard";
import { ReviewsCard } from "@/components/courses/ReviewsCard";
import { CourseSidebar } from "@/components/courses/CourseSidebar";
import NotFound from "@/app/not-found";

interface CourseViewPageProps {
  params: Promise<{
    courseName: string;
  }>;
}

export default function CourseViewPage({ params }: CourseViewPageProps) {
  const { courseName } = use(params);
  const [course, setCourse] = useState<CourseInterface | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const foundCourse = findCourseBySlug(courseName, courses);
    setCourse(foundCourse);
  }, [courseName]);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  if (!course) {
    return <NotFound courseName={courseName} />;
  }

  // Check if course is disabled
  if (!course.isEnabled) {
    return <NotFound courseName={courseName} disabledReason={course.disabledReason} />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Course Header Section */}
      <Container className="py-8 md:py-12">
        <CourseHeader course={course} />
      </Container>

      {/* Main Content */}
      <Container className="py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CourseOverview course={course} />
            <InstructorCard course={course} />
            <ReviewsCard course={course} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar course={course} />
          </div>
        </div>
      </Container>
    </div>
  );
}
