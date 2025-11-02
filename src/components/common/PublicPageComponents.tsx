"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../helper/Navbar";
import { publicPageURL } from "@/constant/public_PageURL";
import { Footer } from "../helper/Footer";
import React from "react";

interface PublicPageComponentsProps {
  children: React.ReactNode;
}

export const PublicPageComponents = ({
  children,
}: PublicPageComponentsProps) => {
  const pathname = usePathname();
  const validPaths = Object.values(publicPageURL).map((item) => item.href);
  const shouldShowNavbar = validPaths.includes(pathname);

  return (
    <React.Fragment key={pathname}>
      {shouldShowNavbar ? (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      ) : (
        children
      )}
    </React.Fragment>
  );
};
