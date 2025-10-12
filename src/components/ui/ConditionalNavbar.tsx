"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../helper/Navbar";
import { publicPageURL } from "@/constant/public_PageURL";

export const ConditionalNavbar = () => {
const pathname = usePathname();
  const validPaths = Object.values(publicPageURL).map((item) => item.href);
  const shouldShowNavbar = validPaths.includes(pathname);
  if (!shouldShowNavbar) {
    return null;
  }

  return <Navbar />;
};
