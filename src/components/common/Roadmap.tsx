"use client";

import { ContainerFluid } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/card";
import { AppIcon } from "@/components/ui/Icon";
import { Text1, Text3, Title1, Title2, Title4 } from "@/components/helper/Titles";
import { cn } from "@/lib/utils";

export interface RoadmapStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  hex: string;
}

interface RoadmapProps {
  title: string;
  subtitle?: string;
  steps: RoadmapStep[];
  className?: string;
  wrapperClassName?: string;
  description?: string;
}

export const Roadmap = ({
  title,
  subtitle,
  steps,
  className,
  wrapperClassName,
  description,
}: RoadmapProps) => {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <ContainerFluid className={wrapperClassName}>
        <div className="text-center space-y-4 mb-12">
          <Title1>{title}</Title1>
          {subtitle && <Title2>{subtitle}</Title2>}
          {description && <Text3>{description}</Text3>}
        </div>

        <div className="relative">
          {/* Timeline line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-yellow-400 transform -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-12">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "relative",
                    "lg:flex lg:items-center gap-20",
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}
                  data-aos={isEven ? "fade-right" : "fade-left"}
                  data-aos-delay={index * 10}
                >
                  {/* Step number indicator for desktop */}
                  <div
                    className={`hidden lg:flex lg:w-1/2  ${
                      isEven ? "lg:justify-end" : "lg:justify-start"
                    }`}
                  >
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center text-xl font-bold shadow-lg z-10",
                        item.bgColor,
                        item.color
                      )}
                      style={{
                        backgroundColor: `rgba(${item.hex}, 0.1)`,
                      }}
                    >
                      {item.step}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={cn("lg:w-1/2", isEven ? "lg:pr-8" : "lg:pl-8")}
                  >
                    <Card
                      className={cn(
                        "hover:shadow-lg transition-all duration-300 group",
                        item.bgColor
                      )}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300",
                              item.bgColor
                            )}
                            style={{
                              backgroundColor: `rgba(${item.hex}, 0.1)`,
                            }}
                          >
                            <AppIcon
                              name={item.icon}
                              className={cn("w-6 h-6", item.color)}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {/* <span
                                className={cn(
                                  "text-sm font-bold px-2 py-1 rounded",
                                  item.bgColor,
                                  item.color
                                )}
                                style={{
                                  backgroundColor: `rgb(${item.hex} / 0.1)`,
                                }}
                              >
                                Step {item.step}
                              </span> */}
                              <Title4 aos={false} className="text-gray-900 dark:text-white">
                                {item.title}
                              </Title4>
                            </div>
                            <Text1 aos={false} className="text-gray-600 dark:text-gray-300">
                              {item.description}
                            </Text1>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for desktop */}
                  {/* <div className="hidden lg:block lg:w-1/2" /> */}
                </div>
              );
            })}
          </div>
        </div>
      </ContainerFluid>
    </section>
  );
};
