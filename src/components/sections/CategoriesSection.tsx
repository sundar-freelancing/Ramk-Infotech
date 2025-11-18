import { pageLink } from "@/constant/pageURL";
import { Title1, Title2 } from "../helper/Titles";
import { PrimaryButton } from "../ui/button";
import { Container } from "../ui/Container";
import { AppIcon } from "../ui/Icon";
import Link from "next/link";
import { Card } from "../ui/card";
import { useMemo } from "react";
import { courses } from "@/constant/staticCourse";

const CategoriesCard = ({
  title,
  courseCount,
  icon,
  iconColor,
  dataAos,
  dataAosDelay,
}: {
  title: string;
  courseCount: number;
  icon: string;
  iconColor: string;
  dataAos: string;
  dataAosDelay: number;
}) => {
  return (
    <Link
      href={`/courses?categories=${title}`}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      aria-label={`View ${courseCount} courses in ${title} category`}
      // className="bg-white group/category rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-2 flex items-center space-x-4"
    >
      <Card className="group/category rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-2 flex-row items-center space-x-4 gap-0">
        <div
          key={iconColor}
          className={`w-18 h-18 rounded-full flex items-center justify-center flex-shrink-0`}
          style={{ backgroundColor: `${iconColor}20`, color: iconColor }}
        >
          <AppIcon name={icon} className="w-8 h-8" />
        </div>
        <div className="flex-1 px-3 truncate">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover/category:!text-blue-500 transition-all duration-300 truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {courseCount} Courses
          </p>
        </div>
      </Card>
    </Link>
  );
};


export const CategoriesSection = () => {
  const courseCategories = useMemo(() => {
    const enabledCourses = courses.filter((course) => course.isEnabled);
    // Get unique categories
    const uniqueCategories = Array.from(
      new Set(enabledCourses.map((course) => course.category))
    );

    // Randomize the categories using Fisher-Yates shuffle
    const shuffled = [...uniqueCategories];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Take only 8 categories and assign dynamically generated dark colors
    return shuffled.slice(0, 8).map((category) => ({
      category,
    }));
  }, []);
  const icons = ["briefcase", "rocket", "heart", "shield", "palette", "code", "dollar-sign", "camera"];
  const iconColors = ["#8B5CF6", "#10B981", "#3B82F6", "#EF4444", "#F59E0B", "#3B82F6", "#EF4444", "#F59E0B"];
  return (
    <Container>
      <div className="flex lg:items-center flex-col lg:flex-row justify-between mb-12 gap-3 lg:gap-0">
        <div className="space-y-4">
          <Title1>COURSE CATEGORIES</Title1>
          <Title2>Top Categories You Want to Learn</Title2>
        </div>
        <PrimaryButton dataAos="zoom-out-left" href={pageLink.courses}>
          Find Courses
        </PrimaryButton>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courseCategories.map((card, index) => (
          <CategoriesCard
            key={card.category}
            title={card.category}
            courseCount={
              courses.filter((course) => course.category === card.category)
                .length
            }
            icon={icons[index % icons.length]}
            iconColor={iconColors[index % iconColors.length]}
            dataAos={`zoom-out`}
            dataAosDelay={index * 100}
          />
        ))}
      </div>
    </Container>
  );
};
