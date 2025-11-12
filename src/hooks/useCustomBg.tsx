"use client";

import { images } from "@/constant/images";
import { useTheme } from "next-themes";
import Image from "next/image";

export const CustomBg = ({ isDarkOnly = false }: { isDarkOnly?: boolean }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  return isDarkOnly && isDarkMode ? (
    <div className="absolute top-0 left-0 w-full h-full opacity-20">
      <Image
        src={images.counsellingBgDark}
        alt="custom-bg"
        className="w-full h-full object-cover"
      />
    </div>
  ) : isDarkOnly && !isDarkMode ? null : (
    <div className="absolute top-0 left-0 w-full h-full opacity-20">
      <Image
        src={images.counsellingBgDark}
        alt="custom-bg"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
