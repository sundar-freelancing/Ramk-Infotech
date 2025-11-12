"use client";

import Image from "next/image";
import { Container, Wrapper } from "../ui/Container";
import { images } from "@/constant/images";
import { Title1, Title3 } from "../helper/Titles";
import { CustomBg } from "@/hooks/useCustomBg";

export const CompanySection = () => {
  return (
    <Wrapper>
      <div
        className="relative overflow-hidden bg-green-50 dark:bg-card"
        data-aos="fade"
        data-aos-delay="100"
      >
        <CustomBg isDarkOnly={true} />
        <Container className="py-30">
          <div className="relative">
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
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <Image
                data-aos="zoom-out"
                data-aos-delay="100"
                src={images.mainlogo}
                alt=""
                className="mx-auto h-12"
              />
              <figure className="mt-10">
                <Title3 className="text-center">
                  “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  expedita voluptas culpa sapiente alias molestiae. Numquam
                  corrupti in laborum sed rerum et corporis.”
                </Title3>
                <figcaption className="mt-10">
                  <Image
                    src={images.ceoImage}
                    alt=""
                    className="mx-auto size-10 rounded-full object-cover object-top"
                  />
                  <div
                    data-aos="zoom-out"
                    data-aos-delay="100"
                    className="mt-4 flex items-center justify-center space-x-3 text-base"
                  >
                    <span className="font-semibold ">Judith Black</span>
                    <svg
                      viewBox="0 0 2 2"
                      width="3"
                      height="3"
                      aria-hidden="true"
                    >
                      <circle r="1" cx="1" cy="1" />
                    </svg>
                    <Title1>CEO of Workcation</Title1>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </div>
      <div className="relative overflow-hidden">
        <span className="w-full h-full absolute -translate-y-1/2 bg-green-50 dark:bg-card">
          <CustomBg isDarkOnly={true} />
        </span>
        <Below />
      </div>
    </Wrapper>
  );
};

const Below = () => {
  interface TimelineItem {
    date: string;
    title: string;
    description: string;
    icon: string;
  }

  const timelineData: TimelineItem[] = [
    {
      date: "Jan 2025",
      title: "Founded Ramk",
      description:
        "Ramk started with a mission to build innovative digital solutions.",
      icon: "building-2",
    },
    {
      date: "Apr 2025",
      title: "Project Planning",
      description:
        "Outlined our vision and set the foundation for the Ramk platform.",
      icon: "lightbulb",
    },
    {
      date: "Aug 2025",
      title: "Grand Opening",
      description: "Launched the beta version and welcomed our first users.",
      icon: "rocket",
    },
    {
      date: "Nov 2025",
      title: "Team Expansion",
      description: "Grew our team and partnered with key industry players.",
      icon: "users",
    },
  ];

  return (
    <Container className="min-h-90 relative">
      <div data-aos="zoom-out-up" data-aos-delay="100">
        <div className="absolute bottom-0 left-1/2">
          <Image
            src={images.shape5}
            alt="shape5"
            width={80}
            className="animate-shape-2 z-10"
          />
        </div>
        <div className="bg-[#543ee8] flex flex-col lg:flex-row h-full rounded-md p-5 gap-10">
          <div className="lg:w-2/5 relative">
            <Image
              src={images.businessGrow}
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
          <div className="lg:w-3/5 flex items-center justify-center">
            <div className="grid md:grid-cols-2 gap-10 items-center justify-center py-4">
              {timelineData.map((item, index) => (
                <div key={index}>
                  <Title3 className="text-white mb-2">{item.date}</Title3>
                  <p
                    data-aos="zoom-out"
                    data-aos-delay={index * 100}
                    className="text-white text-[17px] mb-1"
                  >
                    {item.title}
                  </p>
                  <p
                    data-aos="zoom-out"
                    data-aos-delay={index * 100}
                    className="text-gray-200 text-sm md:pe-10"
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
