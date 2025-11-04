"use client";

import { ArrowUp } from "lucide-react"; // optional: for a nice arrow icon
import { Button } from "../ui/button";
import { scrollToTop } from "@/constant/helperFunction";
import { useEffect, useRef } from "react";

export default function ScrollToTopButton() {
  const scrollToTopRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        scrollToTopRef.current?.classList.add("right-6");
      } else {
        scrollToTopRef.current?.classList.remove("right-6");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-6 -right-10 duration-300 z-50"
      ref={scrollToTopRef}
    >
      <Button
        onClick={() => scrollToTop()}
        className="rounded-full"
        variant={"outline"}
        size={"icon-lg"}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
}
