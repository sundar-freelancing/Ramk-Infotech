"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: React.ReactNode;
  intensity?: number;
  disabled?: boolean;
}

// Cache shadcn component selectors - defined outside component to avoid recreation
const SHADCN_DATA_SLOTS = new Set([
  "popover-content",
  "dropdown-menu-content",
  "select-content",
  "navigation-menu-content",
  "navigation-menu-viewport",
  "sheet-overlay",
  "alert-dialog-overlay",
  "alert-dialog-content",
]);

const SHADCN_ROLES = new Set(["listbox", "menu", "dialog", "alertdialog"]);

const SHADCN_SELECTOR =
  '[data-slot="popover-content"], [data-slot="dropdown-menu-content"], [data-slot="select-content"], [data-slot="navigation-menu-content"], [data-slot="navigation-menu-viewport"], [data-slot="sheet-overlay"], [data-slot="alert-dialog-overlay"], [data-slot="alert-dialog-content"]';

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

  // Cache for scrollable element detection
  const scrollableCacheRef = useRef(new WeakMap<Element, boolean>());
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    // Optimized helper function to check if element is inside a shadcn component
    // Uses cached Sets for O(1) lookups instead of array iterations
    const isInsideShadcnComponent = (element: Element | null): boolean => {
      if (!element) return false;

      let current: Element | null = element;
      let depth = 0;
      const maxDepth = 20; // Prevent infinite loops, limit traversal depth

      while (current && depth < maxDepth) {
        // Check data-slot attributes first (most common case)
        const dataSlot = current.getAttribute("data-slot");
        if (dataSlot && SHADCN_DATA_SLOTS.has(dataSlot)) {
          return true;
        }

        // Check role attributes
        const role = current.getAttribute("role");
        if (role && SHADCN_ROLES.has(role)) {
          return true;
        }

        // Check for Radix UI portal containers (only once per element)
        if (current.classList.contains("radix-portal")) {
          return true;
        }

        current = current.parentElement;
        depth++;
      }

      return false;
    };

    // Optimized function to check if element is scrollable (with caching)
    const isScrollableElement = (element: Element): boolean => {
      // Check cache first
      if (scrollableCacheRef.current.has(element)) {
        return scrollableCacheRef.current.get(element)!;
      }

      const style = window.getComputedStyle(element);
      const overflowY = style.overflowY;
      const isScrollable =
        (overflowY === "auto" || overflowY === "scroll") &&
        element.scrollHeight > element.clientHeight &&
        element.clientHeight > 0;

      // Cache result
      scrollableCacheRef.current.set(element, isScrollable);
      return isScrollable;
    };

    // Optimized wheel event handler with early exits and cached checks
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as Element;

      // Early exit if not inside shadcn component
      if (!isInsideShadcnComponent(target)) {
        return;
      }

      // Find the scrollable container inside the shadcn component
      let scrollableElement: Element | null = target;
      let depth = 0;
      const maxDepth = 15; // Limit traversal depth for performance

      while (
        scrollableElement &&
        scrollableElement !== document.body &&
        scrollableElement !== document.documentElement &&
        depth < maxDepth
      ) {
        // Use cached scrollable check
        if (
          isScrollableElement(scrollableElement) &&
          isInsideShadcnComponent(scrollableElement)
        ) {
          const element = scrollableElement as HTMLElement;
          const deltaY = e.deltaY;
          const scrollTop = element.scrollTop;
          const scrollHeight = element.scrollHeight;
          const clientHeight = element.clientHeight;

          // Calculate scroll boundaries once
          const canScrollUp = scrollTop > 0;
          const canScrollDown = scrollTop < scrollHeight - clientHeight - 1;

          // Check if element can scroll in the direction of the wheel event
          const canScroll =
            (deltaY < 0 && canScrollUp) || (deltaY > 0 && canScrollDown);

          // Always prevent page scroll when inside shadcn component
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          // Only scroll if element can scroll in that direction
          if (canScroll) {
            element.scrollTop += deltaY;
          }

          return false;
        }

        scrollableElement = scrollableElement.parentElement;
        depth++;
      }

      // Prevent page scroll when inside shadcn component (fallback)
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    // Register wheel event handler BEFORE initializing Lenis to ensure we catch events first
    const wheelOptions = {
      passive: false,
      capture: true,
    } as AddEventListenerOptions;
    window.addEventListener("wheel", handleWheel, wheelOptions);
    document.addEventListener("wheel", handleWheel, wheelOptions);

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

    // Optimized function to add data-lenis-prevent to scrollable containers
    // Uses single querySelectorAll with combined selector for better performance
    const addLenisPreventToShadcnComponents = () => {
      // Use single query with combined selector instead of multiple queries
      const shadcnElements = document.querySelectorAll(SHADCN_SELECTOR);

      const processedElements = new WeakSet<Element>();

      const checkAndMarkScrollable = (element: Element) => {
        // Skip if already processed
        if (processedElements.has(element)) return;

        if (isScrollableElement(element)) {
          element.setAttribute("data-lenis-prevent", "");
          processedElements.add(element);
        }
      };

      // Process each shadcn component element
      shadcnElements.forEach((element) => {
        // Check the element itself
        checkAndMarkScrollable(element);

        // Only check direct children and their scrollable descendants (more efficient)
        // Use querySelector with overflow check instead of querySelectorAll('*')
        const potentialScrollable = element.querySelectorAll(
          '[style*="overflow"], [class*="overflow"]'
        );
        potentialScrollable.forEach((child) => {
          checkAndMarkScrollable(child);
        });
      });
    };

    // Debounce helper for MutationObserver to prevent excessive calls
    const debouncedAddLenisPrevent = () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        addLenisPreventToShadcnComponents();
        debounceTimerRef.current = null;
      }, 100); // 100ms debounce
    };

    // Run initially
    addLenisPreventToShadcnComponents();

    // Set up observer with debounced callback to catch dynamically added components
    const shadcnObserver = new MutationObserver((mutations) => {
      // Only process if shadcn components are added/modified
      const hasShadcnChanges = mutations.some((mutation) => {
        return Array.from(mutation.addedNodes).some((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            return (
              el.matches?.(SHADCN_SELECTOR) ||
              el.querySelector?.(SHADCN_SELECTOR) !== null
            );
          }
          return false;
        });
      });

      if (hasShadcnChanges) {
        debouncedAddLenisPrevent();
      }
    });

    shadcnObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Request animation frame loop
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel, wheelOptions);
      document.removeEventListener("wheel", handleWheel, wheelOptions);
      shadcnObserver.disconnect();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      scrollableCacheRef.current = new WeakMap(); // Reset cache on cleanup
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
            const isOverflowHidden =
              computedStyle.getPropertyValue("overflow") === "hidden";

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

  // Handle scroll lock (pause smooth scroll when body has data-scroll-locked)
  useEffect(() => {
    if (!lenisRef.current || disabled) return;

    const checkScrollLock = () => {
      if (!lenisRef.current) return;

      const isScrollLocked = document.body.hasAttribute("data-scroll-locked");

      if (isScrollLocked) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    };

    // Check initially
    checkScrollLock();

    // Observe body for data-scroll-locked attribute changes
    const bodyObserver = new MutationObserver(() => {
      checkScrollLock();
    });

    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });

    return () => {
      bodyObserver.disconnect();
    };
  }, [disabled]);

  return <>{children}</>;
}
