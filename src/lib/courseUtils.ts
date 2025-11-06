import { CourseInterface } from "@/store/interfaces";

/**
 * Creates a URL-friendly slug from a course name
 * Converts spaces to hyphens and handles special characters
 */
export const createCourseSlug = (courseName: string): string => {
  return courseName
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Finds a course by its slug or name
 */
export const findCourseBySlug = (slug: string, courses: CourseInterface[]): CourseInterface | undefined => {
  const decodedSlug = decodeURIComponent(slug);
  
  // Try exact match with slug
  let foundCourse = courses.find(
    (course) => createCourseSlug(course.name) === decodedSlug.toLowerCase()
  );
  
  // If not found, try exact name match
  if (!foundCourse) {
    foundCourse = courses.find(
      (course) => course.name.toLowerCase() === decodedSlug.toLowerCase()
    );
  }
  
  // If not found, try partial match
  if (!foundCourse) {
    foundCourse = courses.find(
      (course) =>
        course.name.toLowerCase().includes(decodedSlug.toLowerCase()) ||
        decodedSlug.toLowerCase().includes(course.name.toLowerCase())
    );
  }
  
  return foundCourse;
};

