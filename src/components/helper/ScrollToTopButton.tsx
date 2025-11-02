"use client";

import { ArrowUp } from "lucide-react"; // optional: for a nice arrow icon
import { Button } from "../ui/button";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function ScrollToTopButton() {
  const { low200px, scrollToTop } = useWindowSize();
  if (!low200px) return null;

  return (
    <div
      data-aos="fade-left"
      className="fixed bottom-6 right-6"
      data-aos-offset="10px"
    >
      <Button
        onClick={scrollToTop}
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
