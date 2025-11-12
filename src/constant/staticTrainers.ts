import { courses } from "./staticCourse";

// Define the structure of social media links
interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  dribbble?: string;
  instagram?: string;
}

// Define the structure of a trainer
export interface TrainerInterface {
  id: number;
  name: string;
  trainersKey: string;
  image: string;
  socialMedia?: SocialMediaLinks;
  courses?: string[]; // Course categories or names they teach
}

// Extract unique trainers from courses and create trainer data
// Map instructor names to their course categories
const instructorToCategories = new Map<string, string[]>();
courses.forEach((course) => {
  if (course.isEnabled) {
    const instructorName = course.instructor.name;
    if (!instructorToCategories.has(instructorName)) {
      instructorToCategories.set(instructorName, []);
    }
    instructorToCategories.get(instructorName)?.push(course.category);
  }
});

// Generate trainer data based on courses
export const trainers: TrainerInterface[] = Array.from(
  instructorToCategories.entries()
).map(([name, categories], index) => {
  // Find the instructor's course to get trainerKey and image
  const instructorCourse = courses.find((c) => c.instructor.name === name);
  const trainersKey = instructorCourse?.trainerKey || "";
  const fullImage =
    instructorCourse?.instructor.fullImage ||
    instructorCourse?.instructor.avatar ||
    "";

  return {
    id: index + 1,
    name,
    trainersKey,
    image: fullImage,
    courses: categories,
    socialMedia: {
      facebook: `https://facebook.com/${name
        .toLowerCase()
        .replace(/\s+/g, "")}`,
      twitter: `https://twitter.com/${name.toLowerCase().replace(/\s+/g, "")}`,
      dribbble: `https://dribbble.com/${name
        .toLowerCase()
        .replace(/\s+/g, "")}`,
      instagram: `https://instagram.com/${name
        .toLowerCase()
        .replace(/\s+/g, "")}`,
    },
  };
});
