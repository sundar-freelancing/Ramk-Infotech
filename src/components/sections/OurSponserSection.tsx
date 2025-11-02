"use client";

import React from "react";
import { Container } from "../ui/Container";
import { Title1, Title2 } from "../helper/Titles";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { carouselData } from "@/constant/constant";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

export const OurSponserSection = () => {
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
    <Container className="py-25 flex flex-col space-y-8">
      <Title1>OUR SPONSOR</Title1>
      <div className="flex gap-10 justify-evenly lg:flex-row flex-col">
        <div className="lg:w-1/3 w-full">
          <Title2>
            Get in touch with the{" "}
            <span className="app-secondary-color">250+</span> companies who
            Collaboration us
          </Title2>
        </div>

        <div className="flex flex-1 justify-center lg:w-2/3 w-full">
          <div className="flex flex-col space-y-8 w-3/4 justify-center">
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
                    stopOnMouseEnter: false,
                  }),
                ]}
              >
                <CarouselContent>
                  {item.data.map((item) => {
                    return (
                      <CarouselItem
                        key={item.id}
                        className="md:basis-1/2 xl:basis-1/3 max-w-[150px] pl-10"
                      >
                        <div className="p-1">
                          {item?.companyLogo && (
                            <Image
                              src={item?.companyLogo}
                              alt={`Company ${item.id}`}
                              height={50}
                              className="object-contain"
                            />
                          )}
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
