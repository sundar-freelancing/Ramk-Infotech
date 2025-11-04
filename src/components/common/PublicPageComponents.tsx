"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../helper/Navbar";
import { publicPageURL } from "@/constant/public_PageURL";
import { Footer } from "../helper/Footer";
import React from "react";
// import { StudentsForm } from "../helper/StudentsForm";
import ScrollToTopButton from "../helper/ScrollToTopButton";

interface PublicPageComponentsProps {
  children: React.ReactNode;
}

export const PublicPageComponents = ({
  children,
}: PublicPageComponentsProps) => {
  const pathname = usePathname();
  const validPaths = Object.values(publicPageURL).map((item) => item.href);
  const shouldShowNavbar = validPaths.includes(pathname);

  return shouldShowNavbar ? (
    <>
      <Navbar />
      <div className="space-y-15 lg:space-y-30">
        {children}
        <Footer key={pathname} />
      </div>
      {/* <StudentsForm /> */}
      <ScrollToTopButton />
    </>
  ) : (
    children
  );
};
