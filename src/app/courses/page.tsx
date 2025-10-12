import { courses } from "@/constant/staticCourse";

export default function Courses() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Courses
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose from our comprehensive range of technology courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {course.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Duration: {course.duration}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Level: {course.level}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
