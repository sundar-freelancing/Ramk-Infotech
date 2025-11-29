// Define the structure of your instructor
export interface InstructorInterface {
  name: string;
  avatar: string;
  fullImage?: string | undefined;
}

// Define the structure of your course
export interface CourseInterface {
  id: string; // Firebase document key used as ID
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
  updatedTimeStamp?: string;
  disabledTimeStamp?: string;
  trainerKey?: string;
}
