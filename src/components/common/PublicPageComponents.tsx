"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../helper/Navbar";
import { publicPageURL } from "@/constant/public_PageURL";
import { Footer } from "../helper/Footer";
import React from "react";
import ScrollToTopButton from "../helper/ScrollToTopButton";
import { HeroBanner, HomeHeroBanner } from "./HeroBanner";
import { createCourseSlug } from "@/lib/courseUtils";
import useAppConfigStore from "@/store/appConfigStore";
import { SiteMaintenance } from "./SiteMaintenance";
import { StudentsForm } from "../helper/StudentsForm";
import { pageLink } from "@/constant/pageURL";

interface PublicPageComponentsProps {
  children: React.ReactNode;
}

export const PublicPageComponents = ({
  children,
}: PublicPageComponentsProps) => {
  const pathname = usePathname();
  const { appStatus } = useAppConfigStore();
  const validPaths = Object.values(publicPageURL).map((item) => item.href);
  const isDashboardRoute = pathname.includes(pageLink.dashboard);
  const courseName = pathname.includes(pageLink.courses)
    ? pathname.split("/")[2]
    : null;
  const { courses: coursesObject } = useAppConfigStore();
  const courses = Object.values(coursesObject || {});
  const isValidCourse = courseName
    ? courses.find(
        (course) =>
          createCourseSlug(course.name) === courseName?.toLowerCase() &&
          course.isEnabled
      )
    : null;
  const shouldShowNavbar =
    validPaths.includes(pathname) || isValidCourse ? true : false;

  return !isDashboardRoute && !appStatus.enabled ? (
    <SiteMaintenance reason={appStatus.reason} />
  ) : shouldShowNavbar ? (
    <>
      <Navbar />
      <div className="space-y-15 lg:space-y-30">
        {pathname === publicPageURL.home.href ? (
          <HomeHeroBanner key={`hero-${pathname}`} />
        ) : (
          <HeroBanner key={`hero-${pathname}`} />
        )}
        {children}
        <Footer key={`footer-${pathname}`} />
      </div>
      <StudentsForm />
      <ScrollToTopButton />
    </>
  ) : (
    children
  );
};
