"use client";

import React from "react";
import { pageLink, pageURL } from "@/constant/pageURL";
import { Container } from "../ui/Container";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Image from "next/image";
import { images } from "@/constant/images";
import Typewriter, { TypewriterClass } from "typewriter-effect";
import { PrimaryButton } from "../ui/button";
import { courses } from "@/constant/staticCourse";
import { createCourseSlug } from "@/lib/courseUtils";

export const HeroBanner = () => {
  const pathname = usePathname();
  const courseName = pathname.includes("/courses/")
    ? pathname.split("/")[2]
    : null;
  const isValidCourse = courseName
    ? courses.find(
        (course) => createCourseSlug(course.name) === courseName?.toLowerCase()
      )
    : null;

  const pageData = Object.values(pageURL).find(
    (item) => item.href === pathname
  );
  const alterPath = pathname.replace("/", "");
  return (
    <div
      className="dark:bg-gray-900 hero-banner relative overflow-hidden"
      data-aos="fade"
    >
      <Container className="text-center">
        <div
          data-aos="fade-up"
          className=" xl:min-h-[clamp(500px,50vh,500px)] min-h-[clamp(300px,50vh,500px)] flex flex-col items-center justify-center pt-[70px] xl:pt-[150px]"
        >
          <h2 className="text-4xl font-bold capitalize mb-3">
            {isValidCourse
              ? isValidCourse.category
              : pageData?.title || alterPath}
          </h2>
          <DynamicBreadcrumb />
        </div>
      </Container>
      <div className="absolute top-1/2 -translate-y-1/2 left-0" data-aos="fade">
        <Image src={images.shape6} alt="shape2" width={50} className="w-10 " />
      </div>
      <div className="absolute bottom-0 right-0 translate-1/4">
        <Image
          src={images.shape7}
          alt="shape6"
          className="w-30 animate-shape-2"
          data-aos="fade"
        />
      </div>
    </div>
  );
};

const DynamicBreadcrumb = () => {
  const pathname = usePathname(); // e.g. "/course/data-analyst"

  // Split path into parts and filter out empty strings
  const pathSegments = pathname.split("/").filter(Boolean);
  // ['course', 'data-analyst']

  // Build partial hrefs for each segment
  const pathLinks = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { name: segment, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList className="justify-center uppercase text-xs font-semibold">
        {/* Always show Home */}
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-[var(--app-secondary-color)] dark:text-[var(--app-primary-color)]"
            href="/"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathLinks.length > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}

        {pathLinks.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
            <BreadcrumbItem>
              {index < pathLinks.length - 1 ? (
                <BreadcrumbLink
                  className="text-[var(--app-secondary-color)] dark:text-[var(--app-primary-color)]"
                  href={item.href}
                >
                  {formatTitle(item.name)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{formatTitle(item.name)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Helper function to format the name (e.g. "data-analyst" → "Data Analyst")
function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const HomeHeroBanner = () => {
  const handleInit = (typewriter: TypewriterClass) => {
    typewriter
      .typeString("Online")
      .pauseFor(1500)
      .deleteAll()
      .typeString("Offline")
      .pauseFor(1500)
      .deleteAll()
      .typeString("Everywhere")
      .pauseFor(1500)
      .deleteAll()
      .start();
  };
  return (
    <div
      className="min-h-auto xl:min-h-[750px] dark:bg-gray-900 xl:h-dvh flex items-center xl:items-end justify-center hero-banner main-hero relative xl:max-h-[800px]! pt-[70px] xl:pt-[150px]"
      data-aos="fade"
    >
      <Container>
        <div
          className="grid xl:grid-cols-2 gap-12 items-center py-20 xl:pb-0"
          data-aos="fade-up"
        >
          {/* Left Side - Content */}
          <div className="text-center xl:text-left space-y-8">
            {/* Decorative Plus Signs */}
            <div className="xl:flex items-center space-x-2 mb-4 hidden">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Best <br className="xs:hidden" />
              <div className="bg-yellow-400  px-3 py-1 rounded-lg inline-block">
                <Typewriter
                  onInit={handleInit}
                  options={{
                    delay: 50,
                    loop: true,
                    wrapperClassName: "bg-transparent",
                  }}
                />
              </div>{" "}
              <br />
              Platform to Learn Everything
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed mx-auto xl:mx-0">
              Excedteur sint occaecat cupidatat non proident sunt in culpa qui
              officia deserunt mollit.
            </p>

            {/* Call-to-Action Button */}
            <PrimaryButton href={pageLink.courses}>Find Courses</PrimaryButton>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className="xl:flex hidden justify-center xl:justify-end hero-image relative overflow-hidden">
            <Image
              src={images.heroimg}
              alt="Hero Image"
              width={500}
              height={500}
              className="z-2 relative"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
