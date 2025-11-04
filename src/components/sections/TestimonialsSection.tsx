"use client";

import { carouselData } from "@/constant/constant";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { images } from "@/constant/images";
import { Title1, Title2 } from "../helper/Titles";
import { Wrapper } from "../ui/Container";

export const TestimonialsSection = () => {
  const totalData = carouselData.length;
  const d1 = Math.round(totalData / 2);
  const data1 = carouselData.slice(0, d1);
  const data2 = carouselData.slice(d1, totalData);

  const carouselDetails = [
    {
      speed: 0.5,
      direction: "forward",
      data: data1,
      dataAos: "fade-left",
      dataAosDelay: "300",
    },
    {
      speed: 0.5,
      direction: "backward",
      data: data2,
      dataAos: "fade-right",
      dataAosDelay: "300",
    },
  ];

  return (
    <Wrapper>
      <div className="text-center space-y-4 mb-12">
        <Title1>EDUCATION FOR EVERYONE</Title1>
        <Title2>
          People like histudy education.
          <br /> No joking - here’s the proof!
        </Title2>
      </div>
      <div className="space-y-4">
        {carouselDetails.map((item, index) => (
          <Carousel
            key={index}
            className="w-full"
            opts={{ loop: true }}
            data-aos={item.dataAos}
            data-aos-delay={item.dataAosDelay}
            plugins={[
              AutoScroll({
                speed: item.speed,
                direction: item.direction as "forward" | "backward",
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent>
              {item.data.map((item) => {
                const isEven = item.id % 2 === 0;
                const cls = "bg-gradient-to-br from-[#b966e7] to-[#2f57ef]";
                return (
                  <CarouselItem
                    key={item.id}
                    className="md:basis-1/2 xl:basis-1/3 max-w-[500px]"
                  >
                    {isEven && (
                      <Image
                        src={images.apsotrophe}
                        alt="apsotrophe"
                        className="absolute top-1/4 right-1/8"
                      />
                    )}
                    <div className="p-1">
                      <Card className={`${isEven ? cls : ""} rounded-md`}>
                        <CardContent className="flex flex-col items-center justify-center p-6 px-10 h-[220px] gap-5">
                          {item?.companyLogo && (
                            <Image
                              src={item?.companyLogo}
                              alt={`Company ${item.id}`}
                              height={50}
                              className="object-contain"
                            />
                          )}
                          <div className="w-full">
                            <p
                              className={`
                              text-md font-normal text-center line-clamp-2
                              ${isEven ? "text-white" : "text-gray-700"}`}
                            >
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {item.user.image && (
                              <Avatar className="size-9 border-3 shadow border-white">
                                <AvatarImage
                                  src={item?.user.image}
                                  alt={item?.user.name}
                                />
                                <AvatarFallback>
                                  <User />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`flex flex-wrap items-center gap-2 font-semibold text-md ${
                                isEven ? "text-gray-300" : ""
                              }`}
                            >
                              <p>{item.user.name}</p>
                              <i>{item.user.role}</i>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        ))}
      </div>
    </Wrapper>
  );
};
