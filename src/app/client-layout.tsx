"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLucideIcons } from "@/hooks/useLucideIcons";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isAOSInitialized, setIsAOSInitialized] = useState(false);

  const { isIconStoreLoading } = useLucideIcons();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    // Mark AOS as initialized after a brief delay to ensure it's ready
    const timer = setTimeout(() => {
      setIsAOSInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <>{isAOSInitialized && !isIconStoreLoading ? children : null}</>;
}
