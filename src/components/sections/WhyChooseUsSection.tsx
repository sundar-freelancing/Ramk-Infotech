"use client";

import React from "react";
import { Title1, Title2 } from "../helper/Titles";
import { Container, Wrapper } from "../ui/Container";
import { AppIcon } from "../ui/Icon";
import Image from "next/image";
import { images } from "@/constant/images";
import { Card } from "../ui/card";

export const WhyChooseUsSection = () => {
  return (
    <Wrapper>
      <div
        className="w-full relative overflow-hidden bg-green-50 dark:bg-gray-900"
        data-aos="fade"
        data-aos-delay="100"
      >
        <Container className="py-30">
          <div className="grid lg:grid-cols-2 gap-10 items-center justify-between relative">
            <div className="absolute top-0 -left-1/12">
              <Image
                src={images.shape3}
                alt="shape1"
                width={50}
                className="animate-shape-1 z-10"
              />
            </div>
            <div className="absolute bottom-0 right-0 rotate-90">
              <Image
                src={images.shape3}
                alt="shape1"
                width={50}
                className="z-10"
              />
            </div>
            <div>
              <div className="space-y-6 mb-12">
                <Title1>WHY CHOOSE US</Title1>
                <Title2>
                  Transform Your Best Practice with Our Online Course
                </Title2>
                <p
                  className="text-gray-600 dark:text-gray-300 text-[20px]"
                  data-aos="fade-up"
                >
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit. Excepteur sint occaecat.
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3" data-aos="zoom-out">
                  <div className="flex gap-4 items-center">
                    {/* Icon */}
                    <div
                      className={`w-15 h-15 rounded-full flex items-center justify-center shrink-0`}
                      style={{ backgroundColor: "#EF4444" + "10" }}
                    >
                      <AppIcon
                        name="award"
                        className="w-8 h-8"
                        color="#EF4444"
                      />
                    </div>

                    <h3 className="text-xl font-bold">Face-to-face Teaching</h3>
                  </div>
                  {/* Title */}

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-[17px] leading-relaxed ">
                    Excepteur sint occaecat cupidatat non proident sunt in culpa
                    qui officia for this is a for that an deserunt mollit.
                  </p>
                </div>

                <div className="space-y-3" data-aos="zoom-out">
                  <div className="flex gap-4 items-center">
                    {/* Icon */}
                    <div
                      className={`w-15 h-15 rounded-full flex items-center justify-center shrink-0`}
                      style={{ backgroundColor: "#10B981" + "10" }}
                    >
                      <AppIcon
                        name="award"
                        className="w-8 h-8"
                        color="#10B981"
                      />
                    </div>

                    <h3 className="text-xl font-bold">
                      24/7 Support Available
                    </h3>
                  </div>
                  {/* Title */}

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-[17px] leading-relaxed ">
                    Excepteur sint occaecat cupidatat non proident sunt in culpa
                    qui officia for this is a for that an deserunt mollit.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full relative" data-aos="zoom-out">
              <Image
                src={images.whychooseus}
                alt="why choose us"
                className="w-full object-contain"
              />

              <div className="absolute top-1/4 left-0 animate-shape-2">
                <Image
                  src={images.shape4}
                  alt="shape4"
                  width={70}
                  className="z-10"
                />
              </div>
              <div className="absolute bottom-5 left-5 animate-shape-1">
                <Card className="items-center gap-4 flex-row ps-4 pe-8 py-3">
                  <div
                    className={`w-15 h-15 rounded-full flex items-center justify-center shrink-0`}
                    style={{ backgroundColor: "#EF4444" + "10" }}
                  >
                    <AppIcon
                      name="graduation-cap"
                      className="w-8 h-8"
                      color="#EF4444"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-[#EF4444]">1k +</h3>
                    <p className="text-gray-700 text-[17px] leading-relaxed ">
                      Satisfied Students
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="relative overflow-hidden">
        <span className="w-full h-full absolute -translate-y-1/2 bg-green-50 dark:bg-gray-900"></span>
        <Below />
      </div>
    </Wrapper>
  );
};

const Below = () => {
  const educationStats = [
    {
      count: 21321,
      name: "Student enrolled",
    },
    {
      count: 4324,
      name: "Classes completed",
    },
    {
      count: 2323,
      name: "Learners report",
    },
    {
      count: 874,
      name: "Top instructors",
    },
  ];
  return (
    <Container
      className="min-h-90 relative"
      data-aos="zoom-out-up"
      data-aos-delay="100"
    >
      <div className="absolute bottom-0 left-1/2">
        <Image
          src={images.shape5}
          alt="shape5"
          width={80}
          className="animate-shape-2 z-10"
        />
      </div>
      <div className="bg-[#543ee8] flex flex-col lg:flex-row h-full rounded-md p-5 gap-5">
        <div className="lg:w-1/2 relative">
          <Image
            src={images.funfactimg}
            alt="her"
            className="object-fill h-full w-full rounded-md rounded-br-[150px]"
          />
          <div className="absolute bottom-1/2 right-0 translate-x-1/2">
            <Image
              src={images.shape6}
              alt="shape6"
              className="animate-shape-1 z-10"
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-10 lg:gap-15 items-center justify-center">
            {educationStats.map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-4xl font-bold text-white">{item.count}+</h3>
                <p className="text-gray-200 text-[17px]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
