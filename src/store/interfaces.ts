// Define the structure of your instructor
interface InstructorInterface {
  name: string;
  avatar: string;
  fullImage?: string;
}

// Define the structure of your course
export interface CourseInterface {
  id: number;
  name: string;
  category: string;
  image: string;
  instructor: InstructorInterface;
  lessons: number;
  rating: number;
  reviews: number;
  price: number;
  students: number;
  duration: string;
  level: string;
  searchKeys: string[];
  isEnabled: boolean;
  disabledReason?: string;
  createdTimeStamp: string;
  disabledTimeStamp?: string;
  trainerKey?: string;
}
