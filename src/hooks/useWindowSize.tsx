"use client";

import { breakpoint } from "@/constant/constant";
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  // Initialize with a reasonable default that works for SSR
  // Use a desktop width as default to avoid hydration mismatch
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  const isMobile = windowSize.width < breakpoint.md;
  const isTablet = windowSize.width < breakpoint.lg;
  const isDesktop = windowSize.width < breakpoint.xl;
  const isLargeDesktop = windowSize.width < breakpoint["2xl"];

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Set actual window size on client side
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
};
