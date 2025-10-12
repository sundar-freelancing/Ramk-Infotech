import Image from "next/image";
import { Container } from "../ui/Container";
import { AppIcon } from "../ui/Icon";
import { featuresData } from "@/constant/constant";
import { images } from "@/constant/images";

const FeatureCard = ({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) => {
  return (
    <div className="flex gap-4">
      {/* Icon */}
      <div
        className={`w-15 h-15 rounded-full flex items-center justify-center shrink-0`}
        style={{ backgroundColor: color + "10" }}
      >
        <AppIcon name={icon} className="w-8 h-8" color={color} />
      </div>
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-xl font-bold text-white">{title}</h3>

        {/* Description */}
        <p className="text-gray-300 text-lg  leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <div className="py-25 bg-[#011c1a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/12">
        <Image
          src={images.shape1}
          alt="shape1"
          width={50}
          className="animate-shape-1"
        />
      </div>

      <div className="absolute top-3/4 right-1/12">
        <Image
          src={images.shape2}
          alt="shape1"
          width={50}
          className="animate-shape-2"
        />
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-evenly">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
