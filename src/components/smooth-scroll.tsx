"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: React.ReactNode;
  intensity?: number;
  disabled?: boolean;
}

/**
 * SmoothScroll Component
 * 
 * Provides smooth scrolling using Lenis library with optimized performance.
 * - Automatically resets scroll position on route changes
 * - Handles overlay/modal scenarios (pauses scrolling when overflow is hidden)
 * - Configurable scroll intensity
 * - Cleanup on unmount
 */
export function SmoothScroll({
  children,
  intensity = 1.0,
  disabled = false,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    // Initialize Lenis instance
    lenisRef.current = new Lenis({
      duration: intensity,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Request animation frame loop
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [intensity, disabled]);

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current && pathname) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  // Handle overlay/modal scenarios (pause scrolling when overflow is hidden)
  useEffect(() => {
    if (!lenisRef.current || disabled) return;

    const overlayElement = document.getElementById("overlay");

    if (!overlayElement) return;

    const handleMutation = (mutationsList: MutationRecord[]) => {
      if (!lenisRef.current) return;

      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const hasChildren = overlayElement.children.length > 0;

          if (hasChildren) {
            // Check if html element has overflow hidden
            const htmlElement = document.documentElement;
            const computedStyle = window.getComputedStyle(htmlElement);
            const isOverflowHidden = computedStyle.getPropertyValue("overflow") === "hidden";

            if (isOverflowHidden) {
              lenisRef.current.stop();
            } else {
              lenisRef.current.start();
            }
          } else {
            lenisRef.current.start();
          }
        }
      }
    };

    const observer = new MutationObserver(handleMutation);
    observer.observe(overlayElement, {
      childList: true,
      subtree: false,
    });

    return () => {
      observer.disconnect();
    };
  }, [disabled]);

  return <>{children}</>;
}

