"use client";
import Image from "next/image";

export const MainLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-30 h-30">
        <Image
          src="/images/main-logos/loader-logo.svg"
          alt="loader"
          width={120}
          height={120}
          priority
          className="p-10 ps-7 animate-pulse"
        />
        <span className="absolute top-0 left-0 w-full h-full rounded-full border-3 animate-spin border-t-blue-700 border-blue-200"></span>
      </div>
    </div>
  );
};
