import { doc, setDoc, DocumentData, deleteField, updateDoc } from "firebase/firestore";
import { db } from "./firestore";
import { CourseInterface } from "@/store/interfaces";
const COURSES_DOC_PATH = "appConfig/courses";

const courseToFirestore = (course: CourseInterface): DocumentData => {
  // Build instructor object, omitting undefined fullImage
  const instructor: DocumentData = {
    name: course.instructor.name,
    avatar: course.instructor.avatar,
  };
  // Only include fullImage if it has a value
  if (course.instructor.fullImage) {
    instructor.fullImage = course.instructor.fullImage;
  }

  const data: DocumentData = course;

  // Only include optional fields if they have values
  if (course.disabledReason) {
    data.disabledReason = course.disabledReason;
  }
  if (course.disabledTimeStamp) {
    data.disabledTimeStamp = course.disabledTimeStamp;
  }

  return data;
};

/**
 * Generate a unique ID for course
 */
const generateCourseId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Create a new course in Firestore
 * Firebase key will be used as the course ID
 * Optimized: Only adds the new course without fetching all existing courses
 */
export const createCourse = async (
  course: CourseInterface
): Promise<CourseInterface> => {
  try {
    // Generate Firebase document key (this will be the course ID)
    const firebaseKey = generateCourseId();

    const courseWithTimestamp: CourseInterface = {
      ...course,
      id: firebaseKey,
      createdTimeStamp: course.createdTimeStamp || new Date().toISOString(),
    };

    // Convert course to Firestore format
    const courseData = courseToFirestore(courseWithTimestamp);

    // Use setDoc with merge: true to add only the new course
    // This is much more efficient than fetching all courses and saving them back
    // merge: true ensures we only update/add this specific course field
    const coursesDocRef = doc(db, COURSES_DOC_PATH);
    await setDoc(coursesDocRef, { [firebaseKey]: courseData }, { merge: true });

    return courseWithTimestamp;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course");
  }
};

/**
 * Update an existing course in Firestore
 */
export const updateCourse = async (course: CourseInterface): Promise<void> => {
  try {
    const courseWithTimestamp: CourseInterface = {
      ...course,
      updatedTimeStamp: new Date().toISOString(),
    };
    const courseData = courseToFirestore(courseWithTimestamp);
    // Update the nested field within the appConfig/courses document
    const coursesDocRef = doc(db, COURSES_DOC_PATH);
    await updateDoc(coursesDocRef, { [course.id]: courseData });
  } catch (error) {
    console.error("Error updating course:", error);
    throw new Error("Failed to update course");
  }
};

/**
 * Delete a course from Firestore
 */
export const deleteCourse = async (courseId: string): Promise<void> => {
  try {
    // Delete the nested field within the appConfig/courses document
    const coursesDocRef = doc(db, COURSES_DOC_PATH);
    await updateDoc(coursesDocRef, { [courseId]: deleteField() });
  } catch (error) {
    console.error("Error deleting course:", error);
    throw new Error("Failed to delete course");
  }
};
