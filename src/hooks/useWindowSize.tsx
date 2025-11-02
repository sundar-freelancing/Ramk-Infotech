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
  const [low200px, setlow200px] = useState(false);

  const isMobile = windowSize.width < breakpoint.md;
  const isTablet = windowSize.width < breakpoint.lg;
  const isDesktop = windowSize.width < breakpoint.xl;
  const isLargeDesktop = windowSize.width < breakpoint["2xl"];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

    function handleScroll() {
      setlow200px(window.scrollY > 200);
    }

    // Set initial scroll position
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    low200px,
    scrollToTop,
  };
};
