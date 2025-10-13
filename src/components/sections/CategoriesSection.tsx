import { pageLink } from "@/constant/pageURL";
import { categoryCards } from "@/constant/constant";
import { Title1, Title2 } from "../helper/Titles";
import { PrimaryButton } from "../ui/button";
import { Container } from "../ui/Container";
import { AppIcon } from "../ui/Icon";
import Link from "next/link";
import { Card } from "../ui/card";

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
      href={`/courses?category=${title}`}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
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
        <div className="flex-1 ps-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover/category:!text-blue-500 transition-all duration-300">
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
  return (
    <Container className="pb-28">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-4">
          <Title1>COURSE CATEGORIES</Title1>
          <Title2>Top Categories You Want to Learn</Title2>
        </div>
        <PrimaryButton dataAos="zoom-out-left" href={pageLink.courses}>
          Find Courses
        </PrimaryButton>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryCards.map((card, index) => (
          <CategoriesCard
            key={card.id}
            title={card.title}
            courseCount={card.courseCount}
            icon={card.icon}
            iconColor={card.iconColor}
            dataAos={`zoom-out`}
            dataAosDelay={index * 100}
          />
        ))}
      </div>
    </Container>
  );
};
