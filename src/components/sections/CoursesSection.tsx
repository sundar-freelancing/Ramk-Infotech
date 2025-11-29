import { Container } from "../ui/Container";
import { Title1, Title2 } from "../helper/Titles";
import { CourseCards } from "../helper/CourseCards";
import useAppConfigStore from "@/store/appConfigStore";

export const CoursesSection = () => {
  // Filter only enabled courses and take first 9

  const { courses: coursesObject } = useAppConfigStore();
  const courses = Object.values(coursesObject || {});

  const enabledCourses = courses.filter((course) => course.isEnabled);
  const firstNineCourses = enabledCourses.slice(0, 9);
  return (
    <Container>
      <div className="text-center space-y-4 mb-12">
        <Title1>ONLINE COURSES</Title1>
        <Title2>Get Your Course With Us</Title2>
      </div>
      <CourseCards courses={firstNineCourses} />
    </Container>
  );
};
