"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { useLucideIcons } from "@/hooks/useLucideIcons";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalNavbar } from "@/components/ui/ConditionalNavbar";
import { images } from "@/constant/images";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isAOSInitialized, setIsAOSInitialized] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);

  const { isIconStoreLoading } = useLucideIcons();

  useEffect(() => {
    AOS.init({
      duration: 500,
      // once: true,
      offset: 50,
      delay: 0,
      easing: "ease-in-out",
      mirror: false,
      anchorPlacement: "center-bottom",
    });

    // Mark AOS as initialized after ensuring it's ready
    const timer = setTimeout(() => {
      setIsAOSInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setApiLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = !isAOSInitialized || isIconStoreLoading || apiLoader;

  const page = usePathname();

  useEffect(() => {
    if (page) {
      console.log("page", page);
      AOS.refresh();
    }
  }, [page]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="relative w-30 h-30">
            <Image
              src={images.loaderLogo}
              alt="loader"
              className="p-10 ps-7 animate-pulse"
            />
            <span className="absolute top-0 left-0 w-full h-full rounded-full border-3 animate-spin border-t-blue-700 border-blue-200"></span>
          </div>
        </div>
      ) : (
        <ThemeProvider
          attribute="class"
          key={isLoading ? null : "loaded"}
          // defaultTheme="system"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalNavbar />
          {children}
        </ThemeProvider>
      )}
    </>
  );
}
